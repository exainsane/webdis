$(function(){
	$(".goto").click(function(){
		var id = $(this).attr("href");
		$("html, body").animate({
			scrollTop:($(id).offset().top - 124)
		},1300);
	});
	$(".button-collapse").sideNav();

	ApplyCredentialInfo();

	$(".logoutbtn").click(function(){
		Credential.removeCredential();
		PageRedirect("index.html");
	})
	$(".guestlogin").click(function(){
		PageRedirect("index.html#sect-login");
	});
	//$(".imgs-horizontal-list img").materialbox();
});
function ApplyCredentialInfo(){
	var isLoggedIn = Credential.isLoggedIn();

	$(".accountname").html(isLoggedIn == true?Credential.getCurrentUserDetail().name:"Guest Login");
	$(".accountjoindate").html("Joined "+(isLoggedIn == true?Credential.getCurrentUserDetail().join_date:"-"));
	$(".logoutbtn").css("display",(isLoggedIn == true?"inline":"none"));	
	$(".guestlogin").css("display",(isLoggedIn == false?"inline":"none"));	
}
function Sound(source,volume,loop)
{
    this.source=source;
    this.volume=volume;
    this.loop=loop;
    var son;
    this.son=son;
    this.finish=false;
    this.stop=function()
    {
        document.body.removeChild(this.son);
    }
    this.start=function()
    {
		var a = $("<audio id=\"audio\"><source src=\""+ this.source +"\" type=\"audio/ogg\">");
		a.css("display","none");
		$("body").append(a);
		document.getElementById("audio").play();		
		setTimeout(function(){
			$("#audio").remove();
		},2000);
        if(this.finish)return false;
    }
    this.remove=function()
    {
        //document.body.removeChild(this.son);
        this.finish=true;
    }
    this.init=function(volume,loop)
    {
        this.finish=false;
        this.volume=volume;
        this.loop=loop;
    }
}
function resizeChat(){
	var cwin = $("div.popup-window.wnd.chat");
	var cwinpart = $("#mcwindow");

	var wholeHeight = cwin.height();
	var inpHeight = $("#mcwindow div.row:nth-child(3)").height() + 10;
	var headHeight = $("#mcwindow div.row:nth-child(1)").height();
	var paddingTop = cwin.css("padding-top");
	var paddingBottom = cwin.css("padding-bottom");

	paddingTop = parseInt(paddingTop.substring(0, paddingTop.length - 2));
	paddingBottom = parseInt(paddingBottom.substring(0, paddingBottom.length - 2));
		
	var winHeight = wholeHeight - inpHeight - headHeight;

	$(".chatwindow").css("height",winHeight + "px");
}
function App(map){	
	var mapElementName = "map";
	var overlay = "#overlay"; 
	var popupProfile = ".popup-window.profile";
	var popupChat = ".popup-window.chat";
	var popupBestSellers = ".popup-window.best-sellers";			
	var popupBestProducts = ".popup-window.best-products";
	var popupSearchHistory = ".popup-window.searches";
	var popupProductList = ".popup-window.productslist";
	this.mapobj = map;	
	
	var profile_open = false;
	var chat_open = false;
	var sellers_open = false;
	var products_open = false;	
	var searches_open = false;
	var productlist_open = false;	

	this.chatdata = null;

	var ratingEl = "<span class=\"rating star-[on]\"></span>";
	var popularEl = "<a href=\"#\" dti=\"[id]\"><div class=\"item\"><img src=\"assets/images/ic_menu.png\" alt=\"\"><div class=\"name\"><span>[name]</span><div>[rate]</div></div></div></a>";
	var productEl = "<a href=\"#\"> <div class=\"item\"> <img src=\"assets/images/ic_menu.png\" alt=\"\"> <div class=\"name\"> <span>[name]</span><br> <span>By : <strong>[owner]</strong></span> </div> <div class=\"prod-rating\"> <span>[rate]</span> <img src=\"assets/images/rate-white.png\" alt=\"\"> </div> </div> </a>";
	var searchentryEl = "<a href=\"#\" class=\"historyitem\" data-text=\"[text]\"><div class=\"searchentry\"><span>[content]</span></div></a>";
	var productslistEl = "<div class=\"card products-card\" style=\"padding:10px;\"><div class=\"row nullmargin\"><div class=\"col s4\"><img src=\"\" alt=\"\" style=\"width:100%\"></div><div class=\"col s8\"><span class=\"products-title\">Bakso Bakar</span><span class=\"products-price\">Rp 12.000</span><div class=\"right\"></div></div></div></div>";
	this.searchData = [];
	this.markers = [];
	
	this.init = function(){
		//this.mapobj = map;
		var obj = this;
		$(overlay).click(function(){
			obj.closeWindows();
		});
		this.createPopularSeller();
		this.createPopularProducts();
		$("#sellerlist a").click(function(){
			var sellerid = $(this).attr("dti");
			obj.closeSellersWindow(true);
			obj.openProfileWindow(parseInt(sellerid));
		});
		$("input[name='searchbar']").keypress(function(e){
			if(e.which == 13){
				obj.startSearch($(this).val());
			}
		});
		$("#profile_chatbtn").click(function(){
			obj.prepareChatWindow($(this).attr("data-seller-target"));
		});
		$("#chatinput").keypress(function(e){
			if(e.which == 13){
				obj.handleChat($(this).val());
				$(this).val("");
			}
		});
		$("#chatsendbtn").click(function(){
			obj.handleChat($("#chatinput").val());
			$("#chatinput").val("");
		});
		$("div.imgprvoverlay").click(function(){
			obj.closeImgOverlay();
		});
		$("#imgthumb > img").click(function(){
			obj.openImgOverlay($(this).attr("src"));
		});


	};
	this.center = function(){
		if(typeof(google) !== "undefined"){
			this.mapobj.setCenter(new google.maps.LatLng(centerpos.lat,centerpos.lng));
		}
	}
	this.getMarkerData = function(){
		return jQuery.parseJSON(data);
	};
	this.addMarkers = function(){	
		var obj = this;			
		if(typeof(google) === "undefined"){
			$("#map").click(function(){
				obj.openProfileWindow();
			});
			return;
		}
		var markerdata = jQuery.parseJSON(data);
		for(i = 0;i < markerdata.length;i++){
			var jobj = markerdata[i];
			this.markers[i] = new google.maps.Marker({
				position:{lat:jobj.lat,lng:jobj.lng},
				title:jobj.title,
				animation:google.maps.Animation.DROP
			});		
			this.markers[i].sellerid = i;
		}
		
		for (i = 0;i < this.markers.length;i++){
			this.markers[i].setMap(map);			
			this.markers[i].addListener("click",function(e){				
				obj.openProfileWindow(this.sellerid);
				this.setAnimation(null);
			});			
		}

	};
	this.appendChatMsg = function(isSending,msg){
		var bubble = $("<div class=\"row nullmargin\">"
                            +"<div class=\"col s7 offset-s5 chatbubble\">"
                                +"<span class=\"timelabel\">[time goes here]</span>"
                                +"<span class=\"textmsg\"></span>"
                            +"</div>"
                        +"</div>");
		if(isSending == true)
			bubble.find(".chatbubble").addClass("chat-sent");
		else
			bubble.find(".chatbubble").addClass("chat-received");

		var today = new Date();
		var hour = today.getHours();
		var mins = today.getMinutes();
		var secs = today.getSeconds();
		if (secs <=9){
			secs = "0" + secs
		}
		if (mins <=9){
			mins = "0" + mins
		}
		if (hour <=9){
			hour = "0" + hour
		}		
		
		bubble.find("span.timelabel").html(hour+":"+mins);
		bubble.find("span.textmsg").html(msg);

		$("div.chatwindow").append(bubble).animate({scrollTop:$("div.chatwindow")[0].scrollHeight},300);
		bubble.find(".chatbubble").css({opacity:1});
	};

	this.handleChat = function(msg){
		if(this.stringPartOf("telolet",msg)){		
			var audio = new Sound("./assets/voices/telolet.mp3",100,false);
			audio.start();
			audio.init();
			audio.remove();
		}
		var reply = this.getChatReply(msg);

		this.appendChatMsg(true, msg);
		this.appendChatMsg(false, reply);
	};

	this.prepareChatWindow = function(sellerid){
		var sellerdata = this.getMarkerData()[sellerid];

		$("#mcwindow h5.chatwith").html("Chat with "+sellerdata.Owner);
		$("div.chatwindow").html("");
	};

	this.getChatReply = function(query){
		if(this.chatdata == null)
		{
			this.chatdata = [];
			this.chatdata.userreply = jQuery.parseJSON(chatbotdata);
			this.chatdata.defaultreply = jQuery.parseJSON(chatbotdatadefaults);
		}

		for(i = 0;i < this.chatdata.userreply.length;i++){
			
			for(k = 0;k < this.chatdata.userreply[i].query.length;k++){				
				if(this.stringPartOf(this.chatdata.userreply[i].query[k],query) == true){
					

					var randint = parseInt(Math.random() * (this.chatdata.userreply[i].response.length - 1));

					return this.chatdata.userreply[i].response[randint];
				}
			}
		}
		var randint = parseInt(Math.random() * (this.chatdata.defaultreply.length - 1));
		return this.chatdata.defaultreply[randint];
	};

	this.getSearchData = function(){
		var d = localStorage.getItem("searchdata");
		if(d == null) return [];
		if(d.length < 1) return [];
		return jQuery.parseJSON(d);
	};
	this.stringPartOf = function(search, str){
		return str.toLowerCase().indexOf(search.toLowerCase()) >= 0;
	}
	this.saveSearch = function(query){
		var searchdata = jQuery.parseJSON(localStorage.getItem("searchdata"));
		if(searchdata == null)
			searchdata = [];
		
		searchdata.push(query);

		localStorage.setItem("searchdata",JSON.stringify(searchdata));
	};
	this.startSearch = function(query){
		//Add to webstorage		
		this.saveSearch(query);

		var markers = this.getMarkerData();

		if(typeof(google) != "undefined") {
			for(var i = 0; i < this.markers.length;i++){
				this.markers[i].setAnimation(null);
			}
		}

		//Linear search
		for (var i = 0; i < markers.length; i++) {
			if(markers[i].title.toLowerCase() == query.toLowerCase()){
				this.openProfileWindow(i);
				return;
			}
		};

		//If no exact value
		Materialize.toast('Tidak ada hasil :(', 3000);
		console.log("Searching markers" + (typeof(google) == "undefined"));
		//And maps is exist
		if(typeof(google) === "undefined") return;
		var srccount = 0;
		for (var i = 0; i < markers.length; i++) {
			//console.log("Search : "+markers[i].title+ " : "+query);
			if(this.stringPartOf(query,markers[i].title) == true){
				this.markers[i].setAnimation(google.maps.Animation.BOUNCE);
				srccount++;
			}
		};
		if(srccount > 0)
			Materialize.toast('Ada beberapa seller yang mungkin kamu cari! Coba lihat yang lagi lompat lompat', 4000)
	};
	this.bindSearchHistoryEntry = function(){
		var obj = this;
		$("a.historyitem").click(function(){
			var text = $(this).attr("data-text");

			$("input[name=searchbar]").val(text);

			obj.closeWindows();
			var e = jQuery.Event("keypress");
			e.which = 13;
			setTimeout(function(){
				$("input[name=searchbar]").trigger(e);
			},500);
		});	
	};

	this.closeWindows = function(){
		if(profile_open == true){
			this.closeProfileWindow();
		}
		if(chat_open == true){
			this.closeChatWindow();
		}
		if(sellers_open == true){
			this.closeSellersWindow();
		}
		if(products_open == true){
			this.closeProductsWindow();
		}
		if(searches_open == true){
			this.closeSearchWindow();
		}
	};

	this.openProfileWindow = function(sellerposid){
		var markerData = this.getMarkerData();
		sellerposid = (typeof(sellerposid) === "undefined")?parseInt((Math.random() * markerData.length)):sellerposid;		
		if (profile_open == true) return;

		$(".mainpart").css("filter","blur(5px)");
		
		$("#profile_seller_title").html(markerData[sellerposid].title);
		$("#profile_seller_tagline").html("Menjual " + markerData[sellerposid].products.length + " Produk");
		$("#profile_seller_owner").html(markerData[sellerposid].Owner);
		$("#profile_seller_lastactive").html(parseInt(Math.random() * 10) + " Hours ago");
		$("#profile_seller_rating").html(this.createRatingForProfile(Math.random() * 5));
		$("#profile_chatbtn").attr("data-seller-target",sellerposid);
		$("#profile_prdbtn").attr("data-seller-target",sellerposid);
		$(popupProfile).css({			
			"display":"block",
			visibility:"visible"
		});
		setTimeout(function() {
			$(popupProfile).css({
				opacity:1,
				top:0
			});
		}, 300);
		$(overlay).css({
			display:"block"
		});
		setTimeout(function() {
			$(overlay).css({
				opacity:1				
			});
		}, 300);
		profile_open = true;
	};
	this.closeProfileWindow = function(closeoverlay){
		closeoverlay = typeof(closeoverlay)!= undefined?closeoverlay:true;		
		if (profile_open == false)return;

		$(".mainpart").css("filter","none");

		$(popupProfile).css({
			opacity:0,
			top:"-30px"
		});
		setTimeout(function() {
			$(popupProfile).css({			
				"display":"none",
				visibility:"collapsed"
			});			
		}, 300);
		if(!closeoverlay){
			$(overlay).css({
				opacity:0				
			});
			setTimeout(function() {
				$(overlay).css({
					display:"none"
				});			
			}, 300);
		}
		profile_open = false;
	}
	
	this.openChatWindow = function(){		
		if (chat_open == true) return;
		
		$(".mainpart").css("filter","blur(5px)");
		
		$(popupChat).css({			
			"display":"block",
			visibility:"visible"
		});
		setTimeout(function() {
			$(popupChat).css({
				opacity:1,
				transform:"scale(1)"
			});
		}, 300);
		$(overlay).css({
			display:"block"
		});
		setTimeout(function() {
			$(overlay).css({
				opacity:1				
			});
			resizeChat();
		}, 300);
		chat_open = true;
		
	};
	this.closeChatWindow = function(closeoverlay){	
		closeoverlay = typeof(closeoverlay)!= undefined?closeoverlay:true;	
		if (chat_open == false)return;

		$(".mainpart").css("filter","none");

		$(popupChat).css({
			opacity:0,
			transform:"scale(.97)"
		});
		setTimeout(function() {
			$(popupChat).css({			
				"display":"none",
				visibility:"collapsed"
			});			
		}, 300);
		if(!closeoverlay){
			$(overlay).css({
				opacity:0				
			});
			setTimeout(function() {
				$(overlay).css({
					display:"none"
				});			
			}, 300);
		}
		chat_open = false;
	}

	this.openSellersWindow = function(){		
		if (sellers_open == true) return;
		
		$(".mainpart").css("filter","blur(5px)");
		
		$(popupBestSellers).css({			
			"display":"block",
			visibility:"visible"
		});
		setTimeout(function() {
			$(popupBestSellers).css({
				opacity:1,
				transform:"scale(1)"
			});
		}, 300);
		$(overlay).css({
			display:"block"
		});
		setTimeout(function() {
			$(overlay).css({
				opacity:1				
			});			
		}, 300);
		sellers_open = true;
		
	};
	this.closeSellersWindow = function(closeoverlay){
		closeoverlay = typeof(closeoverlay)!= undefined?closeoverlay:true;		
		if (sellers_open == false)return;

		$(".mainpart").css("filter","none");

		$(popupBestSellers).css({
			opacity:0,
			transform:"scale(1.05)"
		});
		setTimeout(function() {
			$(popupBestSellers).css({			
				"display":"none",
				visibility:"collapsed"
			});			
		}, 300);
		if(!closeoverlay){
				$(overlay).css({
				opacity:0				
			});
			setTimeout(function() {
				$(overlay).css({
					display:"none"
				});			
			}, 300);
		}
		sellers_open = false;
	}
	this.createPopularSeller = function(){
		var listBody = "";

		var markerData = jQuery.parseJSON(data);
		
		for(q = 0;q < markerData.length;q++){
			var innerBody = popularEl.replace("[name]",markerData[q].title);
			var rate = this.createRating(parseInt((Math.random() * 10) % 5 + 1));			
			innerBody = innerBody.replace("[rate]",rate);
			innerBody = innerBody.replace("[id]",q);
			listBody += innerBody;

			innerBody = "";
			rate = "";
		}

		$("#sellerlist").html(listBody);
	}
	this.createPopularProducts = function(){
		var listBody = "";

		var markerData = this.getMarkerData();		
		for(q = 0;q < markerData.length;q++){
			var innerBody = productEl.replace("[owner]",markerData[q].title);
			var randi = parseInt(Math.random() * (markerData[q].products.length - 1));			
			innerBody = innerBody.replace("[name]",markerData[q].products[randi].nama);
			innerBody = innerBody.replace("[rate]",(Math.random() * 5).toFixed(1));

			listBody += innerBody;
			
		}

		$("#productlist").html(listBody);
	}
	this.createRating = function(rate, ratecolor, ratecoloroff){
		ratecolor = (typeof(ratecolor) === "undefined"?"black":ratecolor);				
		ratecoloroff = (typeof(ratecoloroff) === "undefined"?"white":ratecoloroff);
		var intRate = parseInt(rate);

		intRate = intRate > 5? 5 : intRate;
		intRate = intRate < 0? 0 : intRate;

		var rateBody = "";

		for(i = 1;i<=5;i++){
			rateBody += ratingEl.replace("[on]",(i < rate?ratecolor:ratecoloroff));
		}		
		return rateBody;
	}
	this.createRatingForProfile = function(rate){				
		var intRate = parseInt(rate);

		intRate = intRate > 5? 5 : intRate;
		intRate = intRate < 0? 0 : intRate;

		var rateBody = "";

		for(i = 1;i<=5;i++){
			rateBody += ratingEl.replace("[on]",(i < rate?"yellow":"black"));
		}		
		return rateBody;
	}

	this.openProductsWindow = function(){		
		if (products_open == true) return;
		
		$(".mainpart").css("filter","blur(5px)");
		
		$(popupBestProducts).css({			
			"display":"block",
			visibility:"visible"
		});
		setTimeout(function() {
			$(popupBestProducts).css({
				opacity:1,
				transform:"scale(1)"
			});
		}, 300);
		$(overlay).css({
			display:"block"
		});
		setTimeout(function() {
			$(overlay).css({
				opacity:1				
			});			
		}, 300);
		products_open = true;
		
	};
	this.closeProductsWindow = function(){		
		if (products_open == false)return;

		$(".mainpart").css("filter","none");

		$(popupBestProducts).css({
			opacity:0,
			transform:"scale(1.05)"
		});
		setTimeout(function() {
			$(popupBestProducts).css({			
				"display":"none",
				visibility:"collapsed"
			});			
		}, 300);
		$(overlay).css({
			opacity:0				
		});
		setTimeout(function() {
			$(overlay).css({
				display:"none"
			});			
		}, 300);
		products_open = false;
	}

	this.openSearchWindow = function(){				
		if (searches_open == true) return;

		var searchdata = this.getSearchData();
		var innerHtml = "";

		for(var i = 0;i < searchdata.length;i++){
			innerHtml += searchentryEl.replace("[text]",searchdata[i]).replace("[content]",searchdata[i]);
		}

		$("#searchhistory").html(innerHtml);

		this.bindSearchHistoryEntry();

		$(popupSearchHistory).css({			
			"display":"block",
			visibility:"visible"
		});
		setTimeout(function() {
			$(popupSearchHistory).css({
				opacity:1,
				top:0
			});
		}, 300);
		$(overlay).css({
			display:"block"
		});
		setTimeout(function() {
			$(overlay).css({
				opacity:1				
			});
		}, 300);
		searches_open = true;
	};
	this.closeSearchWindow = function(closeoverlay){
		closeoverlay = typeof(closeoverlay)!= undefined?closeoverlay:true;		
		if (searches_open == false)return;

		$(".mainpart").css("filter","none");

		$(popupSearchHistory).css({
			opacity:0,
			top:"-30px"
		});
		setTimeout(function() {
			$(popupSearchHistory).css({			
				"display":"none",
				visibility:"collapsed"
			});			
		}, 300);
		if(!closeoverlay){
			$(overlay).css({
				opacity:0				
			});
			setTimeout(function() {
				$(overlay).css({
					display:"none"
				});			
			}, 300);
		}
		searches_open = false;
	}
	// 
	this.openProductListWindow = function(sellerid){
		if(typeof(sellerid) == "undefined"){
			sellerid = $("#profile_prdbtn").attr("data-seller-target");
		}				
		if (productlist_open == true) return;
		
		var data = this.getMarkerData();
		data = data[sellerid];

		if(typeof(data)==="undefined"){
			Materialize.toast("Data Error!",2500);
			return;
		}

		$(".productslist #list").html("");

		for(var i = 0; i < data.products.length;i++){
			
			var nama = data.products[i].nama;
			var harga = "Rp. " + String(data.products[i].harga).replace(/(.)(?=(\d{3})+$)/g,'$1,');
			var rating = parseFloat(data.products[i].rating);

			console.log("parsing" + nama);

			var img = "assets/images/products/prd (" + (parseInt(Math.random() * 11) + 1) + ").jpg";

			var el = $(productslistEl);

			el.find("img").attr("src",img);
			el.find(".products-title").html(nama);
			el.find(".products-price").html(harga);
			el.find("div.right").html(this.createRating(rating,"yellow","black"));
			// 
			$(".productslist #list").append(el);
		}

		$(popupProductList).css({			
			"display":"block",
			visibility:"visible"
		});
		setTimeout(function() {
			$(popupProductList).css({
				opacity:1,
				transform:"scale(1)"
			});
		}, 300);
		$(overlay).css({
			display:"block"
		});
		setTimeout(function() {
			$(overlay).css({
				opacity:1				
			});
		}, 300);
		productlist_open = true;
	};
	this.closeProductListWindow = function(closeoverlay){
		closeoverlay = typeof(closeoverlay)!= undefined?closeoverlay:true;		
		if (productlist_open == false)return;

		$(".mainpart").css("filter","none");

		$(popupProductList).css({
			opacity:0,
			transform:"scale(0/95)"
		});
		setTimeout(function() {
			$(popupProductList).css({			
				"display":"none",
				visibility:"collapsed"
			});			
		}, 300);
		if(!closeoverlay){
			$(overlay).css({
				opacity:0				
			});
			setTimeout(function() {
				$(overlay).css({
					display:"none"
				});			
			}, 300);
		}
		productlist_open = false;
	}
	// 
	this.openImgOverlay = function(url){
		console.log(url);
		$("img#imgprv").attr("src",url);
		$("img#imgprv, div.imgprvoverlay").css("display","block");
		setTimeout(function(){	
			$("img#imgprv, div.imgprvoverlay").css({
				transform:"scale(1)"
			});		
			$("img#imgprv, div.imgprvoverlay").css({
				opacity:1
			});
		},100);
	};
	this.closeImgOverlay = function(){
		$("img#imgprv").css({
				transform:"scale(0.95)"
			});
		$("img#imgprv, div.imgprvoverlay").css({
			opacity:0
		});
		setTimeout(function(){
			$("img#imgprv, div.imgprvoverlay").css({
				display:"none"
			});
		},100);
	};
}
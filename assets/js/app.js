$(function(){
	$(".goto").click(function(){
		var id = $(this).attr("href");
		$("html, body").animate({
			scrollTop:($(id).offset().top - 124)
		},1300);
	});

	//$(".imgs-horizontal-list img").materialbox();
});
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
	this.markers = [];
	var mapElementName = "map";
	var overlay = "#overlay"; 
	var popupProfile = ".popup-window.profile";
	var popupChat = ".popup-window.chat";
	var popupBestSellers = ".popup-window.best-sellers";			
	var popupBestProducts = ".popup-window.best-products";
	var mapobj = map;	
	this.data = [];
	var profile_open = false;
	var chat_open = false;
	var sellers_open = false;
	var products_open = false;
	

	var data = "[{\"lat\":-6.196562, \"lng\":106.887132, \"Owner\":\"Ridwan AN\",\"title\":\"Siomay Mang Jago\",\"products\":[{\"nama\":\"Kebab\",\"harga\":15000,\"rating\": 4.5}, {\"nama\":\"Es Buble\",\"harga\":7000,\"rating\": 4.0}, {\"nama\":\"Sate\" ,\"harga\":15000,\"rating\": 2.5}, {\"nama\":\"Bubur Ayam\",\"harga\":10000,\"rating\": 2.3}]}, {\"lat\":-6.195266, \"lng\":106.884707, \"Owner\":\"Ridwan AN\",\"title\":\"Bakso Bakar Malang\",\"products\":[{\"nama\":\"Mie Ayam\",\"harga\":10000,\"rating\": 2.5}, {\"nama\":\"Teh Tarik\",\"harga\":7000,\"rating\": 2.7}, {\"nama\":\"Telur Steam\",\"harga\":5000,\"rating\": 3.7}]}, {\"lat\":-6.191677, \"lng\":106.897319, \"Owner\":\"Ridwan AN\",\"title\":\"Mie Ayam\",\"products\":[{\"nama\":\"Nasi Goreng\",\"harga\":12000,\"rating\": 3.5}, {\"nama\":\"Mie Ayam\",\"harga\":10000,\"rating\": 2.5}, {\"nama\":\"Pan Cake\",\"harga\":10000,\"rating\": 4.0}, {\"nama\":\"Es Doger\",\"harga\":5000,\"rating\": 3.0} ]}, {\"lat\":-6.201596, \"lng\":106.880612, \"Owner\":\"Ridwan AN\",\"title\":\"Gerobaktagor Uye\",\"products\":[{\"nama\":\"Siomay\",\"harga\":5000,\"rating\": 3.3}, {\"nama\":\"Batagor\",\"harga\":5000,\"rating\": 4.7}]}, {\"lat\":-6.203249, \"lng\":106.878241, \"Owner\":\"Miftahul Zannah\",\"title\":\"Jasuke Pengkolan\",\"products\":[{\"nama\":\"Jagung Susu Keju\",\"harga\":8000,\"rating\": 4.0}, {\"nama\":\"Jagung Susu Keju Coklat\",\"harga\":8000,\"rating\": 4.0}]}, {\"lat\":-6.202572, \"lng\":106.882232, \"Owner\":\"Miftahul Zannah\",\"title\":\"Warto Warung Soto\",\"products\":[{\"nama\":\"Mie Ayam\",\"harga\":10000,\"rating\": 2.5}, {\"nama\":\"Soto Mie\",\"harga\":10000,\"rating\": 2.3}, {\"nama\":\"Es Buble\",\"harga\":7000,\"rating\": 4.0}, {\"nama\":\"Es Campur\",\"harga\":8000,\"rating\": 3.7}, {\"nama\":\"Sate\" ,\"harga\":15000,\"rating\": 2.5}, {\"nama\":\"Cimol\",\"harga\":5000,\"rating\": 3.3}]}, {\"lat\":-6.200919, \"lng\":106.884233, \"Owner\":\"Miftahul Zannah\",\"title\":\"Kedai Kebab\",\"products\":[{\"nama\":\"Kebab\",\"harga\":15000,\"rating\": 4.5}, {\"nama\":\"Burger\",\"harga\":10000,\"rating\": 4.3}]}, {\"lat\":-6.201319, \"lng\":106.883986, \"Owner\":\"Miftahul Zannah\",\"title\":\"Ayam bakar\",\"products\":[{\"nama\":\"Nasi Goreng\",\"harga\":12000,\"rating\": 3.5}, {\"nama\":\"Mie Ayam\",\"harga\":10000,\"rating\": 2.5}, {\"nama\":\"Pan Cake\",\"harga\":10000,\"rating\": 4.0}, {\"nama\":\"Tahu Bulat\",\"harga\":5000,\"rating\": 3.7}, {\"nama\":\"Ayam Bakar\",\"harga\":15000,\"rating\": 4.7}, {\"nama\":\"Roti Bakar Isi\",\"harga\":12000,\"rating\": 3.0}, {\"nama\":\"Soft Drink\",\"harga\":7000,\"rating\": 4.7}, {\"nama\":\"Jamur Crispy\",\"harga\":10000,\"rating\": 3.0}]}, {\"lat\":-6.201522, \"lng\":106.885815, \"Owner\":\"Kevin RK\",\"title\":\"Warung Pinggiran\",\"products\":[{\"nama\":\"Nasi Goreng\",\"harga\":12000,\"rating\": 3.5}, {\"nama\":\"Batagor\",\"harga\":5000,\"rating\": 4.7}, {\"nama\":\"Capcin\",\"harga\":5000,\"rating\": 5.0}, {\"nama\":\"Es Buble\",\"harga\":7000,\"rating\": 4.0}, {\"nama\":\"Es Campur\",\"harga\":8000,\"rating\": 3.7}, {\"nama\":\"Es Doger\",\"harga\":5000,\"rating\": 3.0}, {\"nama\":\"Teh Tarik\",\"harga\":7000,\"rating\": 2.7}]}, {\"lat\":-6.200378, \"lng\":106.882279, \"Owner\":\"Kevin RK\",\"title\":\"Gogorengan\",\"products\":[{\"nama\":\"Siomay\",\"harga\":5000,\"rating\": 3.3}, {\"nama\":\"Batagor\",\"harga\":5000,\"rating\": 4.7}, {\"nama\":\"Tahu Bulat\",\"harga\":5000,\"rating\": 3.7}, {\"nama\":\"Roti Maryam\",\"harga\":8000,\"rating\": 2.0}, {\"nama\":\"Jagung Susu Keju\",\"harga\":8000,\"rating\": 4.0}]}, {\"lat\":-6.190845, \"lng\":106.878644, \"Owner\":\"Kevin RK\",\"title\":\"Es krim\",\"products\":[{\"nama\":\"Teh Tarik\",\"harga\":7000,\"rating\": 2.7}, {\"nama\":\"Jus Buah\",\"harga\":10000,\"rating\": 4.0}, {\"nama\":\"Roti Bakar Isi\",\"harga\":12000,\"rating\": 3.0}, {\"nama\":\"Ice Cream\",\"harga\":5000,\"rating\": 5.0}, {\"nama\":\"Es Buah\",\"harga\":6000,\"rating\": 4.0}]}, {\"lat\":-6.186992, \"lng\":106.878483, \"Owner\":\"Kevin RK\",\"title\":\"Es Cendol\",\"products\":[{\"nama\":\"Es Buble\",\"harga\":7000,\"rating\": 4.0}, {\"nama\":\"Es Campur\",\"harga\":8000,\"rating\": 3.7}, {\"nama\":\"Es Doger\",\"harga\":5000,\"rating\": 3.0}]}, {\"lat\":-6.190320, \"lng\":106.881305, \"Owner\":\"Alghi Fari\",\"title\":\"Jus Buah\",\"products\":[{\"nama\":\"Es Campur\",\"harga\":8000,\"rating\": 3.7}, {\"nama\":\"Es Buah\",\"harga\":6000,\"rating\": 4.0}, {\"nama\":\"Es Kelapa Muda\",\"harga\":8000,\"rating\": 4.0}]}, {\"lat\":-6.189701, \"lng\":106.883279, \"Owner\":\"Alghi Fari\",\"title\":\"Piscok Meler\",\"products\":[{\"nama\":\"Piscok Aneka Rasa\",\"harga\":1000,\"rating\": 4.3}]}, {\"lat\":-6.192666, \"lng\":106.880824, \"Owner\":\"Alghi Fari\",\"title\":\"Warung Kopi\",\"products\":[{\"nama\":\"Kopi Hitam\",\"harga\":10000,\"rating\": 4.3}, {\"nama\":\"Espresso\",\"harga\":10000,\"rating\": 4.3}, {\"nama\":\"Black Cappucino\",\"harga\":10000,\"rating\": 4.3}]}, {\"lat\":-6.196534, \"lng\":106.879756, \"Owner\":\"Alghi Fari\",\"title\":\"Tahu Bulat\",\"products\":[{\"nama\":\"Batagor\",\"harga\":5000,\"rating\": 4.7}, {\"nama\":\"Tahu Bulat\",\"harga\":5000,\"rating\": 3.7}]}, {\"lat\":-6.191686, \"lng\":106.884117, \"Owner\":\"Putri Pratiwi\",\"title\":\"Es Es An\",\"products\":[{\"nama\":\"Es Buble\",\"harga\":7000,\"rating\": 4.0}, {\"nama\":\"Es Campur\",\"harga\":8000,\"rating\": 3.7}, {\"nama\":\"Es Doger\",\"harga\":5000,\"rating\": 3.0}, {\"nama\":\"Es Buah\",\"harga\":6000,\"rating\": 4.0}]}, {\"lat\":-6.193585, \"lng\":106.885941, \"Owner\":\"Putri Pratiwi\",\"title\":\"Soto\",\"products\":[{\"nama\":\"Soto Mie\",\"harga\":10000,\"rating\": 2.3}, {\"nama\":\"Jus Buah\",\"harga\":10000,\"rating\": 4.0}, {\"nama\":\"Soft Drink\",\"harga\":7000,\"rating\": 4.7}]}, {\"lat\":-6.193291, \"lng\":106.882950, \"Owner\":\"Putri Pratiwi\",\"title\":\"Es Capcin\",\"products\":[{\"nama\":\"Capcin\",\"harga\":5000,\"rating\": 5.0}]}, {\"lat\":-6.197046, \"lng\":106.869288, \"Owner\":\"Putri Pratiwi\",\"title\":\"Buble\",\"products\":[{\"nama\":\"Es Buble\",\"harga\":7000,\"rating\": 4.0}]}, {\"lat\":-6.203625, \"lng\":106.877703, \"Owner\":\"Putri Pratiwi\",\"title\":\"Nasi Goreng\",\"products\":[{\"nama\":\"Nasi Goreng\",\"harga\":12000,\"rating\": 3.5}, {\"nama\":\"Ayam Bakar\",\"harga\":15000,\"rating\": 4.7}]}]";
	//var data = "[{\"lat\":-6.196562, \"lng\":106.887132, \"title\":\"Siomay\"}, {\"lat\":-6.195266, \"lng\":106.884707, \"title\":\"bakso\"}, {\"lat\":-6.191677, \"lng\":106.897319, \"title\":\"Mie Ayam\"}, {\"lat\":-6.201596, \"lng\":106.880612, \"title\":\"batagor\"}, {\"lat\":-6.203249, \"lng\":106.878241, \"title\":\"Jasuke\"}, {\"lat\":-6.202572, \"lng\":106.882232, \"title\":\"Cimol\"}, {\"lat\":-6.200919, \"lng\":106.884233, \"title\":\"Kebab\"}, {\"lat\":-6.201319, \"lng\":106.883986, \"title\":\"Ayam bakar\"}, {\"lat\":-6.201522, \"lng\":106.885815, \"title\":\"sate\"}, {\"lat\":-6.200378, \"lng\":106.882279, \"title\":\"gorengan\"}, {\"lat\":-6.190845, \"lng\":106.878644, \"title\":\"Es krim\"}, {\"lat\":-6.186992, \"lng\":106.878483, \"title\":\"Es Cendol\"}, {\"lat\":-6.190320, \"lng\":106.881305, \"title\":\"Jus Buah\"}, {\"lat\":-6.189701, \"lng\":106.883279, \"title\":\"Piscok Meler\"}, {\"lat\":-6.192666, \"lng\":106.880824, \"title\":\"Warung Kopi\"}, {\"lat\":-6.193946, \"lng\":106.881103, \"title\":\"Es Doger\"}, {\"lat\":-6.193909, \"lng\":106.879231, \"title\":\"Es Goyang\"}, {\"lat\":-6.196534, \"lng\":106.879756, \"title\":\"Tahu Bulat\"}, {\"lat\":-6.191686, \"lng\":106.884117, \"title\":\"Es kelapa\"}, {\"lat\":-6.193585, \"lng\":106.885941, \"title\":\"Soto\"}, {\"lat\":-6.197766, \"lng\":106.888695, \"title\":\"Tahu Pedas\"}, {\"lat\":-6.193291, \"lng\":106.882950, \"title\":\"Es Capcin\"}, {\"lat\":-6.197046, \"lng\":106.869288, \"title\":\"Buble\"}, {\"lat\":-6.200182, \"lng\":106.868945, \"title\":\"Brownies)\"}, {\"lat\":-6.203625, \"lng\":106.877703, \"title\":\"Bakpao\"}, {\"lat\":-6.203625, \"lng\":106.877703, \"title\":\"Nasi Goreng\"}]";

	var ratingEl = "<span class=\"rating star-[on]\"></span>";
	var popularEl = "<a href=\"#\" dti=\"[id]\"><div class=\"item\"><img src=\"assets/images/ic_menu.png\" alt=\"\"><div class=\"name\"><span>[name]</span><div>[rate]</div></div></div></a>";
	var productEl = "<a href=\"#\"> <div class=\"item\"> <img src=\"assets/images/ic_menu.png\" alt=\"\"> <div class=\"name\"> <span>[name]</span><br> <span>By : <strong>[owner]</strong></span> </div> <div class=\"prod-rating\"> <span>[rate]</span> <img src=\"assets/images/rate-white.png\" alt=\"\"> </div> </div> </a>";

	this.init = function(){
		
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
	};
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
		}
		
		for (i = 0;i < this.markers.length;i++){
			this.markers[i].setMap(map);			
			this.markers[i].addListener("click",function(e){
				obj.openProfileWindow(i);
			});			
		}

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
	};

	this.openProfileWindow = function(sellerposid){
		var markerData = this.getMarkerData();
		sellerposid = sellerposid || parseInt((Math.random() * markerData.length));		
		if (profile_open == true) return;

		$(".mainpart").css("filter","blur(5px)");
		console.log(markerData[sellerposid]);
		$("#profile_seller_title").html(markerData[sellerposid].title);
		$("#profile_seller_tagline").html("Menjual " + markerData[sellerposid].products.length + " Produk");
		$("#profile_seller_owner").html(markerData[sellerposid].Owner);
		$("#profile_seller_lastactive").html(parseInt(Math.random() * 10) + " Hours ago");
		$("#profile_seller_rating").html(this.createRatingForProfile(Math.random() * 5));
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
		console.log(markerData.length);
		for(q = 0;q < markerData.length;q++){
			var innerBody = popularEl.replace("[name]",markerData[q].title);
			var rate = this.createRating(parseInt((Math.random() * 10) % 5 + 1));
			console.log(rate.length);
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
		console.log(markerData.length);
		for(q = 0;q < markerData.length;q++){
			var innerBody = productEl.replace("[owner]",markerData[q].title);
			var randi = parseInt(Math.random() * (markerData[q].products.length - 1));
			console.log(markerData[q].products[randi]);
			innerBody = innerBody.replace("[name]",markerData[q].products[randi].nama);
			innerBody = innerBody.replace("[rate]",(Math.random() * 5).toFixed(1));

			listBody += innerBody;
			
		}

		$("#productlist").html(listBody);
	}
	this.createRating = function(rate){				
		var intRate = parseInt(rate);

		intRate = intRate > 5? 5 : intRate;
		intRate = intRate < 0? 0 : intRate;

		var rateBody = "";

		for(i = 1;i<=5;i++){
			rateBody += ratingEl.replace("[on]",(i < rate?"black":"white"));
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
}
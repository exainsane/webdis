//declaration size & timing
var id;

var sourcedir = "Source";
var pagesdir = "pages";
var scriptdir = "Script";
var imagedir = "Images";
var cssdir = "CSS";
var idle = 0; var focus = 0;
var tilex; var tiley;
var _user_s = false;
	$(document).ready(function(){
		startUpHideTiles();
		/*Nivo Slider declare*/
		$("#nivoslider").nivoSlider();
		/* Disable Context Menu */
		if (editmode==false){
			var s;
			$(document).bind('contextmenu',function(e){
				if (s==true){
					sidebarOff();
					s=false;
				}
				else{
					sidebarOn();
					s=true;
				}
				return false;
			});
		}
		/*======================*/
		/*Lock Interval*/
		$(window).blur(function(){
			focus = 0;
		});	
		$(window).focus(function(){
			focus = 1;
		});
		var lock = setInterval(autoLock,4000);
		$(this).mousemove(function(){
			idle = 0;
		});
		$(this).keypress(function(){
			idle = 0;
		});
		/*=============*/
		/*Sidebar Hover Function*/
		$("#sidebar-right").mouseenter(function(){
			sidebarOn();
		});
		$("#sidebar-right").mouseleave(function(){
			sidebarOff();
		});
		/*======================*/
		//Tile hint 
		$(".tile-single").mouseenter(function(){
			showHint($(this).attr('id'));
		});
		$(".tile-single").mouseleave(function(){
			hideHint($(this).attr('id'));
		});
		$(".tile-double").mouseenter(function(){
			showHint($(this).attr('id'));
		});
		$(".tile-double").mouseleave(function(){
			hideHint($(this).attr('id'));
		});
		$(".tile-double-animate").mouseenter(function(){
			showHint($(this).attr('id'));
		});
		$(".tile-double-animate").mouseleave(function(){
			hideHint($(this).attr('id'));
		});
		//end Tile Hint

		setInterval(scrollTile,4000);
	});

	function userMenu(){
		if(_user_s==false){
			userMenuOn();
			
		}
		else
		{
			userMenuOff();
			
		}
	}
	function userMenuOn(){
		$(".user-logo").css({
			"margin-top":"-18px"
		});

		$(".dropdown-user").addClass('drop-active');
		_user_s=true;	
	}
	function userMenuOff(e){
		$(".user-logo").css({
			"margin-top":"0px"			
		});
		$(".dropdown-user").removeClass('drop-active');
		_user_s=false;	
	}
	function autoLock(){
		idle++;
		if (idle > 1 && focus == 1 && editmode == false){
			addLockScreen();
		}
	}
	function sidebarOn(){
		$("#sidebar-right").css("width","85px");
		$("#sidebar-right ul li a").css("right","20px");
	}
	function sidebarOff(){
		$("#sidebar-right").css("width","0px");
		$("#sidebar-right ul li a").css("right","-50px");
	}
	function startUpHideTiles(){
		$(".tile-single").hide();
		$(".tile-double").hide();
		$(".tile-double-animate").hide();
	}
	function scrollTile(){
		$('.tile-double-animate img').toggleClass('tile-scroll-animate');
	}
	function showHint(id){
		$("#tile-"+id).css("bottom","60px");
	}
	function hideHint(id){
		$("#tile-"+id).css("bottom","0px");
	}
	function showTiles(){
		$("#section-1").css("width","800px");
		setTimeout(function(){
			$(".tile-single").fadeIn(500);
			$(".tile-double").fadeIn(500);
			$(".tile-double-animate").fadeIn(500);
		},500)
	}
	function hideTiles(){
		$(".tile-single").fadeOut(500);
		$(".tile-double").fadeOut(500);
		$(".tile-double-animate").fadeOut(500);
		//$("#section-1").css("width","0px");	
	}
	function showLeftPage(pages){
		$(".back-button").css({"left":"0px"});
		var page = $("#separate-page");
		page.load(pagesdir +'/'+pages);
		page.css({"left":"0px"});
		//showRightSidebar();
	}
	function hideLeftPage(){
		var page = $("#separate-page");
		page.load(pagesdir + '/blank_.php');
		$(".back-button").css({"left":"-300px"});
		$("#separate-page").css({"left":"-100%"});
		//showRightSidebar();
	}
	function removeLockScreen(){
		$("#locker").css({"opacity":"0","top":"-100%"});
		showTiles();
	}
	function addLockScreen(){
		$("#locker").css({"opacity":"1","top":"0px"});
		hideTiles();
	}
	function hideUI(){
		sidebarOff();
		userMenu();
	}
	function showPopupPage(e, pages){
		tilex = e.pageX;
		tiley = e.pageY;
		//alert(tilex+' -> '+tiley);
		var blur = $("#blur");
		blur.css({
			'width':'100%',
			'height':'100%'
		});
		var page = $("#popup-page");
		page.load(pagesdir +'/'+pages);
		page.css({
			'left': tilex + 'px',
			'top' : tiley + 'px'
		});
		page.css("display","block");
		setTimeout(function(){
			page.css({
				'left':'2%',
				'top':'2%',
				'width':'96%',
				'height':'96%',
				'opacity':'1'
			})
		},100);
	}
	function hidePopupPage(){
		var page = $("#popup-page");
		page.empty();
		var blur = $("#blur");
		blur.css({
			'width':'0px',
			'height':'0px'
		});
		page.css({
				'left':'90%',
				'top':'5%',
				'width':'150px',
				'height':'150px',
				'opacity':'0'
			});
		setTimeout(function(){
			page.css("display","none");
			tilex = 0;
			tiley = 0;
		},600);
	}
	function hideAllWindow(){
		hidePopupPage();
		hideLeftPage();
	}
	function logoutRequest(){
		var url = "action.php?action=user&control=logout";
		$.post(url,{},function(){
			location.reload();
		});
	}
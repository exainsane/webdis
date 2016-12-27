function PageRedirect(url){
	$("body").css("overflow","hidden");
	$(".redirect-overlay").css("display","block");
	setTimeout(function(){
		$(".redirect-overlay").css({
			opacity:1,
			filter:"none"
		});
		setTimeout(function(){
			document.location = url;
		},2000)
	},100);    
}
function FinishRedirect(){
	setTimeout(function(){
		$(".redirect-overlay").css({
			opacity:0,
			filter:"blur(15px)"
		});	
		setTimeout(function(){		
			$(".redirect-overlay").css("display","none");
			$("body").css("overflow","auto");
		},500);    
	},1000);
}
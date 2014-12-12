var get_cookie=function(name){
	var string=document.cookie.split("; ");
	for(var i=0;i<string.length;i++){
		var temp=string[i].split("=");
		if(temp[0]==name){
			return unescape(temp[1])}
		}
};
var check_pass_port=function(){
		var booking_sid=get_cookie("BOOKINGSID");
		var booking_passport=get_cookie("BOOKINGPASSPORT");
		if(typeof booking_sid=="undefined"||typeof booking_passport=="undefined"){
			document.location="http://booking.meizu.com/"
		}
	};
check_pass_port();

var _hmt = _hmt || [];
(function() {
	var hm = document.createElement("script");
	hm.src = "//hm.baidu.com/hm.js?2a0c04774115b182994cfcacf4c122e9";
	var s = document.getElementsByTagName("script")[0]; 
	s.parentNode.insertBefore(hm, s);
})();

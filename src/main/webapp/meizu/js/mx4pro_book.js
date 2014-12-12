var online_province=new Array,
store_province=new Array,
online_city=new Array,
online_area=new Array,
store_city=new Array,
municipalities={11:"北京",12:"天津",31:"上海",50:"重庆"},
autonomousregion={54:"西藏",65:"新疆",15:"内蒙古"},
receipt_modify=!0,
init=function(){
	var e=0;for(i=2;3>=i;i++)
		for(j=1;2>=j;j++){
				var r=i+""+j,
				t=product[0][r];
				$("#version_"+e+" .price").html("&yen;"+t.Price),
				e++
				}$("#hidden_product").val(0),
				$("#hidden_booking_type").val(0),
				$("#hidden_province").val(0),
				$("#hidden_city").val(0),
				$("#hidden_area").val(0),
				$("#hidden_receipt_type").val(1),
				$("#hidden_is_insurance").val(0),
				$("#hidden_store").val(""),
				$("#recipient").val("")
				,$("#mobile_phone").val(""),
				$("#address_detail").val(""),
				$("#zip_code").val(""),
				$("#receipt").val(""),
				$("#hidden_version").val("2"),
				$("#hidden_type").val("1"),
				$("#hidden_address").val(""),
				$("#hidden_product_name").val(""),
				$("#hidden_product_price").val(""),
				$("#insurance_price").text(insurance_product_price)
			};
$(document).ready(function(){
	function e(){$("#order_province li").on({
		mouseenter:function(){
			$(this).addClass("hover")
		},
		mouseleave:function(){
			$(this).removeClass("hover")
		},
		click:function(){
			var e=$(this).attr("p_value"),r="0";
			if($("#hidden_province").val(e),
					$("#province").html($(this).html()),
					$("#order_province").hide(),"0"==r)"undefined"!=typeof municipalities[e]?($("#hidden_city").val(e),
					e!=online_province.id&&(online_city.id=e,online_city.name=$(this).html()+"市",
					online_area.id=0,online_area.name="",
					$("#hidden_city").val(e),$("#hidden_area").val(0)),
					online_province.id=e,
					online_province.name=$(this).html(),
					$("#city").html(municipalities[e]+"市"),
					$("#area").html("区 / 县"),$("#order_area").html(""),$("#area").click()):($("#city").html("城市"),
					e!=online_province.id&&(online_city.id="",online_city.name="",online_area.id=0,online_area.name="",
							$("#area").html("区 / 县"),
							$("#hidden_city").val(0),
							$("#hidden_area").val(0)),
							online_province.id=e,
							online_province.name=$(this).html(),
							$("#city").click());
					else if("undefined"!=typeof municipalities[e]){
						if(e!=store_province.id){
							store_city.id=e,store_city.name=$(this).html()+"市",
							$("#city").html(municipalities[e]+"市"),
							$("#hidden_city").val(e),
							$("#hidden_area").val(0);
							var t="";
							for(i in store[e])
								t=t+"<li s_value='"+i+"'>"+store[e][i]
									+"<a target='_blank' href='http://retail.meizu.com/details/"+i+".htm'>查看地址</a></li>";
							$("#store_list").html(""),
							$("#store_list").append(t);
							var a=$("#store_list").width()+1;
							$("#store_list").width(a),
							$("#store_list").show(),
							$("#store_list_notice").show()
						}
						store_province.id=e,
						store_province.name=$(this).html(),
						$("#order_city").html("")
					}else{
						store_city.id=0,
						store_city.name="",
						$("#hidden_city").val(0),
						store_province.id=e,
						store_province.name=$(this).html();
						var t="";
						if("0"!=e)
							for(i in city[e])
								"0"!=city[e][i].store
								&&(t=t+"<li class='city_li' c_value='"+i+"'>"+
										city[e][i].city+"</li>");
						else t="<li c_value='0'>请先选择省份 / 直辖市</li>";
						$("#order_city").html(""),
						$("#order_city").append(t),
						$("#order_city").show()
						}}})}
	function r(){$("#order_city li").on({
				mouseenter:function(){
					$(this).addClass("hover")
				},
				mouseleave:function(){
					$(this).removeClass("hover")
				},
				click:function(){
					var e=$(this).attr("c_value"),
					r=$("#hidden_province").val();
					if("0"==e)
						return $("#order_city").hide(),!1;
					$("#hidden_city").val(e),
					$("#city").html($(this).html()),
					$("#order_city").hide(),
					$("#hidden_store").val("");
					var t="0";
					if("0"==t)
						online_city.id=e,
						online_city.name=$(this).html(),
						"undefined"==typeof municipalities[r]&&$("#area").click();
					else{
						var a="";
						for(i in store[e])
							a=a+"<li s_value='"+i+"'>"+store[e][i]+"<a target='_blank' href='http://retail.meizu.com/details/"+i+".htm'>查看地址</a></li>";
						$("#store_list").html(""),
						$("#store_list").append(a);
						var s=$("#store_list").width()+1;
						$("#store_list").width(s),
						$("#store_list").show(),
						store_city.id=e,
						store_city.name=$(this).html(),
						$("#store_list_notice").show()}}}
	)}
	function t(){
		$("#order_area li").on({
			mouseenter:function(){
				$(this).addClass("hover")
			},
			mouseleave:function(){
				$(this).removeClass("hover")
			},
			click:function(){
				var e=$("#hidden_province").val(),
				i=$("#hidden_city").val(),
				r=$(this).html();
				if($("#area").html(r),
						$("#order_area").hide(),
						"undefined"==typeof municipalities[e]){
					var t=$(this).attr("a_value");
					if(0==t)
						return!1;
					if("undefined"==typeof autonomousregion[e])
						var a=$("#province").html()+"省"+$("#city").html()+r;
					else var a=$("#province").html()+$("#city").html()+r;
					"undefined"!=typeof area[i][t]&&"undefined"!=typeof area[i][t].code&&$("#zip_code").val(area[i][t].code)
				}else{
					var t=$(this).attr("c_value"),a=$("#city").html()+r;
					"undefined"!=typeof city[e][t]&&"undefined"!=typeof city[e][t].code&&$("#zip_code").val(city[e][t].code)
				}
				var s=$("#address_detail").val(),
				o=a+s;
				$("#hidden_area").val(t),
				$("#address_head").html(a),
				$("#hidden_address").val(o),
				online_area.id=t,
				online_area.name=r;
				var l=$("#address_head").width()+15,
				n=558-l;$("#address_detail").css(
						{paddingLeft:l+"px",width:n+"px"}),
						$("#address_detail").val(s),
						$("#address_detail").focus()
					}})
				}
	init(),
	$(".version li").click(
			function(){
				$(".version li").removeClass("selected"),
				$(this).addClass("selected"),
				$("#hidden_version").val($(this).attr("version")),
				$("#hidden_type").val($(this).attr("type")),
				a()
			}),
			$("#receipt_item li").click(function(){
				$("#receipt_item li").removeClass("selected"),
				$(this).addClass("selected");
				var e=$(this).attr("value");
				"0"==e?($("#receipt_li").show(),
						$("#receipt_text").hide()):($("#receipt_li").hide(),
								$("#receipt_text").show()),
								$("#hidden_receipt_type").val(e)}),
								$("#insurance").toggle(
										function(){
											$("#insurance").addClass("insurance_checked"),
											$("#hidden_is_insurance").val(1),
											a()
										},
										function(){
											$("#insurance").removeClass("insurance_checked"),
											$("#hidden_is_insurance").val(0),
											a()}
										);
	var a=function(){
		var e="0",
		i=$("#hidden_version").val(),
		r=$("#hidden_type").val(),
		t=i+""+r;
		if("undefined"!=typeof product[e][t]){
			if("0"==e){
				var a="1"==$("#hidden_is_insurance").val()?insurance_product_price:0,
						s=parseInt(product[e][t].Price)+a;
				s+=".00",$("#product_price_text").html("商品价")
		}else{
			var s="200.00";
			$("#product_price_text").html("预付款")
		}
			$("#product_price_text").show(),
			$("#hidden_product").val(product[e][t].ID),
			$("#hidden_product_name").val(product[e][t].VerName),
			$("#hidden_product_price").val(s),
			$("#total_price").html("&yen; "+s),
			$("#version_text").html(product[e][t].VerName)
		}
	};
	$("#province").click(function(r){
		var t="";
		for(i in province)
			t=t+"<li class='province_li' p_value='"+i+"'>"+province[i]+"</li>";
		$("#order_city").hide(),
		$("#order_area").hide(),
		$("#order_province").html(""),
		$("#order_province").append(t),
		$("#order_province").show(),
		e();
		var a=function(){
			$("#order_province").hide(),
			$(document).unbind("click",a)
		};
		return $(document).bind("click",a),
		r&&r.stopPropagation?(r.stopPropagation(),void 0):(window.event.cancelBubble=!0,!1)}),
		$("#city").click(function(e){
			var t="",
			a=$("#hidden_province").val(),
			s="0";
			if("0"==s&&"undefined"!=typeof municipalities[a])
				return!0;
			if("0"!=a)
				if("0"==s)
					for(i in city[a])
						t=t+"<li class='city_li' c_value='"+i+"'>"+city[a][i].city+"</li>";
				else for(i in city[a])"1"==city[a][i].store&&(t=t+"<li class='city_li' c_value='"+i+"'>"+city[a][i].city+"</li>");
			else t="<li c_value='0'>请先选择省份 / 直辖市</li>";$("#order_province").hide(),
			$("#order_area").hide(),
			$("#order_city").html(""),
			$("#order_city").append(t),
			$("#order_city").show(),
			r();
			var o=function(){
				$("#order_city").hide(),
				$(document).unbind("click",o)
			};
			return $(document).bind("click",o),
			e&&e.stopPropagation?(e.stopPropagation(),void 0):(window.event.cancelBubble=!0,!1)}),
			$("#area").click(function(e){
				var r=$("#hidden_province").val(),
				a=$("#hidden_city").val(),
				s="0";
				if($("#order_province").hide(),
						$("#order_city").hide(),1==s)
					return!0;
				var o="";
				if("undefined"!=typeof municipalities[r])
					if("0"!=r)
						for(i in city[r])
							o=o+"<li class='city_li' c_value='"+i+"'>"+city[r][i].city+"</li>";
					else o="<li c_value='0'>请先选择省份 / 直辖市</li>";
				else if("0"!=a)
					for(i in area[a])
						o=o+"<li class='area_li' a_value='"+i+"'>"+area[a][i].area+"</li>";else o="<li a_value='0'>请先选择城市</li>";
				$("#order_area").html(""),
				$("#order_area").append(o),
				$("#order_area").show(),
				t();
				var l=function(){
					$("#order_area").hide(),
					$(document).unbind("click",l)
					};
					return $(document).bind("click",l),
					e&&e.stopPropagation?(e.stopPropagation(),void 0):(window.event.cancelBubble=!0,!1)});
	var s=function(e){
		var i=$.trim($("#recipient").val());
		if(0==i.length)
			return e&&($("#recipient_error").html("必填"),$("#recipient").removeClass("foucsClass").addClass("errorClass")),
			!1;
		if(i.length<2||i.length>12)
			return e&&($("#recipient_error").html("请输入真实姓名"),
					$("#recipient").removeClass("foucsClass").addClass("errorClass")),
					!1;
		var r=/^[\u4E00-\u9FA5A-Za-z]+$/;
		return r.test(i)?($("#recipient_error").html(""),
				$("#recipient").removeClass("foucsClass"),
				receipt_modify&&$("#receipt").val(i),!0):(e&&($("#recipient_error").html("请输入真实姓名"),
						$("#recipient").removeClass("foucsClass").addClass("errorClass")),
						!1)},
						o=function(e){
							var i=$.trim($("#mobile_phone").val());
							if(""==i)
								return e&&($("#mobile_phone_error").html("必填"),$("#mobile_phone").removeClass("foucsClass").addClass("errorClass")),!1;
							var r=/^(1)[0-9]{10}$/;
							if(r.test(i)){
								if(e){
									var t=!1;
									return $.ajax({
										type:"get",
										dataType:"json",
										async:!1,
										url:"http://pro.booking.meizu.com/ajax.php",
										data:"action=check_phone&phone="+i+"&r="+Math.random(),
										success:function(e){
											"2"==e.result?($("#mobile_phone_error").html('该手机号已经参与了预订 <a href="http://store.meizu.com/myorder/phone_detail.htm" target="_blank">点击查询订单</a>'),
													$("#mobile_phone").removeClass("foucsClass").addClass("errorClass")):"0"==e.result?($("#mobile_phone_error").html("请输入真实手机号码"),
															$("#mobile_phone").removeClass("foucsClass").addClass("errorClass")):"1"==e.result&&($("#mobile_phone_error").html(""),
																	$("#mobile_phone").removeClass("foucsClass").removeClass("errorClass"),
																	t=!0)
										},error:function(){}}),
									t}
								return ""==$("#mobile_phone_error").html()?!0:!1
							}
							return e&&($("#mobile_phone_error").html("请输入真实手机号码"),
									$("#mobile_phone").removeClass("foucsClass").addClass("errorClass"))
									,!1
									},
									l=function(e){
										var i=$("#hidden_province").val(),
										r=$("#hidden_city").val(),
										t=$("#hidden_area").val(),
										a=$("#address_detail").val(),
										s="0",
										o=$("#hidden_store").val(),
										l=!0;
										if("0"==s){
											if("0"==i||"0"==r||"0"==t)
												return e&&"0"==t&&($("#address_detail_error").html("请选择区 / 县"),
														$("#address_detail").removeClass("foucsClass").addClass("errorClass")),
														e&&"0"==r&&($("#address_detail_error").html("请选择城市"),
																$("#address_detail").removeClass("foucsClass").addClass("errorClass")),
																e&&"0"==i&&($("#address_detail_error").html("请选择省份"),
																		$("#address_detail").removeClass("foucsClass").addClass("errorClass")),
																		!1;
											if($("#address_error").html(""),
													0==a.length)e&&($("#address_detail_error").html("请详细填写地址信息"),
															$("#address_detail").removeClass("foucsClass").addClass("errorClass")),
															l=!1;
											else if(a.length<4||a.length>50)e&&($("#address_detail_error").html("请输入真实地址"),
													$("#address_detail").removeClass("foucsClass").addClass("errorClass")),
													l=!1;
											else{var n=/^[\u4E00-\u9FA5A-Za-z0-9_\-\,\，\.\。\(\)\（\）\s]+$/;
											n.test(a)?($("#address_detail").removeClass("errorClass"),$("#address_detail").removeClass("foucsClass"),
													$("#address_detail_error").html("")):(e&&($("#address_detail_error").html("您输入的地址存在特殊字符"),
															$("#address_detail").removeClass("foucsClass").addClass("errorClass")),
															l=!1
												)}}
										else{if("0"==i||"0"==r)
											return e&&"0"==r&&($("#address_error").html("请选择城市"),
													$("#address_detail").removeClass("foucsClass").addClass("errorClass")),
													e&&"0"==i&&($("#address_error").html("请选择省份"),
															$("#address_detail").removeClass("foucsClass").addClass("errorClass")),
															l=!1;
										$("#address_error").html(""),
										""==o?(e&&$("#address_error").html("请选择专卖店"),
												l=!1):$("#address_error").html("")}
										return l
										},
										n=function(e){
											var i="0";
											if("1"==i)
												return!0;
											var r=$.trim($("#zip_code").val());
											if(""==r)
												return e&&($("#zip_code_error").html("必填"),
														$("#zip_code").removeClass("foucsClass").addClass("errorClass")),
														!1;var t=/^[0-9]{6}$/;
														return t.test(r)?($("#zip_code_error").html(""),
																$("#zip_code").removeClass("foucsClass"),
																!0):(e&&($("#zip_code_error").html("请输入真实邮编号码"),
																		$("#zip_code").removeClass("foucsClass").addClass("errorClass")),
																		!1)
																		},
																		d=function(e){
																			var i=$.trim($("#receipt").val()),
																			r=$("#hidden_receipt_type").val();
																			return"1"==r?!0:0==i.length?(e&&($("#receipt_error").html("必填"),
																					$("#receipt").removeClass("foucsClass").addClass("errorClass")),
																					!1):i.length>50?(e&&($("#receipt_error").html("请输入真实公司名称"),
																							$("#receipt").removeClass("foucsClass").addClass("errorClass")),
																							!1):($("#receipt").removeClass("foucsClass"),!0)
																					};
								$(".able").live({
									mouseenter:function(){
										$(this).addClass("able_hover")
									},
									mouseleave:function(){
										$(this).removeClass("able_hover")
									}
								}),
								$("#submit").click(
										function(){
											check_pass_port();
											var e="0"==$("#hidden_product").val()?!1:!0,i="0";
											if(0==i){
												var r=s(!0),
												t=d(!0),
												a=n(!0),
												c=o(!0),
												_=l(!0);
												e&&r&&c&&_&&a&&t&&document.getElementById("order_form").submit()
											}else{
												var h=$.trim($("#hidden_store").val()),
												r=s(!0),
												c=o(!0),
												_=l(!0);
												e&&r&&c&&""!=h&&_&&document.getElementById("order_form").submit()
											}}),
								$("#recipient").blur(function(){
									s(!0)
								}),
								$("#mobile_phone").blur(function(){
									o(!0)
								}),
								$("#address_detail").blur(function(){
									l(!0);
									var e="0",
									i=$("#hidden_province").val();
									if("0"==e){
										if("undefined"!=typeof municipalities[i])
											var r=$("#city").html()+$("#area").html()+$("#address_detail").val();
										else if("undefined"==typeof autonomousregion[i])
											var r=$("#province").html()+"省"+$("#city").html()+$("#area").html()+$("#address_detail").val();
										else
											var r=$("#province").html()+$("#city").html()+$("#area").html()+$("#address_detail").val();
										$("#hidden_address").val(r)}}),
										$("#zip_code").blur(function(){n(!0)}),
										$("#receipt").blur(function(){
											var e=$.trim($("#recipient").val()),
											i=$.trim($("#receipt").val());
											e!=i&&(receipt_modify=!1),
											d(!0)}),
										$("input").focus(function(){
											var e=$(this).attr("type");
											if("button"==e)
												return!0;
											var i="#"+$(this).attr("id")+"_error";
											$(this).removeClass("errorClass").addClass("foucsClass"),
											$(i).html("")}),
											$("#address_detail").focus(function(){
												var e="#"+$(this).attr("id")+"_error";$(this).removeClass("errorClass").addClass("foucsClass"),
												$(e).html("")}),
												$("#recipient").keydown(function(e){
													return 32==e.which?!1:void 0
															}),
															$("#mobile_phone").keydown(function(e){
																if(32==e.which)
																	return!1;
																if(9==e.which){
																	var i=$("#mobile_phone").val(),
																	r=$("#province").html();
																	""!=i&&"省份 / 直辖市"==r&&$("#province").click()}}),
																	$("#address_detail").keydown(function(e){
																		return 32==e.which?!1:13==e.which?!1:void 0}),
																		$("#zip_code").keydown(function(e){
																			return 32==e.which?!1:void 0}),
																			$("#version_0").click()
															});















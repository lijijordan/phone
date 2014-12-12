
;(function(){
	"use strict";
	
	var DetailUtil = {
		getCookie:function(c_name){		// 获得 cookie 的值
			if(document.cookie.length>0){
				c_start=document.cookie.indexOf(c_name + "=")
				if(c_start!=-1){
					c_start=c_start + c_name.length+1
					c_end=document.cookie.indexOf(";",c_start)
					if(c_end==-1) c_end=document.cookie.length;
					return unescape(document.cookie.substring(c_start,c_end))
				}
			}
			return ""
		},
		setCookie:function(name,value){	// 写cookies		neme是key   value 是值
			var Days	= 30;
			var exp		= new Date();
			exp.setTime(exp.getTime() + Days*24*60*60*1000);
			document.cookie = name + "="+ escape (value) + ";path=/;expires=" + exp.toGMTString();
		},
		delCookie:function(name){	//删除cookies
			var exp 	= new Date();
			exp.setTime(exp.getTime() - 1);
			var cval	= $1.getCookie(name);
			if(cval!=null){
				document.cookie	= name + "="+cval+";path=/;expires="+exp.toGMTString();
			}
		} 
	}

	// 购物车
	function showCar(){
		
	}
	
	
	
	//
	var sitUrl=window.location.href,
		index=sitUrl.indexOf("#"),
		initLen = 0,
		productData=new Array(); // len > 3
	if(index>0){
		productData = sitUrl.substr(index+1).split('-'); 
		initLen = productData.length;
	}
	
	var SITE_URL = SITE_URL || "http://store.meizu.com";
	//
	var Detail = function(config){
		config = config || {};
		config.data = localData; // - test
		
		this.sltMain = $("#selectMain");
		this.btns = ["缺&nbsp;&nbsp;&nbsp;&nbsp;货","售&nbsp;&nbsp;&nbsp;&nbsp;罄", "即将发售","	];
		this.setAddNum();
		this.addEvts();
		this.initRoot(config.data);
	};
	
	Detail.prototype = {
		//（0:前黑后白，1:纯白，2:银翼）
		initConfig: function(){
			this.color = {};
			
		},
		// 颜色选项
		initRoot: function(roots){
			if(!roots || roots.length == 0) return;
			
			var _this = this,
				compiled,
				children,
				colorTpl = $("#colorTpl").html(),
				colorWrap = $("#colorWrap");
				
			compiled = _.template(colorTpl);
			colorWrap.append(compiled({colors:roots}));
			children = colorWrap.children();
			children.hover(function(){
				$(this).addClass("pro_selt_p")
			},function(){
				$(this).removeClass("pro_selt_p");
			});
			// 点击颜色，切换模板
			children.click(function(){
				var o = $(this);
				
				children.removeClass("pro_selt");
				o.addClass("pro_selt");
				_this.colorHandler(roots[o.attr("data-index")]);
			});
			if(productData.length > 0){
				_.each(children,function(child){
					var flag = $(child).attr("data-flag");
					if(flag == productData[0]){
						$(child).trigger("click");
					}
				});
			}else{
				$(children[0]).trigger("click");
			}
		},
		// scope: this
		colorHandler: function(color){
			var _this = this,
				vers = color.activeType, // 版本集
				verTpl = $("#verTpl").html(),
				verWrap = $("#verWrap"), 
				compiled, children;
			
			compiled = _.template(verTpl);
			verWrap.empty()
			verWrap.append(compiled({vers:vers}));
			children = verWrap.children();
			
			children.click(function(){
				var o = $(this);
				children.removeClass("ver_selt");
				o.addClass("ver_selt");
				_this.verHandler(vers[o.attr("data-index")]);
				
			});
			if(productData.length > 0){
				_.each(children,function(child){
					var flag = $(child).attr("data-flag");
					if(flag == productData[1]){
						$(child).trigger("click");
					}
				});
			}else{
				$(children[0]).trigger("click");
			}
		},
		//
		verHandler: function(ver){
			var _this = this;
			if(ver.flag == 3 && ver.SaleType){
				_this.capHandler(ver);
			}else{
				$("#saleWrap").parent().parent().hide("fast");
				_this.saleHandler(ver);
				_this.tabOne.trigger("click");
				_this.tabTwo.off();
				_this.tabTwo.html("&nbsp;");
				_this.tabTwo.addClass("unpointer");
			}
		},
		//
		saleHandler: function(ver){
			var _this = this,
				caps = ver.capacity, //容量集
				capTpl = $("#capTpl").html(),
				capWrap = $("#capWrap"), 
				compiled, 
				children, 
				i,stock;
			
			compiled = _.template(capTpl);
			capWrap.empty()
			capWrap.append(compiled({caps:caps}));
			children = capWrap.children();
			
			var fChild; 
			// 循环处理
			for(i=0;i < children.length;i++){
				stock = $(children[i]).attr("data-stock");
				if(stock > 0){
					if(!fChild){
						fChild = children[i];
					}
					$(children[i]).click(function(){
						children.removeClass("cap_selt");
						$(this).addClass("cap_selt");
						_this.toggleCap.call(this,_this,caps);
					});
				}
			}
			if(!fChild){
				_this.toggleCap.call(children[0],_this, caps);		
			}
			if(productData.length > 0){
				_.each(children,function(child){
					var flag = $(child).attr("data-flag");
					if(flag == productData[productData.length ==3 ? 2:3]){
						if($(child).attr("data-stock") < 1){
							$(fChild).trigger("click");
						}else{
							$(child).trigger("click");
						}
					}
				});
			}else{
				$(fChild).trigger("click");
			}
		},
		toggleCap: function(_this,caps){
			var o = $(this), cap = caps[o.attr("data-index")],
				tip = $(".pro_num_tip"),
				priceView = $("#price");
			_this.bugNum.html("1");
			_this.num = 1;
			this.cap = cap;
			if(cap.ISOldPrice == 1 && cap.Price < cap.OldPrice){
				priceView.find(".older").html("￥" + cap.OldPrice);
				priceView.find(".newer").html("￥" + cap.Price);
			}else{
				priceView.find(".older").html("");
				priceView.find(".newer").html("￥" + cap.Price);
			}
			if(cap.FittingsText){
				$("#fittingText").html(cap.FittingsText);
			}else{
				$("#fittingText").html("");
			}
			if(cap.Gift){
				$(".gift_info").html(cap.Gift);
			}else{
				$(".gift_info").html("");
			}
			_this.maxBuyNum = cap.MaxBuy;
			if(_this.maxBuyNum == 0){
				_this.maxBuyNum = 100000;
				tip.hide();
			}else{
				tip.show();
				tip.find("span").html(_this.maxBuyNum);
			}
			//切换图片
			_this.setSlide(cap.DetailImage);
			//
			_this.setBtns(cap);
		},
		//
		capHandler: function(cap){
			var _this = this,
				sales = cap.SaleType,
				saleTpl = $("#saleTpl").html(),
				saleWrap = $("#saleWrap"), 
				compiled, 
				children, 
				i,stock;
			
			compiled = _.template(saleTpl);
			saleWrap.empty()
			saleWrap.append(compiled({sales:sales}));
			saleWrap.parent().parent().show("fast");
			children = saleWrap.children();
			children.click(function(){
				var o = $(this), sale = sales[o.attr("data-index")],
					ids=["zeroWrap","costWrap"];
				children.removeClass("ver_selt");
				o.addClass("ver_selt");
				_this.tabTwo.off();
				_this.tabTwo.removeClass("unpointer");
				_this.tabTwo.click(_this.tabHandler);
				_this.tabTwo.attr("data-model",ids[o.attr("data-index")]);
				_this.tabTwo.trigger("click", [sale.name]);
				_this.saleHandler(sale);
			});
			if(productData.length > 0){
				_.each(children,function(child){
					var flag = $(child).attr("data-flag");
					if(flag == productData[2]){
						$(child).trigger("click");
					}
				});
			}else{
				$(children[0]).trigger("click");
			}
		},
		tabHandler: function(evt, name,id){
			var id = $(this).attr("data-model");
			var tabOne = $(".detail_head").children().eq(0);
			$("#costWrap").hide();
			$("#zeroWrap").hide();
			if(name != "&nbsp;"){
				$(this).addClass("cur");
				tabOne.removeClass("cur");
				$("#dtlInfoView").hide();
				$("#"+ id).show();
				$(this).html(name);
			}else{
				$(this).html("&nbsp;");
				tabOne.trigger("click");
				$("#"+ id).hide();
			}
		},
		addEvts: function(){
			var _this = this,
				tabOne = $(".detail_head").children().eq(0),
				tabTwo = $(".detail_head").children().eq(1),
				buyBtn = $("#buyBtn"),
				addBtn = $("#addBtn");
				
			tabOne.click(function(){
				$(this).addClass("cur");
				tabTwo.removeClass("cur");
				$("#dtlInfoView").show();
				$(".zero_wrap").hide();
			});
			this.tabOne = tabOne;
			this.tabTwo = tabTwo;
			
			buyBtn.click(function(){
				_this.buyHanlder();
			});
			
			addBtn.click(function(){
				// 加入购物车
				var url = SITE_URL + "/cart/add_cart";
				_this.postHanlder(url, 0);
			});
		},
		buyHanlder: function(){
			var url = SITE_URL + "/order/buy_now",
				capWrap = $("#capWrap"); //data-stock
			var stock = capWrap.find(".cap_selt").attr("data-stock");
			if(stock > 0){
				this.postHanlder(url, 1);	
			}
			
		},
		postHanlder: function(url, buy_type){
			var _this = this,
				capWrap = $("#capWrap"),
				product_ext,
				buy_count,
				url;
			url = url + "?_dc=" + new Date().getTime();
			var selt = capWrap.find(".cap_selt");
			product_ext = selt.attr("data-id");
			var btnType = selt.attr("data-btn");// data-btn
			buy_count = this.bugNum.html();
			buy_count = parseInt(buy_count);
			buy_count = isNaN(buy_count) ? 1 : buy_count;
			
			var stock = selt.attr("data-stock");
			stock = parseInt(stock);

			if(buy_count > stock) {
				$("#errorTip").html('库存不足').show();
				return false;
			}

			// 获取cookie
			var cart_val_arr = {};
			for(i = 0 ; i <= 5; i++){
				var cart_val = Common.getCookie('mz_cart' + i);    // 产品信息
				if(cart_val != 'null'){
					var cart_val_arr2 = $.parseJSON(cart_val);
					try {
						for(var key in cart_val_arr2){
							cart_val_arr[key] = cart_val_arr2[key];
						}
					}catch(error){
						cart_val_arr = $.parseJSON(cart_val);
					}
				}
			}
			var ext_count = 0; // 当前购买的商品总数
			try {
				for(var key in cart_val_arr){
					if(base64decode(cart_val_arr[key]['IsContract']) == 1) {
						$("#errorTip").html('联通合约机不能与其他产品一起购买，请先删除购物车里的联通合约机产品').show();
						return false;
					}
					if(base64decode(cart_val_arr[key]['JoinSwap']) == 1) {
						$("#errorTip").html('购物车里有M8换购产品，请先删除购物车里的M8换购产品！').show();
						return false;
					}
					var current_ext = base64decode(cart_val_arr[key]['ID']);
					current_ext = parseInt(current_ext);
					if(current_ext == product_ext) {
						var cart_ext_num = cart_val_arr[key]['number'];
						cart_ext_num = parseInt(cart_ext_num);
						ext_count += cart_ext_num;
					}
				}
			}catch(error){
			}

			if(ext_count + buy_count > _this.maxBuyNum) {
				$("#errorTip").html('该产品超出最大购买数量!').show();
				return false;
			}
			
			if(_this.has_package()) {
				// set cookie
				Common.setCookie('buy_type', buy_type);
				Common.setCookie('buy_count', buy_count);
				window.location.href = SITE_URL + "/select_package/" + product_ext + '.html';
				// 解决IE6下不能跳转
				if(window.event) window.event.returnValue = false;
				return false;
			}
			$.ajax({
				url: url,
				dataType: 'json',
				data: {product_ext: product_ext, buy_count: buy_count},
				type: 'post',
				success: function(data){
					if(data && data.status == 1){
						window.location.href = data.data;
					}else{
						$("#errorTip").hide();
						if(data.error =='not_stock'){
							var buyBtn = $("#buyBtn"),
								addBtn = $("#addBtn");
							buyBtn.removeClass("bug_btn").addClass("less_btn");
							addBtn.hide();
							buyBtn.html(_this.btns[btnType]);
						}else{
							$("#errorTip").html(data.error).show();
						}
					}
				},
				error: function(){
					alert("服务繁忙。。。")
				}
			});
		},
		has_package: function(){
			var package_id = $("#capWrap").find(".cap_selt").attr('data-package');
			return package_id != "" ? true : false;
		},
		setBtns: function(cap){
			$("#errorTip").hide(); // 隐藏提示
			var stock = cap.Stock,
				buybtn = cap.BuyBtn,
				word = '',
				buyBtn = $("#buyBtn"),
				addBtn = $("#addBtn");
			
			if (stock <= 0) {
				buyBtn.removeClass("bug_btn").addClass("less_btn");
				addBtn.hide();
				word = this.btns[buybtn];
			} else {
				if($('#verWrap .ver_selt').attr("data-flag")==3){
					word='选择号码套餐';
					$('#addBtn').hide();
				}else{
					$('#addBtn').show();
					word = '立即购买';
				}
				buyBtn.removeClass("less_btn").addClass("bug_btn");     
			}
			
			buyBtn.html(word);
			
		},
		setSlide: function(imgs){
			// imgs []
			//console.log(imgs);
			var index = 0,
				sev,
				slideWrap = $("#slideWrap").children(),
				i,
				count=0,
				len = slideWrap.length,
				highLight = $("#highLight").children();
			
			
			for(i=0;i<len;i++){
				
				if($.trim(imgs[i])!='') {
					count++;
					$(slideWrap[i]).css("background-image","url("+ imgs[i] +")");
					$(highLight[i]).show();
				}else{
					$(slideWrap[i]).css("background-image","url("+ imgs[i] +")");
					$(highLight[i]).hide();
				}
			}
			
			if(count<=1) $("#highLight li").hide();
			highLight.removeClass("cur").eq(0).addClass("cur");
			slideWrap.hide();
			slideWrap.eq(0).show();
			
			function loop(){
				index = $(this).attr("data-index");
				slideWrap.filter(":visible").fadeOut(200).parent().children().eq(index).fadeIn(500);
				highLight.removeClass("cur").eq(index).addClass("cur");
			}
			highLight.off();
			highLight.on("click",loop);
			
			//highLight[0].click();
			//sev = setInterval(showCur, 2000);
			/*
			slideWrap.hover(function(){
				clearInterval(sev);
			},function(){
				sev = setInterval(showCur, 2000);
			});
			*/
			function showCur(){
				index++;
				if(index >= len) index = 0;
				highLight.eq(index).trigger("click");
			}
		},
		setAddNum: function(){
			var _this = this,
				addWrap = $(".pro_add_wrap"),
				ipt = addWrap.find(".input");
			_this.maxBuyNum = 5;
			_this.num = 1;
			this.bugNum = ipt;  //maxBuyNum
			addWrap.find(".pro_add").click(function(){
				var selt = $("#capWrap").find(".cap_selt");
				if(selt.length == 0){
					return;
				}
				ipt.html(++_this.num > _this.maxBuyNum? _this.num=_this.maxBuyNum: _this.num);
				setPrice(selt[0].cap, _this.num);
			}); 
			
			addWrap.find(".pro_minus").click(function(){
				var selt = $("#capWrap").find(".cap_selt");
				if(selt.length == 0){
					return;
				}
				ipt.html(--_this.num < 1? _this.num=1: _this.num);
				setPrice(selt[0].cap, _this.num);
			});
			
			function setPrice(cap, num){
				var priceView = $("#price"), 
					price, cap;
				
				if(cap.ISOldPrice == 1 && cap.Price < cap.OldPrice){
					priceView.find(".older").html("￥" + cap.OldPrice);
					priceView.find(".newer").html("￥" + cap.Price);
				}else{
					priceView.find(".older").html("");
					priceView.find(".newer").html("￥" + cap.Price);
				}
			}
		}
	}
	
	// dom 加载完
	$(function(){
		// 创建详情实例
		new Detail();
	});
})();

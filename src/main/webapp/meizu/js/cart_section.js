/**
 * cart javascript
 * @authors caiaolin
 * @date    2014-08-07 09:33:48
 * @version $Id$
 */

Cart = {
    CART_HEAD_COUNT:5,
    init: function(){
        if(Common.checkLogin()) {
			var rand = 1000000 * Math.random();
			$.get('/order/get_non_payment_order/'+rand, {} , function(data){
				if( parseInt(data['code']) == 200 ){    // 成功
					$('#store_order_number').text(data['value']);
				}
			},"json");
			
            $(".my_order_link").show();
            $(".search_order_link").hide();
        }else{
            $(".my_order_link").hide();
            $(".search_order_link").show();
        }

        // 购物车
        var html = "";
        var sum = 0;
        var cart_val_arr = {};
        for(i = 0 ; i <= 5; i++){
            var cart_val = Common.getCookie('mz_cart' + i);    // 产品信息
            if(cart_val != 'null'){
                var cart_val_arr2 = $.parseJSON(cart_val);
                for(key in cart_val_arr2){
                    cart_val_arr[key]   = cart_val_arr2[key];
                }
            }
        }
        for(key in cart_val_arr){
            sum++;
        }
        if(sum == 0){ // 如果没有数据就去服务器取
            this.get_server_cart();
            return ;
        }else{
            var n = 0;
            for(key in cart_val_arr){
                if(!(n < sum - Common.CART_HEAD_COUNT)){
					SN = utf8to16( base64decode(cart_val_arr[key]['SN']));
					CartIMG = utf8to16( base64decode(cart_val_arr[key]['CartIMG']));
			 		product_name = utf8to16( base64decode(cart_val_arr[key]['product_name']));
					VerName = utf8to16( base64decode(cart_val_arr[key]['VerName']));
					var select_package = utf8to16( base64decode(cart_val_arr[key]['SelectPackage']));

                    str_html = '<ul class="buy_car_list">';
                    str_html += ' <li><a href="'+SITE_URL+'/product/'+SN+'.html'+'" target="_blank"><img src="'+ CartIMG +'" width="77" height="77"/></a></li>';
                    str_html    += '<li class="item_info">';
                    str_html += '<h2><a href="'+SITE_URL+'/product/'+SN+'.html'+'" target="_blank">'+ VerName +'</a></h2>';
                    // str_html += '<h3>'+ VerName +'</h3>';
                    str_html += '<span>¥ '+ cart_val_arr[key]['Price'] +' X '+ cart_val_arr[key]['number'] +'</span>'
                    // str_html    += '        <h5><a href="'+SITE_URL+'/product/'+SN+'.htm'+'">'+product_name+'&nbsp;('+VerName+')</a></h5>';
                    str_html += '</li>';
                    str_html += '<li class="right"><a href="javascript:void(0);" data-cart="'+ key +'" data-num="'+ cart_val_arr[key]['number'] +'" data-packageid="'+ select_package +'" class="del_btn">删除</a></li>'
                    str_html += '</ul>';
                    html += str_html;
                }
                n++;
            }
            this.assign_cart(html, sum);
        }
    },
    get_server_cart:function(){
        var _self = this;
        if(document.cookie.length<=0){  // cookie 没有数据 才能去服务器去取
            $.get('cart/get_static',{aa:'aa'} , function(data){
                arr = $.parseJSON(data);
                data_arr = arr['data'];
                // 购物车的数据
                _self.cart_assign(data_arr['cart']['html'] , data_arr['cart']['sum']);
            });
        }
    
    },
    assign_cart: function(html, sum){
        
        sum = parseInt(sum);
        $("#cart_num").text(sum);
        var cart_list = $(".buy_car_list");

        if(sum <= 0) {

        }else{
            // 有数据
            if(cart_list.length <= 0) {
                $(".buy_car_wrap").children('p').remove();
            }else{
                cart_list.remove();
            }
            $(".buy_car_link").before(html);
        }
    }
};
$(document).ready(function(){

    Cart.init();

    $(".buy_car_list .del_btn").click(function(){
        var self = $(this);
        var del = self.attr('data-cart');
        if(del == '' || del == undefined) {
            return false;
        }
        var num = self.attr('data-num');
        num = parseInt(num);
        num = isNaN(num) ? 1 : num;

        var package_id = self.attr('data-packageid');
        package_id = parseInt(package_id);

        var rand = 1000000 * Math.random();
        $.get('cart/del?v='+rand, {del:del,num: num,package_key: 'all',package_id:package_id} , function(data){
            if( parseInt(data['status']) == 1 ){    // 成功
                self.parent().parent('.buy_car_list').remove();
                if($(".buy_car_list").length <= 0) {
                    $(".buy_car_wrap > .buy_car_hd").after('<p>您的购物车中还没有商品，快选购吧！</p>')
                }
                var cart_num_ele = $("#cart_num");
                var cart_num = cart_num_ele.text();
                cart_num = parseInt(cart_num);
                cart_num -= 1;
                cart_num = cart_num < 0 ? 0 : cart_num;
                cart_num_ele.text(cart_num);
            }
        },"json");
    });

    $("#bugCarBtn").mouseenter(function(){
        var wrap = $(this).find(".buy_car_wrap");
        var display = wrap.css("display");
        if(display == "none"){
            wrap.animate({
                height:"toggle",
                opacity: "toggle"
            });
        }
    });

    $("#bugCarBtn").mouseleave(function(){
        var wrap = $(this).find(".buy_car_wrap");
        var display = wrap.css("display");
        if(display == "block") {
            wrap.animate({height:"toggle",duration:50,opacity: "toggle"});
        }
        
    });

});

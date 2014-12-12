/**
 * 套餐选择js
 * @authors caiaolin
 * @date    2014-08-15 09:27:18
 * @version $Id$
 */

var SITE_URL = SITE_URL || "http://store.meizu.com";

var ProductPackage = function(){
    this.init();
    this.addEvent();
};

ProductPackage.prototype = {
    init: function(){
        this.product_ext = $("#product_ext").val();
        this.product_ext = parseInt(this.product_ext);
    },
    addEvent: function(){
        var buy_type = Common.getCookie('buy_type');
        buy_type = (buy_type == undefined || buy_type == '') ? 1 : buy_type;
        var buy_count = Common.getCookie('buy_count');
        buy_count = parseInt(buy_count);
        buy_count = isNaN(buy_count) ? 1 : buy_count;
        buy_count = buy_count <= 0 ? 1 : buy_count;
        var self = this;

        // 不选购套餐
        $("#nothing").click(function(){
            var url = buy_type == 1 ? SITE_URL + "/order/buy_now" : SITE_URL + "/cart/add_cart";
            url = url + "?_dc=" + new Date().getTime();
            $.ajax({
                url: url,
                dataType: 'json',
                data: {product_ext: self.product_ext, buy_count: buy_count},
                type: 'post',
                success: function(data){
                    if(data && data.status == 1){
                        window.location.href = data.data;
                    }else{
                        self.show_msg(data.error);
                    }
                },
                error: function(){
                    alert("服务繁忙。。。")
                }
            });
        });

        // 选购套餐
        $(".buy").click(function(){
            var select_package = $(this).attr("data-package");
            select_package = parseInt(select_package);

            var product_list = '';
            $(this).siblings('.product_area').find('input:hidden[name="package_product[]"]').each(function(){
                var temp_id = $(this).val();
                if(temp_id == '' || temp_id == undefined) {
                    return false;
                }
                product_list += temp_id + ',';

            });

            product_list = product_list != '' ? product_list.substr(0, product_list.length - 1) : product_list;

            var product_name = '';
            $(this).siblings('.product_area').find('input:hidden[name="product_name[]"]').each(function(){
                var temp_name = $(this).val();
                if(temp_name == '' || temp_name == undefined) {
                    return false;
                }
                product_name += temp_name + ',';

            });

            product_name = product_name != '' ? product_name.substr(0, product_name.length - 1) : product_name;

            if(select_package == 0 || isNaN(select_package)) {
                self.show_msg('获取套餐数据失败，请稍后重试!');
                return false;
            }
            var url = buy_type == 1 ? SITE_URL + "/product_package/add" : SITE_URL + "/cart/add_cart";
            $.ajax({
                url: url,
                dataType: 'json',
                data: {product_ext: self.product_ext, buy_count: buy_count, select_package: select_package,product_list: product_list,
                    product_name: product_name},
                type: 'post',
                success: function(data){
                    if(data && data.status == 1){
                        window.location.href = data.data;
                    }else{
                        self.show_msg(data.error);
                    }
                },
                error: function(){
                    alert("服务繁忙。。。")
                }
            });
        });
        
        // 选择其它颜色
        $(".version").click(function(){
            var name = $(this).attr('data-version');
            var img = $(this).attr('data-img');
            var ext_id = $(this).attr('data-ext');
            ext_id = parseInt(ext_id);

            $(this).siblings('a').removeClass('current');
            $(this).addClass('current');
            if(name != '') {
                $(this).parent().siblings('p').text(name);
                $(this).parent().siblings('input:hidden[name="product_name[]"]').val(name);
            }
            if(img != '') {
                $(this).parent().siblings('.product_img').children('img').attr('src', img);
            }
            if(!isNaN(ext_id) && ext_id > 0) {
                $(this).parent().siblings('input:hidden[name="package_product[]"]').val(ext_id);
            }

        });

    },
    show_msg: function(msg){
        var msg_box = $("#msg_box").clone();
        msg_box.children('p').text(msg);
        $.modal(msg_box,{fixed: true,closeHTML: ''});
    }
}

$(document).ready(function(){
   new ProductPackage(); 
});
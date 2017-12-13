import '@/css/index.less'
import "@/js/utils/Api.js"


var page = {
	init:function(){
		var _this=this;
		this.getData();
		setInterval(function(){
			_this.getData();
		},10000)
	},
	getData:function(){
		Api.getBtc({},function(ret){
			console.log(ret);
			$("h1").eq(0).find("span").html(ret.data.btc_cny);
			$.get("https://www.bit-z.com/api_v1/ticker?coin=gxs_btc", function(result){
				const price = Number(result.data.buy*ret.data.btc_cny).toFixed(2);
				document.title = result.data.buy +"(￥"+ price + ")";
				$("h1").eq(1).find("span").html(result.data.buy +"(￥"+ price + ")");
		  	});
		});
	}
}
page.init();


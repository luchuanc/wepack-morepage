(function(){
	var url = "https://www.bit-z.com";
	var ajax = function(method, data, callback) {
		console.log("API call: " + method, JSON.stringify(data));
		$.ajax({
			url : url + method, //接口url
			type : "POST",
			data : data,
			dataType : "json",
			success : function(ret) {
				callback && callback(ret);
			},
			error : callback
		});
	};

	window.Api = {
		getBtc:function(data,callback){
			ajax("/ajax/exchangeRate",data,callback);
		},
		getGxs:function(data,callback){
			ajax("/api_v1/ticker",data,callback);
		}
	}
})();
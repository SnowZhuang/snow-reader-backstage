/**
 * 修改
 */
$.ajax({
	"url":"/snow-reader/categorys/5",
	"method":"put",
	"data":{
		"categoryName":"科技2"
	}
});

/**
 * 新增
 */var category = {
		"categoryName":"科技2"
	};
$.ajax({
	"url":"/snow-reader/categorys",
	"method":"post",
	"data":{
		"categoryName":"科技2"
	}
});

/**
 * 删除
 */
$.ajax({
	"url":"/snow-reader/categorys/6",
	"method":"delete"
})
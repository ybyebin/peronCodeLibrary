var layuiForm;
layui.use(['layer', 'form', 'jquery'], function() {
	var layer = layui.layer;
	var form = layui.form;
	layuiForm = layui.form;
	var layerHeader = 'font-size:18px;color:#fff;background:#3E4687;border:none;height:50px;font-weight:bold;line-height:50px;padding-left:10px'
		// var upload = layui.upload;
		// var $ = layui.jquery;
	// form.on('checkbox(nodecheck)', function(data) {
	// 	var node_id = Number(data.value);
	// 	if (data.elem.checked) {
	// 		nodeVue.arrDelNode.push(node_id);
	// 	} else {
	// 		var indexs = nodeVue.arrDelNode.indexOf(node_id);
	// 		nodeVue.arrDelNode.splice(indexs, 1);
	// 	}
	// 	console.log(JSON.stringify(nodeVue.arrDelNode, null, 2))
	// });



	var nodeVue = new Vue({
		el: '#app',
		data: {
			proID: 1,
			proLogo: '',

		},
		mounted: function() {
			var _this = this;
			this.$nextTick(function() {
			

			});

		},
		methods: {
			// 工程信息
			projectInfo: function() {
				var _this = this;
				$.ajax({
					url: apiurl + 'project',
					type: 'get',
					dataType: 'json',
					success: function(data) {
						if (data.success) {
							var data = data.data;
							console.log(JSON.stringify(data, null, 2));
							_this.proID = data.id;
							_this.proLogo = data.logo_path;
						} else {
							layer.msg(data.error_message);
						}
					},
					error: function(data) {
						layer.msg(data.error_message);
						returnLogIn(data);
					}
				});
			},
		}
	});

});

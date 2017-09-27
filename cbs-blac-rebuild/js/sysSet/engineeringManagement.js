var $;
layui.use(['layer', 'form', 'jquery', 'upload'], function() {
	var layer = layui.layer;
	var form = layui.form;
	var upload = layui.upload;
	$ = layui.jquery;

	// 选择语言
	form.on('select(filter)', function(data) {
		enManagementVue.language = data.value;
		console.log(enManagementVue.language);
	});
	//普通图片上传
	var uploadInst = upload.render({
		elem: '#upLoadImg',
		url: '/upload/',
		before: function(obj) {
			console.log(obj)
				//预读本地文件示例，不支持ie8
			obj.preview(function(index, file, result) {
				console.log(result)
					// $('#demo1').attr('src', result); //图片链接（base64）
			});
		},
		done: function(res) {
			layer.msg(123)
				// //如果上传失败
				// if(res.code > 0){
				//   return layer.msg('上传失败');
				// }
				//上传成功
		},
		error: function() {

		}
	});
});



var enManagementVue = new Vue({
	el: '#app',
	data: {
		isEdit: false,
		showProName: '智能建筑管理系统',
		showProLanguage: '中文',
		proName: '',
		isRightName: false,
		warnStr: '', //警告内容
		language: '1',

	},
	mounted: function() {},
	methods: {
		edit: function() {
			this.isEdit = !this.isEdit;

			enManagementVue.language = '3';
			$('#sel-labguage').val(enManagementVue.language);
			layui.form.render('select');
		},
		cancelEdit: function() {
			this.isEdit = !this.isEdit;
		},
		saveProMsg: function() {
			layer.msg('保存')
		},
		/**
		 * [判断字符串是否合法 -提示]
		 * @param {[type]} val [字符串]
		 * return 1:字符串为空 2：不合法 3:字符超出限制 4：合法
		 */
		RegeMatch: function(val) {
			var pattern = new RegExp(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5\-_]/g);
			if (val == '') {
				return 1;
			} else if (pattern.test(val)) {
				return 2;
			} else if (val.replace(/[^\x00-\xff]/g, "**").length > 20) {
				return 3;
			} else {
				return 4;
			}
		},
		proNameOnInput: function() {
			this.isRightName;
			var isRightInput = this.RegeMatch(this.proName);
			switch (isRightInput) {
				case 1:
					this.isRightName = true;
					this.warnStr = '不能为空';
					break;
				case 2:
					this.isRightName = true;
					this.warnStr = '输入不合法';
					break;
				case 3:
					this.isRightName = true;
					this.warnStr = '字符超出限制';
					break;
				case 4:
					this.isRightName = false;
					break;
				default:
					break;
			}
		},
		proNameOnBlur: function() {
			this.proNameOnInput();
		}
	}
});
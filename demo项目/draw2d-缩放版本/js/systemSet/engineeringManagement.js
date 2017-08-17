$(function() {
	ProjectFun.init();
	ProjectFun.getProjectMessage();
});
var $pro = {
	 pro_name_input : $('.obj-name-input'),
	 obj_name_text : $('.obj-name-text'),
	 logo_img: $('#logo-img'),
	 logo_main_img : $('#logo-main-img'),
	 pro_main_management : $('#project-main-management'), //展示框
	 pro_edit_management : $('#project-edit-management'), //编辑框
	 pro_btn_save : $('#project-btn-save'), //保存按钮
	 obj_btn_upLogo : $('#obj-btn-upLogo'),
	 warn_span : $('.warn_span'), //输入警告
	 instructions : $('.instructions'), //提示内容
	 language_text : $('.language-text'),
	 select_language : $('.select-language'),
	 loading : $('.loading'),
}



var ProjectFun = {
	init: function() {
		$('.obj-name-input').on('input', function() {
			$pro.instructions.show();
			$pro.warn_span.hide().text('');
			RegeMatch($(this), $pro.warn_span, $pro.instructions);
			if ($pro.pro_name_input.val() == '' && $pro.warn_span.text() == '') {
				$pro.instructions.hide();
				$pro.warn_span.show().text('不能为空')
			}
			if ($pro.warn_span.text() == '') {
				var num = chEnWordCount($pro.pro_name_input.val());
				if (num > 20) {
					$pro.instructions.hide();
					$pro.warn_span.show().text('字符超出限制');
				}
			}
		});

		$('.obj-name-input').blur(function() {

			if ($pro.warn_span.text() == '') {
				if ($pro.pro_name_input.val() == '') {
					$pro.instructions.hide();
					$pro.warn_span.show().text('不能为空');

				} else {
					var num = chEnWordCount($pro.pro_name_input.val());
					if (num > 20) {
						$pro.instructions.hide();
						$pro.warn_span.show().text('字符超出限制');
					}
				}
			}

		});
	},
	edit: function() {
		$pro.pro_name_input.val($pro.obj_name_text.text());
		$pro.logo_img.attr('src', $pro.logo_main_img.attr('src')).data('url', $pro.logo_main_img.attr('src'));
		$pro.pro_main_management.hide();
		$pro.pro_edit_management.show();
	},
	save: function() {
		if ($pro.pro_name_input.val() != '' && $pro.warn_span.text() == '') {
			$.ajax({
				url: apiurl + 'project',
				type: 'put',
				dataType: 'json',
				data: {
					id: Number($pro.pro_btn_save.data('id')),
					name: $pro.pro_name_input.val(),
					logo_path: $pro.logo_img.data('url'),
					locale: $pro.select_language.val()
				},
				beforeSend: function() {
					$pro.loading.show();
				},
				complete: function() {
					$pro.loading.hide();
				},
				success: function(data) {
					$pro.loading.hide();
					if (data.success) {
						layer.msg('修改成功');
						ProjectFun.getProjectMessage();
						$pro.pro_main_management.show();
						$pro.pro_edit_management.hide();
					} else {
						layer.msg(data.error_message);
						console.log('修改失败原因' + JSON.stringify(data, null, 2))
					}
				},
				error: function(data) {
					publicAjaxError(data);

				}
			});
		} else {
			layer.msg('请确认名称输入准确')
		}
	},
	cancle: function() {
		$pro.pro_main_management.show();
		$pro.pro_edit_management.hide();
	},
	// 上传图片
	upLogo: function() {
		$('#imageFileField-logo').val('').click();
	},
	// 获得工程信息
	getProjectMessage: function() {
		$.ajax({
			url: apiurl + 'project',
			type: 'get',
			dataType: 'json',
			beforeSend: function() {
				$pro.loading.show();
			},
			complete: function() {
				$pro.loading.hide();
			},
			success: function(data) {
				$pro.loading.hide();;
				if (data.success) {
					var datas = data.data;
					// 工程名称
					$pro.obj_name_text.text(datas.name);
					$pro.pro_name_input.val(datas.name);
					//工程LOGO 展示  
					$pro.logo_main_img.attr('src', datas.logo_path);
					$pro.logo_img.attr('src', datas.logo_path).data('url', datas.logo_path);
					// logo
					$('#logo').attr('src', datas.logo_path);

					//工程语言			 	
					switch (Number(datas.locale)) {
						case 1:
							$pro.language_text.text('中文');
							$pro.select_language.val('1')
							break;
						case 2:
							$pro.language_text.text('英文');
							$pro.select_language.val('2')
							break;
						case 3:
							$pro.language_text.text('日文');
							$pro.select_language.val('3')
							break;
					}
					//工程id
					$.data($('#project-btn-save')[0], 'id', datas.id);

				} else {
					layer.msg(data.error_message);
				}
			},
			error: function(data) {
				publicAjaxError(data);
			}
		});
	},
	// 上传图片
	showPreview: function(source) {
		var file = source.files[0];
		if (file == null) {
			return;
		}
		if (!/image\/\w+/.test(file.type)) {
			alert('请确保文件为图像类型');
			return false;
		}
		if (window.FileReader) {
			var fr = new FileReader();
			fr.readAsDataURL(file);

			fr.onload = function(e) {
				$.ajax({
					url: apiurl + 'fileupload',
					type: 'post',
					dataType: 'json',
					data: {
						data: e.target.result
					},
					beforeSend: function() {
						$pro.loading.show();
					},
					complete: function() {
						$pro.loading.hide();
					},
					success: function(data) {
						$pro.loading.hide();
						if (data.success) {
							console.log('查看上传返回的数据:' + JSON.stringify(data, null, 2))
							$pro.logo_img.data('url', data.data).attr('src', e.target.result);
						} else {
							layer.msg(data.error_message);
						}
					},
					error: function(data) {
						publicAjaxError(data);
					}

				})
			};
		}
	},
}
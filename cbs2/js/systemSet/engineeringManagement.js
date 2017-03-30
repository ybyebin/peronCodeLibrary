$(function() {
	getProjectMessage();
});

// 编辑按钮
$('#project-main-btn-edit').on('click', function() {
	$('#project-main-management').hide();
	$('#project-edit-management').show();
});
// 保存
$('#project-btn-save').on('click', function() {
	if ($('.obj-name-input').val() != '' && $('.project_name_div .warn_span').text() == '') {
		var projectData = {
			name: $('.obj-name-input').val(),
			logo_path: $('#logo-img').data('url'),
			locale: $('.select-language').val()
		};

		console.log("查看上传数据:"+JSON.stringify(projectData,null,2))
		$.ajax({
			url: apiurl + 'r=api/project/update',
			type: 'post',
			dataType: 'json',
			data: {
				data: JSON.stringify({
					name: $('.obj-name-input').val(),
					logo_path: $('#logo-img').data('url'),
					locale: $('.select-language').val()
				})
			},
			beforeSend: function() {
				$(".loading").show();
			},
			complete: function() {
				$(".loading").hide();
			},
			success: function(data) {
				$(".loading").hide();
				if (data.success) {
					layer.msg('修改成功');
					getProjectMessage();
					$('#project-main-management').show();
					$('#project-edit-management').hide();
				} else {
					layer.msg(data.error_message);
					returnLogIn(data.error_message);
					console.log('修改失败原因'+JSON.stringify(data,null,2))
				}
			},
			error: function(data) {
				$(".loading").hide();
				layer.msg(data.error_message);
				
			}
		});
	} else {
		layer.msg('请确认名称输入准确')
	}
});
// 取消
$('#project-btn-cancle').on('click', function() {
	$('#project-main-management').show();
	$('#project-edit-management').hide();

});
// 上传Logo
$('#obj-btn-upLogo').on('click', function() {
	$('#imageFileField-logo').click();
});

/**
 * [获得工程信息]
 * @return {[json]} [工程全部信息]
 */
function getProjectMessage() {
	var dataurl = apiurl + 'r=api/project/info';
	$.ajax({
		url: dataurl,
		type: 'post',
		dataType: 'json',
		beforeSend: function() {
			$('.loading').show();
		},
		complete: function() {
			$('.loading').hide();
		},
		success: function(data) {
			$('.loading').hide();;
			if (data.success) {
				console.log('查看数据:' + JSON.stringify(data.data, null, 2))
				// 工程名称
				$('.obj-name-text').text(data.data.name);
				$('.obj-name-input').val(data.data.name);
				//工程LOGO 展示  
				$('#logo-main-img').attr('src', data.data.logo_path);
				$('#logo-img').attr('src', data.data.logo_path);
				$('#logo-img').data('url', data.data.logo_path);

				// logo
				$('#logo').attr('src', data.data.logo_path);

				//工程语言			 	
				switch (Number(data.data.locale)) {
					case 1:
						$('.language-text').text('中文');
						$('.select-language').val('1')
						break;
					case 2:
						$('.language-text').text('英文');
						$('.select-language').val('2')
						break;
					case 3:
						$('.language-text').text('日文');
						$('.select-language').val('3')
						break;
				}
			} else {
				returnLogIn(data.error_message);
				layer.msg(data.error_message);
			}
		},
		error: function(data) {
			$('.loading').hide();
			layer.msg(data.error_message);
		}
	});
}

/**
 * [上传logo图片]
 * @return {[type]} [图片的地址]
 */
function showPreview(source) {
	var file = source.files[0];
	if (!/image\/\w+/.test(file.type)) {
		alert('请确保文件为图像类型');
		return false;
	}
	if (window.FileReader) {
		var fr = new FileReader();
		fr.readAsDataURL(file);
		fr.onload = function(e) {
			var thisUrls = apiurl + 'r=api/upload/uploadimage';
			var dataUp = {
				data: e.target.result
			}
			$.ajax({
				url: thisUrls,
				type: 'post',
				dataType: 'json',
				data: dataUp,
				beforeSend: function() {
					$('.loading').show();
				},
				complete: function() {
					$('.loading').hide();
				},
				success: function(data) {
					$('.loading').hide();
					if (data.success) {
						console.log('查看上传返回的数据:' + JSON.stringify(data.data, null, 2))
						$('#logo-img').data('url', '/' + data.data.filename);
						$('#logo-img').attr('src', e.target.result);
					} else {
						layer.msg(data.error_message);
						returnLogIn(data.error_message);
					}
				},
				error: function(data) {
					$('.loading').hide();
					layer.msg(data.error_message);
					returnLogIn(data.error_message);
				}

			})
		};
	}
}

$('.obj-name-input').on('input', function() {
	$('.instructions').show();
	$('.warn_span').hide().text('');
	RegeMatch($(this), $('.warn_span'), $('.instructions'));
	if ($('.obj-name-input').val() == '' && $('.warn_span').text() == '') {
		$('.instructions').hide();
		$('.warn_span').show().text('不能为空')
	}

	if ($('.warn_span').text() == '') {
		var num = chEnWordCount($('.obj-name-input').val());
		if (num > 20) {
			$('.instructions').hide();
			$('.warn_span').show().text('字符超出限制');
		}
	}

});

$('.obj-name-input').blur(function() {
	if ($('.warn_span').text() == '') {
		if ($('.obj-name-input').val() == '') {
			$('.instructions').hide();
			$('.warn_span').show().text('不能为空')
		} else {
			var num = chEnWordCount($('.obj-name-input').val());
			if (num > 20) {
				$('.instructions').hide();
				$('.warn_span').show().text('字符超出限制');
			}

		}
	}

});

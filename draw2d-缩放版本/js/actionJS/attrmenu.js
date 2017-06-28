$(function() {
	//颜色初始化
	var color_arr = ['#F5A623', '#7ED321', '#F57373', '#35C99D', '#000000', '#999999', '#FFFFFF', '#4A4A4A', '#03A3FC', '#DDDDDD'];
	$('.color-board').each(function(index, ele) {
		$(ele).find('li').each(function(indexs, element) {
			$(element).css('background-color', color_arr[indexs]);
		});
	});
	// checkbox初始化
	$('.ckss').iCheck({
		checkboxClass: 'icheckbox_square-green',
		radioClass: 'iradio_square-green',
		increaseArea: '20%'
	});
	projectInfo();

});

// 直线 水平
$('#horizontal').on('ifChecked', function(event) {
	if (getNode()) {
		var node = getNode();
		var arr = node.getVertices();
		console.log("直线数据:" + JSON.stringify(arr, null, 2))
		arr.data[1].y = arr.data[0].y;
		node.setVertices(arr);

		node.repaint();
	}
});

// 直线 水平
$('#vertical').on('ifChecked', function(event) {
	if (getNode()) {
		var node = getNode();
		var arr = node.getVertices();
		console.log("直线数据:" + JSON.stringify(arr, null, 2))
		arr.data[1].x = arr.data[0].x;
		node.setVertices(arr);

		node.repaint();
	}
});



/**
 * [getNode 在画布中捕获控件]
 * @return {[控件]} 
 */
function getNode() {
	if ($("#spanid").text() !== "") {
		var node = imageCanvas.getFigure($("#spanid").text());
		var nodeLine = imageCanvas.getLine($("#spanid").text());

		if (node !== null) {
			return node;
		} else if (nodeLine !== null) {
			return nodeLine;
		}

	}

}

/** 
 * @description [修改控件属性样式]  
 */


/**
 * [控件名称]
 */
$('#comp-name').on('input', function() {
	if (getNode()) {
		var node = getNode();
		node.userData.name = $('#comp-name').val();
		console.log("输入名称:" + $('#comp-name').val());
	}
});


/**
 * [控件描述]
 */
$('#comp-desc').on('input', function() {
	console.log("输入控件描述:" + $('#comp-desc').val());
	if (getNode()) {
		var node = getNode();
		node.userData.Description = $('#comp-desc').val();
	};
});



/**
 * [控件宽度]
 */
$('#comp-width').on('input', function() {
	console.log("输入控件宽度:" + $("#comp-width").val());
	if (getNode()) {
		var node = getNode();
		if (Number($('#comp-width').val()) < 5) {
			return;
		}
		if (node.isResizeable()) {
			node.setWidth($('#comp-width').val());
			node.repaint();
		} else {
			layer.msg('该控件不支持缩放');
		}



	};
});


/**
 * [控件高度]
 */
$('#comp-height').on('input', function() {
	console.log("输入控件高度:" + $("#comp-height").val());
	if (getNode()) {
		var node = getNode();
		if (Number($('#comp-height').val()) < 5) {
			return;
		}
		if (node.isResizeable()) {
			node.setHeight($('#comp-height').val());
			node.repaint();
		} else {
			layer.msg('该控件不支持缩放');
		}
	};

});


/**
 * [控件位置 X]
 */
$('#comp-offsetx').on('input', function() {
	console.log('控件位置X' + $('#comp-offsetx').val());
	if (getNode()) {
		var node = getNode();
		if (node.userData.types === 'LineComponent') {
			var arr = node.getVertices();
			arr.data[0].x = Number($('#comp-offsetx').val());
			node.setVertices(arr);
		} else {
			node.setX($('#comp-offsetx').val());
		}

		node.repaint();
	};
});


/**
 * [控件位置 Y]
 */
$('#comp-offsety').on("input", function() {
	console.log('控件位置Y' + $('#comp-offsety').val());
	if (getNode()) {
		var node = getNode();
		if (node.userData.types === 'LineComponent') {
			var arr = node.getVertices();
			arr.data[0].y = Number($('#comp-offsety').val());
			node.setVertices(arr);
		} else {
			node.setY($('#comp-offsety').val());
		}
		node.repaint();

	};
});

/**
 * [Rotation 旋转角度]
 */
$('#comp-rotation').on("input", function() {
	if (getNode()) {
		var node = getNode();
		var value = $('#comp-rotation').val();

		var thisValue = Number(value);
		if (value == "") {
			return;
		}
		if (thisValue >= -359 || thisValue <= 359) {
			node.setRotationAngle(thisValue);
			node.repaint();
		}
	}
});


/**
 * [是否显示标题 ]
 */
$('#comp-title').on('ifChanged', function(event) {

	if (getNode()) {
		layer.msg('标题')
		var node = getNode();
		if ($(this).is(':checked')) {
			console.log('选中');
			node.userData.ShowCaption = true;
			node.label.setVisible(true);
			$('#comp-title-val').removeAttr("readonly");
			node.label.setText(node.userData.Caption);
		} else {
			console.log('没');
			node.userData.ShowCaption = false;
			node.label.setVisible(false);
			$('#comp-title-val').attr("readonly", "readonly");
		}
		node.repaint();
	}
});

/**
 * [ 标题内容 ]
 */
$('#comp-title-val').on('input', function() {
	if (getNode()) {
		var node = getNode();
		node.label.setText($('#comp-title-val').val());
		node.userData.Caption = $('#comp-title-val').val();
		node.label.repaint();
	}
})

/**
 * [是否显示Hover说明]
 */
$('#comp-hover').on('ifChanged', function(event) {
	if (getNode()) {
		var node = getNode();

		if ($(this).is(':checked')) {
			node.userData.ShowHint = true;
			$('#comp-hover-val').removeAttr("readonly");
			$('#comp-hover-val').val(node.getUserData().Hint);
		} else {
			node.userData.ShowHint = false;
			$('#comp-hover-val').attr("readonly", "readonly");
			$('#comp-hover-val').val(node.getUserData().Hint);
		}
		// node.repaint();
	}
});


/**
 * [hover 内容]
 */
$('#comp-hover-val').on('input', function() {
	if (getNode()) {
		var node = getNode();
		node.userData.Hint = $('#comp-hover-val').val();
	}
});

/**
 * [隐藏组件]
 */
$('#comp-hides').on('ifChanged', function(event) {

	if (getNode()) {
		layer.msg('隐藏组件')
		var node = getNode();
		// console.log('ID:'+node.id)
		if ($(this).is(':checked')) {
			node.setAlpha(0);
			$('#comp-title').iCheck('disable');
			if (node.image) {
				// node.image.setVisible(false);
				node.image.setAlpha(0);
			}
			if (node.label) {
				// node.label.setVisible(false);
				node.label.setAlpha(0);
			}
			console
			if (node.userData.types === 'conduitCompontent') {
				node.setVisible(false);
			}
			node.userData.Visible = false;

		} else {
			// node.setVisible(true);
			node.setAlpha(1);
			$('#comp-title').iCheck('enable');
			if (node.image) {
				// node.image.setVisible(true);
				node.image.setAlpha(1);
			}
			if (node.userData.ShowCaption === true) {
				// node.label.setVisible(true);
				node.label.setAlpha(1);
			}
			if (node.userData.types === 'conduitCompontent') {
				node.setVisible(true);
			}
			node.userData.Visible = true;

		}
		node.repaint();
	}
});

/**
 * [不可用]
 */
$('#comp-unabel').on('ifChanged', function(event) {
	if (getNode()) {
		var node = getNode();
		if ($(this).is(':checked')) {
			node.userData.Enable = true;
		} else {
			node.userData.Enable = false;
		}
	}
});
/**
 * [访问等级]
 */
$(".comp-level-ul li a").on("click", function() {
	if (getNode()) {
		var node = getNode();
		node.userData.AccessLevel = $(this).html();
		$('#comp-level').text($(this).html());
	}
});



// Data
// 
/**
 * [视频地址]
 */
$('#comp-vlc-val').on('input', function() {
	if (getNode()) {
		var node = getNode();
		node.userData.vlcurl = $('#comp-vlc-val').val();
	}
});

/**
 * 控件绑定Tag [ 手动输入Tag名称]
 */
$('#comp-tagaddress').on('input', function() {
	if (getNode()) {
		var node = getNode();
		$.ajax({
			url: apiurl + 'tag',
			type: 'GET',
			dataType: 'json',
			data: {
				name: $('#comp-tagaddress').val()
			},
			beforeSend: function() {
				$('.loading').show();
			},
			complete: function() {
				$('.loading').hide();
			},
			success: function(data) {
				$('.loading').hide();
				if (data.success) {
					node.userData.Tag.tag_type = Number(data.data.tag_type);
					node.userData.Tag.tag_id = data.data.tag_id;
					node.userData.Tag.tag_name = data.data.tag_name;
					node.userData.Tag.bingding_status = 1;
					$("#tagWrongImg").show();
					$("#tagWrongImg").attr("src", "../images/img/right.png");
				} else {
					node.userData.Tag.tag_type = "";
					node.userData.Tag.tag_id = "";
					node.userData.Tag.tag_name = $('#comp-tagaddress').val();
					node.userData.Tag.bingding_status = 2;
					$("#tagWrongImg").show();
					$("#tagWrongImg").attr("src", "../images/img/worry.png");
					console.log("绑定tag失败------失败原因:" + JSON.stringify(data, null, 2))
				}
			},
			error: function(data) {
				$('.loading').hide();
				node.userData.Tag.tag_type = "";
				node.userData.Tag.tag_id = "";
				node.userData.Tag.tag_name = $('#comp-tagaddress').val();
				node.userData.Tag.bingding_status = 2;
				$("#tagWrongImg").show();
				$("#tagWrongImg").attr("src", "../images/img/worry.png");
				console.log("绑定tag失败------失败原因:" + JSON.stringify(data, null, 2))
			}
		});
	}
});


/**
 * 控件绑定Tag [ 弹窗选择 ]
 */
$('#comp-tagaddress-btn').on('click', function() {
	layer.open({
		title: ['绑定数据标签', 'font-size:18px;color:#fff;background:#3E4687;height:50px;font-weight:bold;line-height:50px;padding-left:30px;border:none;'],
		type: 1,
		skin: 'layui-primary', //加上边框
		area: ['900px', '655px'], //宽高
		content: $("#search-datalabel"), //捕获的元素,
		shift: 2,
		move: false,
		btn: ['保存', '取消', ],
		success: function(layero) {
			// $('#content-search-input').val('');
			// $('#search_datalabel_tab tbody').html('');
		},
		yes: function(index) {
			// $('input[name="search_ckss"]:checked').data('id');
			if ($('input[name="search_ckss"]:checked').data('id') === null) {
				layer.msg('未选中任何标签')
			} else {
				var node = getNode();
				node.userData.Tag.tag_type = Number($('input[name="search_ckss"]:checked').data('type'));
				node.userData.Tag.tag_id = Number($('input[name="search_ckss"]:checked').data('id'));
				node.userData.Tag.tag_name = String($('input[name="search_ckss"]:checked').data('name'));
				node.userData.Tag.bingding_status = 1;
				$('#comp-tagaddress').val($('input[name="search_ckss"]:checked').data('name'))
				$("#tagWrongImg").show();
				$("#tagWrongImg").attr("src", "../images/img/rights.png");
				layer.close(index);
			}

		},
		btn2: function(index) {
			$("#tagWrongImg").hide();
			layer.close(index);
		}
	});
});



/**
 * [只读 Readonly]
 */
$('#comp-readonly').on('ifChanged', function(event) {
	if (getNode()) {
		var node = getNode();
		if ($(this).is(':checked')) {
			node.userData.Readonly = true;
		} else {
			node.userData.Readonly = false;
		}
	}
});


// style

// style 边框宽度
$('.style-width-ul li a').on('click', function() {
	if (getNode()) {
		var node = getNode();
		node.setStroke(Number($(this).html()));
		node.userData.BlinkingStroke = Number($(this).html());
		$('#style-width').text($(this).html());
	}
});
// style 直线宽度
$('#comp-conline-width').on('input', function() {
	if (getNode()) {
		var node = getNode();
		node.setStroke(Number($(this).val()));
		node.userData.BlinkingStroke = Number($(this).val());
		node.repaint();
	}
});

// style 边框样式
$('.style-style-ul li a').on('click', function() {
	if (getNode()) {
		var node = getNode();
		$('#style-style').text($(this).html());
		if ($(this).html() === "默认") {
			node.setDashArray("");
			node.userData.DashArray = "";
		} else {
			node.setDashArray($(this).html());
			node.userData.DashArray = $(this).html();
		}
	}
});

// style 边框颜色
$('.style-border-color ul').on('click', 'li', function() {
	if (getNode()) {
		var node = getNode();
		$('.style-border-color ul li').removeClass("colorWhiteBorder colorBlackBorder");
		if (rgb2hex($(this).css("background-color")) === "#ffffff") {
			$(this).addClass("colorBlackBorder");
			node.userData.BlinkingColor = String(rgb2hex($(this).css("background-color")));
			node.setColor(String(rgb2hex($(this).css("background-color"))));
			node.repaint();
		} else {
			$(this).addClass("colorWhiteBorder");
			node.userData.BlinkingColor = String(rgb2hex($(this).css("background-color")));
			node.setColor(String(rgb2hex($(this).css("background-color"))));
			node.repaint();
		}
	}
});

// style 边框颜色-选择框
$('.style-border-color span').colpick({
	layout: 'hex',
	submitText: '确定',
	onShow: function() {
		$(this).colpickSetColor(getColor('sty_border_color'));
	},
	onSubmit: function(hsb, hex, rgb, el) {
		var node = getNode();
		node.userData.BlinkingColor = '#' + hex;
		node.setColor("#" + hex);
		node.repaint();
		$('.style-border-color ul li').removeClass("colorWhiteBorder colorBlackBorder");
		$(el).colpickHide();
		var need_add_color = false;
		$('.style-border-color ul li').each(function(index, element) {
			if (hex.toUpperCase() == rgb2hex($(element).css("background-color")).substring(1).toUpperCase()) {
				need_add_color = false;
				if (hex.toUpperCase() === "FFFFF") {
					$(element).addClass("colorBlackBorder");
				} else {
					$(element).addClass("colorWhiteBorder");
				}

				return false;
			} else {
				need_add_color = true;
			}
		});
		if (need_add_color) {
			$('.style-border-color ul li:first-child').remove();
			if (hex.toUpperCase() === "FFFFF") {
				var add_li = '<li class="colorBlackBorder" style="background: #' + hex + '"></li>';
			} else {
				var add_li = '<li class="colorWhiteBorder" style="background: #' + hex + '"></li>';
			}
			$('.style-border-color ul').append(add_li);
		}
	}
});

// style 文本
$('#style-text').on('input', function() {
	if (getNode()) {
		var node = getNode();
		node.setText($('#style-text').val());
		node.repaint();
	}
});

//style 字体大小
$('#text-font-size').on('input', function() {
	if (getNode()) {
		if (!isNaN($(this).val())) {

			var node = getNode();
			node.setFontSize(Number($(this).val()))
			node.repaint();

		}


	}
});


// style 文本颜色
$('.style-text-color ul').on('click', 'li', function() {
	if (getNode()) {
		var node = getNode();
		$('.style-text-color ul li').removeClass("colorWhiteBorder colorBlackBorder");
		if (rgb2hex($(this).css("background-color")) === "#ffffff") {
			$(this).addClass("colorBlackBorder");
			node.setFontColor(String(rgb2hex($(this).css("background-color"))));
			node.repaint();
		} else {
			$(this).addClass("colorWhiteBorder");
			node.setFontColor(String(rgb2hex($(this).css("background-color"))));
			node.repaint();
		}
	}
});

//style 文本颜色-选择框 
$('.style-text-color span').colpick({
	layout: 'hex',
	submitText: '确定',
	onShow: function() {
		$(this).colpickSetColor(getColor("sty_text_color"));
	},
	onSubmit: function(hsb, hex, rgb, el) {
		var node = getNode();
		node.setFontColor("#" + hex);
		node.repaint();
		$('.style-text-color ul li').removeClass("colorWhiteBorder colorBlackBorder");
		$(el).colpickHide();
		var need_add_color = false;
		$('.style-text-color ul li').each(function(index, element) {
			if (hex.toUpperCase() == rgb2hex($(element).css("background-color")).substring(1).toUpperCase()) {
				need_add_color = false;
				if (hex.toUpperCase() === "FFFFF") {
					$(element).addClass("colorBlackBorder");
				} else {
					$(element).addClass("colorWhiteBorder");
				}
				return false;
			} else {
				need_add_color = true;
			}
		});
		if (need_add_color) {
			$('.style-text-color ul li:first-child').remove();
			if (hex.toUpperCase() === "FFFFF") {
				var add_li = '<li class="colorBlackBorder" style="background: #' + hex + '"></li>';
			} else {
				var add_li = '<li class="colorWhiteBorder" style="background: #' + hex + '"></li>';
			}
			$('.style-text-color ul').append(add_li);
		}
	}
});

// style 填充颜色
$('.style-fill-color ul').on('click', 'li', function() {

	if (getNode()) {
		var node = getNode();

		$('#text-alpha-style').iCheck('uncheck');
		$('#text-alpha-style').iCheck('enable');
		$('.style-fill-color ul li').removeClass("colorWhiteBorder colorBlackBorder");
		if (rgb2hex($(this).css("background-color")) === "#ffffff") {
			$(this).addClass("colorBlackBorder");

			node.setBackgroundColor(String(rgb2hex($(this).css("background-color"))));
			node.repaint();
		} else {
			$(this).addClass("colorWhiteBorder");
			console.log(String(rgb2hex($(this).css("background-color"))))
			node.setBackgroundColor(String(rgb2hex($(this).css("background-color"))));
			node.repaint();
		}
	}
});

// style 填充颜色-颜色选择框
$('.style-fill-color span').colpick({
	layout: 'hex',
	submitText: '确定',
	// onShow: function() {
	// 	$(this).colpickSetColor(getColor("sty_fill_color"));
	// },
	onSubmit: function(hsb, hex, rgb, el) {
		var node = getNode();
		node.setBackgroundColor("#" + hex);
		node.repaint();
		$('#text-alpha-style').iCheck('uncheck');
		$('#text-alpha-style').iCheck('enable');
		$('.style-fill-color ul li').removeClass("colorWhiteBorder colorBlackBorder");
		$(el).colpickHide();
		var need_add_color = false;
		$('.style-fill-color ul li').each(function(index, element) {
			if (hex.toUpperCase() == rgb2hex($(element).css("background-color")).substring(1).toUpperCase()) {
				need_add_color = false;
				if (hex.toUpperCase() === "FFFFF") {
					$(element).addClass("colorBlackBorder");
				} else {
					$(element).addClass("colorWhiteBorder");
				}

				return false;
			} else {
				need_add_color = true;
			}
		})

		if (need_add_color) {
			$('.style-fill-color ul li:first-child').remove();
			if (hex.toUpperCase() === "FFFFF") {
				var add_li = '<li class="colorBlackBorder" style="background: #' + hex + '"></li>';
			} else {
				var add_li = '<li class="colorWhiteBorder" style="background: #' + hex + '"></li>';
			}
			$('.style-fill-color ul').append(add_li);
		}
	}

});

// style 文本背景透明
$('#text-alpha-style').on('ifChanged', function(event) {
	if (getNode()) {
		var node = getNode();
		if ($(this).is(':checked')) {
			node.setBackgroundColor('none');
			$('.style-fill-color ul li').removeClass("colorWhiteBorder colorBlackBorder");
			$('#text-alpha-style').iCheck('disable');
		}
	}
});


//style 透明度
$('#comp-alpha-style').on('input', function() {
	if (getNode()) {
		if (!isNaN($(this).val())) {
			if (Number($(this).val()) >= 0 && Number($(this).val()) <= 1) {
				var node = getNode();
				node.setAlpha(Number($(this).val()))
				node.repaint();
			} else {
				layer.msg('透明度范围 0~1');
			}
		}
	}
});

//style 单位
$('#comp-unit-style').on('input', function() {
	if (getNode()) {
		var node = getNode();
		node.userData.unit = $(this).val();
	}
});


// style 闪烁
$('#style-flashing').on('ifChanged', function(event) {
	if (getNode()) {
		var node = getNode();
		if ($(this).is(':checked')) {
			node.userData.Blinking = true;
			node.startTimer(1000);
		} else {
			node.userData.Blinking = false;
			node.stopTimer();
		}
	}
});

//style 图片
$('#style-image-btn').on("click", function() {
	$("#imageFileStyle").val('').click();
});


// ontrue

// onTrue 边框宽度
$('.ontrue-width-ul li a').on("click", function() {
	if (getNode()) {
		var node = getNode();
		node.userData.onTrue.LineWidth = Number($(this).html());
		$('#ontrue-width').text($(this).html());
	}
});

// onTrue 直线边框宽度
$('#ontrue-conline-width').on("input", function() {
	if (getNode()) {
		var node = getNode();
		node.userData.onTrue.LineWidth = Number($(this).val());
	}
});

// onTrue 边框样式
$('.ontrue-style-ul li a').on("click", function() {
	if (getNode()) {
		var node = getNode();
		$('#ontrue-style').text($(this).html());
		if ($(this).html() === "默认") {
			node.userData.onTrue.LineStyle = "";
		} else {
			node.userData.onTrue.LineStyle = $(this).html();
		}
	}
});

// onTrue 边框颜色
$('.ontrue-border-color ul').on('click', 'li', function() {
	if (getNode()) {
		var node = getNode();
		$('.ontrue-border-color ul li').removeClass("colorWhiteBorder colorBlackBorder");
		if (rgb2hex($(this).css("background-color")) === "#ffffff") {
			$(this).addClass("colorBlackBorder");
			node.userData.onTrue.LineColor = String(rgb2hex($(this).css("background-color")));
		} else {
			$(this).addClass("colorWhiteBorder");
			node.userData.onTrue.LineColor = String(rgb2hex($(this).css("background-color")));
		}
	}
});
// onTrue 边框颜色-颜色选择器
$('.ontrue-border-color span').colpick({
	layout: 'hex',
	submitText: '确定',
	onShow: function() {
		$(this).colpickSetColor(getColor("true_border_color"));
	},
	onSubmit: function(hsb, hex, rgb, el) {
		var node = getNode();
		node.userData.onTrue.LineColor = "#" + hex;

		$('.ontrue-border-color ul li').removeClass("colorWhiteBorder colorBlackBorder");
		$(el).colpickHide();
		var need_add_color = false;
		$('.ontrue-border-color ul li').each(function(index, element) {
			if (hex.toUpperCase() == rgb2hex($(element).css("background-color")).substring(1).toUpperCase()) {
				need_add_color = false;
				if (hex.toUpperCase() === "FFFFF") {
					$(element).addClass("colorBlackBorder");
				} else {
					$(element).addClass("colorWhiteBorder");
				}

				return false;
			} else {
				need_add_color = true;
			}
		})
		if (need_add_color) {
			$('.ontrue-border-color ul li:first-child').remove();
			if (hex.toUpperCase() === "FFFFF") {
				var add_li = '<li class="colorBlackBorder" style="background: #' + hex + '"></li>';
			} else {
				var add_li = '<li class="colorWhiteBorder" style="background: #' + hex + '"></li>';
			}
			$('.ontrue-border-color ul').append(add_li);
		}
	}
});

// onTrue 文本
$('#ontrue-text').on("input", function() {
	if (getNode()) {
		console.log($('#ontrue-text').val())
		var node = getNode();
		node.userData.onTrue.Text = $('#ontrue-text').val();
	}
});

// onTrue 文本颜色
$('.ontrue-text-color ul').on('click', 'li', function() {
	if (getNode()) {
		var node = getNode();
		$('.ontrue-text-color ul li').removeClass("colorWhiteBorder colorBlackBorder");
		if (rgb2hex($(this).css("background-color")) === "#ffffff") {
			$(this).addClass("colorBlackBorder");
			node.userData.onTrue.TextColor = String(rgb2hex($(this).css("background-color")));
		} else {
			$(this).addClass("colorWhiteBorder");
			node.userData.onTrue.TextColor = String(rgb2hex($(this).css("background-color")));
		}
	}
});
//onTrue 文本颜色-选择框 
$('.ontrue-text-color span').colpick({
	layout: 'hex',
	submitText: '确定',
	onShow: function() {
		$(this).colpickSetColor(getColor("true_text_color"));
	},
	onSubmit: function(hsb, hex, rgb, el) {
		var node = getNode();
		node.userData.onTrue.TextColor = "#" + hex;
		$('.ontrue-text-color ul li').removeClass("colorWhiteBorder colorBlackBorder");
		$(el).colpickHide();
		var need_add_color = false;
		$('.ontrue-text-color ul li').each(function(index, element) {
			if (hex.toUpperCase() == rgb2hex($(element).css("background-color")).substring(1).toUpperCase()) {
				need_add_color = false;
				if (hex.toUpperCase() === "FFFFF") {
					$(element).addClass("colorBlackBorder");
				} else {
					$(element).addClass("colorWhiteBorder");
				}

				return false;
			} else {
				need_add_color = true;
			}
		})

		if (need_add_color) {
			$('.ontrue-text-color ul li:first-child').remove();
			if (hex.toUpperCase() === "FFFFF") {
				var add_li = '<li class="colorBlackBorder" style="background: #' + hex + '"></li>';
			} else {
				var add_li = '<li class="colorWhiteBorder" style="background: #' + hex + '"></li>';
			}
			$(".ontrue-text-color ul").append(add_li);
		}
	}
});

// onTrue 填充颜色
$('.ontrue-fill-color ul').on('click', 'li', function() {
	if (getNode()) {
		var node = getNode();
		$('#text-alpha-ontrue').iCheck('uncheck');
		$('#text-alpha-ontrue').iCheck('enable');
		$('.ontrue-fill-color ul li').removeClass("colorWhiteBorder colorBlackBorder");
		if (rgb2hex($(this).css("background-color")) === "#ffffff") {
			$(this).addClass("colorBlackBorder");
			node.userData.onTrue.FillColor = String(rgb2hex($(this).css("background-color")));
		} else {
			$(this).addClass("colorWhiteBorder");
			node.userData.onTrue.FillColor = String(rgb2hex($(this).css("background-color")));
		}
	}
});
// onTrue 填充颜色-颜色选择框
$('.ontrue-fill-color span').colpick({
	layout: 'hex',
	submitText: '确定',
	onShow: function() {
		$(this).colpickSetColor(getColor("true_fill_color"));
	},
	onSubmit: function(hsb, hex, rgb, el) {
		var node = getNode();
		node.userData.onTrue.FillColor = "#" + hex;
		$('#text-alpha-ontrue').iCheck('uncheck');
		$('#text-alpha-ontrue').iCheck('enable');
		$('.ontrue-fill-color ul li').removeClass("colorWhiteBorder colorBlackBorder");
		$(el).colpickHide();
		var need_add_color = false;
		$('.ontrue-fill-color ul li').each(function(index, element) {
			if (hex.toUpperCase() == rgb2hex($(element).css("background-color")).substring(1).toUpperCase()) {
				need_add_color = false;
				if (hex.toUpperCase() === "FFFFF") {
					$(element).addClass("colorBlackBorder");
				} else {
					$(element).addClass("colorWhiteBorder");
				}
				return false;
			} else {
				need_add_color = true;
			}
		})

		if (need_add_color) {
			$('.ontrue-fill-color ul li:first-child').remove();
			if (hex.toUpperCase() === "FFFFF") {
				var add_li = '<li class="colorBlackBorder" style="background: #' + hex + '"></li>';
			} else {
				var add_li = '<li class="colorWhiteBorder" style="background: #' + hex + '"></li>';
			}
			$('.ontrue-fill-color ul').append(add_li);
		}
	}
});

// ontrue 文本背景透明
$('#text-alpha-ontrue').on('ifChanged', function(event) {
	if (getNode()) {
		var node = getNode();
		if ($(this).is(':checked')) {
			node.setBackgroundColor('none');
			$('.ontrue-fill-color ul li').removeClass("colorWhiteBorder colorBlackBorder");
			$('#text-alpha-ontrue').iCheck('disable');
		}
	}
});



//ontrue 透明度
$('#comp-alpha-ontrue').on('input', function() {
	if (getNode()) {
		if (!isNaN($(this).val())) {
			if (Number($(this).val()) >= 0 && Number($(this).val()) <= 1) {
				var node = getNode();
				// if (node.userData.onTrue.alpha) {
				node.userData.onTrue.alpha = Number($(this).val());
				// }				

			} else {
				layer.msg('透明度范围 0~1');
			}
		}
	}
});

//ontrue 单位
$('#comp-unit-ontrue').on('input', function() {
	if (getNode()) {
		var node = getNode();
		node.userData.onTrue.unit = $(this).val();
	}
});


// onTrue 闪烁
$('#ontrue-flashing').on('ifChanged', function(event) {
	if (getNode()) {
		var node = getNode();
		if ($(this).is(':checked')) {
			node.userData.onTrue.Blinking = true;
		} else {
			node.userData.onTrue.Blinking = false;
		}
	}
});
// onTrue 图片
$('#ontrue-image-btn').on("click", function() {
	$("#imageFileOnTrue").val('').click();
});



// onFalse
// onFalse 边框宽度
$('.onfalse-width-ul li a').on('click', function() {
	if (getNode()) {
		var node = getNode();
		node.userData.onFalse.LineWidth = $(this).html();
		$('#onfalse-width').text($(this).html());
	}
});


// onFalse 直线边框宽度
$('#onfalse-conline-width').on('input', function() {
	if (getNode()) {
		var node = getNode();
		node.userData.onFalse.LineWidth = $(this).val();
	}
});
// onFalse 边框样式
$('.onfalse-style-ul li a').on('click', function() {
	if (getNode()) {
		var node = getNode();
		$('#onfalse-style').text($(this).html());
		if ($(this).html() === "默认") {
			node.userData.onFalse.LineStyle = "";
		} else {
			node.userData.onFalse.LineStyle = $(this).html();
		}
	}
});

// onfalse 边框颜色
$('.onfalse-border-color ul').on('click', 'li', function() {
	if (getNode()) {
		var node = getNode();
		$('.onfalse-border-color ul li').removeClass("colorWhiteBorder colorBlackBorder");
		if (rgb2hex($(this).css("background-color")) === "#ffffff") {
			$(this).addClass("colorBlackBorder");
			node.userData.onFalse.LineColor = String(rgb2hex($(this).css("background-color")));
			// console.log("onAlarm:" + node.userData.onAlarm.LineColor)
		} else {
			$(this).addClass("colorWhiteBorder");
			node.userData.onFalse.LineColor = String(rgb2hex($(this).css("background-color")));
			// console.log("onAlarm:" + node.userData.onAlarm.LineColor)
		}
	}
});

// onFalse 边框颜色-颜色选择器
$('.onfalse-border-color span').colpick({
	layout: 'hex',
	submitText: '确定',
	onShow: function() {
		$(this).colpickSetColor(getColor("false_border_color"));
	},
	onSubmit: function(hsb, hex, rgb, el) {
		var node = getNode();
		node.userData.onFalse.LineColor = "#" + hex;
		$('.onfalse-border-color ul li').removeClass("colorWhiteBorder colorBlackBorder");
		$(el).colpickHide();
		var need_add_color = false;
		$('.onfalse-border-color ul li').each(function(index, element) {
			if (hex.toUpperCase() == rgb2hex($(element).css("background-color")).substring(1).toUpperCase()) {
				need_add_color = false;
				if (hex.toUpperCase() === "FFFFF") {
					$(element).addClass("colorBlackBorder");
				} else {
					$(element).addClass("colorWhiteBorder");
				}
				return false;
			} else {
				need_add_color = true;
			}
		})

		if (need_add_color) {
			$('.onfalse-border-color ul li:first-child').remove();
			if (hex.toUpperCase() === "FFFFF") {
				var add_li = '<li class="li-bgColor colorBlackBorder" style="background: #' + hex + '"></li>';
			} else {
				var add_li = '<li class="li-bgColor colorWhiteBorder" style="background: #' + hex + '"></li>';
			}
			$('.onfalse-border-color ul').append(add_li);
		}
	}
});
// onFalse 文本
$('#onfalse-text').on('input', function() {
	if (getNode()) {
		var node = getNode();
		node.userData.onFalse.Text = $('#onfalse-text').val()
	}
});
// onFalse 文本颜色
$('.onfalse-text-color ul').on('click', 'li', function() {
	if (getNode()) {
		var node = getNode();
		$('.onfalse-text-color ul li').removeClass("colorWhiteBorder colorBlackBorder");
		if (rgb2hex($(this).css("background-color")) === "#ffffff") {
			$(this).addClass("colorBlackBorder");
			node.userData.onFalse.TextColor = String(rgb2hex($(this).css("background-color")));
		} else {
			$(this).addClass("colorWhiteBorder");
			node.userData.onFalse.TextColor = String(rgb2hex($(this).css("background-color")));
		}
	}
});

//onFalse 文本颜色-选择框 
$('.onfalse-text-color span').colpick({
	layout: 'hex',
	submitText: '确定',
	onShow: function() {
		$(this).colpickSetColor(getColor("false_text_color"));
	},
	onSubmit: function(hsb, hex, rgb, el) {
		var node = getNode();
		node.userData.onFalse.TextColor = "#" + hex;
		$('.onfalse-text-color ul li').removeClass("colorWhiteBorder colorBlackBorder");
		$(el).colpickHide();
		var need_add_color = false;
		$('.onfalse-text-color ul li').each(function(index, element) {
			if (hex.toUpperCase() == rgb2hex($(element).css("background-color")).substring(1).toUpperCase()) {
				need_add_color = false;
				if (hex.toUpperCase() === "FFFFF") {
					$(element).addClass("colorBlackBorder");
				} else {
					$(element).addClass("colorWhiteBorder");
				}
				return false;
			} else {
				need_add_color = true;
			}
		});
		if (need_add_color) {
			$('.onfalse-text-color ul li:first-child').remove();
			if (hex.toUpperCase() === "FFFFF") {
				var add_li = '<li class="colorBlackBorder" style="background: #' + hex + '"></li>';
			} else {
				var add_li = '<li class="colorWhiteBorder" style="background: #' + hex + '"></li>';
			}
			$('.onfalse-text-color ul').append(add_li);
		}
	}
});

// onFalse 填充颜色
$('.onfalse-fill-color ul').on("click", 'li', function() {
	if (getNode()) {
		var node = getNode();
		$('#text-alpha-onfalse').iCheck('uncheck');
		$('#text-alpha-onfalse').iCheck('enable');
		$('.onfalse-fill-color ul li').removeClass("colorWhiteBorder colorBlackBorder");
		if (rgb2hex($(this).css("background-color")) === "#ffffff") {
			$(this).addClass("colorBlackBorder");
			node.userData.onFalse.FillColor = String(rgb2hex($(this).css("background-color")));
		} else {
			$(this).addClass("colorWhiteBorder");
			node.userData.onFalse.FillColor = String(rgb2hex($(this).css("background-color")));
		}
	}
});
// onFalse 填充颜色-颜色选择框
$('.onfalse-fill-color span').colpick({
	layout: 'hex',
	submitText: '确定',
	onShow: function() {
		$(this).colpickSetColor(getColor("false_fill_color"));
	},
	onSubmit: function(hsb, hex, rgb, el) {
		var node = getNode();
		node.userData.onFalse.FillColor = "#" + hex;
		$('#text-alpha-onfalse').iCheck('uncheck');
		$('#text-alpha-onfalse').iCheck('enable');
		$('.onfalse-fill-color ul li').removeClass("colorWhiteBorder colorBlackBorder");
		$(el).colpickHide();
		var need_add_color = false;
		$('.onfalse-fill-color ul li').each(function(index, element) {
			if (hex.toUpperCase() == rgb2hex($(element).css("background-color")).substring(1).toUpperCase()) {
				need_add_color = false;
				if (hex.toUpperCase() === "FFFFF") {
					$(element).addClass("colorBlackBorder");
				} else {
					$(element).addClass("colorWhiteBorder");
				}
				return false;
			} else {
				need_add_color = true;
			}
		})
		if (need_add_color) {
			$('.onfalse-fill-color ul li:first-child').remove();
			if (hex.toUpperCase() === "FFFFF") {
				var add_li = '<li class="colorBlackBorder" style="background: #' + hex + '"></li>';
			} else {
				var add_li = '<li class="colorWhiteBorder" style="background: #' + hex + '"></li>';
			}
			$('.onfalse-fill-color ul').append(add_li);
		}
	}
});

// onfalse 文本背景透明
$('#text-alpha-onfalse').on('ifChanged', function(event) {
	if (getNode()) {
		var node = getNode();
		if ($(this).is(':checked')) {
			node.setBackgroundColor('none');
			$('.onfalse-fill-color ul li').removeClass("colorWhiteBorder colorBlackBorder");
			$('#text-alpha-onfalse').iCheck('disable');
		}
	}
});


//onfalse 透明度
$('#comp-alpha-onfalse').on('input', function() {
	if (getNode()) {
		if (!isNaN($(this).val())) {
			if (Number($(this).val()) >= 0 && Number($(this).val()) <= 1) {
				var node = getNode();
				// if (node.userData.onFalse.alpha) {
				node.userData.onFalse.alpha = Number($(this).val());
				// }else{
				// 	layer.msg($(this).val())
				// }				

			} else {
				layer.msg('透明度范围 0~1');
			}
		}
	}
});

//onfalse 单位
$('#comp-unit-onfalse').on('input', function() {
	if (getNode()) {
		var node = getNode();
		node.userData.onFalse.unit = $(this).val();
	}
});


// onFalse 闪烁
$('#onfalse-flashing').on('ifChanged', function(event) {
	if (getNode()) {
		var node = getNode();
		if ($(this).is(':checked')) {
			node.userData.onFalse.Blinking = true;
		} else {
			node.userData.onFalse.Blinking = false;
		}
	}
});
// onFalse 图片
$('#onfalse-image-btn').on("click", function() {
	$("#imageFileOnFalse").val('').click();
});



//onAlarm
// onAlarm 边框宽度
$('.onalarm-width-ul li a').on('click', function() {
	if (getNode()) {
		var node = getNode();
		node.userData.onAlarm.LineWidth = $(this).html();
		$('#onalarm-width').text($(this).html());
	}
});
// onAlarm 直线边框宽度
$('#onalarm-conline-width').on('input', function() {
	if (getNode()) {
		var node = getNode();
		node.userData.onAlarm.LineWidth = $(this).val();

	}
});


// onAlarm 边框样式
$('.onalarm-style-ul li a').on('click', function() {
	if (getNode()) {
		var node = getNode();
		$('#onalarm-style').text($(this).html());
		// 
		if ($(this).html() === "默认") {
			node.userData.onAlarm.LineStyle = "";
		} else {
			node.userData.onAlarm.LineStyle = $(this).html();
		}
	}
});


// onAlarm 边框颜色
$('.onalarm-border-color ul').on('click', 'li', function() {
	if (getNode()) {
		var node = getNode();
		$('.onalarm-border-color ul li').removeClass("colorWhiteBorder colorBlackBorder");
		if (rgb2hex($(this).css("background-color")) === "#ffffff") {
			$(this).addClass("colorBlackBorder");
			node.userData.onAlarm.LineColor = String(rgb2hex($(this).css("background-color")));
			// console.log("onAlarm:" + node.userData.onAlarm.LineColor)
		} else {
			$(this).addClass("colorWhiteBorder");
			node.userData.onAlarm.LineColor = String(rgb2hex($(this).css("background-color")));
			// console.log("onAlarm:" + node.userData.onAlarm.LineColor)
		}
	}
});

// onAlarm 边框颜色-颜色选择器
$('.onalarm-border-color span').colpick({
	layout: 'hex',
	submitText: '确定',
	onShow: function() {
		$(this).colpickSetColor(getColor("alarm_border_color"));
	},
	onSubmit: function(hsb, hex, rgb, el) {
		var node = getNode();
		node.userData.onAlarm.LineColor = "#" + hex;
		$('.onalarm-border-color ul li').removeClass("colorWhiteBorder colorBlackBorder");
		$(el).colpickHide();
		var need_add_color = false;
		$('.onalarm-border-color ul li').each(function(index, element) {
			if (hex.toUpperCase() == rgb2hex($(element).css("background-color")).substring(1).toUpperCase()) {
				need_add_color = false;
				if (hex.toUpperCase() === "FFFFF") {
					$(element).addClass("colorBlackBorder");
				} else {
					$(element).addClass("colorWhiteBorder");
				}
				return false;
			} else {
				need_add_color = true;
			}
		});
		if (need_add_color) {
			$('.onalarm-border-color ul li:first-child').remove();
			if (hex.toUpperCase() === "FFFFF") {
				var add_li = '<li class="colorBlackBorder" style="background: #' + hex + '"></li>';
			} else {
				var add_li = '<li class="colorWhiteBorder" style="background: #' + hex + '"></li>';
			}
			$('.onalarm-border-color ul').append(add_li);
		}
	}
});

// onAlarm 文本
$('#onalarm-text').on("input", function() {
	if (getNode()) {
		var node = getNode();
		node.userData.onAlarm.Text = $('#onalarm-text').val()
	}
});

// onAlarm 文本颜色
$('.onalarm-text-color ul').on('click', 'li', function() {
	if (getNode()) {
		var node = getNode();
		$('.onalarm-text-color ul li').removeClass("colorWhiteBorder colorBlackBorder");
		if (rgb2hex($(this).css("background-color")) === "#ffffff") {
			$(this).addClass("colorBlackBorder");
			node.userData.onAlarm.TextColor = String(rgb2hex($(this).css("background-color")));
		} else {
			$(this).addClass("colorWhiteBorder");
			node.userData.onAlarm.TextColor = String(rgb2hex($(this).css("background-color")));
		}
	}
});
//onAlarm 文本颜色-选择框 
$('.onalarm-text-color span').colpick({
	layout: 'hex',
	submitText: '确定',
	onShow: function() {
		$(this).colpickSetColor(getColor("alarm_text_color"));
	},
	onSubmit: function(hsb, hex, rgb, el) {
		var node = getNode();
		node.userData.onAlarm.TextColor = "#" + hex;
		$('.onalarm-text-color ul li').removeClass("colorWhiteBorder colorBlackBorder");
		$(el).colpickHide();
		var need_add_color = false;
		$('.onalarm-text-color ul li').each(function(index, element) {
			if (hex.toUpperCase() == rgb2hex($(element).css("background-color")).substring(1).toUpperCase()) {
				need_add_color = false;
				if (hex.toUpperCase() === "FFFFF") {
					$(element).addClass("colorBlackBorder");
				} else {
					$(element).addClass("colorWhiteBorder");
				}
				return false;
			} else {
				need_add_color = true;
			}
		})
		if (need_add_color) {
			$('.onalarm-text-color ul li:first-child').remove();
			if (hex.toUpperCase() === "FFFFF") {
				var add_li = '<li class="colorBlackBorder" style="background: #' + hex + '"></li>';
			} else {
				var add_li = '<li class="colorWhiteBorder" style="background: #' + hex + '"></li>';
			}
			$('.onalarm-text-color ul').append(add_li);
		}
	}
});



// onAlarm 填充颜色
$('.onalarm-fill-color ul').on('click', 'li', function() {
	if (getNode()) {
		var node = getNode();
		$('#text-alpha-onalarm').iCheck('uncheck');
		$('#text-alpha-onalarm').iCheck('enable');
		$('.onalarm-fill-color ul li').removeClass("colorWhiteBorder colorBlackBorder");
		if (rgb2hex($(this).css("background-color")) === "#ffffff") {
			$(this).addClass("colorBlackBorder");
			node.userData.onAlarm.FillColor = String(rgb2hex($(this).css("background-color")));
		} else {
			$(this).addClass("colorWhiteBorder");
			node.userData.onAlarm.FillColor = String(rgb2hex($(this).css("background-color")));
		}
	}
});
// onAlarm 填充颜色-颜色选择框
$('.onalarm-fill-color span').colpick({
	layout: 'hex',
	submitText: '确定',
	onShow: function() {
		$(this).colpickSetColor(getColor("alarm_fill_color"));
	},
	onSubmit: function(hsb, hex, rgb, el) {
		var node = getNode();
		node.userData.onAlarm.FillColor = "#" + hex;
		$('#text-alpha-onalarm').iCheck('uncheck');
		$('#text-alpha-onalarm').iCheck('enable');
		$('.onalarm-fill-color ul li').removeClass("colorWhiteBorder colorBlackBorder");
		$(el).colpickHide();
		var need_add_color = false;
		$('.onalarm-fill-color ul li').each(function(index, element) {
			if (hex.toUpperCase() == rgb2hex($(element).css("background-color")).substring(1).toUpperCase()) {
				need_add_color = false;
				if (hex.toUpperCase() === "FFFFF") {
					$(element).addClass("colorBlackBorder");
				} else {
					$(element).addClass("colorWhiteBorder");
				}

				return false;
			} else {
				need_add_color = true;
			}
		})

		if (need_add_color) {
			$('.onalarm-fill-color ul li:first-child').remove();
			if (hex.toUpperCase() === "FFFFF") {
				var add_li = '<li class="colorBlackBorder" style="background: #' + hex + '"></li>';
			} else {
				var add_li = '<li class="colorWhiteBorder" style="background: #' + hex + '"></li>';
			}
			$('.onalarm-fill-color ul').append(add_li);
		}
	}
});

// onalarm 文本背景透明
$('#text-alpha-onalarm').on('ifChanged', function(event) {
	if (getNode()) {
		var node = getNode();
		if ($(this).is(':checked')) {
			node.setBackgroundColor('none');
			$('.onalarm-fill-color ul li').removeClass("colorWhiteBorder colorBlackBorder");
			$('#text-alpha-onalarm').iCheck('disable');
		}
	}
});



// onalarm 透明度
$('#comp-alpha-onalarm').on('input', function() {
	if (getNode()) {
		if (!isNaN($(this).val())) {
			if (Number($(this).val()) >= 0 && Number($(this).val()) <= 1) {
				var node = getNode();
				// if (node.userData.onAlarm.alpha) {
				node.userData.onAlarm.alpha = Number($(this).val());
				// }				

			} else {
				layer.msg('透明度范围 0~1');
			}
		}
	}
});

//onalarm 单位
$('#comp-unit-onalarm').on('input', function() {
	if (getNode()) {
		var node = getNode();
		node.userData.onAlarm.unit = $(this).val();
	}
});


// onAlarm 闪烁
$('#onalarm-flashing').on('ifChanged', function(event) {
	if (getNode()) {
		var node = getNode();
		if ($(this).is(':checked')) {
			node.userData.onAlarm.Blinking = true;
		} else {
			node.userData.onAlarm.Blinking = false;
		}
	}
});

// onAlarm 图片
$('#onalarm-image-btn').on("click", function() {
	$("#imageFileOnAlerm").val('').click();
});

// onDisconnected
// 
// onDisconnected 边框宽度
$('.onDisc-width-ul li a').on('click', function() {
	if (getNode()) {
		var node = getNode();
		node.userData.onDisconnected.LineWidth = $(this).html();
		$('#onDisc-width').text($(this).html());
	}
});

// onDisconnected 边框宽度
$('#ondis-conline-width').on('input', function() {
	if (getNode()) {
		var node = getNode();
		node.userData.onDisconnected.LineWidth = $(this).val();
	}
});

// onDisconnected 边框样式
$('.onDisc-style-ul li a').on("click", function() {
	if (getNode()) {
		var node = getNode();
		$('#onDisc-style').text($(this).html());
		if ($(this).html() === "默认") {
			node.userData.onDisconnected.LineStyle = "";
		} else {
			node.userData.onDisconnected.LineStyle = $(this).html();
		}
	}
});



// onDisconnected 边框颜色
$('.onDisc-border-color ul').on("click", 'li', function() {
	if (getNode()) {
		var node = getNode();
		$('.onDisc-border-color ul li').removeClass("colorWhiteBorder colorBlackBorder");
		if (rgb2hex($(this).css("background-color")) === "#ffffff") {
			$(this).addClass("colorBlackBorder");
			node.userData.onDisconnected.LineColor = String(rgb2hex($(this).css("background-color")));
			// console.log("onDisconnected:" + node.userData.onDisconnected.LineColor)
		} else {
			$(this).addClass("colorWhiteBorder");
			node.userData.onDisconnected.LineColor = String(rgb2hex($(this).css("background-color")));
			// console.log("onDisconnected:" + node.userData.onDisconnected.LineColor)
		}
	}
});
// onDisconnected 边框颜色-颜色选择器
$('.onDisc-border-color span').colpick({
	layout: 'hex',
	submitText: '确定',
	onShow: function() {
		$(this).colpickSetColor(getColor("dis_border_color"));
	},
	onSubmit: function(hsb, hex, rgb, el) {
		var node = getNode();
		node.userData.onDisconnected.LineColor = "#" + hex;
		$('.onDisc-border-color ul li').removeClass("colorWhiteBorder colorBlackBorder");
		$(el).colpickHide();
		var need_add_color = false;
		$('.onDisc-border-color ul li').each(function(index, element) {
			if (hex.toUpperCase() == rgb2hex($(element).css("background-color")).substring(1).toUpperCase()) {
				need_add_color = false;
				if (hex.toUpperCase() === "FFFFF") {
					$(element).addClass("colorBlackBorder");
				} else {
					$(element).addClass("colorWhiteBorder");
				}

				return false;
			} else {
				need_add_color = true;
			}
		});
		if (need_add_color) {
			$('.onDisc-border-color ul li:first-child').remove();
			if (hex.toUpperCase() === "FFFFF") {
				var add_li = '<li class="li-bgColor colorBlackBorder" style="background: #' + hex + '"></li>';
			} else {
				var add_li = '<li class="li-bgColor colorWhiteBorder" style="background: #' + hex + '"></li>';
			}
			$('.onDisc-border-color ul').append(add_li);
		}
	}
});

// onDisconnected 文本
$('#onDisc-text').on("input", function() {
	if (getNode()) {
		var node = getNode();
		node.userData.onDisconnected.Text = $('#onDisc-text').val();
	}
});

// onDisconnected 文本颜色
$('.onDisc-text-color ul').on('click', 'li', function() {
	if (getNode()) {
		var node = getNode();
		$('.onDisc-text-color ul li').removeClass("colorWhiteBorder colorBlackBorder");
		if (rgb2hex($(this).css("background-color")) === "#ffffff") {
			$(this).addClass("colorBlackBorder");
			node.userData.onDisconnected.TextColor = String(rgb2hex($(this).css("background-color")));
		} else {
			$(this).addClass("colorWhiteBorder");
			node.userData.onDisconnected.TextColor = String(rgb2hex($(this).css("background-color")));
		}
	}
});
//onDisconnected 文本颜色-选择框 
$('.onDisc-text-color span').colpick({
	layout: 'hex',
	submitText: '确定',
	onShow: function() {
		$(this).colpickSetColor(getColor("dis_text_color"));
	},
	onSubmit: function(hsb, hex, rgb, el) {
		var node = getNode();
		node.userData.onDisconnected.TextColor = "#" + hex;
		$('.onDisc-text-color ul li').removeClass("colorWhiteBorder colorBlackBorder");
		$(el).colpickHide();
		var need_add_color = false;
		$('.onDisc-text-color ul li').each(function(index, element) {
			if (hex.toUpperCase() == rgb2hex($(element).css("background-color")).substring(1).toUpperCase()) {
				need_add_color = false;
				if (hex.toUpperCase() === "FFFFF") {
					$(element).addClass("colorBlackBorder");
				} else {
					$(element).addClass("colorWhiteBorder");
				}

				return false;
			} else {
				need_add_color = true;
			}
		})
		if (need_add_color) {
			$('.onDisc-text-color ul li:first-child').remove();
			if (hex.toUpperCase() === "FFFFF") {
				var add_li = '<li class="colorBlackBorder" style="background: #' + hex + '"></li>';
			} else {
				var add_li = '<li class="colorWhiteBorder" style="background: #' + hex + '"></li>';
			}
			$('.onDisc-text-color ul').append(add_li);
		}
	}
});


// onDisconnected 填充颜色
$('.onDisc-fill-color ul ').on('click', 'li', function() {
	if (getNode()) {
		var node = getNode();
		$('#text-alpha-ondisc').iCheck('uncheck');
		$('#text-alpha-ondisc').iCheck('enable');
		$('.onDisc-fill-color ul li').removeClass("colorWhiteBorder colorBlackBorder");
		if (rgb2hex($(this).css("background-color")) === "#ffffff") {
			$(this).addClass("colorBlackBorder");
			node.userData.onDisconnected.FillColor = String(rgb2hex($(this).css("background-color")));
		} else {
			$(this).addClass("colorWhiteBorder");
			node.userData.onDisconnected.FillColor = String(rgb2hex($(this).css("background-color")));
		}
	}
});
// onDisconnected 填充颜色-颜色选择框
$('.onDisc-fill-color span').colpick({
	layout: 'hex',
	submitText: '确定',
	onShow: function() {
		$(this).colpickSetColor(getColor("dis_fill_color"));
	},
	onSubmit: function(hsb, hex, rgb, el) {
		var node = getNode();
		node.userData.onDisconnected.FillColor = "#" + hex;
		$('#text-alpha-ondisc').iCheck('uncheck');
		$('#text-alpha-ondisc').iCheck('enable');
		$('.onDisc-fill-color ul li').removeClass("colorWhiteBorder colorBlackBorder");
		$(el).colpickHide();
		var need_add_color = false;
		$('.onDisc-fill-color ul li').each(function(index, element) {
			if (hex.toUpperCase() == rgb2hex($(element).css("background-color")).substring(1).toUpperCase()) {
				need_add_color = false;
				if (hex.toUpperCase() === "FFFFF") {
					$(element).addClass("colorBlackBorder");
				} else {
					$(element).addClass("colorWhiteBorder");
				}

				return false;
			} else {
				need_add_color = true;
			}
		})

		if (need_add_color) {
			$('.onDisc-fill-color ul li:first-child').remove();
			if (hex.toUpperCase() === "FFFFF") {
				var add_li = '<li class="colorBlackBorder" style="background: #' + hex + '"></li>';
			} else {
				var add_li = '<li class="colorWhiteBorder" style="background: #' + hex + '"></li>';
			}
			$('.onDisc-fill-color ul').append(add_li);
		}
	}
});

// ondisc 文本背景透明
$('#text-alpha-onalarm').on('ifChanged', function(event) {
	if (getNode()) {
		var node = getNode();
		if ($(this).is(':checked')) {
			node.setBackgroundColor('none');
			$('.onDisc-fill-color ul li').removeClass("colorWhiteBorder colorBlackBorder");
			$('#text-alpha-ondisc').iCheck('disable');
		}
	}
});

// ondisc 透明度
$('#comp-alpha-ondisc').on('input', function() {
	if (getNode()) {
		if (!isNaN($(this).val())) {
			if (Number($(this).val()) >= 0 && Number($(this).val()) <= 1) {
				var node = getNode();
				// if (node.userData.onDisconnected.alpha) {
				node.userData.onDisconnected.alpha = Number($(this).val());
				// }				

			} else {
				layer.msg('透明度范围 0~1');
			}
		}
	}
});
//onalarm 单位
$('#comp-unit-ondis').on('input', function() {
	if (getNode()) {
		var node = getNode();
		node.userData.onDisconnected.unit = $(this).val();
	}
});


// onDisconnected 闪烁
$('#onDisc-flashing').on('ifChanged', function(event) {
	if (getNode()) {
		var node = getNode();
		if ($(this).is(':checked')) {
			node.userData.onDisconnected.Blinking = true;
		} else {
			node.userData.onDisconnected.Blinking = false;
		}
	}
});
// onDisconnected 图片
$('#onDisc-image-btn').on("click", function() {
	$("#imageFileOnDisconnected").val('').click();
});


// ============================画布属性-开始===========================

/**
 * [画布颜色]
 */
$('.canvas-fill-color ul ').on('click', 'li', function() {
	$('.canvas-fill-color ul li').removeClass("colorWhiteBorder colorBlackBorder");
	if (rgb2hex($(this).css("background-color")) === "#ffffff") {
		$(this).addClass("colorBlackBorder");
		$("#canvas").css("background-color", rgb2hex($(this).css("background-color")));
	} else {
		$(this).addClass("colorWhiteBorder");
		$("#canvas").css("background-color", rgb2hex($(this).css("background-color")));
	}

	$('.canvas-fill-color span').colpickSetColor(rgb2hex($("#canvas").css("background-color")).substring(1));
});

/**
 * 自定义画布颜色
 */
$('#canvas-attr span.add-color').colpick({
	layout: 'hex',
	submitText: '确定',
	color: rgb2hex($("#canvas").css("background-color")).substring(1),
	color: '#35c99d',
	onSubmit: function(hsb, hex, rgb, el) {
		$('#canvas').css("background-color", '#' + hex);
		$(el).colpickHide();
		$(el).colpickSetColor(rgb2hex($("#canvas").css("background-color")).substring(1));
		var need_add_color = false;
		$('.canvas-fill-color ul li').removeClass("colorWhiteBorder colorBlackBorder");
		$('.canvas-fill-color ul li').each(function(index, element) {
			if (hex.toUpperCase() == rgb2hex($(element).css("background-color")).substring(1).toUpperCase()) {
				need_add_color = false;
				if (hex.toUpperCase() === "FFFFF") {
					$(element).addClass("colorBlackBorder");
				} else {
					$(element).addClass("colorWhiteBorder");
				}

				return false;
			} else {
				need_add_color = true;
			}
		})

		if (need_add_color) {
			$('.canvas-fill-color ul li:first-child').remove();
			if (hex.toUpperCase() === "FFFFF") {
				var add_li = '<li class="colorBlackBorder" style="background: #' + hex + '"></li>';
			} else {
				var add_li = '<li class="colorWhiteBorder" style="background: #' + hex + '"></li>';
			}
			$('.canvas-fill-color ul').append(add_li);
		}
	}
});

// 画布背景
$('#canvas-img-btn').on('click', function() {
	$('#fileField').val('').click();
});

// ==============================画布属性-结束=========================



// var Tagdata = [];

// =========================弹出窗口===========================================

$('#clearImage').on('click', function() {
	$('#content-search-input').val('');
	// $('#search_datalabel_tab tbody').html('');
});

function contentSearchInput(page) {
	$.ajax({
		url: apiurl + 'tag',
		type: 'GET',
		dataType: 'json',
		data: {
			name: $("#content-search-input").val(),
			page: page,
			page_item_count: 9,
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

				if (data.data.items === null) {
					$('.search_no_datalabel').show();
					$('#search_datalabel_tab').hide();
					$(".tcdPageCode").hide();
				} else {
					$('.search_no_datalabel').hide();
					$('#search_datalabel_tab').show();

					$(".tcdPageCode").show();
					$(".tcdPageCode").createPage({
						pageCount: data.data.pageCount,
						current: page,
						backFn: function(p) {
							contentSearchInput(p);
						}
					});

					
					var arr = data.data.items;
					var datalabel_dic = {}; //保存请求来的数据
					for (var key in arr) {
						datalabel_dic[String(arr[key].id)] = arr[key].id;
						switch (Number(arr[key].tag_type)) {
							case 1:
								arr[key].tag_types = '开关型';
								break;
							case 2:
								arr[key].tag_types = '整数型';
								break;
							case 3:
								arr[key].tag_types = '实数型';
								break;
							case 4:
								arr[key].tag_types = '字符型';
								break;
						}
					}
					
					$("#search_datalabel_tab tbody tr td").html("");
					$('#search_datalabel_tab tbody tr').each(function(i,ele){
						if(i<arr.length){
							var tds = '<td class="bdtag-name">' + arr[i].name + '</td>' +
								'<td>' + arr[i].tag_types + '</td>' +
								'<td class="bdtag-des">' + arr[i].description + '</td>' +
								'<td class="bdtag-nodename">' + arr[i].node_name + '</td>' +
								'<td>' + arr[i].point_id + '</td>' +
								'<td><input data-type ="' + arr[i].tag_type + '" data-id="' + arr[i].id + '" data-name="' + arr[i].name + '" type="radio"  class="search_ckss" name="search_ckss"></td>';
							$(ele).html(tds);
						}
					});




					// for (var key in arr) {

					// 	if (arr[key].id == 'x') {
					// 		var trs = '<tr>' +
					// 			'<td style="height:45px;"></td>' +
					// 			'<td></td>' +
					// 			'<td></td>' +
					// 			'<td></td>' +
					// 			'<td></td>' +
					// 			'<td></td>' +
					// 			'</tr>';
					// 		trs_list += trs;
					// 	} else {
					// 		var trs = '<tr>' +
					// 			'<td class="bdtag-name">' + arr[key].name + '</td>' +
					// 			'<td>' + arr[key].tag_types + '</td>' +
					// 			'<td class="bdtag-des">' + arr[key].description + '</td>' +
					// 			'<td class="bdtag-nodename">' + arr[key].node_name + '</td>' +
					// 			'<td>' + arr[key].point_id + '</td>' +
					// 			'<td><input data-type ="' + arr[key].tag_type + '" data-id="' + arr[key].id + '" data-name="' + arr[key].name + '" type="radio"  class="search_ckss" name="search_ckss"></td>' +
					// 			'</tr>';
					// 		trs_list += trs;
					// 	}
					// }
					// $("#search_datalabel_tab  tbody").html(trs_list);
					switchInterface();
				}
			}
		},
		error: function(data) {
			$(".loading").hide();
		}
	});
}
//搜索数据标签
$('#content-search-input').on('input', function() {
	if ($(this).val() !== '') {
		contentSearchInput(1);
	} else {
		layer.msg('输入框为空')
	}

});


/**
 * [showPreview 上传画布背景图片]
 */
function showPreview(source) {
	var file = source.files[0];
	if (file == null) {
		return;
	}
	if (!/image\/\w+/.test(file.type)) {
		layer.msg("请确保文件为图像类型")
		return false;
	}
	if (window.FileReader) {
		var fr = new FileReader();
		fr.readAsDataURL(file);
		fr.onload = function(e) {
			// document.getElementById("myBgimage").src = e.target.result;
			// console.log("背景图片:"+e.target.result)
			// var fd = new FormData();
			// fd.append('filename', file);			
			$.ajax({
				url: apiurl + 'fileupload',
				type: 'post',
				dataType: 'json',
				data: {
					data: e.target.result
				},
				beforeSend: function() {
					$('.loading').show();
				},
				complete: function() {
					$('.loading').hide();
				},
				success: function(data) {
					$('.loading').hide();
					if (data.success) {
						console.log("上传图片成功:" + JSON.stringify(data, null, 2))
						layer.msg('图片上传成功');
						$('#myBgimage').data("url", data.data);
						$('#myBgimage').attr("src", e.target.result);
						$('#canvas-img').val(data.data);

					} else {
						layer.msg("上传图片失败:" + data.error_message);
					}
				},
				error: function(data) {
					$('.loading').hide();
					layer.msg("上传图片失败:" + data.error_message);
				}
			})
		};
	}
}

/**
 * [imageShowPreview 上传image控件的图片]
 */
function imageShowPreviewStyle(source) {
	var file = source.files[0];
	if (file == null) {
		return;
	}
	if (!/image\/\w+/.test(file.type)) {
		layer.msg("请确保文件为图像类型");
		return false;
	}
	if (window.FileReader) {
		var fr = new FileReader();
		fr.readAsDataURL(file);
		fr.onload = function(e) {
			var node = getNode();
			$.ajax({
				url: apiurl + 'fileupload',
				type: 'post',
				dataType: 'json',
				data: {
					data: e.target.result
				},
				beforeSend: function() {
					$('.loading').show();
				},
				beforeSend: function() {
					$('.loading').show();
				},
				complete: function() {
					$('.loading').hide();
				},
				success: function(data) {
					$('.loading').hide();
					if (data.success) {
						// console.log("上传图片成功style:" + JSON.stringify(data, null, 2))
						layer.msg('图片上传成功');
						$('#style-image').val(data.data);
						node.userData.picture = data.data;
						node.image.setPath(e.target.result);
						node.repaint();
					} else {
						layer.msg("上传图片失败:" + data.error_message);
					}
				},
				error: function(data) {
					$('.loading').hide();
					layer.msg("上传图片失败:" + data.error_message);
				}
			})
		};
	}
}



/**
 * [image onTrue]
 * @param  {[type]} source [description]
 * @return {[type]}        [description]
 */
function imageShowPreviewOnTrue(source) {
	var file = source.files[0];
	if (file == null) {
		return;
	}
	if (!/image\/\w+/.test(file.type)) {
		layer.msg("请确保文件为图像类型");
		return false;
	}
	if (window.FileReader) {
		var fr = new FileReader();
		fr.readAsDataURL(file);
		fr.onload = function(e) {
			var node = getNode();
			$.ajax({
				url: apiurl + 'fileupload',
				type: 'post',
				dataType: 'json',
				data: {
					data: e.target.result
				},
				beforeSend: function() {
					$('.loading').show();
				},
				beforeSend: function() {
					$('.loading').show();
				},
				complete: function() {
					$('.loading').hide();
				},
				success: function(data) {
					$('.loading').hide();
					if (data.success) {
						layer.msg('图片上传成功');
						$('#ontrue-image').val(data.data);
						node.userData.onTrue.picture = data.data;
					} else {
						layer.msg("上传图片失败:" + data.error_message);
					}
				},
				error: function(data) {
					$('.loading').hide();
					layer.msg("上传图片失败:" + data.error_message);
				}
			});
		};
	}
}

/**
 * [image      OnFalse]
 * @param  {[type]} source [description]
 * @return {[type]}        [description]
 */
function imageShowPreviewOnFalse(source) {
	var file = source.files[0];
	if (file == null) {
		return;
	}
	if (!/image\/\w+/.test(file.type)) {
		layer.msg("请确保文件为图像类型");
		return false;
	}
	if (window.FileReader) {
		var fr = new FileReader();
		fr.readAsDataURL(file);
		fr.onload = function(e) {
			var node = getNode();
			$.ajax({
				url: apiurl + 'fileupload',
				type: 'post',
				dataType: 'json',
				data: {
					data: e.target.result
				},
				beforeSend: function() {
					$('.loading').show();
				},
				beforeSend: function() {
					$('.loading').show();
				},
				complete: function() {
					$('.loading').hide();
				},
				success: function(data) {
					$('.loading').hide();
					if (data.success) {
						layer.msg('图片上传成功');
						$('#onfalse-image').val(data.data);
						node.userData.onFalse.picture = data.data;
					} else {
						layer.msg("上传图片失败:" + data.error_message);
					}
				},
				error: function(data) {
					$('.loading').hide();
					layer.msg("上传图片失败:" + data.error_message);
				}
			})
		};
	}
}
/**
 * [image  OnAlarm ]
 * @param  {[type]} source [description]
 * @return {[type]}        [description]
 */
function imageShowPreviewOnAlerm(source) {
	var file = source.files[0];
	if (file == null) {
		return;
	}
	if (!/image\/\w+/.test(file.type)) {
		layer.msg("请确保文件为图像类型");
		return false;
	}
	if (window.FileReader) {
		var fr = new FileReader();
		fr.readAsDataURL(file);
		fr.onload = function(e) {
			var node = getNode();

			$.ajax({
				url: apiurl + 'fileupload',
				type: 'post',
				dataType: 'json',
				data: {
					data: e.target.result
				},
				beforeSend: function() {
					$('.loading').show();
				},
				beforeSend: function() {
					$('.loading').show();
				},
				complete: function() {
					$('.loading').hide();
				},
				success: function(data) {
					$('.loading').hide();
					if (data.success) {
						console.log("上传图片成功onAlarm:" + JSON.stringify(data, null, 2))
						layer.msg('图片上传成功');
						$('#onalarm-image').val(data.data);
						node.userData.onAlarm.picture = data.data;
					} else {
						layer.msg("上传图片失败:" + data.error_message);
					}
				},
				error: function(data) {
					$('.loading').hide();
					layer.msg("上传图片失败:" + data.error_message);
				}
			})
		};
	}
}

/**
 * [image   OnDisconnected ]
 * @param  {[type]} source [description]
 * @return {[type]}        [description]
 */
function imageShowPreviewOnDisconnected(source) {
	var file = source.files[0];
	if (file == null) {
		return;
	}
	if (!/image\/\w+/.test(file.type)) {
		layer.msg("请确保文件为图像类型");
		return false;
	}
	if (window.FileReader) {
		var fr = new FileReader();
		fr.readAsDataURL(file);
		fr.onload = function(e) {
			var node = getNode();
			$.ajax({
				url: apiurl + 'fileupload',
				type: 'post',
				dataType: 'json',
				data: {
					data: e.target.result
				},
				beforeSend: function() {
					$('.loading').show();
				},
				beforeSend: function() {
					$('.loading').show();
				},
				complete: function() {
					$('.loading').hide();
				},
				success: function(data) {
					$('.loading').hide();
					if (data.success) {
						layer.msg('图片上传成功');
						$('#onDisc-image').val(data.data);
						node.userData.onDisconnected.picture = data.data;
					} else {
						layer.msg("上传图片失败:" + data.error_message);
					}
				},
				error: function(data) {
					$('.loading').hide();
					layer.msg("上传图片失败:" + data.error_message);
				}
			})
		};
	}
}



$('#canvas').on('click', function() {
	$('.first-attr').show();
	$('.second-attr').hide();
});
$('.have-btn').on('click', 'button', function() {
	$('.first-attr').hide();
	$('.second-attr').show();
});



/**
 * [点击控件时-重置属性菜单]
 * @return {[type]} [description]
 */
function resetAttributeMenu() {
	$('.first-attr').show();
	$('.second-attr').hide();
	$('.div-alpha').hide();
	$('.div-unit').hide();
	$('.div-font-size').hide();
	$('.div-text-alpha').hide();
	$('.tab-ul li:first-child a').click();
	$('p.p-show').each(function(index, element) {
		if ($(element).hasClass('collapsed')) {
			$(element).click();
		}
	});
	$('p.p-hide').each(function(index, element) {
		if ($(element).hasClass('collapsed')) {} else {
			$(element).click();
		}
	});
	$('.div-basic-hide').show();
	$('.just-for-label').show();
	$('.div-line-only').show();
	$('.div-fill').hide();
	$('.div-vlcurl').hide();
	$('.div-line-check').hide();

	// 边框宽度
	$('.div-normal-width').show();
	$('.div-line-conduit').hide();

	setTimeout(function() {
		$(".component-attr").mCustomScrollbar('scrollTo', 'top');
	}, 300);

}

/*********全局按钮--开始*******/
var iForAdd = 0; //区别新添加全局按钮id


// 添加全局按钮
$('.span-add').on("click", function() {

	$('.no-glo-btn').hide();
	var id = new Date().format("yyyyMMddhhmmss") + iForAdd;
	iForAdd += 1;
	var obj = '<p><button id="' + id + '" data-tag-id="-1" data-tag-name="" data-tag-type="-1" data-bingding-status="0" data-readonly="false" data-name="按钮">' + '按钮</button><img src="img/delete.png"></p>';
	$('.have-btn #mCSB_2_container').prepend(obj);

	$('.have-btn').mCustomScrollbar('scrollTo', 'top');
});
// 删除全局按钮
$('.have-btn').on('click', 'img', function() {
	$(this).parent().remove();
	if ($('.have-btn #mCSB_2_container').html() === "") {
		$('.no-glo-btn').show();
	}
});
// 全局按钮点击方法
$('.have-btn').on('click', 'button', function() {
	$('.first-attr').hide();
	$('.second-attr').show();
	$('.have-btn p button').removeClass('active');
	$(this).addClass('active');
	$('#glo-title').data('id', $(this).attr('id'));
	$('#glo-btn-name').val($(this).data('name'));
	$('#glo-btn-tagname').val($(this).data('tag-name'));
	if ($(this).data('readonly')) {
		$('#glo-checkbox').iCheck('check');
	} else {
		$('#glo-checkbox').iCheck('uncheck');
	}


	if ($('#glo-title').data('id') !== '') {
		switch (Number($('#' + $('#glo-title').data('id')).data('bingding-status'))) {
			case 2:
				console.log("上个控件的ID为:======" + $("#spanid").text())
				layer.msg("控件Tag值绑定无效,请重新绑定")
				break;
		}

	}
	switch (Number($(this).data('bingding-status'))) {
		case 0:
			$("#glo-btn-img").hide();
			break;
		case 1:
			$("#glo-btn-img").show();
			$("#glo-btn-img").attr("src", "images/img/rights.png");
			break;
		case 2:
			$("#glo-btn-img").show();
			$("#glo-btn-img").attr("src", "images/img/worry.png");
			break;
	}

});
// 按钮名称
$('#glo-btn-name').on('input', function() {
	$('#' + $('#glo-title').data('id')).data('name', $(this).val());
	$('#' + $('#glo-title').data('id')).text($(this).val());
});

// 全局按钮绑定Tag [ 手动输入Tag名称]
$('#glo-btn-tagname').on('input', function() {
	console.log("输入框的值:" + $('#glo-btn-tagname'))
	if ($('#glo-title').data('id') !== '') {
		var obj = $('#' + $('#glo-title').data('id'));
		$.ajax({
			url: apiurl + 'r=api/entity/tag/type',
			type: 'post',
			dataType: 'json',
			data: {
				data: JSON.stringify({
					tag_name: $('#glo-btn-tagname').val()
				})
			},
			beforeSend: function() {
				$('.loading').show();
			},
			complete: function() {
				$('.loading').hide();
			},
			success: function(data) {
				$('.loading').hide();
				if (data.success) {

					obj.data('tag-type', data.data.tag_type);
					obj.data('tag-id', data.data.tag_id);
					obj.data('tag-name', data.data.tag_name);
					obj.data('bingding-status', 1);
					$("#glo-btn-img").show();
					$("#glo-btn-img").attr("src", "images/img/rights.png");
				} else {
					obj.data('tag-type', '');
					obj.data('tag-id', '');
					obj.data('tag-name', '');
					obj.data('bingding-status', 2);
					$("#glo-btn-img").show();
					$("#glo-btn-img").attr("src", "images/img/worry.png");
					console.log("绑定tag失败------失败原因:" + JSON.stringify(data, null, 2))
				}
			},
			error: function(data) {
				$('.loading').hide();
				obj.data('tag-type', '');
				obj.data('tag-id', '');
				obj.data('tag-name', '');
				obj.data('bingding-status', 2);
				$("#glo-btn-img").show();
				$("#glo-btn-img").attr("src", "images/img/worry.png");
				console.log("绑定tag失败------失败原因:" + JSON.stringify(data, null, 2))
			}
		});
	} else {
		layer.msg('请选中一个全局按钮');
	}

});


// 控件绑定Tag [ 弹窗选择 ]
$('#glo-btn-btn').on('click', function() {
	layer.open({
		title: ['绑定数据标签', 'font-size:18px;color:#fff;background:#3E4687;height:50px;font-weight:bold;line-height:50px;padding-left:30px;border:none;'],
		type: 1,
		skin: 'layui-primary', //加上边框
		area: ['900px', '655px'], //宽高
		content: $("#search-datalabel"), //捕获的元素,
		shift: 2,
		move: false,
		btn: ['保存', '取消', ],
		success: function(layero) {
			$('#content-search-input').val('');
		},
		yes: function(index) {

			if ($('input[name="search_ckss"]:checked').data('id') === null) {
				layer.msg('未选中任何标签')
			} else {
				$('#glo-btn-tagname').val($('input[name="search_ckss"]:checked').data('name'));
				var obj = $('#' + $('#glo-title').data('id'));
				obj.data('tag-type', $('input[name="search_ckss"]:checked').data('type'));
				obj.data('tag-id', $('input[name="search_ckss"]:checked').data('id'));
				obj.data('tag-name', $('input[name="search_ckss"]:checked').data('name'));
				obj.data('bingding-status', 1);
				$("#glo-btn-img").show();
				$("#glo-btn-img").attr("src", "images/img/rights.png");
				layer.close(index);
			}

		},
		btn2: function(index) {
			$("#tagWrongImg").hide();
			layer.close(index);
		}
	});
});

/**
 * [只读 Readonly]
 */
$('#glo-checkbox').on('ifChanged', function(event) {
	if ($('#glo-title').data('id') !== '') {
		var obj = $('#' + $('#glo-title').data('id'));
		if ($(this).is(':checked')) {
			obj.data('readonly', true);
		} else {
			obj.data('readonly', false);
		}
	}
});

/*********全局按钮--结束*******/



/**
 * [编辑控件前 检查前一个控件 TagID 是否绑定上]
 * @return {[type]} [description]
 */
function checkComponentTagidIsNull() {
	if (getNode()) {
		var node = getNode();
		switch (node.userData.Tag.bingding_status) {
			case 2:
				console.log("上个控件的ID为:======" + $("#spanid").text())
				layer.msg("上个控件Tag值绑定无效,请重新绑定!")
				break;
		}
	}
}

/**
 * [检查 本控件 TagID 是否绑定正确]
 */
function checkThisComponentIsTrue(thiss) {
	switch (thiss.userData.Tag.bingding_status) {
		case 0:
			$("#tagWrongImg").hide();
			break;
		case 1:
			$("#tagWrongImg").show();
			$("#tagWrongImg").attr("src", "images/img/rights.png");
			break;
		case 2:
			$("#tagWrongImg").show();
			$("#tagWrongImg").attr("src", "images/img/worry.png");
			break;
	}
}

/**
 * [ 获得style 边框颜色 ]
 * @param  {[type]} string [属性类型名]
 * @return {[type]}        [description]
 */
function getColor(string) {
	if (getNode()) {
		var node = getNode();
		var col;

		switch (string) {
			case "sty_border_color":
				col = node.getColor().hash().substring(1);
				break;
			case "sty_text_color":
				col = node.getFontColor().hash().substring(1);
				break;
			case "sty_fill_color":
				col = node.getBackgroundColor().hash().substring(1);
				break;
			case "true_border_color":
				col = node.getUserData().onTrue.LineColor.substring(1);
				break;
			case "true_text_color":
				col = node.getUserData().onTrue.TextColor.substring(1);
				break;
			case "true_fill_color":
				col = node.getUserData().onTrue.FillColor.substring(1);
				break;
			case "false_border_color":
				col = node.getUserData().onFalse.LineColor.substring(1);
				break;
			case "false_text_color":
				col = node.getUserData().onFalse.TextColor.substring(1);
				break;
			case "false_fill_color":
				col = node.getUserData().onFalse.FillColor.substring(1);
				break;
			case "alarm_border_color":
				col = node.getUserData().onAlarm.LineColor.substring(1);
				break;
			case "alarm_text_color":
				col = node.getUserData().onAlarm.TextColor.substring(1);
				break;
			case "alarm_fill_color":
				col = node.getUserData().onAlarm.FillColor.substring(1);
				break;
			case "dis_border_color":
				col = node.getUserData().onDisconnected.LineColor.substring(1);
				break;
			case "dis_text_color":
				col = node.getUserData().onDisconnected.TextColor.substring(1);
				break;
			case "dis_fill_color":
				col = node.getUserData().onDisconnected.FillColor.substring(1);
				break;

		}
		return col;

	}
}


/****************颜色代码转换**rgb-->十六进制********/
function zero_fill_hex(num, digits) {
	var s = num.toString(16);
	while (s.length < digits)
		s = "0" + s;
	return s;
}
function rgb2hex(rgb) {

	if (rgb.charAt(0) == '#')
		return rgb;

	var ds = rgb.split(/\D+/);
	var decimal = Number(ds[1]) * 65536 + Number(ds[2]) * 256 + Number(ds[3]);
	return "#" + zero_fill_hex(decimal, 6);
}
/****************颜色代码转换************************/

/**
 * [弹窗-checkbox样式]
 * @return {[type]} [description]
 */
function switchInterface() {
	$('.search_ckss').iCheck('destroy');
	$('.search_ckss').iCheck({
		checkboxClass: 'icheckbox_square-green',
		radioClass: 'iradio_square-green',
		increaseArea: '20%'
	});

}


//控件悬浮提示框
function showTooltips(obj) {
	var tooltips = $('#tooltips');
	if (obj.userData.Hint !== '') {
		tooltips.show().html(obj.userData.Hint);
		var tPosX = obj.getAbsoluteX() + obj.getWidth() / 2 - tooltips.width() / 2 - 10
		var tPosY = obj.getAbsoluteY() + obj.getHeight() + 10;
		tooltips.css({
			'top': tPosY + 'px',
			'left': tPosX + 'px'
		});
	}
}
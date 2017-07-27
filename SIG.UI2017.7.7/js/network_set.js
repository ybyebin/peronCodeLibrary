$(function(){
	$('#treeview1 .list-group li:nth-child(5)').addClass('list-group-active');	
})

function saveSet() {
	layer.msg('保存成功')
}

$("input[name='network']").on('change', function() {
	if ($('#custom').is(':checked')) {
		$('.network_input').removeAttr('disabled');
	}
	if ($('#dhcp').is(':checked')) {
		$('.network_input').attr('disabled', 'disabled');
	}
})
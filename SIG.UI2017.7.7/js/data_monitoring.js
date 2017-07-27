$(function() {
	$('#treeview1 .list-group li:nth-child(1)').addClass('list-group-active');

});


$('.a-href').on('click', function() {
	dataMontoring.btnRefresh.data('status', $(this).attr('href'));
});

//刷新数据
$('#btn-refresh').on('click', function() {

	


	dataMontoring.refreshDtata();
	dataMontoring.equipmentStatusPage()
});

var dataMontoring = {
	pointInit: true,
	EquipmentInit: true,
	pagePoint: 1,
	pageEquipment: 1,
	btnRefresh: $('#btn-refresh'),
	pointTbody:$('#pointTbody'),
	equipmentTbody:$('#equipmentTbody'),
	refreshDtata: function() {
		var types = this.btnRefresh.data('status');
		layer.msg('呵呵' + types)
		this.pointStatusPage(100)

	},
	// 点状态分页初始化
	pointStatusPage: function(totalCount) {
		$("#pointStatusPage").createPage({
		pageCount: 10,
		current: 2,
		backFn: function(p) {
			console.log(p);

			
		}
	});

	},
	// 设备状态分页初始化
	equipmentStatusPage: function(totalCount) {
		$('#equipmentStatusPage').extendPagination({
			totalCount: 10000000,
			showPage: 10,
			limit: 10,
			callback: function(curr, limit, totalCount) {
				dataMontoring.pageEquipment = curr;
				console.log(curr)
				console.log(limit);

			}
		});
	},
	/**
	 * [获取 点状态数据]
	 * @param  {[type]} count [当前页数]
	 * @return {[type]}       [description]
	 */
	getPointData: function(count) {
		if (dataMontoring.pointInit) {
			dataMontoring.pointInit = false;
		} else {

		}
	},
	/**
	 * [获取 设备状态数据]
	 * @param  {[type]} count [当前页数]
	 * @return {[type]}       [description]
	 */
	getEquipmentData: function(count) {

	},
	/**
	 * [点状态数据 添加]
	 * @param  {[type]} data [description]
	 * @return {[type]}      [description]
	 */
	pointRefreshTable: function(data) {
		var pointTbodyhtml ='';
		dataMontoring.pointTbody.empty();
		if (Array.isArray(data)) {
			var length = data.length; 
			for (var i = 0; i < length; i++) {
				
			}
			dataMontoring.pointTbody.append(pointTbodyhtml);

		}else{
			layer.msg('无数据')
		}

	},
	/**
	 * [数据状态数据 添加]
	 * @param  {[type]} data [description]
	 * @return {[type]}      [description]
	 */
	equipmentRefreshTable:function(data){
			
		var eqTbodyhtml ='';
		dataMontoring.equipmentTbody.empty();
		if (Array.isArray(data)) {
			var length = data.length;
			for (var i = 0; i < length; i++) {
				
			}
			dataMontoring.equipmentTbody.append(eqTbodyhtml);

		}else{
			layer.msg('无数据');
		}

	},

}

// $.ajax({
// 	url: '',
// 	type: '',
// 	dataType: '',
// 	success: function(data) {

// 	},
// 	error: function(data) {

// 	}
// })


var	patient_detailed=$('#patient-detailed');
var all_room=$('#all-room');
// 返回主面板
function goBack(){
	patient_detailed.hide();
	all_room.show();
};

// 进入详细面板
$('#treeview').on('click','.tree_lou span',function(){
		$('#treeview .tree_lou span').removeClass('active');
	$(this).addClass('active');
});

$('#all-room').on('click','.room_normal',function(){

	patient_detailed.show();
	all_room.hide();
});

// 插入排序
function insert_sort(input) {
	var i, j, temp;
	for (i = 1; i < input.length; i++) {
		temp = input[i];
		for (j = i - 1; j >= 0 && input[j] > temp; j--) {
			input[j + 1] = input[j];
		}
		
		input[j + 1] = temp;
	}
	return input;
}
window.onload = function(){
	var arr = [7,6,4,2];
	insert_sort(arr)
	console.log(JSON.stringify(insert_sort(arr),null,2))
}
// 冒泡排序
function bubble_sort(input){
  var i, j, temp, flag;
  for(i = 0; i < input.length - 1; i++){
    flag = true;
    for(j = 0; j < input.length - i; j++){
      if(input[j] > input[j + 1]){
        temp = input[j];
        input[j] = input[j + 1];
        input[j + 1] = temp;
        flag = false;
      }
    }
    if(flag)
      // 提前结束
      break;
  }
  return input;
}

// 快速排序
// javascript 版
function quick_sort(input) {
  var len = input.length;
  if (len <= 1)
    return input.slice(0);
  var left = [];
  var right = [];
  // 基准函数
  var mid = [input[0]];
  for (var i = 1; i < len; i++){
    if (input[i] < mid[0])
      left.push(input[i]);
    else
      right.push(input[i]);
  }
  return quick_sort(left).concat(mid.concat(quick_sort(right)));
};
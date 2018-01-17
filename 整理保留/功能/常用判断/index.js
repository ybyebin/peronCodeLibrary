
// 判断当前页面是否在移动端打开
isMobile = 'ontouchstart' in document;


// 判断数据类型
 var   gettype=Object.prototype.toString;
 gettype.call([]);   // [object Array]

// replace 全局替换[大小写]
var str = "David is an Arsenal fan, which means David is great"; 
str.replace(/david/gi, "Darren");
//slice 方法可以用来将一个类数组（Array-like）对象/集合转换成一个数组。你只需将该方法绑定到这个对象上。下述代码中 list 函数中的 arguments 就是一个类数组对象。
function list() {
  return Array.prototype.slice.call(arguments);
}

var list1 = list(1, 2, 3); // [1, 2, 3]
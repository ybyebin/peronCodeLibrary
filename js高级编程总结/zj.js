// 判断 类型
if (Array.isArray(value)) {

}

// sort使用 compare配合 做数组 排序
// 升序
function compare(value1,value2) {
	if (value1 < value2) {
		return -1;
	}else if(value1 > value2){
		return 1;
	}else{
		return 0;
	}
}

[1,3,2,5,15].sort(compare);


arguments.callee == '函数本身的名字'


//动态原型
function Person(name,age,job){
	this.name = name;
	this.age = age;
	this.job = job;
	if (typeof this.sayName !='function') {
		Person.prototype.sayName = function() {
			alert(this.name)
		};
	}
}
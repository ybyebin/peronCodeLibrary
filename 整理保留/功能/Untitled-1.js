//返回传递给他的任意对象的类
function isClass(o) {
  if (o === null) {
    return "Null";
  }
  if (o === undefined) return "Undefined";
  return Object.prototype.toString.call(o).slice(8, -1);
}
//深度克隆
function deepClone(obj) {
  var result,
    oClass = isClass(obj);
  if (oClass === "Object") {
    result = {};
  } else if (oClass === "Array") {
    result = [];
  } else {
    return obj;
  }
  for (key in obj) {
    var copy = obj[key];
    if (isClass(copy) == "Object" || "Array") {
      result[key] = arguments.callee(copy); //递归调用
    } else {
      result[key] = obj[key];
    }
  }
  return result;
}

var obj = {
  a: {
    b: [1, 2, { c: 3 }]
  }
};

var obj2 = deepClone(obj);
obj.a.b[2].c = 4;
console.log(obj2)
// console.log(obj)

 s="this is a string";
 Object.prototype.toString.call(s)
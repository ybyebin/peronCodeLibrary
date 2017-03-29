
















// demo01
// var a = 20;
// function fn() {
//     // 'use strict';
//     console.log(this.a);
// }
// fn();






// demo02
// var a = 20;
// function fn() {
//     function foo() {
//      // 'use strict';
//         console.log(this.a);
//     }
//     foo();
// }
// fn();






// demo03
// var a = 20;
// var obj = {
//     a: 10,
//     c: this.a + 20,
//     fn: function () {
//         return this.a;
//     }
// }

// console.log(obj.c);
// console.log(obj.fn());
// 
// 



// demo4
// function foo() {
//     console.log(this.a)
// }

// function active(fn) {
//     fn(); // 真实调用者，为独立调用
// }

// var a = 20;
// var obj = {
//     a: 10,
//     getA: foo
// }

// active(obj.getA);
// 

// demo5
function exam(a, b, c, d, e) {

    // 先看看函数的自带属性 arguments 什么是样子的
    console.log(arguments);

    // 使用call/apply将arguments转换为数组, 返回结果为数组，arguments自身不会改变
    var arg = [].slice.call(arguments);

    console.log(arg);
}

exam(2, 8, 9, 10, 3);
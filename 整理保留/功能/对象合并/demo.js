// var obj1 = {
// 	a: 1,
// 	// b: {
// 	// 	b1: 21
// 	// }

// };
// var obj2 = {
// 	// a: 2,
// 	b: {
// 		b2: 22
// 	}
// };
// var c = Object.assign(obj1, obj2);
// console.log(c)
// console.log(JSON.stringify(c, null, 2));

// var extend=function(o,n){
//    for (var p in n){
//    	console.log(p);
//    	console.log('obj1:'+o.hasOwnProperty(p))
//         if(n.hasOwnProperty(p) && (!o.hasOwnProperty(p) ))
//             o[p]=n[p];
//     }
// };  


var obj1 = {
	a: 1,
	b: {
		b1: 21
	}

};
var obj2 = {
	a: 2,
	b: {
		b2: 22,
		b3:{
			s:1
		}
	}
};

	var obj1_copy = JSON.parse(JSON.stringify(obj1));
	var obj2_copy =JSON.parse(JSON.stringify(obj2));
function extend(o,n){

   for (var p in n){
   		var n_p = n.hasOwnProperty(p);
   		var o_p = o.hasOwnProperty(p);
   		if (n_p && o_p && !isJson(n[p])) {
   			 o[p]=n[p];
   		}
        if(n_p && !o_p){
        	console.log(p);
        	 o[p]=n[p];
        }
        
        if (n_p && o_p && isJson(n[p])) {
        	extend(o[p],n[p])
        }
    }

    
};  
extend(obj1_copy,obj2_copy)
console.log(JSON.stringify(obj1_copy))

function isJson(obj){  
    var isjson = typeof(obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length; 
    return isjson;  
}  


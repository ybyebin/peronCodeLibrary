function test() {
	console.log(a); //underfine
	console.log(foo()); //2

	var a = 1;

	function foo() {
		return 2;
	}
}
// test();

function test2() {
    console.log(foo);
    console.log(bar);

    var foo = 'Hello';
    console.log(foo);
    var bar = function () {
        return 'world';
    }

    function foo() {
        return 'hello';
    }
}

test2();
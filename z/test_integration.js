/*
	test_integration.js
	Test the simple numerical integration functions
	
	Sparisoma Viridi | dudung@gmail.com
	
	20180303
	Create this test functions.
*/

// 20180303.1720 ok
function test_integration_simpson_error() {
	var error = 1E-6;
	var xbeg = 0;
	var xend = 1;
	var A = integSimpsError(func, xbeg, xend, error);
	console.log(A);
	
	// Define integrand
	function func(x) {
		return 3 * x * x;
	}
}

// 20180303.1714 ok
function test_integration_trapez_error() {
	var error = 1E-6;
	var xbeg = 0;
	var xend = 1;
	var A = integTrapezError(func, xbeg, xend, error);
	console.log(A);
	
	// Define integrand
	function func(x) {
		return 3 * x * x;
	}
}

// 20180303.1710 ok
function test_integration_rect_error() {
	var error = 1E-6;
	var xbeg = 0;
	var xend = 1;
	var A = integRectError(func, xbeg, xend, error);
	console.log(A);
	
	// Define integrand
	function func(x) {
		return 3 * x * x;
	}
}

// 20180303.1658 ok
function test_integration_rect_n_segments() {
	var N = 0;
	var Arectbeg = 0;
	var Arectmid = 0;
	var Arectend = 0;
	var xbeg = 0;
	var xend = 1;
	
	N = 1;
	Arectbeg = integRectNBeg(func, xbeg, xend, N);
	Arectmid = integRectNMid(func, xbeg, xend, N);
	Arectend = integRectNEnd(func, xbeg, xend, N);
	console.log(Arectbeg, Arectmid,  Arectend);

	N = 10;
	Arectbeg = integRectNBeg(func, xbeg, xend, N);
	Arectmid = integRectNMid(func, xbeg, xend, N);
	Arectend = integRectNEnd(func, xbeg, xend, N);
	console.log(Arectbeg, Arectmid,  Arectend);

	N = 100;
	Arectbeg = integRectNBeg(func, xbeg, xend, N);
	Arectmid = integRectNMid(func, xbeg, xend, N);
	Arectend = integRectNEnd(func, xbeg, xend, N);
	console.log(Arectbeg, Arectmid,  Arectend);

	N = 1000;
	Arectbeg = integRectNBeg(func, xbeg, xend, N);
	Arectmid = integRectNMid(func, xbeg, xend, N);
	Arectend = integRectNEnd(func, xbeg, xend, N);
	console.log(Arectbeg, Arectmid,  Arectend);
	
	// Define integrand
	function func(x) {
		return x;
	}
}
/*
	integration.js
	Simple numerical integration
	
	Sparisoma Viridi | dudung@gmail.com
	
	20180303
	Create this library of functions.
*/

// Integrate using Simpson method until some error
function integSimpsError(func, xbeg, xend, error) {
	var N = 1;
	var Aold = integSimpsN(func, xbeg, xend, N);
	var dA = 1;
	while(dA > error) {
		N *= 2;
		var A = integSimpsN(func, xbeg, xend, N);
		dA = Math.abs(A - Aold);
		Aold = A;
	}
	return Aold;
}

// Integrate a function using simpson method
function integSimpsN(func, xbeg, xend, N) {
	var dx = (xend - xbeg) / N;
	var A = 0;
	var x = xbeg;
	for(var i = 0; i < N; i++) {
		var Ai = func(x) + 4 * func(x + dx / 2) + func(x + dx);
		Ai *= dx / 6;
		A += Ai;
		x += dx;
	}
	return A;
}

// Integrate using trapezium method until some error
function integTrapezError(func, xbeg, xend, error) {
	var N = 1;
	var Aold = integTrapezN(func, xbeg, xend, N);
	var dA = 1;
	while(dA > error) {
		N *= 2;
		var A = integRectNMid(func, xbeg, xend, N);
		dA = Math.abs(A - Aold);
		Aold = A;
	}
	return Aold;
}

// Integrate a function using trapezium method
function integTrapezN(func, xbeg, xend, N) {
	var dx = (xend - xbeg) / N;
	var A = 0;
	var x = xbeg;
	for(var i = 0; i < N; i++) {
		var Ai = (func(x) + func(x + dx)) * dx / 2;
		A += Ai;
		x += dx;
	}
	return A;
}

// Integrate using rectangle method until some error
function integRectError(func, xbeg, xend, error) {
	var N = 1;
	var Aold = integRectNMid(func, xbeg, xend, N);
	var dA = 1;
	while(dA > error) {
		N *= 2;
		var A = integRectNMid(func, xbeg, xend, N);
		dA = Math.abs(A - Aold);
		Aold = A;
	}
	return Aold;
}

// Integrate a function using rectangle method (begin value)
function integRectNBeg(func, xbeg, xend, N) {
	var dx = (xend - xbeg) / N;
	var A = 0;
	var x = xbeg;
	for(var i = 0; i < N; i++) {
		var Ai = func(x) * dx;
		A += Ai;
		x += dx;
	}
	return A;
}

// Integrate a function using rectangle method (mid value)
function integRectNMid(func, xbeg, xend, N) {
	var dx = (xend - xbeg) / N;
	var A = 0;
	var x = xbeg + dx / 2;
	for(var i = 0; i < N; i++) {
		var Ai = func(x) * dx;
		A += Ai;
		x += dx;
	}
	return A;
}

// Integrate a function using rectangle method (end value)
function integRectNEnd(func, xbeg, xend, N) {
	var dx = (xend - xbeg) / N;
	var A = 0;
	var x = xbeg + dx;
	for(var i = 0; i < N;i ++) {
		var Ai = func(x) * dx;
		A += Ai;
		x += dx;
	}
	return A;
}

/*
	randgen.js
	Random generator based on Math.random() function
	
	Sparisoma Viridi | https://github.com/dudung/butiran
	
	Include: <script src="randgen.js"></script> in a HTML file
	Execute: Refresh web browser viewing the HTML file
	
	20190204
	1928 Beg zuhause.
*/

// Execute main function
main();

// Define main function
function main() {
	var str = "";
	var min = 3;
	var max = 7;
	var N = 100;
	for(var i = 0; i < N; i++) {
		var num = randInt(min, max);
		str += num + " ";
	}
	console.log(str);
} 

// Define random number between two integers (inclusive)
function randInt(lo, hi) {
	var range = hi - lo;
	var randNum = lo + Math.floor((range + 1) * Math.random());
	return randNum;
}
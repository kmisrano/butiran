/*
	randgen.js
	Random generator based on Math.random() function
	
	Sparisoma Viridi | https://github.com/dudung/butiran
	
	Include: <script src="randgen.js"></script> in a HTML file
	Execute: Refresh web browser viewing the HTML file
	
	20190204 Zuhause 1928 beg, 2017 end.
	
	References
	20190204 https://stackoverflow.com/a/33898676/9475509
*/

// Execute main function
main();

// Define main function
function main() {
	// Create textarea as output
	var ta = document.createElement("textarea");
	ta.style.overflowY = "scroll";
	ta.style.width = "200px";
	ta.style.height = "200px";
	document.body.append(ta);
	
	// Define arrays for number and its statistic frequency
	var min = 3;
	var max = 7;
	var num = range(min, max);
	var sum = [...num];
	sum.fill(0);
	
	// Generate random number N times
	var N = 100;
	for(var i = 0; i < N; i++) {
		var x = randInt(min, max);
		var idx = num.indexOf(x);
		sum[idx]++;
	}
	
	// Display results in textarea
	var digit = Math.floor(Math.log10(N));
	var str = "N = " + N + "\n";
	str += "min = " + min + "\n";
	str += "max = " + max + "\n";
	str += "\n";
	str += "Distribution\n";
	for(var i = 0; i < num.length; i++) {
		var x = (sum[i] / N).toFixed(digit);
		str += num[i] + "\t" + sum[i] + "\t" + x + "\n";
	}
	ta.value = str;
	
	// Return value, even it is not necessary
	return 0;
} 

// Generate a random number between two integers (inclusive)
function randInt() {
	var min = arguments[0];
	var max = arguments[1];
	var range = max - min;
	var num = min + Math.floor((range + 1) * Math.random());
	return num;
}

// Create array of integer from min to max
function range() {
	var beg = arguments[0];
	var end = arguments[1];
	var num = [];
	for(var i = beg; i <= end; i++) {
		num.push(i);
	}
	return num;
}

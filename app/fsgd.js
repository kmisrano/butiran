/*
	fsgd.js
	Floating spherical grain dynamics in one-dimension
	
	Sparisoma Viridi | dudung@gmail.com
	
	Execute: node fsgd.js
	
	Version info:
		Node.js	v10.1.0
	
	20180602
	Create this application.
*/

// Require classes
var Vect3 = require('../lib/vect3')();

// Execute main function in development stage
main();

// Define main function
function main() {
	// Get command line arguments
	var args = process.argv.slice(2);
	console.log(args);
	
	// Define application name
	var appname = "fsgd";
	
	// Define simulation duration
	var dt = 0.001; // s
	var tbeg = 0; // s
	var tend = 10; // s
	
	// Define data output period
	var Tdata = 0.1; // s
	
	// Define significant digit
	var digit = -Math.floor(Math.log(dt) / Math.exp(1));
	
	var outstr = "# t\tVs\tRC\tVC\n";
	
	// Perform simulation
	var t = tbeg;
	while(t < tend + dt) {
		
		//outstr += linestr;
		t += dt;
	}
	//console.log(outstr);
	
	/*
	// Write to file
	var fname = "data.txt";
	const fs = require('fs');
	fs.writeFile(fname, outstr, function(err) {
		if(err) throw err;
		console.log(appname + ": " + fname + " saved");
	});
	*/
}

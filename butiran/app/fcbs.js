/*
	fcbs.js
	Fast charging battery simulation based on capacitor model
	
	Sparisoma Viridi | dudung@gmail.com
	
	Execute: node fcbs.js
	
	Version info:
		Node.js	v10.1.0
	
	20180512
	Create this application as empty HTML file.
	20180513
	Start to build the layout.
	20180518
	Continue developing the application.
	20180520
	Change filename from app/capacitor_charging.html to
	app/butiran/app/fast_charging_battery.js as part of
	butiran.js project, and move the old one into sandbox.
*/

// Require classes
var Sequence = require('../lib/sequence')();
var Generator = require('../lib/generator')();

// Execute main function in development stage
main();

// Define main function
function main() {
	
	// Define application name
	var appname = "fcbs";
	
	// Define time step
	var dt = 0.001; // s
	
	// Define significant digit
	var digit = -Math.floor(Math.log(dt) / Math.exp(1));

	// Define pattern for sequence as voltage source
	var ptn1 = [
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1
	];
	var ptn2 = [
		0, 0,
		1, 1
	];
	
	// Define sequences
	var seq1 = new Sequence(ptn1);
	var seq2 = new Sequence(ptn2);

	// Define signal amplitudo
	var amp1 = 10; // V
	var amp2 = 15; // V
	
	// Create a signal generator with two output signals
	var SG = new Generator(dt, [seq1, seq2], [amp1, amp2]);
	
	var outstr = "# t\tV1\tV2\n";
	var N = 25;
	for(var i = 0; i < N; i++) {
		var signal = SG.ping();
		var M = signal.length;
		for(var j = 0; j < M; j++) {
			var x2d = signal[j].toFixed(digit);
			var x = signal[j];
			outstr += (j == 0) ? x2d : x;
			if(j < M - 1) {
				outstr += "\t";
			} else {
				outstr += "\n";				
			}
		}
	}
	
	// Write to file
	var fname = "data.txt";
	const fs = require('fs');
	fs.writeFile(fname, outstr, function(err) {
		if(err) throw err;
		console.log(appname + ": " + fname + " saved");
	});
	
}

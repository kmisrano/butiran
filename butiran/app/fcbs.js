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
var Resistor = require('../lib/resistor')();

// Execute main function in development stage
main();

// Define main function
function main() {
	
	// Define application name
	var appname = "fcbs";
	
	// Define simulation duration
	var dt = 0.001; // s
	var tbeg = 0; // s
	var tend = 1; // s
	
	// Define significant digit
	var digit = -Math.floor(Math.log(dt) / Math.exp(1));

	// Define pattern for sequence as voltage source
	var ptn1 = [
		0, 0, 0, 0, 0,
		1, 1, 1, 1, 1,
	]; // 10 ms
	var ptn2 = [
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
	]; // 100 ms
	
	// Define sequences
	var seq1 = new Sequence(ptn1);
	var seq2 = new Sequence(ptn2);

	// Define signal amplitudo
	var amp1 = 10; // V
	var amp2 = 20; // V
	
	// Create a signal generator with two output signals
	var SG = new Generator(dt, [seq1, seq2], [amp1, amp2]);
	
	// Define properties of electronic components
	var R = 200; // \Omega
	var C = 0.01; // F
	var T = R * C;
	var Tint = 0.1; // s
	var Rmin = 100; // \Omega
	var Rmax = 1000; // \Omega
	var Rint = new Resistor(Rmin, Rmax, Tint);
	
	var outstr = "# t\tVs\tVR\tVC\tI\n";
	
	// Perform simulation
	var t = tbeg;
	while(t < tend + dt) {
		var signal = SG.ping();
		var V = signal[2];
		
		
		var linestr = t.toFixed(digit)+ "\t" + signal[2] + "\n";
		//console.log(linestr);
		outstr += linestr;
		t += dt;
	}
	console.log(outstr);
	
	// Write to file
	/*
	var fname = "data.txt";
	const fs = require('fs');
	fs.writeFile(fname, outstr, function(err) {
		if(err) throw err;
		console.log(appname + ": " + fname + " saved");
	});
	*/
}

/*
	fast_charging_battery.js
	Simulation for battery charging based on capacitor model
	
	Sparisoma Viridi | dudung@gmail.com
	
	Execute: node app/fast_charging_battery.js
	
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
	
	// Define time step
	var dt = 0.001; // s

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
	
	// Define generator
	var gen = new Generator(dt, [seq1, seq2], [amp1, amp2]);
	
	var N = 25;
	for(var i = 0; i < N; i++) {
		var signal = gen.ping();
		console.log(signal);
	}
}

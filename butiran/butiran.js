/*
	butiran.js
	Simulation for granular particles system
	
	Sparisoma Viridi | dudung@gmail.com
	
	Execute: node butiran.js
	Compile: webpack butiran.js -o dist/butiran.min.js
	
	Version info:
		Node.js	v10.1.0
		webpack	4.8.3
		npm 5.6.0
	
	20180519
	Start recreating this library, now with node.js support
	and try to use ES modules, which is still experimental.
	20180520
	Write how to node and webpack of butiran.js to get
	butiran.js.min file in dest folder.
	Add class of Polynomial to this script, test it, and ok.
	Random, Integration, RGB functions and Timer class are
	also ok.
*/

// Require classes
var Sequence = require('./lib/sequence')();
var Polynomial = require('./lib/polynomial')();
var Timer = require('./lib/timer')();

// Require functions
var Random = require('./lib/random');
var Integration = require('./lib/integration');
var RGB = require('./lib/rgb');

// Store information 
if(typeof window !== 'undefined') {
	// Store to window object -- 20180519.2358
	window["Sequence"] = Sequence;
	window["Polynomial"] = Polynomial;
	window["Random"] = Random;
	window["Integration"] = Integration;
	window["RGB"] = RGB;
	window["Timer"] = Timer;
}

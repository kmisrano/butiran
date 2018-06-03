/*
	butiran.js
	Simulation for granular particles system
	
	Sparisoma Viridi | dudung@gmail.com
	
	Execute: node butiran.js
	Compile: webpack butiran.js -o dist\butiran.min.js
	
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
	20180527
	Port Vect3, Grain from old version.
	20180603
	Fix Grain and add new Buoyant, Gravitation.
*/

// Require classes
var Sequence = require('./lib/sequence')();
var Polynomial = require('./lib/polynomial')();
var Timer = require('./lib/timer')();
var Resistor = require('./lib/resistor')();
var Generator = require('./lib/generator')();
var Vect3 = require('./lib/vect3')();
var Grain = require('./lib/grain')();
var Buoyant = require('./lib/force/buoyant')();
var Gravitational = require('./lib/force/gravitational')();
var Electrostatic = require('./lib/force/electrostatic')();
var Normal = require('./lib/force/normal')();

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
	window["Resistor"] = Resistor;
	window["Generator"] = Generator;
	window["Vect3"] = Vect3;
	window["Grain"] = Grain;
	window["Buoyant"] = Buoyant;
	window["Gravitational"] = Gravitational;
	window["Electrostatic"] = Electrostatic;
	window["Normal"] = Normal;
}

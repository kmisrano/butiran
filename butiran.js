/*
	butiran.js
	Simulation for granular particles system
	
	Sparisoma Viridi | dudung@gmail.com
	
	Execute:
	node butiran.js
	
	Compile:
	webpack butiran.js --mode=production -o dist\butiran.min.js
	webpack butiran.js --mode=none -o dist\butiran.js
	
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
	Fix Grain and add new Buoyant, Gravitation, Electrostatic,
	Normal, Spring.
	Change folder structure.
	20180612
	Add grid/tablet.js for grid based simulation of tablet
	dissolution.
	20180613
	Find webpack with mode=none which produces not optimized
	output of butiran.js in one file.
*/

// lib
var Grain = require('./lib/grain')();
var Vect3 = require('./lib/vect3')();

// lib/color
var RGB = require('./lib/color/rgb');

// lib/electronic
var Resistor = require('./lib/electronic/resistor')();

// lib/force
var Buoyant = require('./lib/force/buoyant')();
var Drag = require('./lib/force/drag')();
var Electrostatic = require('./lib/force/electrostatic')();
var Gravitational = require('./lib/force/gravitational')();
var Magnetic = require('./lib/force/magnetic')();
var Normal = require('./lib/force/normal')();
var Spring = require('./lib/force/spring')();

// lib/generator
var Generator = require('./lib/generator/generator')();
var Sequence = require('./lib/generator/sequence')();
var Timer = require('./lib/generator/timer')();

// lib/grid
var Tablet = require('./lib/grid/tablet');

// lib/math
var Integration = require('./lib/math/integration');
var Polynomial = require('./lib/math/polynomial')();
var Random = require('./lib/generator/random');

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
	window["Spring"] = Spring;
	window["Drag"] = Drag;
	window["Magnetic"] = Magnetic;
	window["Tablet"] = Tablet;
}

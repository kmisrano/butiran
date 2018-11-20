/*
	ab_ssltfs.js
	Main program of simple single lane traffic flow
	simulation with agent-based model
	
	Sparisoma Viridi | dudung@gmail.compile
	
	20181030
	Start this program.
*/


/*
	random.js
	Generate random number
	
	Sparisoma Viridi | dudung@gmail.com
	
	20180302
	Create this library of functions.
	20180520
	Add module.export for ES module support.
	20181031
	Keep it modular and use it in ab_ssltfs.
*/

// Generate int \in [min, max]
function randInt(min, max) {
	var x = Math.random() * (max - min) + min;
	x = Math.round(x);
	return x;
}

// Generate array of N number of int
function randIntN(min, max, N) {
	var x = [];
	for(var i = 0; i < N; i++) {
		x.push(randInt(min, max));
	}
	return x;
}

// 20181031.0145 keep it modular
/*
// Export module -- 20180520.0724 ok
module.exports = {
	randInt: function(min, max) {
		return randInt(min, max);
	},
	randIntN: function(min, max, N) {
		return randIntN(min, max, N);
	}
};
*/



/*
	lane.js
	Lane object for simple single lane traffic flow
	simulation with agent-based model
	
	Sparisoma Viridi | dudung@gmail.compile
	
	20181030
	Create this library with constructor, addCoordinates.
*/

// Define class of Lane
class Lane {
	constructor() {
		this.cell = [];
		this.x = [];
		this.y = [];
		this.length = 0;
		
		if(arguments.length != 2) {
			throw new Error("Coordinates x[] and y[] must be " +
				"provided as arguments!");
		} else {
			this.addCoordinates(arguments[0], arguments[1]);
		}
	}
	
	addCoordinates() {
		this.x = arguments[0];
		this.y = arguments[1];
		this.length = this.x.length;
		var lx = this.x.length;
		var ly = this.y.length;
		this.length = (lx < ly) ? lx : ly;
		this.cell.length = this.length;
		this.cell.fill(0);
	}
}



/*
	stoplight.js
	Stopligh object for simple single lane traffic flow
	simulation with agent-based model
	
	Sparisoma Viridi | dudung@gmail.compile
	
	20181030
	Create this library with constructor, state, ping,
	attachToLaneAt, detachFromLane.
	All are tested and ok at 1536.
*/

// Define class of Stoplight
class Stoplight {
	constructor() {
		this.pos = 0;
		this.lane = -1;
		this.sequence = [];
		if(arguments.length < 1) {
			throw new Error("Sequence of Stoplight must be "
				+ "provided as argument!");
		} else {
			this.sequence = arguments[0];
		}
	}
	
	state() {
		return this.sequence[this.pos];
	}
	
	ping() {
		this.pos++;
		if(this.pos >= this.sequence.length) {
			this.pos = 0;
		}
		arguments[0][this.lane].cell[this.lanePos] = -this.state();
	}
	
	attachToLaneAt() {
		this.lane = arguments[0];
		this.lanePos = arguments[1];
	}
	
	detachFromLane() {
		this.lane = -1;
		delete(this.lanePos);
	}
}



/*
	vehicle.js
	Vehicle object for simple single lane traffic flow
	simulation with agent-based model
	
	Sparisoma Viridi | dudung@gmail.compile
	
	20181030
	Create this library with constructor, ping, addToLane.
*/

// Define class of Stoplight
class Vehicle {
	constructor() {
		this.vel = 1;
		if(arguments.length < 1) {
			throw new Error("Velocity of Vehicle must be "
				+ "provided as argument!");
		} else {
			this.vel = arguments[0];
		}
		this.min = 0;
		this.max = 0;
		this.pos = 0;
		this.lane = -1;
	}
	
	ping() {
		var oldpos = this.pos;
		var newpos = oldpos;
		
		this.max = arguments[0][this.lane].cell.length;
		newpos++;
		if(newpos >= this.max) {
			newpos = this.min;
		}
		
		if(arguments[0][this.lane].cell[newpos] == 0) {
			arguments[0][this.lane].cell[oldpos] = 0;
			arguments[0][this.lane].cell[newpos] = 1;
			this.pos = newpos;
		}
	}
	
	attachToLaneAt() {
		this.lane = arguments[0];
		this.lanePos = arguments[1];
		this.min = 0;
	}
	
	detachFromLane() {
		this.min = 0;
		this.max = 0;
		this.lane = -1;
		delete(this.lanePos);
	}
}







/*
	test.js
	Test some functions
	
	Sparisoma Viridi | dudung@gmail.compile
	
	20181030
	Start this library.
	20181031
	Continue adding experimental codes.
*/

// 20181030.0754
function test_xx() {
/*
	Algorithm
	01 Define vehicles with id and speed
	02 Define Stoplight state in a Lane as -1

	10 Advance time
	11 Ping all Stoplight objects
	12 Ping all Lane objects
	13 Ping all Vehicle objects in a Lane object
	14 Move Vehicle according to defined rule
	15 Repeat Step 10 if final time has not been reached
*/

/*
	20181030.1015
	In a lane there are cells with only two states
	0: empty or allowed to be occupied
	1: not allowed to be occupied, since it is
	   filled with vehicle or stoplight is on
	
*/
}

// 20181031.0052
function test_05() {
	// Define examples of coordinates
	var x1 = [
		02, 02, 02, 03, 04, 05, 05, 05, 05, 05,
		05, 06, 07, 08, 09, 10, 11, 12, 13, 14,
		15, 16, 16, 16, 16, 16, 16, 16, 16, 16
	];
	var y1 = [
		03, 04, 05, 05, 05, 05, 06, 07, 08, 09,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 11, 12, 13, 14, 15, 16, 17, 18
	];
	var x2 = [
		16, 16, 16, 15, 14, 13, 12, 11, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 09, 08, 07, 06, 05, 04, 03, 03, 03
	];
	var y2 = [
		02, 03, 04, 04, 04, 04, 04, 04, 04, 05,
		06, 07, 08, 09, 10, 11, 12, 13, 14, 15,
		16, 16, 16, 16, 16, 16, 16, 16, 17, 18
	];
	var x3 = [
		00, 10, 20, 20, 20, 10, 00, 00
	];
	var y3 = [
		00, 00, 00, 10, 20, 20, 20, 10
	];
	
	// Create two lanes and put them into array of lanes
	var lane1 = new Lane(x1, y1);
	lanes.push(lane1);
	var lane2 = new Lane(x2, y2);
	lanes.push(lane2);
	
	/*
	var lane3 = new Lane(x3, y3);
	lanes.push(lane3);
	*/
	
	// Define examples of sequences (traffic ligh plans)
	var seq1 = [0, 0, 0, 0, 0, 1, 1, 1, 1, 1];
	var seq2 = [1, 1, 1, 1, 1, 0, 0, 0, 0, 0];
	/*
	var seq3 = [0, 0, 0, 0, 1, 1, 1, 1];
	*/
	
	// Create two stoplights and put them to array of stoplights
	var stoplight1 = new Stoplight(seq1);
	stoplight1.attachToLaneAt(0, 14);
	stoplights.push(stoplight1);
	var stoplight2 = new Stoplight(seq2);
	stoplight2.attachToLaneAt(1, 13);
	stoplights.push(stoplight2);
	/*
	var stoplight3 = new Stoplight(seq3);
	stoplight3.attachToLaneAt(2, 4);
	stoplights.push(stoplight3);
	*/
	
	// Define examples of vehicles
	var vehicle1 = new Vehicle(4);
	vehicle1.attachToLaneAt(0, 5);
	vehicles.push(vehicle1);
	var vehicle2 = new Vehicle(1);
	vehicle2.attachToLaneAt(0, 0);
	vehicles.push(vehicle2);
	var vehicle3 = new Vehicle(2);
	vehicle3.attachToLaneAt(1, 4);
	vehicles.push(vehicle3);
	var vehicle4 = new Vehicle(2);
	vehicle4.attachToLaneAt(1, 1);
	vehicles.push(vehicle4);
	var vehicle5 = new Vehicle(1);
	vehicle5.attachToLaneAt(1, 0);
	vehicles.push(vehicle5);
}

// 20181030.1927
function test_04() {
	cx.fillStyle = "#f00";
	cx.clearRect(0, 0, 200, 200);
	cx.beginPath();
	cx.arc(100 + 5 * iter, 100, 20, 0, 1);
	cx.stroke();
}

// 20181030.0847 !ok
function test_03() {
	var veh = new Vehicle(1);
	const object = {1: "a", 100: "b", 20: "c"};
	for(var x in object) {
		console.log(Object.entries(object)[x]);
	}
}

// 20181030.0603 ok
function test_02() {
	var L1 = new Lane();
	L1.addX([1, 2, 3, 4, 5]);
	L1.addY([1, 2, 3, 4, 5]);
	return L1;
}

// 20181030.0558 ok
function test_01() {
	var L1 = new Lane();
	console.log(L1.length);
	L1.addX([1, 1, 3, 4, 5]);
	console.log(L1.length);
	L1.addY([0, 1, 1, 3, 4, 5]);
	console.log(L1.length);
}

// 20181030.0552 ok
function test_00() {
	var S1 = new Stoplight([0, 1, 0, 0, 1, 1]);
	for(var i = 0; i < 12; i++) {
		console.log(S1.pos, S1.state());
		S1.ping();
	}
}


// Define some global variables
var ta, btn, can;
var timer;
var period, iter;
var lanes = [];
var stoplights = [];
var vehicles = [];
var caseNumber;

main();

// Define main function
function main() {
	layout();
	
	caseNumber = 2;
	init();
}


// Initialize parameters
function init() {
	// Define parameters for iteration
	period = 500;
	iter = 0;
	
	switch(caseNumber) {
		case 0: initCase0(); break;
		case 1: initCase1(); break;
		case 2: initCase2(); break;
		case 3: initCase3(); break;
		case 4: initCase4(); break;
		case 5: initCase5(); break;
		case 15: initCase15(); break;
	}
}

// Define case 15-19
function initCase15() {
	// Define examples of coordinates
	var x1 = [
		01, 02, 03, 04, 05, 06, 07, 08, 09, 10,
		11, 12, 13, 14, 15, 16, 17, 18, 19, 20
	];
	var x2 = x1.slice();
	var x3 = x1.slice();
	var x4 = x1.slice();
	var x5 = x1.slice();
	var x6 = x1.slice();
	var y1 = []; y1.length = x1.length; y1.fill(18);
	var y2 = []; y2.length = x2.length; y2.fill(15);
	var y3 = []; y3.length = x3.length; y3.fill(12);
	var y4 = []; y4.length = x4.length; y4.fill(9);
	var y5 = []; y5.length = x5.length; y5.fill(6);
	var y6 = []; y6.length = x6.length; y6.fill(3);
	
	
	// Create two lanes and put them into array of lanes
	var lane1 = new Lane(x1, y1); lanes.push(lane1);
	var lane2 = new Lane(x2, y2); lanes.push(lane2);
	var lane3 = new Lane(x3, y3); lanes.push(lane3);
	var lane4 = new Lane(x4, y4); lanes.push(lane4);
	var lane5 = new Lane(x5, y5); lanes.push(lane5);
	var lane6 = new Lane(x6, y6); lanes.push(lane6);
	
	// Define examples of sequences (traffic ligh plans)
	var seq1 = [0, 0, 0, 0, 0, 1, 1, 1, 1, 1];
	
	// Create stoplights and put them to array of stoplights
	var stoplightPos = 10;
	var Nlane = lanes.length;
	for(var i = 0; i < Nlane; i++) {
		var stoplight = new Stoplight(seq1);
		stoplight.attachToLaneAt(i, stoplightPos);
		stoplights.push(stoplight);
	}
	
	// Define examples of vehicles
	var Nlane = lanes.length;
	var Nvpl = 5; // 1, 2, 3, 4, 5 --> case 5-9
	var maxV = 5; // 1, 2, 3, 4, 5 --> case 10-14
	for(var i = 0; i < Nlane; i++) {
		for(var j = 0; j < Nvpl; j++) {
			var v = randInt(1, maxV);
			var vehicle = new Vehicle(v);
			vehicle.attachToLaneAt(i, j);
			vehicles.push(vehicle);
		}
	}
}

// Define case 5-9, 10-14
function initCase5() {
	// Define examples of coordinates
	var x1 = [
		01, 02, 03, 04, 05, 06, 07, 08, 09, 10,
		11, 12, 13, 14, 15, 16, 17, 18, 19, 20
	];
	var x2 = x1.slice();
	var x3 = x1.slice();
	var x4 = x1.slice();
	var x5 = x1.slice();
	var x6 = x1.slice();
	var y1 = []; y1.length = x1.length; y1.fill(18);
	var y2 = []; y2.length = x2.length; y2.fill(15);
	var y3 = []; y3.length = x3.length; y3.fill(12);
	var y4 = []; y4.length = x4.length; y4.fill(9);
	var y5 = []; y5.length = x5.length; y5.fill(6);
	var y6 = []; y6.length = x6.length; y6.fill(3);
	
	
	// Create two lanes and put them into array of lanes
	var lane1 = new Lane(x1, y1); lanes.push(lane1);
	var lane2 = new Lane(x2, y2); lanes.push(lane2);
	var lane3 = new Lane(x3, y3); lanes.push(lane3);
	var lane4 = new Lane(x4, y4); lanes.push(lane4);
	var lane5 = new Lane(x5, y5); lanes.push(lane5);
	var lane6 = new Lane(x6, y6); lanes.push(lane6);
	
	// Define examples of sequences (traffic ligh plans)
	var seq1 = [0, 0, 0, 0, 0, 1, 1, 1, 1, 1];
	
	// Create stoplights and put them to array of stoplights
	var stoplightPos = 10;
	var Nlane = lanes.length;
	for(var i = 0; i < Nlane; i++) {
		var stoplight = new Stoplight(seq1);
		stoplight.attachToLaneAt(i, stoplightPos);
		stoplights.push(stoplight);
	}
	
	// Define examples of vehicles
	var Nlane = lanes.length;
	var Nvpl = 5; // 1, 2, 3, 4, 5 --> case 5-9
	var maxV = 5; // 1, 2, 3, 4, 5 --> case 10-14
	for(var i = 0; i < Nlane; i++) {
		for(var j = 0; j < Nvpl; j++) {
			var v = randInt(1, maxV);
			var vehicle = new Vehicle(v);
			vehicle.attachToLaneAt(i, j);
			vehicles.push(vehicle);
		}
	}
}

// Define case 4
function initCase4() {
	// Define examples of coordinates
	var x1 = [
		01, 02, 03, 04, 05, 06, 07, 08, 09, 10,
		11, 12, 13, 14, 15, 16, 17, 18, 19, 20
	];
	var x2 = x1.slice();
	var x3 = x1.slice();
	var x4 = x1.slice();
	var x5 = x1.slice();
	var x6 = x1.slice();
	var y1 = []; y1.length = x1.length; y1.fill(18);
	var y2 = []; y2.length = x2.length; y2.fill(15);
	var y3 = []; y3.length = x3.length; y3.fill(12);
	var y4 = []; y4.length = x4.length; y4.fill(9);
	var y5 = []; y5.length = x5.length; y5.fill(6);
	var y6 = []; y6.length = x6.length; y6.fill(3);
	
	
	// Create two lanes and put them into array of lanes
	var lane1 = new Lane(x1, y1); lanes.push(lane1);
	var lane2 = new Lane(x2, y2); lanes.push(lane2);
	var lane3 = new Lane(x3, y3); lanes.push(lane3);
	var lane4 = new Lane(x4, y4); lanes.push(lane4);
	var lane5 = new Lane(x5, y5); lanes.push(lane5);
	var lane6 = new Lane(x6, y6); lanes.push(lane6);
	
	// Define examples of sequences (traffic ligh plans)
	var seq1 = [0, 1];
	
	// Create stoplights and put them to array of stoplights
	var stoplightPos = 10;
	var Nlane = lanes.length;
	for(var i = 0; i < Nlane; i++) {
		var stoplight = new Stoplight(seq1);
		stoplight.attachToLaneAt(i, stoplightPos);
		stoplights.push(stoplight);
	}
	
	// Define examples of vehicles
	var Nlane = lanes.length;
	var Nvpl = 5;
	var maxV = 5;
	for(var i = 0; i < Nlane; i++) {
		for(var j = 0; j < Nvpl; j++) {
			var v = randInt(1, maxV);
			var vehicle = new Vehicle(v);
			vehicle.attachToLaneAt(i, j);
			vehicles.push(vehicle);
		}
	}
}

// Define case 3
function initCase3() {
	// Define examples of coordinates
	var x1 = [
		01, 02, 03, 04, 05, 06, 07, 08, 09, 10,
		11, 12, 13, 14, 15, 16, 17, 18, 19, 20
	];
	var x2 = x1.slice();
	var x3 = x1.slice();
	var x4 = x1.slice();
	var x5 = x1.slice();
	var x6 = x1.slice();
	var y1 = []; y1.length = x1.length; y1.fill(18);
	var y2 = []; y2.length = x2.length; y2.fill(15);
	var y3 = []; y3.length = x3.length; y3.fill(12);
	var y4 = []; y4.length = x4.length; y4.fill(9);
	var y5 = []; y5.length = x5.length; y5.fill(6);
	var y6 = []; y6.length = x6.length; y6.fill(3);
	
	
	// Create two lanes and put them into array of lanes
	var lane1 = new Lane(x1, y1); lanes.push(lane1);
	var lane2 = new Lane(x2, y2); lanes.push(lane2);
	var lane3 = new Lane(x3, y3); lanes.push(lane3);
	var lane4 = new Lane(x4, y4); lanes.push(lane4);
	var lane5 = new Lane(x5, y5); lanes.push(lane5);
	var lane6 = new Lane(x6, y6); lanes.push(lane6);
	
	// Define examples of sequences (traffic ligh plans)
	var seq1 = [0, 0, 1, 1];
	
	// Create stoplights and put them to array of stoplights
	var stoplightPos = 10;
	var Nlane = lanes.length;
	for(var i = 0; i < Nlane; i++) {
		var stoplight = new Stoplight(seq1);
		stoplight.attachToLaneAt(i, stoplightPos);
		stoplights.push(stoplight);
	}
	
	// Define examples of vehicles
	var Nlane = lanes.length;
	var Nvpl = 5;
	var maxV = 5;
	for(var i = 0; i < Nlane; i++) {
		for(var j = 0; j < Nvpl; j++) {
			var v = randInt(1, maxV);
			var vehicle = new Vehicle(v);
			vehicle.attachToLaneAt(i, j);
			vehicles.push(vehicle);
		}
	}
}

// Define case 2
function initCase2() {
	// Define examples of coordinates
	var x1 = [
		01, 02, 03, 04, 05, 06, 07, 08, 09, 10,
		11, 12, 13, 14, 15, 16, 17, 18, 19, 20
	];
	var x2 = x1.slice();
	var x3 = x1.slice();
	var x4 = x1.slice();
	var x5 = x1.slice();
	var x6 = x1.slice();
	var y1 = []; y1.length = x1.length; y1.fill(18);
	var y2 = []; y2.length = x2.length; y2.fill(15);
	var y3 = []; y3.length = x3.length; y3.fill(12);
	var y4 = []; y4.length = x4.length; y4.fill(9);
	var y5 = []; y5.length = x5.length; y5.fill(6);
	var y6 = []; y6.length = x6.length; y6.fill(3);
	
	
	// Create two lanes and put them into array of lanes
	var lane1 = new Lane(x1, y1); lanes.push(lane1);
	var lane2 = new Lane(x2, y2); lanes.push(lane2);
	var lane3 = new Lane(x3, y3); lanes.push(lane3);
	var lane4 = new Lane(x4, y4); lanes.push(lane4);
	var lane5 = new Lane(x5, y5); lanes.push(lane5);
	var lane6 = new Lane(x6, y6); lanes.push(lane6);
	
	// Define examples of sequences (traffic ligh plans)
	var seq1 = [0, 0, 0, 1, 1, 1];
	
	// Create stoplights and put them to array of stoplights
	var stoplightPos = 10;
	var Nlane = lanes.length;
	for(var i = 0; i < Nlane; i++) {
		var stoplight = new Stoplight(seq1);
		stoplight.attachToLaneAt(i, stoplightPos);
		stoplights.push(stoplight);
	}
	
	// Define examples of vehicles
	var Nlane = lanes.length;
	var Nvpl = 5;
	var maxV = 5;
	for(var i = 0; i < Nlane; i++) {
		for(var j = 0; j < Nvpl; j++) {
			var v = randInt(1, maxV);
			var vehicle = new Vehicle(v);
			vehicle.attachToLaneAt(i, j);
			vehicles.push(vehicle);
		}
	}
}

// Define case 1
function initCase1() {
	// Define examples of coordinates
	var x1 = [
		01, 02, 03, 04, 05, 06, 07, 08, 09, 10,
		11, 12, 13, 14, 15, 16, 17, 18, 19, 20
	];
	var x2 = x1.slice();
	var x3 = x1.slice();
	var x4 = x1.slice();
	var x5 = x1.slice();
	var x6 = x1.slice();
	var y1 = []; y1.length = x1.length; y1.fill(18);
	var y2 = []; y2.length = x2.length; y2.fill(15);
	var y3 = []; y3.length = x3.length; y3.fill(12);
	var y4 = []; y4.length = x4.length; y4.fill(9);
	var y5 = []; y5.length = x5.length; y5.fill(6);
	var y6 = []; y6.length = x6.length; y6.fill(3);
	
	
	// Create two lanes and put them into array of lanes
	var lane1 = new Lane(x1, y1); lanes.push(lane1);
	var lane2 = new Lane(x2, y2); lanes.push(lane2);
	var lane3 = new Lane(x3, y3); lanes.push(lane3);
	var lane4 = new Lane(x4, y4); lanes.push(lane4);
	var lane5 = new Lane(x5, y5); lanes.push(lane5);
	var lane6 = new Lane(x6, y6); lanes.push(lane6);
	
	// Define examples of sequences (traffic ligh plans)
	var seq1 = [0, 0, 0, 0, 1, 1, 1, 1];
	
	// Create stoplights and put them to array of stoplights
	var stoplightPos = 10;
	var Nlane = lanes.length;
	for(var i = 0; i < Nlane; i++) {
		var stoplight = new Stoplight(seq1);
		stoplight.attachToLaneAt(i, stoplightPos);
		stoplights.push(stoplight);
	}
	
	// Define examples of vehicles
	var Nlane = lanes.length;
	var Nvpl = 5;
	var maxV = 5;
	for(var i = 0; i < Nlane; i++) {
		for(var j = 0; j < Nvpl; j++) {
			var v = randInt(1, maxV);
			var vehicle = new Vehicle(v);
			vehicle.attachToLaneAt(i, j);
			vehicles.push(vehicle);
		}
	}
}

// Define case 0
function initCase0() {
	// Define examples of coordinates
	var x1 = [
		01, 02, 03, 04, 05, 06, 07, 08, 09, 10,
		11, 12, 13, 14, 15, 16, 17, 18, 19, 20
	];
	var x2 = x1.slice();
	var x3 = x1.slice();
	var x4 = x1.slice();
	var x5 = x1.slice();
	var x6 = x1.slice();
	var y1 = []; y1.length = x1.length; y1.fill(18);
	var y2 = []; y2.length = x2.length; y2.fill(15);
	var y3 = []; y3.length = x3.length; y3.fill(12);
	var y4 = []; y4.length = x4.length; y4.fill(9);
	var y5 = []; y5.length = x5.length; y5.fill(6);
	var y6 = []; y6.length = x6.length; y6.fill(3);
	
	
	// Create two lanes and put them into array of lanes
	var lane1 = new Lane(x1, y1); lanes.push(lane1);
	var lane2 = new Lane(x2, y2); lanes.push(lane2);
	var lane3 = new Lane(x3, y3); lanes.push(lane3);
	var lane4 = new Lane(x4, y4); lanes.push(lane4);
	var lane5 = new Lane(x5, y5); lanes.push(lane5);
	var lane6 = new Lane(x6, y6); lanes.push(lane6);
	
	// Define examples of sequences (traffic ligh plans)
	var seq1 = [0, 0, 0, 0, 0, 1, 1, 1, 1, 1];
	
	// Create stoplights and put them to array of stoplights
	var stoplightPos = 10;
	var Nlane = lanes.length;
	for(var i = 0; i < Nlane; i++) {
		var stoplight = new Stoplight(seq1);
		stoplight.attachToLaneAt(i, stoplightPos);
		stoplights.push(stoplight);
	}
	
	// Define examples of vehicles
	var Nlane = lanes.length;
	var Nvpl = 5;
	var maxV = 5;
	for(var i = 0; i < Nlane; i++) {
		for(var j = 0; j < Nvpl; j++) {
			var v = randInt(1, maxV);
			var vehicle = new Vehicle(v);
			vehicle.attachToLaneAt(i, j);
			vehicles.push(vehicle);
		}
	}
}

// Define simulate function
function simulate() {
	var content = iter + "\n";
	var N = lanes.length;
	for(var i = 0; i < N; i++) {
		var M = lanes[i].cell.length;
		var line = "";
		for(var j = 0; j < M; j++) {
			line += lanes[i].cell[j] + " ";
		}
		content += "L" + i + ": " + line + "\n";
	}
	ta.value = content;
	ta.scrollTop = ta.scrollHeight;
	
	var N = stoplights.length;
	for(var i = 0; i < N; i++) {
		stoplights[i].ping(lanes);
	}
	
	var N = vehicles.length;
	for(var i = 0; i < N; i++) {
		var M = vehicles[i].vel;
		for(var j = 0; j < M; j++) {
			vehicles[i].ping(lanes);
		}
	}
	
	drawLanes(lanes);
	
	iter++;
}

// Draw lanes
function drawLanes() {
	var cx = can.getContext("2d");
	var XMIN = 0;
	var XMAX = can.width;
	var YMIN = can.height;
	var YMAX = 0;
	var xmin = 0;
	var xmax = 22;
	var ymin = 0;
	var ymax = 22;
	
	var boxWidthX = (XMAX - XMIN) / (xmax - xmin);
	var boxWidthY = -(YMAX - YMIN) / (ymax - ymin);
	var boxWidth = Math.min(boxWidthX, boxWidthY);
	
	function tx(x) {
		var X = (x - xmin) / (xmax - xmin);
		X *= (XMAX - XMIN);
		X += XMIN;
		return X;
	}
	function ty(y) {
		var Y = (y - ymin) / (ymax - ymin);
		Y *= (YMAX - YMIN);
		Y += YMIN;
		return Y;
	}
	
	var M = arguments[0].length;
	for(var j = 0; j < M; j++) {
		var N = arguments[0][j].cell.length;
		for(var i = 0; i < N; i++) {
			var lane = arguments[0][j];
			var X = tx(lane.x[i]);
			var Y = ty(lane.y[i]);
			cx.beginPath();
			var fillStyle = "#fff";
			if(lane.cell[i] == 1) {
				fillStyle = "#000";
			} else if (lane.cell[i] == -1) {
				fillStyle = "#f00";
			}
			cx.fillStyle = fillStyle;
			cx.fillRect(X, Y, boxWidth, -boxWidth);
			cx.lineWidth = 0.5;
			cx.rect(X, Y, boxWidth, -boxWidth);
			cx.stroke();
		}		
	}
}

// Define start-stop button
function btnClick() {
	var cap = event.target.innerHTML;
	if(cap == "Start") {
		timer = setInterval(simulate, period);
		cap = "Stop";
	} else {
		clearInterval(timer);
		cap = "Start";
	}
	event.target.innerHTML = cap;
}


// Define layout
function layout() {
	ta = document.createElement("textarea");
	document.body.append(ta);
	ta.style.width = "400px";
	ta.style.height = "200px";
	ta.style.overflowY = "scroll";

	btn = document.createElement("button");
	document.body.append(btn);
	btn.innerHTML = "Start";
	btn.addEventListener("click", btnClick)
	
	can = document.createElement("canvas");
	document.body.append(can);
	can.width = "200";
	can.height = "200";
	can.style.width = "200px";
	can.style.height = "200px";
	can.style.background = "#fff";
	can.style.border = "1px solid #aaa";
}


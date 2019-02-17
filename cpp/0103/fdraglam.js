/*
	fdraglam.js
	Laminar flow drag force on collidable spherical grains
	
	Sparisoma Viridi | https://github.com/dudung/butiran
	
	Include: <script src="fdraglam.js"></script> in a HTML file
	Execute: Refresh web browser viewing the HTML file
	
	20190203
	1654 Beg zuhause, derived from rbccoll.js file.
	20190203
	0335 Cont zuhause, do the layout.
	20190216
	2005 Start again zuhause.
	20190217
	0717 Con zuhause.
	0917 Con @Neutron
	
	References
	1. Input range event
	url https://stackoverflow.com/a/19067260/9475509
*/

// Define global variables for walls
var L, R;
var w1, w2, w3, w4, w5, w6, w7, w8;
var WL, WR, WT, WB;
var wL, wR, wT, wB;
var wall, Nw, kw;

// Define global variables for parameters
var gacc, rhof, etaf, velf, kcol;

// Define global variables for simulation
var tstep, tbeg, tend, tdata, tproc;

// Define global variables for coordinates
var xmin, ymin, xmax, ymax;

// Define global variables for box
var boxh, boxw, boxt;

// Define global variables for grains
var diag, rhog, numg, geng, r, v, m, D;

// Define global variables for visual elements
var taIn, caOut, taOut0, taOut1;
var btClear, btLoad, btRead, btStart, btInfo;
var teIn, inIn;

// Execute main function
main();

// Define main function
function main() {
	// Set layout of visual elements
	setElementsLayout();
	
	// Initialize physical parameters
	initParams();
}

// Set layout of all elements
function setElementsLayout() {
	// Create input textarea
	taIn = document.createElement("textarea");
	taIn.style.width = "150px";
	taIn.style.height = "390px";
	taIn.style.overflowY = "scroll"
	taIn.style.float = "left";
	
	// Create output canvas
	caOut = document.createElement("canvas");
	caOut.width = "150";
	caOut.height = "394";
	caOut.style.width = caOut.width + "px";
	caOut.style.height = caOut.height + "px";
	caOut.style.float = "left";
	caOut.style.border = "#aaa 1px solid";
	caOut.style.paddingRight = "2px";
	var cx = caOut.getContext("2d");
	cx.fillStyle = "#fff";
	cx.fillRect(0, 0, caOut.width, caOut.height);
	
	// Create ouput textarea 0
	taOut0 = document.createElement("textarea");
	taOut0.style.width = "252px";
	taOut0.style.height = "192px"
	taOut0.style.overflowY = "scroll";
	taOut0.style.float = "right";
	
	// Create ouput textarea 1
	taOut1 = document.createElement("textarea");
	taOut1.style.width = "252px";
	taOut1.style.height = "192px";
	taOut1.style.overflowY = "scroll";
	taOut1.style.float = "right";
	
	// Create buttons
	btClear = document.createElement("button");
	btClear.innerHTML = "Clear";
	btClear.style.width = "70px";
	btClear.addEventListener("click", buttonClick);

	btLoad = document.createElement("button");
	btLoad.innerHTML = "Load";
	btLoad.style.width = "70px";
	btLoad.addEventListener("click", buttonClick);
	
	btRead = document.createElement("button");
	btRead.innerHTML = "Read";
	btRead.style.width = "70px";
	btRead.disabled = true;
	btRead.addEventListener("click", buttonClick);

	btStart = document.createElement("button");
	btStart.innerHTML = "Start";
	btStart.style.width = "70px";
	btStart.disabled = true;
	btStart.addEventListener("click", buttonClick);

	btInfo = document.createElement("button");
	btInfo.innerHTML = "Info";
	btInfo.style.width = "70px";
	btInfo.addEventListener("click", buttonClick);
	
	// Create main division
	var div0 = document.createElement("div");
	div0.style.border = "#aaa 1px solid";
	div0.style.width = 340
		+ parseInt(taIn.style.width)
		+ parseInt(caOut.style.width) + "px";
	div0.style.height = 6
		+ parseInt(taIn.style.height) + "px";
	div0.style.background = "#eee";
	
	// Create button division
	var div1 = document.createElement("div");
	div1.style.width = "70px";
	div1.style.height = (105 + 290) + "px";
	div1.style.float = "left";
	div1.style.border = "#aaa 1px solid";
	
	// Create control division
	var div2 = document.createElement("div");
	div2.style.width = "70px";
	div2.style.height = "130px";
	div2.style.border = "#aaa 1px solid";
	div2.style.textAlign = "center";
	
	// Create label and input range
	teIn = document.createElement("text");
	teIn.innerHTML = "Flow";
	teIn.style.fontSize = "10pt";
	inIn = document.createElement("input");
	inIn.type = "range";
	inIn.style.transform = "rotate(270deg)";
	inIn.style.width = "65px";
	inIn.style.height = "100px";
	inIn.value = 0;
	inIn.addEventListener("input", changeFluidVelocity);
	
	// Set layout of visual components
	document.body.append(div0);
		div0.append(taIn);
		div0.append(div1);
			div1.append(btClear);
			div1.append(btLoad);
			div1.append(btRead);
			div1.append(btStart);
			div1.append(btInfo);
			div1.append(div2);
				div2.append(teIn);
				div2.append(inIn);
		div0.append(caOut);
		div0.append(taOut0);
		div0.append(taOut1);
}

// Change fluid up velocity
function changeFluidVelocity() {
	var val = event.target.value;
	var v = val;
	tout(taOut1, "Flow\n");
	tout(taOut1, "velocity is changed to " + v + " %\n\n");
}

// Do something when buttons clicked
function buttonClick() {
	// Get target and verbose to taOut1
	var target = event.target;
	var cap = target.innerHTML;
	tout(taOut1, cap + "\n");
	
	// Perform according to the clicked button
	if(cap == "Load") {
		loadParameters(taIn);
		btRead.disabled = false;
		tout(taOut1, "Parameters are loaded\n\n");
	} else if(cap == "Clear") {
		clearAll();
		btRead.disabled = true;
		btStart.disabled = true;
		tout(taOut1, "All are cleared except this element\n\n");
	} else if(cap == "Read") {
		readParameters(taIn);
		initParams();
		btStart.disabled = false;
		tout(taOut1, "Parameters are read\n\n");
	} else if(cap == "Start") {
		target.innerHTML = "Stop";
		btRead.disabled = true;
		taIn.disabled = true;
		tout(taOut1, "Simulation starts\n\n");
		//proc = setInterval(simulate, Tproc);
	} else if(cap == "Stop") {
		target.innerHTML = "Start";
		btRead.disabled = false;
		taIn.disabled = false;
		tout(taOut1, "Simulation stops\n\n");
		//clearInterval(proc);
	} else if(cap == "Info") {
		tout(taOut1, "fdraglam.js -- 20190217\n"
			+ "Laminar flow drag force "
			+ "on collidable spherical grains\n"
			+ "Sparisoma Viridi | "
			+ "https://github.com/dudung/butiran"
			+ "\n\n"
		);
	}
}

// Clear all
function clearAll() {
	taIn.value = "";
	taOut0.value = "";
	var cx = caOut.getContext("2d");
	cx.fillStyle = "#fff";
	cx.fillRect(0, 0, caOut.width, caOut.height);
}

// Load parameters to textarea
function loadParameters() {
	var lines = "";
	lines += "# Parameters\n";
	lines += "GACC 9.807\n";    // Gravitation      m/s2
	lines += "RHOF 1000\n";     // Fluid density    kg/m3
	lines += "ETAF 8.90E-4\n";  // Fluid vicosity   Pa.s
	lines += "VELF 1\n";        // Fluid velocity   m/s
	lines += "KCOL 10000\n";    // Normal constant  N/m
	
	lines += "\n";
	lines += "# Simulation\n";
	lines += "TSTEP 0.001\n";   // Time step        s
	lines += "TBEG 0\n";        // Initial time     s
	lines += "TEND 4\n";        // Final time       s
	lines += "TDATA 0.1\n";     // Data period      s
	lines += "TPROC 1\n";       // Event period     ms
	
	lines += "\n";
	lines += "# Coordinates\n"; 
	lines += "XMIN -0.075\n";   // xmin             m
	lines += "YMIN 0\n";        // ymin             m
	lines += "XMAX 0.075\n";    // xmax             m
	lines += "YMAX 0.400\n";    // ymax             m
	
	lines += "\n";
	lines += "# Box\n"; 
	lines += "BOXH 0.40\n";     // Box height       m
	lines += "BOXW 0.15\n";     // Box width        m
	lines += "BOXT 0.15\n";     // Box thickness    m
	
	lines += "\n";
	lines += "# Grains\n";
	lines += "DIAG 0.01\n"      // Grains diameter  m
	lines += "RHOG 3000\n";     // Grains density   kg/m3
	lines += "NUMG 20\n";       // Number of grains -
	lines += "GENG 0\n";        // Generation type  0 random
	
	var ta = arguments[0];
	ta.value = lines;
	ta.scrollTop = ta.scrollHeight;
}

// Read parameters
function readParameters() {
	var lines = arguments[0].value;
	
	// Get parameters information
	gacc = getValue(lines, "GACC");
	rhof = getValue(lines, "RHOF");
	etaf = getValue(lines, "ETAF");
	velf = getValue(lines, "VELF");
	kcol = getValue(lines, "KCOL");

	// Get simulation information
	tstep = getValue(lines, "TSTEP");
	tbeg = getValue(lines, "TBEG");
	tend = getValue(lines, "TEND");
	tdata = getValue(lines, "TDATA");
	tproc = getValue(lines, "TPROC");

	// Get coordinates information
	xmin = getValue(lines, "XMIN");
	ymin = getValue(lines, "YMIN");
	xmax = getValue(lines, "XMAX");
	ymax = getValue(lines, "YMAX");

	// Get box information
	boxh = getValue(lines, "BOXH");
	boxw = getValue(lines, "BOXW");
	boxt = getValue(lines, "BOXT");

	// Get grains information
	diag = getValue(lines, "DIAG");
	rhog = getValue(lines, "RHOG");
	numg = getValue(lines, "NUMG");
	geng = getValue(lines, "GENG");
}

// Get value from a line inside parameter textarea
function getValue(lines, key) {
	var value = undefined;
	var line = lines.split("\n");
	var N = line.length;
	for(var i = 0; i < N; i++) {
		var col = line[i].split(" ");
		if(col[0] == key) {
			value = parseFloat(col[1]);
		}
	}
	return value;
}

// Initialize all parameters
function initParams() {
	// Define box size, width = 2R, height = L
	R = 0.5 * boxw; // m, boxt = boxw
	L = boxh;       // m
	
	// Define 8 points for box corners
	w1 = new Vect3(R, -R, 0);
	w2 = new Vect3(R, R, 0);
	w3 = new Vect3(-R, -R, 0);
	w4 = new Vect3(-R, R, 0);
	w5 = new Vect3(R, -R, L);
	w6 = new Vect3(R, R, L);
	w7 = new Vect3(-R, -R, L);
	w8 = new Vect3(-R, R, L);
	
	// Define 4 walls using previous points
	WL = [w1, w3, w7, w5];
	WR = [w2, w6, w8, w4];
	WT = [w5, w7, w8, w6];
	WB = [w1, w2, w4, w3];
	wall = [WL, WR, WT, WB];
	Nw = wall.length;
	
	// Calculate center of each wall
	wL = vect3Average(WL);
	wR = vect3Average(WR);
	wT = vect3Average(WT);
	wB = vect3Average(WB);
	
	// Define grains properties
	r = [];
	v = [];
	m = [];
	D = [];
	if(geng == 0) {
		for(var i = 0; i < numg; i++) {
			D.push(diag);
			var R = 0.5 * diag;
			var V = (4 * Math.PI / 3) * R * R * R;
			m.push(rhog * V);
			v.push(new Vect3());
		}
		
		var Nperlayer = parseInt(0.5 * boxw / diag);
		var dx = boxw / Nperlayer
		var Nlayer = Math.ceil(numg / Nperlayer);
		
		var k = 0;
		for(var i = 0; i < Nlayer; i++) {
			for(var j = 0; j < Nperlayer; j++) {
				k++;
				if(k >= numg) {
					break;
				}
			}
		}
		console.log(k, numg);
		
	}
}

// Average some Vect3s
function vect3Average() {
	var r = arguments[0];
	var N = r.length;
	var c = new Vect3;
	for(var i = 0; i < N; i++) {
		c = Vect3.add(c, r[i]);
	}
	c = Vect3.div(c, N);
	return c;
}

// Display text in an output textarea
function tout() {
	var taOut = arguments[0];
	var msg = arguments[1];
	taOut.value += msg;
	taOut.scrollTop = taOut.scrollHeight;
}

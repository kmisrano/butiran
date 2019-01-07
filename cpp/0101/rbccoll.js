/*
	rbccoll.js
	Collion of two RBCs
	
	Sparisoma Viridi | https://github.com/dudung/butiran
	
	Include: <script src="rbccoll.js"></script> in a HTML file
	Execute: Refresh web browser viewing the HTML file
	
	20190107
	Start this program at home in Bandung for today deadline of
	manuscript for 18th AOCMP & 16th SEACOMP, 11-14 November
	2018, Kuala Lumpur, Malaysia, url http://www.aocmp2018.com/.
	Try to fuse md_rbcellips.js and md_fsgdods.js (20190101) files.
	1254 Start physically by designing the interface.
	1403 Pass variable by its string name (elements).
	1754 Finish iteration for time but not yet calculation.
*/	

// Execute main function
main();

// Declare program variables
var pname;
var taIn, caOut, taOut0, taOut1;
var btClear, btLoad, btRead, btStart, btInfo;
var Dg, rhog, mg;
var kS1, kS2, gP, kP, kV, etaF, velF, kN;
var tbeg, tend, dt, Tdata, Tproc, t, iData, NData, digit;
var xmin, ymin, xmax, ymax;
var proc;
var N, r0, r1, v0, v1;

// Define main function
function main() {
	// Initialize program variables
	pname = "rbccoll.js";
	taIn = "params";
	caOut = "visual"
	taOut0 = "grains"
	taOut1 = "time"
	btClear = "clear";
	btLoad = "load";
	btRead = "read";
	btStart = "start";
	btInfo = "info";
	
	// Execute some functions
	console.log(pname);
	setElementsLayout(
		taIn, caOut, taOut0, taOut1,
		btClear, btLoad, btRead, btStart, btInfo
	);
}

// Perform simulation
function simulate() {
		// Check count for displaying output
		if(iData == NData) {
			
			var tout = document.getElementById(taOut0);
			tout.value += t.toFixed(digit) + "\n";
			tout.scrollTop = tout.scrollHeight;
			
			// Reset count
			iData = 0;
		}
		iData++;
		
		// Increase time
		t += dt;
		
		// Terminate process
		if(t > tend + dt) {
			clearInterval(proc);
			document.getElementById(btStart).innerHTML = "Start";
			document.getElementById(btStart).disabled = true;
			document.getElementById(btRead).disabled = false;
			document.getElementById(taIn).disabled = false;
			document.getElementById(taOut0).value += "\n";
		}
}

// Create RBC0 adn RBC1
function createRBCs() {
	
}

// Create visual elements and set layout
function setElementsLayout() {
	// Create input textarea
	var taIn = document.createElement("textarea");
	taIn.style.width = "150px";
	taIn.style.height = "390px";
	taIn.style.overflowY = "scroll"
	taIn.style.float = "left";
	taIn.id = arguments[0];
	
	// Create output canvas
	var caOut = document.createElement("canvas");
	caOut.width = "400";
	caOut.height = "200";
	caOut.style.width = caOut.width + "px";
	caOut.style.height = caOut.height + "px";
	caOut.style.float = "right";
	caOut.style.border = "#aaa 1px solid";
	caOut.style.paddingRight = "2px";
	var cx = caOut.getContext("2d");
	cx.fillStyle = "#fff";
	cx.fillRect(0, 0, caOut.width, caOut.height);
	caOut.id = arguments[1];
	
	// Create ouput textarea 0
	var taOut0 = document.createElement("textarea");
	taOut0.style.width = "161px";
	taOut0.style.height = -2
		+ parseInt(taIn.style.height)
		- parseInt(caOut.style.height) + "px"
	taOut0.style.overflowY = "scroll";
	taOut0.style.float = "left";
	taOut0.id = arguments[2];
	
	// Create ouput textarea 0
	var taOut1 = document.createElement("textarea");
	taOut1.style.width = "161px";
	taOut1.style.height = -2
		+ parseInt(taIn.style.height)
		- parseInt(caOut.style.height) + "px"
	taOut1.style.overflowY = "scroll";
	taOut1.style.float = "left";
	taOut1.id = arguments[3];
	
	// Create buttons
	var btClear = document.createElement("button");
		btClear.innerHTML = "Clear";
		btClear.style.width = "70px";
		btClear.addEventListener("click", buttonClick);
		btClear.id = arguments[4];
	var btLoad = document.createElement("button");
		btLoad.innerHTML = "Load";
		btLoad.style.width = "70px";
		btLoad.addEventListener("click", buttonClick);
		btLoad.id = arguments[5];
	var btRead = document.createElement("button");
		btRead.innerHTML = "Read";
		btRead.style.width = "70px";
		btRead.disabled = true;
		btRead.addEventListener("click", buttonClick);
		btRead.id = arguments[6];
	var btStart = document.createElement("button");
		btStart.innerHTML = "Start";
		btStart.style.width = "70px";
		btStart.disabled = true;
		btStart.addEventListener("click", buttonClick);
		btStart.id = arguments[7];
	var btInfo = document.createElement("button");
		btInfo.innerHTML = "Info";
		btInfo.style.width = "70px";
		btInfo.addEventListener("click", buttonClick);
		btInfo.id = arguments[8];
	
	// Create main division
	var div0 = document.createElement("div");
	div0.style.border = "#aaa 1px solid";
	div0.style.width = 10
		+ parseInt(taIn.style.width)
		+ parseInt(caOut.style.width) + "px";
	div0.style.height = 6
		+ parseInt(taIn.style.height) + "px";
	div0.style.background = "#eee";
	
	// Set layout of visual components
	document.body.append(div0);
		div0.append(taIn);
		div0.append(caOut);
		div0.append(taOut0);
		div0.append(taOut1);
		div0.append(btClear);
		div0.append(btLoad);
		div0.append(btRead);
		div0.append(btStart);
		div0.append(btInfo);
}

// Do something when buttons clicked
function buttonClick() {
	var target = event.target;
	var id = target.id;
	if(id == "load") {
		loadParameters(taIn);
		document.getElementById(btRead).disabled = false;
	} else if(id == "clear") {
		clearAll();
		document.getElementById(btRead).disabled = true;
		document.getElementById(btStart).disabled = true;
	} else if(id == "read") {
		readParameters();
		createRBCs();
		document.getElementById(btStart).disabled = false;
	} else if(id == "start") {
		if(target.innerHTML == "Start") {
			target.innerHTML = "Stop";
			document.getElementById(btRead).disabled = true;
			document.getElementById(taIn).disabled = true;
			proc = setInterval(simulate, Tproc);
		} else {
			target.innerHTML = "Start";
			document.getElementById(btRead).disabled = false;
			document.getElementById(taIn).disabled = false;
			clearInterval(proc);
		}
	}
}

// Clear all
function clearAll() {
	document.getElementById(taIn).value = "";
	document.getElementById(taOut0).value = "";
	var can = document.getElementById(caOut)
	var cx = can.getContext("2d");
	cx.fillStyle = "#fff";
	cx.fillRect(0, 0, can.width, can.height);
}

// Load parameters to textarea
function loadParameters() {
	var lines = "";
	lines += "# Grains\n";
	lines += "DIAG 60E-9\n"
	lines += "RHOG 1000\n";
	lines += "\n";
	
	lines += "# Constants\n";
	lines += "KONS1 1\n";
	lines += "KONS2 1\n";
	lines += "GAMP 1\n";
	lines += "KONP 1\n";
	lines += "KONV 1\n";
	lines += "ETAF 1\n";
	lines += "VELF 1\n";
	lines += "KONN 100\n";
	lines += "\n";
	
	lines += "# Simulation\n";
	lines += "TSTEP 0.001\n";
	lines += "TBEG 0\n";
	lines += "TEND 1\n";
	lines += "TDATA 0.05\n";
	lines += "TPROC 10\n";
	lines += "\n";
	
	lines += "# Coordinates\n";
	lines += "XMIN -10E-6\n";
	lines += "YMIN -5E-6\n";
	lines += "XMAX 10E-6\n";
	lines += "YMAX 5E-6\n";
	
	var ta = document.getElementById(arguments[0]);
	ta.value = lines;
	ta.scrollTop = ta.scrollHeight;
}

// Read parameters
function readParameters() {
	var lines = document.getElementById(taIn).value;
	
	Dg = getValue(lines, "DIAG");
	rhog = getValue(lines, "RHOG");
	mg = rhog * (Math.PI/6) * Dg * Dg * Dg;
	
	kS1 = getValue(lines, "KONS1");
	kS2 = getValue(lines, "KONS2");
	gP = getValue(lines, "GAMP");
	kP = getValue(lines, "KONP"); 
	kV = getValue(lines, "KONV");
	etaF = getValue(lines, "ETAF");
	velF = getValue(lines, "VELF");
	kN = getValue(lines, "KONN");
	
	tbeg = getValue(lines, "TBEG");
	tend = getValue(lines, "TEND");
	dt = getValue(lines, "TSTEP");
	Tdata = getValue(lines, "TDATA");
	Tproc = getValue(lines, "TPROC");
	t = tbeg;
	NData = Math.round(Tdata / dt);
	iData = NData;
	digit = -Math.floor(Math.log10(Tdata));
	
	xmin = getValue(lines, "XMIN");
	ymin = getValue(lines, "YMIN");
	xmax = getValue(lines, "XMAX");
	ymax = getValue(lines, "YMAX");
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

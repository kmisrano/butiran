/*
	md_fsgdods.js
	Floating spherical grain dynamics in one-dimension
	
	Sparisoma Viridi | dudung@gmail.com
	Nurhayati | hayatinur@gmail.com
	
	Execute: node fsgd.js
	
	Version info:
		Node.js	v10.1.0
	
	20180602
	Create this application.
	20180603
	Continue after improving butiran.js and its classes and
	functions.
	20180604
	Run this application after some correction.
	20180929
	Change name according to new naming convention and port to
	html.
	CDN https://rawgit.com/dudung/butiran/master/app
	/md_fsgdods.html
	20181120
	Change to JS.
	20190101 Make HTML interface.
		1030 Finish button interactions.
		1321 Finish porting to HTML with interface.
		1335 Adjust elements width for 4-digit output.
*/

// Execute main function in development stage
main();

// Define main function
function main() {
	// Define some options
	var NODEJS = false;
	var CONSOLE = false;
	var EVENDRIVEN = true;
	
	// Define some physical constants
	var g = 9.81; // m s^-2
	var rhof = 1000; // kg m^-3;
	var etaf = 1E-3; // Pa s
	var Db = 1E-2; // m;
	var rhob = 800; // kg m^-3 (200..900)
	
	// Define application name
	var appname = "fsgd";
	
	// Get command line arguments
	if(NODEJS) {
		var args = process.argv.slice(2);		
	}
	
	// Define visual components
	var taInput = document.createElement("textarea");
	var taOutput = document.createElement("textarea");
	var taLog = document.createElement("textarea");
	var btClear = document.createElement("button");
	var btLoad = document.createElement("button");
	var btRead = document.createElement("button");
	var btStart = document.createElement("button");
	var btInfo = document.createElement("button");
	var caOut = document.createElement("canvas");
	
	// Arrange components in interface
	setComponentsLayout(
		taInput, taOutput, taLog,
		btClear, btLoad, btRead, btStart, btInfo,
		caOut
	);
	
	// Create spherical grain
	var rho = rhob;
	var D = Db;
	var V = (Math.PI / 6) * D * D * D;
	var m = rho * V;
	var grain = new Grain;
	grain.m = m;
	grain.D = D;
	grain.r = new Vect3(0, 0, 0);
	grain.v = new Vect3(0, 0, 0);
	
	// Create buoyant force
	var buoyant = new Buoyant();
	buoyant.setFluidDensity(rhof);
	buoyant.setGravity(new Vect3(0, 0, -g));
	
	// Create gravitational force
	var gravitational = new Gravitational();
	gravitational.setField(new Vect3(0, 0, -g));
	
	// Creat drag force
	var drag = new Drag();
	drag.setConstant(0, 1, 0);

	// Define simulation duration
	var dt = 0.001; // s
	var tbeg = 0; // s
	var tend = 1; // s
	
	// Define data output period
	var Tdata = 0.05; // s
	var Ndata = Math.round(Tdata / dt);
	var idata = Ndata;
	
	// Define significant digit
	var digit = -Math.floor(Math.log(Tdata) / Math.exp(1));
	var eps = 1E-9;
	
	// Define fluid surface parameter
	var Af = 0.01; // m
	var Tf = 1; // s
	var fif0 = 0; // rad
	var Trel = 0.1; //10; // s
	
	// Define data header
	var outstr = "t\tzf\tvf\tVf\tz\tv\n";
	
	// Perform simulation
	var t = tbeg;
	
	// Define iteration
	if(!EVENDRIVEN) {
		while(t < tend + dt) {
			calculate();
		}
	}
	var proc;
	var procInt = 1;
	
	var xmin, ymin, xmax, ymax;
		
	// Define calculation part
	function calculate() {
		// Get motion variables and grain properties
		var z = grain.r.z;
		var v = grain.v.z;
		var m = grain.m;
		var D = grain.D;
		
		// Calculate fluid surface height
		var omegaf = 2 * Math.PI / Tf;
		var zf = Af * Math.sin(omegaf * t + fif0);
		zf = (Math.abs(zf) < eps) ? 0 : zf;
		zf = (t < Trel) ? 0 : zf;
				
		// Calculate fluid surface velocity
		var vf = omegaf * Af * Math.cos(omegaf * t + + fif0);
		vf = (Math.abs(vf) < eps) ? 0 : vf;
		vf = (t < Trel) ? 0 : vf;
		
		// Calculate immersed volume
		var Vf = 0;
		if(z < zf - 0.5 * D) {
			Vf = (Math.PI / 6) * D * D * D;
		} else if(zf - 0.5 * D <= z && z <= zf + 0.5 * D) {
			var zfz = zf - z;
			Vf = Math.PI * (0.25 * D * D * (zfz + 0.5 * D)
				- (1/3) * (zfz * zfz * zfz + (1/8) * D * D * D));
		} else {
			Vf = 0;
		}
		
		// Check count for displaying output
		if(idata == Ndata) {
			var linestr = t.toFixed(digit) + "\t";
			linestr += zf.toExponential(3) + "\t";
			linestr += vf.toExponential(3) + "\t";
			linestr += Vf.toExponential(3) + "\t";
			linestr += z.toExponential(3) + "\t";
			linestr += v.toExponential(3) + "\n";
			
			// Add line of data to output string
			outstr += linestr;
			
			// Verbose values
			if(t == tbeg) {
				taOutput.value += "# t       zf       z        v\n";		
			}
			taOutput.value +=
				t.toExponential(digit) + " " +
				zf.toExponential(digit) + " " +
				z.toExponential(digit) + " " +
				v.toExponential(digit) + "\n";
			taOutput.scrollTop = taOutput.scrollHeight;
			
			// Draw system on canvas
			drawBallAndFluidSurface(zf, z, D);
			
			// Reset count
			idata = 0;
		}
		idata++;
		
		// Calculate gravitational force
		var Fg = gravitational.force(grain);
		
		// Calculate buoyant force
		var Fb = buoyant.force(Vf);
		
		// Calculate drag force
		var Rf = Math.pow((3 * Vf) / (4 * Math.PI), (1/3));
		var c1 = 6 * Math.PI * etaf * Rf;
		if(zf + Rf < z) {
			c1 = 0;
		} else if(zf <= z && z <= zf + Rf) {
			c1 = 6 * Math.PI * etaf * Rf;
		} else {
			var Rb = 0.5 * Db;
			c1 = 6 * Math.PI * etaf * Rb;
		}
		drag.setConstant(0, c1, 0);
		drag.setField(new Vect3(0, 0, vf));
		var Fd = drag.force(grain);
		
		// Sum all forces
		var SF = Vect3.add(Fg, Fb, Fd);
		
		// Calculate acceleration, velocity, and position
		var a = Vect3.div(SF, m).z;
		var v = v + a * dt;
		var z = z + v * dt;

		// Put motion variables back to grain
		grain.r.z = z;
		grain.v.z = v;
		
		// Increase time
		t += dt;
		
		// Terminate process
		if(t > tend + dt) {
			clearInterval(proc);
			taLog.value += "> Stop\n";
			taLog.value += "Process has stopped automatically\n";
			taLog.value += "Please read again the parameters\n\n";
			taLog.scrollTop = taLog.scrollHeight;
			btStart.innerHTML = "Start";
			btStart.disabled = true;
			btRead.disabled = false;
			taOutput.value += "\n";
			taInput.disabled = false;
		}
	}
	
	// Direct results to output
	if(CONSOLE) {
		console.log(outstr);
	} else {
		
	}
	
	// Write to file
	if(NODEJS) {
		if(args[0] != undefined) {
			var fname = args[0];
			const fs = require('fs');
			fs.writeFile(fname, outstr, function(err) {
				if(err) throw err;
				console.log(appname + ": " + fname + " saved");
			});		
		}
	}
	
	// Load parameters
	function loadParameters(ta) {
		var lines = "";
		lines += "# Environment\n";
		lines += "GACC 9.81\n";
		lines += "RHOF 1000\n";
		lines += "ETAF 1E-2\n";
		lines += "\n";
		
		lines += "# Ball\n";
		lines += "DIAB 1E-2\n";
		lines += "RHOB 800\n";
		lines += "\n";
		
		lines += "# Simulation\n";
		lines += "TSTEP 0.001\n";
		lines += "TBEG 0\n";
		lines += "TEND 1\n";
		lines += "TDATA 0.05\n";
		lines += "\n";
		
		lines += "# Oscillation\n";
		lines += "EPSF 1E-9\n";
		lines += "AMPF 0.01\n";
		lines += "PERF 1\n";
		lines += "PHIF 0\n";
		lines += "TRELF 0.1\n";
		lines += "\n";
		
		lines += "# Coordinates\n";
		lines += "XMIN -2E-2\n";
		lines += "YMIN -3.4E-2\n";
		lines += "XMAX 2E-2\n";
		lines += "YMAX 3.4E-2\n";
		
		ta.value = lines;
		ta.scrollTop = ta.scrollHeight;
	}
	
	// Read parameters
	function readParameters() {
		g = getValue(taInput.value, "GACC");
		rhof = getValue(taInput.value, "RHOF");
		etaf = getValue(taInput.value, "ETAF");
		Db = getValue(taInput.value, "DIAB");
		rhob = getValue(taInput.value, "RHOB");
		
		rho = rhob;
		D = Db;
		V = (Math.PI / 6) * D * D * D;
		m = rho * V;
		grain = new Grain;
		grain.m = m;
		grain.D = D;
		grain.r = new Vect3(0, 0, 0);
		grain.v = new Vect3(0, 0, 0);
		
		buoyant = new Buoyant();
		buoyant.setFluidDensity(rhof);
		buoyant.setGravity(new Vect3(0, 0, -g));
		
		gravitational = new Gravitational();
		gravitational.setField(new Vect3(0, 0, -g));
		
		drag = new Drag();
		drag.setConstant(0, 1, 0);

		dt = getValue(taInput.value, "TSTEP");
		tbeg = getValue(taInput.value, "TBEG");
		tend = getValue(taInput.value, "TEND");
		
		Tdata = getValue(taInput.value, "TDATA");
		Ndata = Math.round(Tdata / dt);
		idata = Ndata;
		
		digit = -Math.floor(Math.log(Tdata) / Math.exp(1));
		eps = getValue(taInput.value, "EPSF");
		
		Af = getValue(taInput.value, "AMPF");
		Tf = getValue(taInput.value, "PERF");
		fif0 = getValue(taInput.value, "PHIF");
		Trel = getValue(taInput.value, "TRELF");
		
		t = tbeg;
		
		xmin = getValue(taInput.value, "XMIN");
		ymin = getValue(taInput.value, "YMIN");
		xmax = getValue(taInput.value, "XMAX");
		ymax = getValue(taInput.value, "YMAX");
	}
	
	// Draw system (fluid surface and floting ball) on canvas
	function drawBallAndFluidSurface(zf, z, D) {
		var cx = caOut.getContext("2d");
		cx.clearRect(0, 0, caOut.width, caOut.height);
		
		var rzl = transform(xmin, zf);
		var rzr = transform(xmax, zf);
		
		cx.beginPath();
		cx.fillStyle = "#000";		
		cx.fillText(t.toExponential(digit), 5, 12);
		cx.stroke();
		
		cx.beginPath();
		cx.fillStyle = "#ccf";		
		cx.fillRect(rzl.x, rzl.y, caOut.width, caOut.height - rzl.y);
		cx.stroke();
		
		cx.beginPath();
		cx.strokeStyle = "#55f";
		cx.moveTo(rzl.x, rzl.y);
		cx.lineTo(rzr.x, rzr.y);
		cx.stroke();
		
		cx.beginPath();
		cx.strokeStyle = "#000";		
		var r = transform(0, z);
		var R = Math.abs(transform(0, z + D).y - r.y);
		cx.arc(r.x, r.y, R, 0, 2 * Math.PI);
		cx.stroke();
		
		function transform(x, y) {
			var YMIN = caOut.height;
			var YMAX = 0;
			var XMIN = 0;
			var XMAX = caOut.width;
			
			var X = (x - xmin) / (xmax - xmin) * (XMAX - XMIN) + XMIN;
			var Y = (y - ymin) / (ymax - ymin) * (YMAX - YMIN) + YMIN;
			
			return {x: X, y: Y};
		}
	}
	
	// Set layout of components in interface
	function setComponentsLayout(
		taInput, taOutput, taLog,
		btClear, btLoad, btRead, btStart, btInfo,
		caOut
	) {
		
		var div0 = document.createElement("div");
		var div1 = document.createElement("div");
		var div2 = document.createElement("div");
		
		div0.style.width = "250px";
		div0.style.height = "381px";
		div0.style.border = "0px solid #f00";
		div0.style.paddingRight = "3px";
		div0.style.float = "left";

		div1.style.width = "390px";
		div1.style.height = "381px";
		div1.style.border = "0px solid #0f0";
		div1.style.float = "left";
		
		div2.style.width = "100px";
		div2.style.height = "169px";
		div2.style.border = "0px solid #0f0";
		div2.style.float = "right";
		div2.style.background = "#fff";
		
		taInput.style.width = "244px";
		taInput.style.height = "350px";
		taInput.style.overflowY = "scroll"
		
		taLog.style.width = "386px";
		taLog.style.height = "200px";
		taLog.style.overflowY = "scroll";
		taLog.disabled = true;
		
		taOutput.style.width = "280px";
		taOutput.style.height = "165px";
		taOutput.style.overflowY = "scroll"
		taOutput.style.fontSize = "12px";
		taOutput.disabled = true;
		
		caOut.width = "100";
		caOut.height = "169";
		caOut.style.width = caOut.width + "px";
		caOut.style.height = caOut.height + "px";
		caOut.style.border = "1px solid #bbb";

		btClear.style.width = "50px";
		btClear.innerHTML = "Clear";
		
		btLoad.style.width = "50px";
		btLoad.innerHTML = "Load";
		
		btRead.style.width = "50px";
		btRead.innerHTML = "Read";
		btRead.disabled = true;
		
		btStart.style.width = "50px";
		btStart.innerHTML = "Start";
		btStart.disabled = true;
		
		btInfo.style.width = "50px";
		btInfo.innerHTML = "Info";
		
		document.body.append(div0);
			div0.append(taInput);
			div0.append(btClear);
			div0.append(btLoad);
			div0.append(btRead);
			div0.append(btStart);
			div0.append(btInfo);
		document.body.append(div1);
			div1.append(taLog);
			div1.append(taOutput);
			div1.append(div2);
				div2.append(caOut);
				
		btClear.addEventListener("click", buttonClick);
		btLoad.addEventListener("click", buttonClick);
		btRead.addEventListener("click", buttonClick);
		btStart.addEventListener("click", buttonClick);
		btInfo.addEventListener("click", buttonClick);
		
		function buttonClick() {
			var clickText = event.target.innerHTML;
			taLog.value += "> " + clickText + "\n";
			
			if(clickText == "Info") {
				taLog.value += infoText();
			} else if(clickText == "Start") {
				taLog.value += startText();
				proc = setInterval(calculate, procInt);
				btRead.disabled = true;
				taInput.disabled = true;
				event.target.innerHTML = "Stop";
			} else if(clickText == "Stop") {
				clearInterval(proc);
				btRead.disabled = false;
				taInput.disabled = false;
				event.target.innerHTML = "Start";
			} else if(clickText == "Read") {
				taLog.value += readText();
				readParameters();
				btStart.disabled = false;
			} else if(clickText == "Load") {
				taLog.value += loadText();
				loadParameters(taInput);
				btRead.disabled = false;
				btStart.disabled = true;
			} else if(clickText == "Clear") {
				taLog.value += clearText();
				taInput.value = "";
				taOutput.value = "";
				btRead.disabled = true;
				btStart.disabled = true;
			}
			
			taLog.value += "\n";
			taLog.scrollTop = taLog.scrollHeight;
		}
		
		function infoText() {
		var str = "" +
		"md_fsgdods.js\n" +
		"Floating spherical grain dynamics in one-dimension\n" +
		"\n" +
		"Sparisoma Viridi | dudung@gmail.com\n" +
		"Nurhayati | hayatinur@gmail.com\n" +
		"\n" +
		"Version 20190101\n";
		return str;
		}
		
		function startText() {
		var str = "" +
		"Start the process\n" +
		"Click Stop to pause the process\n";
		return str;
		}
		
		function readText() {
		var str = "" +
		"Read parameters\n";
		return str;
		}
		
		function loadText() {
		var str = "" +
		"Load default parameters\n";
		return str;
		}
		
		function clearText() {
		var str = "" +
		"Clear all but log\n";
		return str;
		}
	}
}

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

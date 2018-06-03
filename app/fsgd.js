/*
	fsgd.js
	Floating spherical grain dynamics in one-dimension
	
	Sparisoma Viridi | dudung@gmail.com
	
	Execute: node fsgd.js
	
	Version info:
		Node.js	v10.1.0
	
	20180602
	Create this application.
	20180603
	Continue after improving butiran.js and its classes and
	functions.
*/

// Require classes
var Vect3 = require('../lib/vect3')();
var Grain = require('../lib/grain')();
var Buoyant = require('../lib/force/buoyant')();
var Gravitational = require('../lib/force/gravitational')();
var Drag = require('../lib/force/drag')();

// Execute main function in development stage
main();

// Define main function
function main() {
	// Define application name
	var appname = "fsgd";
	
	// Get command line arguments
	var args = process.argv.slice(2);
	
	// Create spherical grain
	var rho = 500; // kg m^-3
	var D = 0.1; // m;
	var V = (Math.PI / 6) * D * D * D;
	var m = rho * V;
	var grain = new Grain;
	grain.m = m;
	grain.D = D;
	grain.r = new Vect3(0, 0, 0);
	grain.v = new Vect3(0, 0, 0);
	
	// Create buoyant force
	var buoyant = new Buoyant();
	buoyant.setFluidDensity(1000);
	buoyant.setGravity(new Vect3(0, 0, -10));
	
	// Create gravitational force
	var gravitational = new Gravitational();
	gravitational.setField(new Vect3(0, 0, -10));
	
	// Create gravitational force
	var gravitational = new Gravitational();
	gravitational.setField(new Vect3(0, 0, -10));
	
	// Creat drag force
	var drag = new Drag();
	drag.setConstant(0, 0, 100);

	// Define simulation duration
	var dt = 0.001; // s
	var tbeg = 0; // s
	var tend = 10; // s
	
	// Define data output period
	var Tdata = 0.01; // s
	var Ndata = Math.round(Tdata / dt);
	var idata = Ndata;
	
	// Define significant digit
	var digit = -Math.floor(Math.log(Tdata) / Math.exp(1));
	var eps = 1E-9;
	
	// Define fluid surface parameter
	var Af = 0.01; // m
	var Tf = 1; // s
	var fif0 = 0; // rad
	var Tdelay = 4; // s
	
	// Define data header
	var outstr = "# t\tzf\tVf\tz\tv\n";
	
	// Perform simulation
	var t = tbeg;
	while(t < tend + dt) {
		// Get motion variables and grain properties
		var z = grain.r.z;
		var v = grain.v.z;
		var m = grain.m;
		var D = grain.D;
		
		// Calculate fluid surface height
		var zf = Af * Math.sin(2 * Math.PI * t / Tf + fif0);
		zf = (Math.abs(zf) < eps) ? 0 : zf;
		zf = (t < Tdelay) ? 0 : zf;
		
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
			linestr += Vf.toExponential(3) + "\t";
			linestr += z.toExponential(3) + "\t";
			linestr += v.toExponential(3) + "\t";
			linestr += "\n";
			
			// Add line of data to output string
			outstr += linestr;
			
			// Reset count
			idata = 0;
		}
		idata++;
		
		// Sum all forces
		var Fg = gravitational.force(grain);
		var Fb = buoyant.force(Vf);
		var Fd = drag.force(grain);
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
	}
	console.log(outstr);
	
	// Write to file
	if(args[0] != undefined) {
		var fname = args[0];
		const fs = require('fs');
		fs.writeFile(fname, outstr, function(err) {
			if(err) throw err;
			console.log(appname + ": " + fname + " saved");
		});		
	}
}

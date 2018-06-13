/*
	tablet.js
	Grid based tablet
	
	Sparisoma Viridi | dudung@gmail.com
	
	20180612
	Start this application gstd.js by creating functions
	createBlockTablet, setMaxValue, stepDissolve, and move
	them to grid/tablet.js library. And also tested in HTML.
	Create this library of functions from gstd.js with
	functions createBlockTablet, setMaxValue, stepDissolve.
*/

// Dissolve tablet in one step -- 1702 ok
function stepDissolve(tab) {
	var Nz = tab.length;
	var Ny = tab[0].length;
	var Nx = tab[0][0].length;
	for(var z = 0; z < Nz; z++) {
		for(var y = 0; y < Ny; y++) {
			for(var x = 0; x < Nx; x++) {
				var tabx = (0 < x && x < Nx - 1);
				var taby = (0 < y && y < Ny - 1);
				var tabz = (0 < z && z < Nz - 1);
				if(tabx && taby && tabz) {
					var val = tab[z][y][x];
					var dval = 0;
					if(tab[z][y][x-1] == 0) dval++;
					if(tab[z][y][x+1] == 0) dval++;
					if(tab[z][y-1][x] == 0) dval++;
					if(tab[z][y+1][x] == 0) dval++;
					if(tab[z-1][y][x] == 0) dval++;
					if(tab[z+1][y][x] == 0) dval++;
					val -= dval;
					if(val < 0) val = 0;
					tab[z][y][x] = val;
				}
			}
		}
	}
}

// Set maximum value -- 1613 ok
function setMaxValue(tab, val) {
	var Nz = tab.length;
	var Ny = tab[0].length;
	var Nx = tab[0][0].length;
	for(var z = 0; z < Nz; z++) {
		for(var y = 0; y < Ny; y++) {
			for(var x = 0; x < Nx; x++) {
				tab[z][y][x] *= val;
			}
		}
	}
}

// Create three dimension block tablet -- 1536 ok
function createBlockTablet(Nx, Ny, Nz) {
	var tab = [];
	for(var z = 0; z < Nz; z++) {
		var row = [];
		for(var y = 0; y < Ny; y++) {
			var col = [];
			for(var x = 0; x < Nx; x++) {
				var empx = (x == 0 || x == Nx - 1);
				var empy = (y == 0 || y == Ny - 1);
				var empz = (z == 0 || z == Nz - 1);
				var val = (empx || empy || empz) ? 0 : 1;
				col.push(val);
			}
			row.push(col);
		}
		tab.push(row);
	}
	return tab;
}

// Export module
module.exports = {
	createBlockTablet: function(Nx, Ny, Nz) {
		return createBlockTablet(Nx, Ny, Nz)
	},
	setMaxValue: function(tab, val) {
		return setMaxValue(tab, val);
	},
	stepDissolve: function(tab) {
		return stepDissolve(tab);
	},
};

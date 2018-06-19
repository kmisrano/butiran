/*
	parse.js
	Parse key and value pair
	
	Sparisoma Viridi | dudung@gmail.com
	
	20180618
	Create this library of functions.
	20180619
	Get column from multiline text.	
*/

// Require classes
var Vect3 = require('../vect3')();

// Get value of related key from multi line text with '\n'
function getFrom(text) {
	var par = {
		valueOf: function(key) {
			var lines = text.split('\n');
			var N = lines.length;
			var val;
			for(var i = 0; i < N; i++) {
				var j = lines[i].indexOf(key);
				if(j != -1) {
					var cols = lines[i].split(' ');
					var M = cols.length;
					if(M == 2) {
						val = parseFloat(cols[1]);
					} else if(M == 4) {
						var x = parseFloat(cols[1]);
						var y = parseFloat(cols[2]);
						var z = parseFloat(cols[3]);
						val = new Vect3(x, y, z)
					}
				}
			}
			return val;
		},
		column: function(jcol) {
			var lines = text.split('\n');
			var N = lines.length;
			var val = [];
			for(var i = 0; i < N; i++) {
				var cols = lines[i].split(" ");
				val.push(parseFloat(cols[jcol]));
			}
			return val;
		},
	};
	return par;
}

// Export module
module.exports = {
	getFrom: function(text) {
		return getFrom(text)
	},
};

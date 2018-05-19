/*
	test.js
	Functions for testing objects and functions
	
	Sparisoma Viridi | dudung@gmail.com
	
	20180519
	Create this test script in butiran.
*/

// Define some test functions
module.exports = {
	
	// 20180519.1331 ok
	Sequence: function() {
		var Sequence = require('./sequence');
		var seq = new Sequence();
		var N = 20;
		for(var i = 0; i < N; i++) {
			console.log(seq.ping());
		}
	}
	
};

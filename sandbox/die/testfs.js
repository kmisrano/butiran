function testfs(fname, outstr) {
	const fs = require('fs');
	fs.writeFile(fname, outstr, function(err) {
		if(err) throw err;
		console.log(appname + ": " + fname + " saved");
	});
}

// Export module
module.exports = {
	testfs: function(fname, outstr) {
		return testfs(fname, outstr)
	},
};

ERROR in ./lib/testfs.js
Module not found: Error: Can't resolve 'fs' in 'L:\home\Sparisoma Viridi\Documents\github\butiran\lib'
 @ ./lib/testfs.js 2:12-25
 @ ./butiran.js
 
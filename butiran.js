/*
	butiran.js
	Include another js
	
	Sparisoma Viridi | dudung@gmail.com
	
	20180301
	Create from [1].
	There could be another candidates, e.g. as in [2].
	
	References
	1. heinob, Flimm, StackOverflow 18 Jun 2015,
	URL https://stackoverflow.com/questions/950087
	/how-do-i-include-a-javascript-file
	-in-another-javascript-file [20180301].
	2. jrburke, "require.js", GitHub, 21 Aug 2017
	URL https://github.com/volojs/create-template
	/blob/master/www/lib/require.js [20180301].
*/

// Include another JS synchronously
function require(base, url) {
	var ajax = new XMLHttpRequest();
	var burl = base + url;
	ajax.open("GET", burl, false);
	ajax.onreadystatechange = function() {
		var script = ajax.response || ajax.responseText;
		if(ajax.readyState == 4) {
			switch(ajax.status) {
				case 200:
					eval.apply(window, [script]);
					console.log("Script loaded: ", burl)
					break;
				default:
					console.log("Error: Script not loaded: ", burl);
			}
		}
	};
	ajax.send(null);
}

// Define base url
var base = "https://rawgit.com/dudung/butiran/master/";

// Include required JS
require(base, "grains/vect3.js");
require(base, "color/rgb.js");
require(base, "visual/coordinates.js");
require(base, "visual/electronics/point.js");
require(base, "visual/electronics/connectors.js");
require(base, "visual/electronics/capacitors.js");
require(base, "visual/painter.js");
require(base, "math/polynomial.js");
require(base, "framework/industry.js");
require(base, "framework/resource.js");
require(base, "framework/generator.js");

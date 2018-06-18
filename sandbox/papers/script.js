/*
	script.js
	20140502
	
	References:
	URL http://stackoverflow.com/questions/502366/structs-in-javascript
	[20140502]
	URL http://stackoverflow.com/questions/11498068/how-to-use-external
	-js-files [20140502]
	URL http://javascript.info/tutorial/arguments [20140502]
	
	URL http://www.dustindiaz.com/add-and-remove-html-elements-
	dynamically-with-javascript/ [20140502]
	
	20150724
		Problem with static JS. It is found that pubs[] still empty as it is
		accessed in display.js.
		Solved using URL http://stackoverflow.com/questions/8670530/javascript-error-cannot-call-method-appendchild-of-null [20150724]
*/

var iYear = 1997;
var fYear = 2027;

var pubs = [];

function display() {
	// Check for empty years
	var emptyYear = []
	for(var yy = iYear; yy <= fYear; yy++) {
		var empty = true;
		for(var i = 0; i < pubs.length; i++) {
			if(pubs[i].year == yy) {
				var empty = false;
			}
		}
		emptyYear.push(empty);
	}
	
	var content = [];
	
	// View only not empty years
	for(var yy = fYear; yy >= iYear; yy--) {
		if(!emptyYear[yy - iYear]) {
			//document.write("<b class='year'>" + yy + "</b>");
			//document.write("<ol class='ref-item'>");
			content += "<b class='year'>" + yy + "</b>";
			content += "<ol class='ref-item'>";
			
		}
		for(var i = 0; i < pubs.length; i++) {
			if(pubs[i].year == yy) {
			//document.write("<li>" + stringBibItem(pubs[i]) + "</div>");
			content += "<li>" + stringBibItem(pubs[i]) + "</div>";
			}
		}
		if(!emptyYear[yy - iYear]) {
			//document.write("</ol>");
			content += "</ol>";
		}
	}
	
	return content;
}

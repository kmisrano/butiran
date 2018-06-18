/*
	display.js
	Show all bibiliograpy items
	Sparisoma Viridi | dudung@gmail.com
	
	20150504
		Create this JavaScript from some resources, e.g.
		URL http://stackoverflow.com/questions/24297829/execute-write-on-doc-it-isnt-possible-to-write-into-a-document-from-an-asynchr
		[20150504]
*/

var container = document.getElementById("container");
var content = document.createElement("div");
content.innerHTML = display();
container.appendChild(content);

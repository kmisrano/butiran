/*
	demo.js
	Examples of JS script
	
	Sparisoma Viridi | dudung@gmail.com
	
	20180311
	Start this library from exam.js for the executeScript
	function.
*/

// 20180304.1658 ok
function executeScript(target, menu) {
	var target = window.event.target;
	var value = target.value;
	var idx = target.selectedIndex;
	var script = menu[idx][1];
	script();
}

// 20180311.2015 ok
function menuSeparator() {
	// Do nothing
	//console.log(window.event.target);
}

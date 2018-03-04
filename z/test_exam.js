/*
	test_exam.js
	Test the use of exam.js and related function
	
	Sparisoma Viridi | dudung@gmail.com
	
	20180303
	Start this test functions.
	20180404
	Modify adding options to select.
*/

// 20180304.1700 ok
function test_exam() {
	// Create select element
	var sel = document.createElement("select");
	sel.addEventListener("change", selectProblem)
	sel.style.fontFamily = "Arial";
	sel.style.fontSize = "13px";
	var menu = [
		["Select problem", examClear],
		["Hello world", examHelloWorld],
		["Letter configuration", examLetterConfiguration],
		["Display series", examDisplaySeries],
		["Root formula", examMathJaxRootFormula],
		["Draw circle", examDrawCircle],
		["Color bar", examColorBar],
		["Button click", examButtonClick],
		["Progress bar", examProgressBar],
		["Simple statistics", examSimpleStatistics],
		["Table", examTable]
	];
	
	// Add menu using option element
	var N = menu.length;
	for(var i = 0; i < N; i++) {
		var opt = document.createElement("option");
		opt.text = menu[i][0];
		sel.options.add(opt);
	}
	
	// Create div element for displaying output
	var div = document.createElement("div");
	div.id = "scriptResult";
	div.innerHTML = "&nbsp;"
	div.style.border = "1px solid #888";
	div.style.background = "#f8f8f8";
	div.style.padding = "10px";
	div.style.fontFamily = "Arial";
	div.style.fontSize = "12px";
	
	// Set document layout
	document.body.appendChild(sel);
	document.body.appendChild(div);
	
	// Execute script related to selected problem
	function selectProblem() {
		executeScript(window.event.target, menu)
	}
}

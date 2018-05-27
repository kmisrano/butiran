/*
	test_exam.js
	Test the use of exam.js and related function
	
	Sparisoma Viridi | dudung@gmail.com
	
	20180303
	Start this test functions.
	20180404
	Modify adding options to select.
	20180311
	Rename test_exam to test_demo for broader use and
	modify style of menuSeparator item.
	20180317
	Try sound using pizzicato.js library.
*/

// 20180305.1949 ok --> 20180311.2130 !ok
function test_demo() {
	// Create select element
	var esel = document.createElement("select");
	esel.addEventListener("change", selectMenu)
	esel.style.fontFamily = "Arial";
	esel.style.fontSize = "13px";
	var menu = [
		["Select menu", examClear],
		["# JS Demo", menuSeparator],
		["Hello world", examHelloWorld],
		["Letter configuration", examLetterConfiguration],
		["Display series", examDisplaySeries],
		["Root formula", examMathJaxRootFormula],
		["Draw circle", examDrawCircle],
		["Color bar", examColorBar],
		["Button click", examButtonClick],
		["Progress bar", examProgressBar],
		["Simple statistics", examSimpleStatistics],
		["Table", examTable],
		["Textarea matrix", examTextareaMatrix],
		["Chart xy", examChartXY],
		["Toggle button", examToggleButton],
		["Random lines", examRandomLines],
		["Three grains", examThreeGrains],
		["Date and clock", examDateAndClock],
		["# Topics", menuSeparator],
		["Plate temperature", theoryPlateTemperature],
		["Toggle sound", demoToggleSound],
		["Simple instrument", demoSimpleInstrument],
		["Sound beat", demoSoundBeat],
	];
	
	// Add menu using option element
	var N = menu.length;
	for(var i = 0; i < N; i++) {
		var opt = document.createElement("option");
		opt.text = menu[i][0];
		esel.options.add(opt);
		if(menu[i][1] == menuSeparator) {
			esel.options[i].disabled = true;
			esel.options[i].style.background = "black";
			esel.options[i].style.color = "white";
			esel.options[i].style.textIndent = "10px";
		}
	}
	
	// Create information
	var etxt = document.createElement("div");
	etxt.innerHTML = "Open browser console with Ctrl + Shift + J (in Google Chrome)"
	etxt.style.color = "#f8f8f8";
	etxt.style.float = "right";
	etxt.style.fontSize = "13px";
	etxt.style.fontFamily = "Arial";
	
	// Create div element for top part
	var etop = document.createElement("div");
	//etop.style.border = "1px solid #888";
	etop.style.background = "#bbb";
	etop.style.height = "20px";
	etop.style.padding = "6px";
	
	// Create div element for displaying output
	var eout = document.createElement("div");
	eout.id = "scriptResult";
	eout.innerHTML = "&nbsp;"
	eout.style.border = "1px solid #bbb";
	eout.style.background = "#f8f8f8";
	eout.style.padding = "10px";
	eout.style.fontFamily = "Times";
	eout.style.fontSize = "16px";
	
	// Set document layout
	document.body.appendChild(etop);
		etop.appendChild(esel);
		etop.appendChild(etxt);
	document.body.appendChild(eout);
	
	// Set this only in developing stage -- 20180311.2250 ok
	chooseLastMenu();
	
	// Execute script related to selected menu
	function selectMenu() {
		executeScript(window.event.target, menu)
	}
	
	// Force to choose last menu
	function chooseLastMenu() {
		esel.selectedIndex = N - 1;
		var wait = setInterval(waitMathJax, 500);
		
		function waitMathJax() {
			var mj = typeof MathJax;
			if(mj === "undefined") {
				
			} else {
				clearInterval(wait);
				executeScript(esel, menu);
			}
		}
	}
}

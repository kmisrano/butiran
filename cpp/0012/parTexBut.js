/*
	parTexBut.js
	Parameters in textarea are read by button click
	
	Sparisoma Viridi | https://github.com/dudung/butiran
	
	Use in HTML file:
	<script src="parTexBut.js"></script>
	
	20190114
	1700 Start creating at home.
	1756 Finish for this stage.
*/

// Define id for elements
var taIn = "input";
var btLoad = "load";
var btRead = "read";
var btCalc = "calc";
var taOut = "output";

// Define global variables
var l, w, h, V;

// Execute main function
main();

// Define main function
function main() {
	
	// Create and arrange elements
	createAndArrangeElements(taIn, btLoad, btRead, btCalc, taOut);
}

// Create and arrange elements
function createAndArrangeElements() {
	// Create input textarea
	var arg0 = document.createElement("textarea");
	arg0.id = arguments[0];
	arg0.style.width = "120px";
	arg0.style.height = "150px";
	arg0.style.overflowY = "scroll";
	arg0.style.float = "left";
	
	// Create load button
	var arg1 = document.createElement("button");
	arg1.id = arguments[1];
	arg1.innerHTML = "Load";
	arg1.style.width = "48px";
	arg1.addEventListener("click", btnClick);
	
	// Create read button
	var arg2 = document.createElement("button");
	arg2.id = arguments[2];
	arg2.innerHTML = "Read";
	arg2.style.width = "48px";
	arg2.addEventListener("click", btnClick);
	
	// Create calc button
	var arg3 = document.createElement("button");
	arg3.id = arguments[3];
	arg3.innerHTML = "Calc";
	arg3.style.width = "48px";
	arg3.addEventListener("click", btnClick);
	
	// Create division for button
	var div = document.createElement("div");
	div.style.height = "154px";
	div.style.width = "48px";
	div.style.border = "1px solid #ccc";
	div.style.float = "left";
	
	// Creat output textarea
	var arg4 = document.createElement("textarea");
	arg4.id = arguments[4];
	arg4.style.width = "120px";
	arg4.style.height = "150px";
	arg4.style.overflowY = "scroll";
	arg4.style.float = "left";
	
	// Arrange elements
	document.body.append(arg0);
	document.body.append(div);
		div.append(arg1);
		div.append(arg2);
		div.append(arg3);
	document.body.append(arg4);
}

// Handle button click event
function btnClick() {
	var id = event.target.id;
	if(id == "load") {
		console.log("Load button is clicked");
		loadParamsTo(taIn);		
	} else if(id == "read") {
		console.log("Read button is clicked");
		readParamsFrom(taIn);
	} else if(id == "calc") {
		console.log("Calc button is clicked");
		calculateAndSendResulTo(taOut);
	}
}

// Read parameters
function loadParamsTo() {
	var id = arguments[0];
	var ta = document.getElementById(id);
	ta.value = ""
	+ "LENGTH 1.2\n"
	+ "WIDTH 0.5\n"
	+ "HEIGHT 8.2\n";
}

// Read parameters
function readParamsFrom() {
	var id = arguments[0];
	var ta = document.getElementById(id);
	var lines = ta.value.split("\n");
	var N = lines.length;
	for(var i = 0; i < N; i++) {
		if(lines[i].length > 0) {
			var word = lines[i].split(" ");
			if(word[0] == "LENGTH") {
				l = parseFloat(word[1]);
			} if(word[0] == "WIDTH") {
				w = parseFloat(word[1]);
			} if(word[0] == "HEIGHT") {
				h = parseFloat(word[1]);
			}
		}
	}
}

// Calculate
function calculateAndSendResulTo() {
	var id = arguments[0];
	var ta = document.getElementById(id);
	V = l * w * h;
	ta.value = ""
	+ "p = " + l + "\n"
	+ "l = " + w + "\n"
	+ "t = " + h + "\n"
	+ "V = " + V.toFixed(2) + "\n";
}

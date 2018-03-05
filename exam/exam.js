/*
	exam.js
	Represent problems for exam in JS
	
	Sparisoma Viridi | dudung@gmail.com
	
	20180303
	Start this library.
	20180304
	Continue improving this library.
*/

// 20180304.1658 ok
function executeScript(target, menu) {
	var target = window.event.target;
	var value = target.value;
	var idx = target.selectedIndex;
	var script = menu[idx][1];
	script();
}

// 20180305.2023 ok
function examRandomLine() {
	var eout = document.getElementById("scriptResult");
	eout.innerHTML = "";
	
	var w = 200;
	var h = 200;
	
	var can = createCanvasWithId("drawingArea", w, h);
	eout.appendChild(can);
	var cx = can.getContext("2d");
	
	var i = 0;
	var di = 1;
	var iend = 1000;
	var sel = window.event.target;
	sel.disabled = true;
	
	var tid = setInterval(randomLine, 10);
	
	var x = w / 2;
	var y = h / 2;
	
	function randomLine() {
		if(i >= iend) {
			i = iend;
			clearInterval(tid);
			sel.disabled = false;
		}
		
		var theta = randInt(-180, 180);
		var dr = 10;
		var dx = dr * Math.cos(theta * Math.PI / 180);
		var dy = dr * Math.sin(theta * Math.PI / 180);
		
		var j = (i / iend) * 255;
		cx.strokeStyle = int2rgb(255 - j, 0, j);
		cx.beginPath();
		cx.moveTo(x, y);
		x += dx;
		if(x > w || x < 0) x -= dx;
		y += dy;
		if(y > h || y < 0) y -= dy;
		cx.lineTo(x, y);
		cx.stroke();
		
		i += di;
	}
		
	function createCanvasWithId(id, w, h) {
		var can = document.createElement("canvas");
		can.width = w;
		can.height = h;
		can.style.width = w + "px";
		can.style.height = h + "px";
		can.style.border = "1px solid #bbb";
		can.id = id;
		return can;
	}
}


// 20180305.1948 ok
function examToggleButton() {
	var eout = document.getElementById("scriptResult");
	eout.innerHTML = "";
	
	var div = document.createElement("div");
	div.style.width = "40px";
	div.style.height = "40px";
	div.style.border = "1px solid #000";
	div.style.background = "#eee";
	
	var btn = document.createElement("button");
	btn.innerHTML = "Off";
	btn.style.width = "42px";
	btn.style.height = "20px";
	btn.addEventListener("click", switchOnOff);
	
	eout.appendChild(div);
	eout.appendChild(btn);
	
	function switchOnOff() {
		var btn = window.event.target;
		if(btn.innerHTML == "Off") {
			btn.innerHTML = "On";
			div.style.background = "#faa";
		} else {
			btn.innerHTML = "Off";
			div.style.background = "#eee";
		}
	}
}

// 20180304.2142 ok
function examChartXY() {
	var eout = document.getElementById("scriptResult");
	eout.innerHTML = "";
	
	var ecan = document.createElement("canvas");
	ecan.width = "300";
	ecan.height = "200";
	ecan.style.width = "300px";
	ecan.style.height = "200px";
	ecan.id = "drawingArea"
	ecan.style.background = "#f8f8f8";
		
	eout.appendChild(ecan);
	
	var x = [0, 1, 2, 3, 4, 5, 6, 7, 8];
	var y = [-7, 0, 5, 8, 9, 8, 5, 0, -7];
	var series = new XYSeries("series1", x, y);
	var chart = new Chart2("drawingArea");
	chart.yAxis.Ntics = 4;
	chart.xAxis.Ntics = 8;
	chart.addSeries(series);
	chart.drawSeries("series1");
}

// 20180304.2107 ok
function examTextareaMatrix() {
	var eout = document.getElementById("scriptResult");
	eout.innerHTML = "";
	
	var elef = document.createElement("div");
	elef.style.width = "125px";
	elef.style.float = "left";
	
	var erig = document.createElement("div");
	erig.style.float = "left";
	erig.style.padding = "4px 50px 4px 50px";
	erig.id = "mathjax-matrix"
	
	var etxa = document.createElement("textarea");
	etxa.style.width = "120px";
	etxa.style.height = "120px";
	etxa.style.overflowY = "scroll"
	etxa.value = "1 2 3 4\n"
	+ "0 4 0 4\n"
	+ "1 3 9 7\n"
	+ "6 4 5 8";
	
	var ebtn = document.createElement("button");
	ebtn.innerHTML = "MathJax matrix";
	ebtn.style.width = "125px";
	ebtn.addEventListener("click", btnClick);
	
	eout.appendChild(elef);
		elef.appendChild(etxa);
		elef.appendChild(ebtn);
	eout.appendChild(erig);
	
	function btnClick() {
		var content = etxa.value;
		var lines = content.split("\n");
		var M = [];
		for(var j = 0; j < lines.length; j++) {
			var words = lines[j].split(" ");
			var row = [];
			for(var i = 0; i < words.length; i++) {
				var Mel = words[i];
				row.push(Mel);
			}
			M.push(row);
		}
		
		var ROW = M.length;
		
		var latex = "\\begin{equation}\n"
			+ "M = \\left[\n"
			+ "\\begin{array}\n";
		var COL = M[0].length;
		latex += "{" + "c".repeat(COL) + "}\n";
		for(var j = 0; j < ROW; j++) {
			var arow = M[j];
			var COL = arow.length;
			for(var i = 0; i < COL; i++) {
				latex += M[j][i];
				if(i < COL - 1) {
					latex += " & ";
				} else {
					latex += " \\\\\n";
				}
			}
		}
		latex += "\\end{array}\n"
			+ "\\right]\n"
			+ "\\end{equation}";
		
		updateMath("mathjax-matrix", latex)
	}
}

// 20180304.1608 ok
function examTable() {
	var div = document.getElementById("scriptResult");
	div.innerHTML = "";
	var data = [
		["t", "v", "x"],
		[0, 0, 0],
		[1, 2, 1],
		[2, 4, 4],
		[3, 6, 9],
		[4, 8, 16],
		[5, 10, 25]
	];
	var tab = document.createElement("table");
	tab.style.background = "#fee";
	var ROW = data.length;
	for(var j = 0; j < ROW; j++) {
		var row = document.createElement("tr");
		if(j == 0) {
			row.style.background = "#fde";
			row.style.fontWeight = "bold";
			row.style.fontStyle = "italic";
			row.style.fontFamily = "Times";
			row.style.color = "red";
		} else {
			row.style.background = "#ffe";
		}
		var dataRow = data[j];
		var COL = dataRow.length;
		for(var i = 0; i < COL; i++) {
			var dataCol = dataRow[i];
			var col = document.createElement("td");
			col.style.border = "1px solid #fde";
			col.style.width = "80px";
			col.style.textAlign = "center";
			col.innerHTML = dataCol;
			row.appendChild(col);
		}
		tab.appendChild(row);
	}
	div.appendChild(tab);
}

// 20180304.0929 ok
function examSimpleStatistics() {
	var div = document.getElementById("scriptResult");
	div.innerHTML = "&nbsp;";
	var min = 2;
	var max = 10;
	var N = 20;
	var x = randIntN(min, max, N);
	var xsum = 0;
	for(var i = 0; i < N; i++) {
		xsum += x[i];
	}
	var xavg = xsum / N;
	var str = "xmin = " + min + "<br/>";
	str += "xmax = " + max + "<br/>";
	str += "xsum = " + xsum + "<br/>";
	str += "x = [" + x + "]<br/>";
	str += "N = " + N + "<br/>";
	str += "xavg = " + xavg;
	div.innerHTML = str;
}

// 20180304.0617 ok
function examProgressBar() {
	var div = document.getElementById("scriptResult");
	div.innerHTML = "&nbsp;";
	var i = 0;
	var di = 5;
	var iend = 100;
	var sel = window.event.target;
	sel.disabled = true;
	
	var tid = setInterval(progressBar, 100);
	
	function progressBar() {
		if(i >= iend) {
			i = iend;
			clearInterval(tid);
			sel.disabled = false;
		}
		var N = Math.round(i / di);
		var s = "=".repeat(N) + " " + i + " %";
		div.innerHTML = s;
		i += di;
	}
}

// 20180304.0553 ok
function examButtonClick() {
	var div = document.getElementById("scriptResult");
	div.innerHTML = "&nbsp;";
	var btn = document.createElement("button");
	btn.style.width = "120px";
	btn.innerHTML = "Not yet clicked";
	btn.addEventListener("click", buttonClick);
	div.appendChild(btn);
	var clicked = 0;
	
	function buttonClick() {
		clicked++;
		var target = window.event.target;
		if(clicked == 1) {
			target.innerHTML = "Clicked once";
		} else if(clicked == 2) {
			target.innerHTML = "Clicked twice";
		} else {
			target.innerHTML = "Clicked " + clicked + " times";
		}
	}
}

// 20180304.0545 ok
function examColorBar() {
	var div = document.getElementById("scriptResult");
	div.innerHTML = "&nbsp;";
	N = 16;
	for(var i = 0; i < N; i++) {
		var sp = document.createElement("span");
		var x = i * 16 - 1;
		var color = int2rgb(255, 255 - x, 255 -x );
		sp.style.background = color;
		sp.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;\
		&nbsp;&nbsp;&nbsp;&nbsp;";
		div.appendChild(sp);
	}
}

// 20180304.0530 ok
function examLetterConfiguration() {
	var div = document.getElementById("scriptResult");
	var str = "Computation";
	var N = str.length;
	var str2 = "";
	for(var i = 0; i < N; i++) {
		str2 += str.substring(0, i + 1) + "<br/>";
	}
	div.innerHTML = str2;
}

// 20180304.0004 ok
function examDrawCircle() {
	var div = document.getElementById("scriptResult");
	div.innerHTML = "&nbsp;";
	var can = document.createElement("canvas");
	div.appendChild(can);
	var cx = can.getContext("2d");
	cx.fillStyle = "#aaf";
	cx.strokeStyle = "#f00";
	cx.lineWidth = 3;
	cx.beginPath();
	cx.arc(50, 50, 40, 0, 2 * Math.PI);
	cx.fill();
	cx.stroke();
}

// 20180303.2347 ok
function examMathJaxRootFormula() {
	var div = document.getElementById("scriptResult");	
	var str = "";
	str += "\\begin{equation}";
	str += "x_{1,2} = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}";
	str += "\\end{equation}";
	updateMath("scriptResult", str);
}

// 20180303.2308 ok
function examDisplaySeries() {
	var div = document.getElementById("scriptResult");
	var N = 10;
	var str = "";
	for(var i = 0; i < N; i++) {
		str += i + "<br/>";
	}
	div.innerHTML = str;
}

// 20180303.2249 ok
function examClear() {
	var div = document.getElementById("scriptResult");
	div.innerHTML = "&nbsp;";	
}

// 20180303.2249 ok
function examHelloWorld() {
	var div = document.getElementById("scriptResult");
	div.innerHTML = "Hello, World!";
}

// 20180304.0937 ok
function executeFunctionByValue(value) {
	switch(value) {
		case "Select problems":
			examClear();
			break;
		case "Hello world":
			examHelloWorld();
			break;
		case "Letter configuration":
			examLetterConfiguration();
			break;
		case "Display series":
			examDisplaySeries();
			break;
		case "Root formula":
			examMathJaxRootFormula();
			break;
		case "Draw circle":
			examDrawCircle();
			break;
		case "Color bar":
			examColorBar();
			break;
		case "Button click":
			examButtonClick();
			break;
		case "Progress bar":
			examProgressBar();
			break;
		case "Simple statistics":
			examSimpleStatistics();
			break;
		case "Table":
			examTable();
			break;
		default:
	}
}

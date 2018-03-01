/*
	test_generator_chart2.js
	Test of showing data produced by generator in a chart2
	
	Sparisoma Viridi | dudung@gmail.com
	
	20180302
	Create this test function.
*/

// 20180302.0508 !ok
function test_generator_chart2() {
	// Create left div
	var divL = document.createElement("div");
	divL.style.background = "#efe";
	divL.style.float = "left";
	divL.style.width = "250px";
	
	// Create right div
	var divR = document.createElement("div");
	divR.style.background = "#fee";
	
	// Create textarea
	var ta = document.createElement("textarea");
	ta.style.width = "200px";
	
	// Create canvas
	var can = document.createElement("canvas");
	can.id = "Chart-Water";
	can.style.background = "#eef";
	
	// Create buttons
	var btn1 = document.createElement("button");
	btn1.id = "Series";
	btn1.innerHTML = "Series";
	var btn2 = document.createElement("button");
	btn2.id = "Polynomial";
	btn2.innerHTML = "Polynomial";
	var btn3 = document.createElement("button");
	btn3.id = "Random";
	btn3.innerHTML = "Random";
	
	// Set elements layout
	document.body.appendChild(divL);
		divL.appendChild(ta);
		divL.appendChild(btn1);
		divL.appendChild(btn2);
		divL.appendChild(btn3);
	document.body.appendChild(divR);
		divR.appendChild(can);
	
	// Add event to buttons
	btn1.addEventListener("click", buttonClick);
	btn2.addEventListener("click", buttonClick);
	btn3.addEventListener("click", buttonClick);
	
	// Create event
	function buttonClick() {
		var id = event.target.id;
		var res;
		var N = 10;
		if(id == "Series") {
			var series = [0, 1, 0, 1, 2, 1, 0, 1, 0, 1];
			res = new Generator("water");
			res.setSeries(series);
		}
		if(id == "Polynomial") {
			var coefs = [
				-0.005,
				0.172,
				1.855,
				-1.201,
				0.275,
				-0.026,
				0.000
			];
			res = new Generator("water");
			res.setPolynomial(coefs);
		}
		if(id == "Random") {
			res = new Generator("water");
			res.setRandomInt(0, 2);
		}
		if(res != undefined) {
			var x = [];
			var y = [];
			for(var i = 0; i < N; i++) {
				x.push(i);
				y.push(res.value());
			}
			var series = new XYSeries("Water", x, y);
			var chart = new Chart2("Chart-Water");
			chart.addSeries(series);
			chart.drawSeries("Water");
		}
	}
}
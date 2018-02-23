/*
	xyseries.js
	Simple (x, y) data series for Chart2
	
	Sparisoma Viridi | dudung@gmail.com
	
	2018022
	Create XYSeries class.
*/

// Define class of XYSeries
class XYSeries {
	constructor(id, x, y) {
		this.id = id;
		this.x = [];
		this.y = [];
		this.color = "#f00";
		this.size = 1;
		this.mark = "line";
		this.x = x;
		this.y = y;
		this.length = Math.min(x.length, y.length);
	}
	
	setColor(color) {
		this.color = color;
	}
	
	setSize(size) {
		this.size = size;
	}
	
	setMark(mark) {
		this.mark = mark;
	}
}
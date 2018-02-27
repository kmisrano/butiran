/*
	painter.js
	Draw visual objects on canvas element
	
	Sparisoma Viridi | dudung@gmail.com
	
	20180227
	Create this library.
*/

// Define class of Painter
class Painter {
	// Create constructor
	constructor() {
		this.id = arguments[0];
		this.coords = arguments[1];
	}
	
	setCanvasId(id) {
		this.id = id;
	}
	
	draw() {
		var can = document.getElementById(this.id);
		var cx = can.getContext("2d");
		
		var N = arguments.length;
		var objs = arguments;
		
		for(var i = 0; i < N; i++) {
			var o = objs[i];
			if(o instanceof Point2) {
				cx.beginPath();
				cx.strokeStyle = o.c;
				var q = coords.transform({x: o.x, y: o.y});
				console.log(q.x + " " + q.y + " " + o.s);
				cx.arc(q.x, q.y, o.s, 0, 2 * Math.PI);
				cx.fillStyle = o.c;
				cx.fill();
				cx.stroke();
			}
		}
	}
}

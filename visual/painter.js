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
			if(o instanceof Point) {
				cx.beginPath();
				cx.strokeStyle = o.color;
				var q = coords.transform({x: o.x, y: o.y});
				console.log(q.x + " " + q.y + " " + o.size);
				cx.arc(q.x, q.y, o.size, 0, 2 * Math.PI);
				cx.fillStyle = o.color;
				cx.fill();
				cx.stroke();
			}
			if(o instanceof Connector) {
				cx.beginPath();
				cx.strokeStyle = o.color;
				var qbeg = coords.transform(o.rbeg);
				cx.moveTo(qbeg.x, qbeg.y);
				var qend = coords.transform(o.rend);
				cx.lineTo(qend.x, qend.y);
				cx.stroke();
			}
			if(o instanceof Capacitor) {
				cx.beginPath();
				cx.strokeStyle = o.color;
				/*
				cx.fillStyle = o.color;
				cx.fill();
				*/
				cx.stroke();
			}
		}
	}
}

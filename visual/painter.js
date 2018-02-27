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
	
	setCoordinates(coords) {
		this.coords = coords;
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
				var q = coords.transform(o);
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
				cx.fillStyle = o.color;
				
				var l = 2 * o.plateThickness + o.plateGap;
				var qbeg = coords.transform(o.rbeg);
				var qend = coords.transform(o.rend);
				var Dx = qend.x - qbeg.x;
				var Dy = qend.y - qbeg.y;
				var L = Math.sqrt(Dx * Dx + Dy * Dy);
				
				var c = 0.5 * (L - l) / L;
				
				var q1 = {};
				q1.x = qbeg.x + Dx * c;
				q1.y = qbeg.y + Dy * c;
				var q2 = {};
				q2.x = qend.x - Dx * c;
				q2.y = qend.y - Dy * c;
				
				cx.moveTo(qbeg.x, qbeg.y);
				cx.lineTo(q1.x, q1.y);
				cx.moveTo(qend.x, qend.y);
				cx.lineTo(q2.x, q2.y);
				
				//-------------------------------------
				// This part is still false
				//-------------------------------------
				
				var q1u = {};
				q1u.x = q1.x;
				q1u.y = q1.y - 0.5 * o.size;
				var q1d = {};
				q1d.x = q1.x;
				q1d.y = q1.y + 0.5 * o.size;
				var q11u = {};
				q11u.x = q1u.x + o.plateThickness;
				q11u.y = q1u.y;
				var q11d = {};
				q11d.x = q1d.x + o.plateThickness;
				q11d.y = q1d.y;
				cx.moveTo(q1u.x, q1u.y);
				cx.lineTo(q11u.x, q11u.y);
				cx.lineTo(q11d.x, q11d.y);
				cx.lineTo(q1d.x, q1d.y);
				cx.closePath();
				
				var q2u = {};
				q2u.x = q2.x;
				q2u.y = q2.y - 0.5 * o.size;
				var q2d = {};
				q2d.x = q2.x;
				q2d.y = q2.y + 0.5 * o.size;
				var q22u = {};
				q22u.x = q2u.x - o.plateThickness;
				q22u.y = q2u.y;
				var q22d = {};
				q22d.x = q2d.x - o.plateThickness;
				q22d.y = q2d.y;
				cx.moveTo(q2u.x, q2u.y);
				cx.lineTo(q22u.x, q22u.y);
				cx.lineTo(q22d.x, q22d.y);
				cx.lineTo(q2d.x, q2d.y);
				cx.closePath();
				
				//-------------------------------------
				
				cx.fill();
				cx.stroke();
			}
		}
	}
}

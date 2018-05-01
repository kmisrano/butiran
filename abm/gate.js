/*
	gate.js
	Gate for ABM-based simulation
	
	Sparisoma Viridi | dudung@gmail.com
	
	20180501
	Create this object.
*/

// Define class of gate
class abmGate {
	constructor() {
		this.id = "gate1";
		this.state = 0;
		this.pos = 0;
		this.sequence = [0, 0, 0, 0, 0, 1, 1, 1, 1, 1];
		this.now = 0;
		this.loop = undefined;
		this.color = "#f00";
		this.size = 5;
		
		// Define constructor with one argument of types
		if(arguments.length == 1) {
			var arg = arguments[0];
			if(arg.id != undefined) {
				this.id = arg.id;
			}
			if(arg.state != undefined) {
				this.state = arg.state;
			}
			if(arg.pos != undefined) {
				this.pos = arg.pos;
			}
			if(arg.sequence != undefined) {
				this.sequence = arg.sequence;
			}
			if(arg.loop != undefined) {
				this.loop = arg.loop;
			}
		}
	}
	
	// Change state
	set(state) {
		this.state = state;
		if(state == 1) {
			this.turnOn();
		} else {
			this.turnOff();
		}
	}
	
	// Change state to 1
	turnOn() {
		this.state = 1;
		this.color = "#0f0";
	}
	
	// Change state to 0
	turnOff() {
		this.state = 0;
		this.color = "#f00";
	}
	
	// Draw gate
	drawOnCanvas(canvasId, loops) {
		var x = 0;
		var y = 0;
		var myLoop = this.loop;
		var myPos = this.pos;
		var canvas = document.getElementById(canvasId);
		var ctx = canvas.getContext("2d");
		loops.forEach(function(loop) {
			if(myLoop == loop.id) {
				x = loop.path.x[myPos];
				y = loop.path.y[myPos];
			}
		});
		ctx.fillStyle = this.color;
		var s = this.size;
		ctx.fillRect(x - s/2, y - s/2, s, s);
	}
	
	// Update
	update() {
		var now = this.now;
		var	state = this.sequence[now];
		this.set(state);
		now++;
		now = (now >= this.sequence.length) ? 0 : now;
		this.now  = now;
	}
}

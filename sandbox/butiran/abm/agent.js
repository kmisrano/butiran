/*
	agent.js
	Agent for ABM-based simulation
	
	Sparisoma Viridi | dudung@gmail.com
	
	20180501
	Create this object.
	Rename agent to abmAgent, simplify, and remove
	test function.
*/

// Define class of Agent
class abmAgent {
	constructor() {
		// Define default structure
		this.id = "agent0";
		this.size = 1;
		this.pos = 0;
		this.loop = undefined;
		this.color = "#99f";
		this.size = 5;
		
		// Define constructor with one argument of types
		if(arguments.length == 1) {
			var arg = arguments[0];
			if(arg.id !== undefined) {
				this.id = arg.id;
			}
			if(arg.pos != undefined) {
				this.pos = arg.pos;
			}
			if(arg.size != undefined) {
				this.size = arg.size;
			}
			if(arg.loop != undefined) {
				this.loop = arg.loop;
			}
		}
	}
	
	// Draw agent
	drawOnCanvas(canvasId, loops) {
		var x = 0;
		var y = 0;
		var myLoop = this.loop;
		var myPos = this.pos;
		var canvas = document.getElementById(canvasId);
		var ctx = canvas.getContext("2d");
		loops.forEach(function(loop) {
			if(myLoop == loop.id) {
				var Nx = loop.path.x.length;
				var Ny = loop.path.y.length;
				var N = Math.min(Nx, Ny);
				myPos = (myPos >= N) ? 0: myPos;
				x = loop.path.x[myPos];
				y = loop.path.y[myPos];
			}
		});
		this.pos = myPos;
		ctx.fillStyle = this.color;
		var s = this.size;
		ctx.fillRect(x - s/2, y - s/2, s, s);
	}
	
	// Update
	update() {
		this.pos++;
	}
}

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
	}
	
	setCanvasId(id) {
		this.id = id;
	}
	
	draw() {
		var can = document.getElementById(this.id);
		
		var N = arguments.length;
		var objs = arguments;
		
		for(var i = 0; i < N; i++) {
						
		}
	}
}

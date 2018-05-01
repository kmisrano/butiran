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
		}
	}
	
	// Change state
	set(state) {
		this.state = state;
	}
	
	// Change state to 1
	turnOn() {
		this.state = 1;
	}
	
	// Change state to 0
	turnOff() {
		this.state = 0;
	}
}

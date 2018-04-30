/*
	switch.js
	Gate for ABM-based simulation
	
	Sparisoma Viridi | dudung@gmail.com
	
	20180501
	Create this object.
*/

// Define class of Traffic light
class abmGate {
	constructor() {
		this.state = 0;
		this.type = ""
		this.angle = 0;
		this.x = 0;
		this.y = 0;
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

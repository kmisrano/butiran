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
		
		// Define constructor with one argument of types
		if(arguments.length == 1) {
			var arg = arguments[0];
			if(arg.id !== undefined) {
				this.id = arg.id;
			}
			if(this.pos != undefined) {
				this.pos = arg.pos;
			}
			if(arg.size != undefined) {
				this.size = arg.size;
			}
		}
	}
}

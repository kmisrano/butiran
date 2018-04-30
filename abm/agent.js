/*
	agent.js
	Agent for ABM-based simulation
	
	Sparisoma Viridi | dudung@gmail.com
	
	20180501
	Create this object.
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

// Labeled as deprecated at 0448
// Test constructor -- 20180501.0404 ok
function test_constructor_of_agent_deprecated() {
	var a1 = new abmAgent({theta: 70});
	console.log(a1);

	var a2 = new abmAgent(
	{
		id: "agent1",
		type: "rectangular",
		size: 2,
		x: 3,
		y: 7
	});
	console.log(a2);
}

/* Remove due to simplification -- 20180501.0446
// Define class of Agent
class abmAgent {
	// Create various types of constructor
	constructor() {
		// Define default structure
		this.type = "angular";
		this.id = "agent0";
		this.size = 1;
		this.theta = 0;
		this.x = 0;
		this.y = 0;
		
		// Define constructor with one argument of types
		// "angular" or "rectangular"
		if(arguments.length == 1) {
			var arg = arguments[0];
			if(arg.type != undefined) {
				this.type = arg.type;
			}
			if(arg.id !== undefined) {
				this.id = arg.id;
			}
			if(this.theta != undefined) {
				if(this.type == "angular") {
					delete this.x;
					delete this.y;
					this.theta = arg.theta;
				} else if(this.type == "rectangular") {
					delete this.theta;
					if(arg.x != undefined) {
						this.x = arg.x;
					}
					if(arg.y != undefined) {
						this.y = arg.y;
					}
				}
			}
			if(arg.size != undefined) {
				this.size = arg.size;
			}
		}
	}
}
*/
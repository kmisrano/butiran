/*
	tabs.js
	A GUI based on div element for containing visual elements,
	e.g. textarea and canvas, which can be hidden and shown
	using appropriate button
	
	Sparisoma Viridi | dudung@gmail.com
	
	20180615
	Create this class in order to overcome problem of not
	unique ID of elements as TabText and TabCanvas functions
	are used.
*/

// Define class of Tabs
class Tabs {
	// Create three different types of constructor
	constructor() {
		if(arguments.length < 2) {
			var msg = "Tabs requires id and parentId as arguments";
			throw new Error(msg);
		} else {
			this.id = arguments[0];
			this.parentId = arguments[1];
			console.log(typeof this.id, typeof this.parentId);
		}
	}
}

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
	// Create constructor
	constructor() {
		// Set rules for number of arguments
		if(arguments.length == 0) {
			var msg = "Tabs requires id (and parentId) as "
				+ "arguments";
			throw new Error(msg);
		} else if(arguments.length == 1){
			var msg = "Tabs assumes that parent is document."
				+ "body";
			console.warn(msg);
			this.id = arguments[0];
			this.parentId = "document.body";
		} else {
			this.id = arguments[0];
			this.parentId = arguments[1]
		}
		
		// Define default values
		this.width = "300px";
		this.height = "200px";
		this.display = "none";
		this.border = "1px solid black";
		this.background = "#ccc";
		this.float = "left";
		
		// Define visual container
		var div = document.createElement("div");
		div.style.width = this.width;
		div.style.height = this.height;
		div.style.display = this.display;
		div.style.border = this.border;
		div.style.background = this.background;
		div.style.float = this.float;
		this.div = div;
		
		if(this.parentId == "document.body") {
			document.body.append(this.div);
		} else {
			var el = document.getElementById(this.parentId);
			el.append(this.div);
		}
	}
	
	show() {
		this.display = "block";
		this.div.style.display = this.display;
	}
	
	hide() {
		this.display = "none";
		this.div.style.display = this.display;
	}
}

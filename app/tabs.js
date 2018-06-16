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
	20180616
	Continue creating this class.
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
		
		// Check whether id already exists
		var el = document.getElementById(this.id);
		var idExist = (el != undefined)
		if(idExist) {
			var msg = this.id + " exists";
			throw new Error(msg)
		}
		
		// Create style
		createAllStyle(this.id);
		this.tabcs = "tab" + this.id;
		this.tabbtncs = "tab" + this.id + " button";
		
		// Define visual container
		var tab  = document.createElement("div");
		tab.id = this.id;
		tab.className = this.tabcs;
		this.tab = tab;
		
		// Set parent of Tabs instance
		if(this.parentId == "document.body") {
			document.body.append(this.tab);
		} else {
			var el = document.getElementById(this.parentId);
			el.append(this.tab);
		}
		
		// Define array for storing tab button information
		this.tabs = [];
	}
	
	// Set background color
	setBackground(color) {
		Style.changeStyleAttribute('.' + this.tabcs,
			"background", color);
	}
	
	// Set width
	setWidth(width) {
		Style.changeStyleAttribute('.' + this.tabcs,
			"width", width);		
	}
	
	// Set hight
	setHeight(height) {
		Style.changeStyleAttribute('.' + this.tabcs,
			"height", height);		
	}
	
	// Ada label for tab button
	addTab(label) {
		// Avoid same tab label
		var ilabel = this.tabs.indexOf(label);
		if(ilabel < 0) {
			this.tabs.push(label);
		} else {
			var msg = "Duplicate label " + label + " is igonered";
			console.warn(msg);
		}
		//console.log(this.tabs);
		this.refreshAppendedElements();
	}
	
	// Remove label for tab button
	removeTab(label) {
		// 20180616.0445
		// Tom Wadley, Beau Smith
		// https://stackoverflow.com/a/5767357/9475509
		var i = this.tabs.indexOf(label);
		this.tabs.splice(i, 1);
		//console.log(this.tabs);
	}
	
	// Refresh appended elements
	refreshAppendedElements() {
		var width =
			Style.getStyleAttribute('.' + this.tabcs, "width");
		var N = this.tabs.length;
		var btnWidth = width / N;
		Style.changeStyleAttribute('.' + this.tabbtncs, "width",
			btnWidth);
		
		for(var i = 0; i < N; i++) {
			var id = this.id + this.tabs[i];
			var btn = document.getElementById(id);
			if(btn == undefined) {
				var btn = document.createElement("button");
				btn.className = "tablinks";
				btn.innerHTML = this.tabs[i];
				this.tab.append(btn);
			}
		}
		/*
		var id = this.id + "btn" + label;
		*/
	}
}

// Create default style for this class
function createAllStyle(id) {
	// Set style of the tab
	Style.createStyle(
	'.tab' + id + ` {
		overflow: hidden;
		width: 240px;
		height: 200px;
		background: #f1f1f1;
		border: 1px solid #ccc;
		float: left;
	}
	`);

	// Set style of the buttons inside the tab
	Style.createStyle(
	'.tab' + id +  ` button {
		background: #ddd;
		float: left;
		outline: none;
		border: none;
		padding: 6px 6px;
		width: 60px;
		height: 28px;
		cursor: pointer;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	`);

	// Set style of the buttons inside the tab on mouse hover
	Style.createStyle(
	'.tab' + id + ` button:hover {
		background: #e7e7e7;
		color: #000;
	}
	`);

	// Set style of current active button
	Style.createStyle(
	'.tab' + id + ` button.active {
		background: #f1f1f1;
		color: #000;
	}
	`);
	
	// Set style of div content, parent of textarea
	Style.createStyle(
	'.divcontent' + id + ` {
		clear: both;
		padding: 4px 4px;
		background: inherit;
	}
	`);
	
	// Set style of tab content, which is a textarea
	Style.createStyle(
	'.tabcontent' + id + ` {
		width: 182px;
		display: none;
		padding: 4px 6px;
		overflow-Y: scroll;
		border: 1px solid #aaa;
	}
	`);
}

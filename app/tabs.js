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
	Continue creating this class. Class style tablinks must
	also be labeled with id.
	20180617
	Fix referencing to this in event handler.
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
			this.id = arguments[0];
			this.parentId = "document.body";
			var msg = "Tabs " + this.id + " assumes that parent is"
				+ " document.body";
			console.warn(msg);
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
		this.createAllStyle(this.id);
		this.tabcs = "tab" + this.id;
		this.tabbtncs = "tab" + this.id + " button";
		this.tablinkscs =  "tablinks" + this.id;
		this.divcontcs =  "divcontent" + this.id;
		this.tabcontcs =  "tabcontent" + this.id;
		
		// Try not so good workaround
		localStorage.setItem(this.tablinkscs, this.tablinkscs);
		localStorage.setItem(this.tabcontcs, this.tabcontcs);
		
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
		this.tabsType = [];
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
	addTab(label, type) {
		// Erase div
		var divid = this.id + "div";
		var div = document.getElementById(divid);
		if(div != undefined) {
			div.remove();
		}
		
		// Avoid same tab label
		var ilabel = this.tabs.indexOf(label);
		if(ilabel < 0) {
			this.tabs.push(label);
			this.tabsType.push(type);
		} else {
			var msg = "Duplicate label " + label + " is igonered";
			console.warn(msg);
		}
		
		// Create tab buttons
		var N = this.tabs.length;
		for(var i = 0; i < N; i++) {
			var id = this.id + this.tabs[i];
			var btn = document.getElementById(id);
			if(btn == undefined) {
				var btn = document.createElement("button");
				btn.id = id;
				btn.className = this.tablinkscs;
				btn.innerHTML = this.tabs[i];
				btn.addEventListener("click", this.toggleContent)
				this.tab.append(btn);
			}
		}
		
		// Recreate div
		div = document.getElementById(divid);
		if(div == undefined) {
			var div = document.createElement("div");
			div.id = divid;
			div.className = this.divcontcs;
			this.tab.append(div);
		}
		
		// Create content of div
		for(var i = 0; i < N; i++) {
			var id = this.id + this.tabs[i] + "content";
			var el = document.getElementById(id);
			if(el == undefined) {
				var el;
				if(this.tabsType[i] == 0) {
					el = document.createElement("textarea");
					el.className = this.tabcontcs;
					el.innerHTML = this.tabs[i];
				} else if(this.tabsType[i] == 1) {
					el = document.createElement("canvas");
					el.className = this.tabcontcs;
				}
				el.id = id;
				div.append(el);
			}
		}
		
		// Adjust textarea or canvas width
		var width = parseInt(Style.getStyleAttribute('.' +
			this.tabcs, "width"));
		var pl = parseInt(Style.getStyleAttribute('.' +
			this.divcontcs, "paddingLeft"));
		var pr = parseInt(Style.getStyleAttribute('.' +
			this.divcontcs, "paddingRight"));
		var dh = 14;
		var tcwidth = (width - pl - pr - dh) + "px";
		Style.changeStyleAttribute('.' + this.tabcontcs,
			"width", tcwidth);
		
		var height = parseInt(Style.getStyleAttribute('.' +
			this.tabcs, "height"));
		var pt = parseInt(Style.getStyleAttribute('.' +
			this.divcontcs, "paddingTop"));
		var pb = parseInt(Style.getStyleAttribute('.' +
			this.divcontcs, "paddingBottom"));
		var dv = 38;
		var tcheight = (height - pt - pb - dv) + "px";
		Style.changeStyleAttribute('.' + this.tabcontcs,
			"height", tcheight);

			// Adjust width according to number of tab buttons
		this.updateTabButtonsWidth();
		
		// Initiate visible tab -- 20180617.0918
		this.toggleContent(0);
	}
	
	// Remove label for tab button
	removeTab(label) {
		// 20180616.0445
		// Tom Wadley, Beau Smith
		// https://stackoverflow.com/a/5767357/9475509
		var i = this.tabs.indexOf(label);
		var remE = this.tabs.splice(i, 1);
		this.tabsType.splice(i, 1);
		
		// Warn only for unexisting label for removing
		if(i < 0) {
			var msg = "Unexisting label " + label + " for removing "
				+ "is igonered";
			console.warn(msg);
		}
		
		// 20180616.1612
		// Catalin Rosu
		// https://catalin.red/removing-an-element-with
		// -plain-javascript-remove-method/
		var id = this.id + remE;
		var btn = document.getElementById(id);
		btn.remove();
		this.updateTabButtonsWidth();
	}
	
	// Check and update tab buttons
	updateTabButtonsWidth() {
		var N = this.tabs.length;
		var M = document.getElementsByClassName(this.tablinkscs)
			.length;
		// Make sure that label and tabbutton have the same size
		if(M == N) {
			var width =
				Style.getStyleAttribute('.' + this.tabcs, "width");
			var btnWidth = parseInt(width) / N + "px";
			Style.changeStyleAttribute('.' + this.tabbtncs,
				"width", btnWidth);
		}
	}
	
	// Get class name -- problem by event also not work
	getStyleClassName() {
		var scn = [];
		scn.push(this.tabcs);
		scn.push(this.tabbtncs);
		scn.push(this.tablinkscs);
		scn.push(this.tabcontcs);
		return scn;
	}
		
	// Toggle tab content when button clicked
	toggleContent() {
		// The idea using styles is from
		// https://www.w3schools.com/howto/howto_js_tabs.asp
		
		if(event != undefined) {
			// Get style name with workaround using localStorage
			var parent = event.target.parentElement;
			var tlcs = localStorage
				.getItem("tablinks" + parent.id);
			var tccs = localStorage
				.getItem("tabcontent" + parent.id);

			// Remove active from all button
			var tablinks = document.getElementsByClassName(tlcs);
			var N = tablinks.length;
			for(var i = 0; i < N; i++) {
				var className = tablinks[i].className;
				var newClassName = className.replace("active", "");
				tablinks[i].className = newClassName;
			}
			
			// Hide all tabcontent
			var tabcont = document.getElementsByClassName(tccs);
			var N = tabcont.length;
			for(var i = 0; i < N; i++) {
				tabcont[i].style.display = "none";
			}
			
			// Set active to current button and show related content
			var target = event.target;
			target.className += " active";
			var id = target.id + "content";
			var el = document.getElementById(id);
			el.style.display = "block";
		} else {
			var i = arguments[0];
			var id = this.id;
			var tlcs = localStorage.getItem("tablinks" + id);
			var tccs = localStorage.getItem("tabcontent" + id);
			var tablinks = document.getElementsByClassName(tlcs);
			var tabcont = document.getElementsByClassName(tccs);
			
			// Fixed -- 20180617.0918
			if(tablinks.length > 0 && tabcont.length > 0) {
				tablinks[i].className += " active";
				tabcont[i].style.display = "block";
			}
		}
	}
	
	// Create default style for this class
	createAllStyle(id) {
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
			background: #fff;
			margin: 0px;
		}
		`);
	}
}


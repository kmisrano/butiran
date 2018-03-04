/*
	test_exam.js
	Test the use of exam.js and related function
	
	Sparisoma Viridi | dudung@gmail.com
	
	20180303
	Start this test functions.
	20180404
	Modify adding options to select.
*/

function test_exam() {
	var sel = document.createElement("select");
	sel.addEventListener("change", selectProblem)
	sel.style.fontFamily = "Arial";
	sel.style.fontSize = "13px";
	document.body.appendChild(sel);
	
	var div = document.createElement("div");
	div.id = "scriptResult";
	div.innerHTML = "&nbsp;"
	div.style.border = "1px solid #888";
	div.style.background = "#f8f8f8";
	div.style.padding = "10px";
	div.style.fontFamily = "Arial";
	div.style.fontSize = "12px";
	document.body.appendChild(div);
	
	var opt;
	
	opt = document.createElement("option");
	opt.text = "Select problems";
	sel.options.add(opt);
	
	opt = document.createElement("option");
	opt.text = "Hello world";
	sel.options.add(opt);
	
	opt = document.createElement("option");
	opt.text = "Letter configuration";
	sel.options.add(opt);
	
	opt = document.createElement("option");
	opt.text = "Display series";
	sel.options.add(opt);
	
	opt = document.createElement("option");
	opt.text = "Root formula";
	sel.options.add(opt);
	
	opt = document.createElement("option");
	opt.text = "Draw circle";
	sel.options.add(opt);
	
	opt = document.createElement("option");
	opt.text = "Color bar";
	sel.options.add(opt);
	
	opt = document.createElement("option");
	opt.text = "Button click";
	sel.options.add(opt);
	
	opt = document.createElement("option");
	opt.text = "Progress bar";
	sel.options.add(opt);
	
	opt = document.createElement("option");
	opt.text = "Simple statistics";
	sel.options.add(opt);
	
	opt = document.createElement("option");
	opt.text = "Table";
	sel.options.add(opt);
}

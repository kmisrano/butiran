/*
	vd_vdbneimg.js
	Visualisation and digitization of BNE images
	
	Sparisoma Viridi | dudung@gmail.com
	Dimas Praja Purwa Aji | dmspraja2105@gmail.com
	
	20140713
	First version
	20141020
	Set fixed height to 491px
	20141021
	Set prefix through select instead of input box
	20150328
	Selecting image using input box and drawing a circle
	onClick instead of x mark
	20150329
	Input calibration aspect, zooming on image preview and
	upgrading clearlistlast function
	20150330
	Fixing radius calibration value, round result number,
	modify width of the textbox area and fixing preview image
	plus upgrading createImageList function
	20150331
	Creating red dot inside blue circle as a mark
	20150402
	Creating lines represent calibration size
	20150419
	Modifying lines represent radius size
	20150420
	Autoresizing input file
	20150423
	Creating history list
	20150525
	Add br after diameter, width, and height for more
	convinient view in HTML.
	Fix round problem using ().toFixed(n)
	
	20181120
	Change style of previous comments.
	Modify jQuery source from local to use CDN.
	Add to butiran even not yet in full JS and plan to convert it.
	
	20181208
	Change to JS.
	Old title Brazil-Nut Effect History Line Visualisation.
*/

document.title = "Brazil-Nut Effect "
	+ " History Line Visualisation";

var rad = 1.;
var xtrue = 1.;
var ytrue = 1.;
var wgbr = 1.;
var hgbr = 1.;
var tgbr = 1.;
var lgbr = 1.;

function bigImg() {
	var x = event.target; // <--- modified 20181208
	x.style.height = "auto";
	x.style.width = "auto";
}

function normalImg() {
	var x = event.target; // <--- modified 20181208
	x.style.height = "75px";
	x.style.width = "auto";
}

function CalibSet(){
	wgbr = (document.getElementById("thumb").naturalWidth) * 1.;
	hgbr = (document.getElementById("thumb").naturalHeight) * 1.;

	if ( hgbr/wgbr > 1. ) {
		tgbr = 640.;
		lgbr = (640. * (wgbr/hgbr));
	}
	if ( hgbr/wgbr <= 1. ) {
		lgbr = 480.;
		tgbr = (480. * (hgbr/wgbr));
	}	
	
	var radius = document.getElementById("Jejari");
	var xTrue = document.getElementById("xBenar");
	xtrue = xTrue.value;
	ytrue = Math.round((xtrue * (tgbr/lgbr))
		* Math.pow(10,3))/Math.pow(10,3);
	ytrue = ytrue.toFixed(3);
	rad = radius.value * (lgbr/xtrue);
	var calh = document.getElementById("AnotherCanvas");
    	var calhtx = calh.getContext("2d");
	calhtx.fillStyle = "#FFFFFF";
	calhtx.fillRect(0, 0, 15, 640);
	for ( ha = 0; ha < tgbr; ha = (ha + (2 * rad)) ) {
		calhtx.fillStyle = "#FF0000";
    		calhtx.fillRect(0, ha, 5, rad);
		calhtx.fillStyle = "#000000";
		calhtx.fillRect(0, (ha + rad), 5, rad);
	}
	calhtx.fillStyle = "#FFFFFF";
	calhtx.fillRect(0, tgbr, 15, (640 - tgbr));
	var calw = document.getElementById("AnotherOneCanvas");
    	var calwtx = calw.getContext("2d");
	calwtx.fillStyle = "#FFFFFF";
	calwtx.fillRect(0, 0, 480, 15);
	for ( wa = 0; wa < lgbr; wa = (wa + (2 * rad)) ) {
		calwtx.fillStyle = "#FF0000";
    		calwtx.fillRect(wa, 0, rad, 5);
		calwtx.fillStyle = "#000000";
		calwtx.fillRect((wa + rad), 0, rad, 5);
	}
	calwtx.fillStyle = "#FFFFFF";
	calwtx.fillRect(lgbr, 0, (480 - lgbr), 15);
	
	var hist = document.getElementById("MyHistory");
	var history = "Calibration Saved";
	hist.value += history + "\n";
}

function createImageList() {
	wgbr = (document.getElementById("thumb").naturalWidth) * 1.;
	hgbr = (document.getElementById("thumb").naturalHeight) * 1.;

	var s = document.getElementById("MyCanvas");
	var stx = s.getContext("2d");
	var gbr = document.getElementById("thumb");
	stx.fillStyle = "#FFFFFF";
	stx.fillRect(0, 0, 480, 640);
	if ( hgbr/wgbr > 1. )
		stx.drawImage(gbr, 0, 0, (640 * (wgbr/hgbr)), 640);
	else
		stx.drawImage(gbr, 0, 0, 480, (480 * (hgbr/wgbr)));

	console.log(s);
	
	var thefile = document.getElementById("i_file");
	var tester = thefile.value;
	var test = tester.split("fakepath");
	var hist = document.getElementById("MyHistory");
	var history = "Creating " + test[1];
	hist.value += history + "\n";	
}

function clearListAll() {
	var list = document.getElementById("MyList");
	var lines = list.value;
	lines = "";
	list.value = lines;
	var ca = document.getElementById("MyCanvas");
    	var catx = ca.getContext("2d");
	var gbr = document.getElementById("thumb");
	catx.fillStyle = "#FFFFFF";
	catx.fillRect(0, 0, 480, 640);
	if ( hgbr/wgbr > 1. )
		catx.drawImage(gbr, 0, 0, (640 * (wgbr/hgbr)), 640);
	else
		catx.drawImage(gbr, 0, 0, 480, (480 * (hgbr/wgbr)));
	
	var hist = document.getElementById("MyHistory");
	var history = "Clear All Point";
	hist.value += history + "\n";
}

function clearListLast() {
	wgbr = (document.getElementById("thumb").naturalWidth) * 1.;
	hgbr = (document.getElementById("thumb").naturalHeight) * 1.;
	
	if ( hgbr/wgbr > 1. ) {
		tgbr = 640.;
		lgbr = (640. * (wgbr/hgbr));
	}
	if ( hgbr/wgbr <= 1. ) {
		lgbr = 480.;
		tgbr = (480. * (hgbr/wgbr));
	}

	var list = document.getElementById("MyList");
	var lines = list.value;
	var nl = lines.lastIndexOf("\n");
	lines = lines.substring(0, nl);
	nl = lines.lastIndexOf("\n");
	var ll = lines.substring(nl + 1, lines.length);
	lines = lines.substring(0, nl);
	if (lines.length > 0)
		list.value = lines + "\n";
	else
		list.value = lines;
	
	var imgcon = document.getElementById("ImageContainer");
	var ss = ll.split("\t");
	px = (ss[0] * (lgbr/xtrue)) - imgcon.offsetLeft + 8;
	var LY = tgbr;
	py = LY - (ss[1] * (tgbr/ytrue));
	
	//list.value = list.value + px + "\t" + py + "\n";
	
	var cl = document.getElementById("MyCanvas");
	var cltx = cl.getContext("2d");
	cltx.fillStyle = "#FFFFFF";
	cltx.fillRect(0, 0, 480, 640);
	var gbr = document.getElementById("thumb");
	if ( hgbr/wgbr > 1. )
		cltx.drawImage(gbr, 0, 0, (640 * (wgbr/hgbr)), 640);
	else
		cltx.drawImage(gbr, 0, 0, 480, (480 * (hgbr/wgbr)));
	
	var newlist = list.value;
	var listbaru = newlist.split("\n");
	var i;

    	for (i = 0; i < listbaru.length; i++) {
		var forlist = listbaru[i].split("\t");
		px = (forlist[0] * (lgbr/xtrue));
		py = LY - (forlist[1] * (tgbr/ytrue));
		cltx.strokeStyle = "#0000FF";
		cltx.beginPath();
		cltx.arc(px,py,rad,0,2*Math.PI);
		cltx.stroke();
		cltx.fillStyle = "#FF0000";
		cltx.beginPath();
		cltx.arc(px,py,(rad/12),0,2*Math.PI);
		cltx.fill();
	}
	
	var hist = document.getElementById("MyHistory");
	var history = "Clear Last Point";
	hist.value += history + "\n";
}

function getXY(e) {
	wgbr = (document.getElementById("thumb").naturalWidth) * 1.;
	hgbr = (document.getElementById("thumb").naturalHeight) * 1.;
	
	if ( hgbr/wgbr > 1. ) {
		tgbr = 640.;
		lgbr = (640. * (wgbr/hgbr));
	}
	if ( hgbr/wgbr <= 1. ) {
		lgbr = 480.;
		tgbr = (480. * (hgbr/wgbr));
	}

	var list = document.getElementById("MyList");
	var imgcon = document.getElementById("ImageContainer");
	var px = e.pageX - imgcon.offsetLeft;
	var py = e.pageY - imgcon.offsetTop + 1;

	var posx = Math.round(((xtrue/lgbr) * px)
		* Math.pow(10,3))/Math.pow(10,3);
	var posx = posx.toFixed(3);
	var posy = Math.round(((ytrue/tgbr) * py)
		* Math.pow(10,3))/Math.pow(10,3);
	var posy = posy.toFixed(3);

	var lines = list.value;
	var LY = ytrue;
	lines += posx + "\t" + (LY - posy) + "\n";
	list.value = lines;
	
	var c = document.getElementById("MyCanvas");
	var ctx = c.getContext("2d");
	ctx.strokeStyle = "#0000FF";
	ctx.beginPath();
	ctx.arc(px,py,rad,0,2*Math.PI);
	ctx.stroke();
	ctx.fillStyle = "#FF0000";
	ctx.beginPath();
	ctx.arc(px,py,(rad/12),0,2*Math.PI);
	ctx.fill();
}

function alertFilename() {
	var thefile = document.getElementById("i_file");
	var tester = thefile.value;
	var test = tester.split("fakepath");
	var hist = document.getElementById("MyHistory");
	var history = "Opening " + test[1];
	hist.value += history + "\n";
}

function firstFocus() {
	var button = document.getElementById("createBtn");
	button.focus();
}

/*
<p style="font-weight: bold; font-size: 18pt;">
	Sequence of images
</p>
*/
var p1 = document.createElement("p");
p1.style.fontWeight = "bold";
p1.style.fontSize = "18pt";
p1.innerHTML = "Sequence of images";
document.body.append(p1);

/*
<input type="file" id="i_file" onchange="alertFilename()" accept="image/*" />
*/
var inp1 = document.createElement("input");
inp1.type = "file";
inp1.id = "i_file";
inp1.addEventListener("change", alertFilename);
inp1.accept = "image/*";
document.body.append(inp1);

/*
<p style="font-weight: bold; font-size: 11pt;">
	Image Preview
</p>
*/
var p2 = document.createElement("p");
p2.style.fontWeight = "bold";
p2.style.fontSize = "11pt";
p2.innerHTML = "Image Preview";
document.body.append(p2);

/*
<img onmouseover="bigImg(this)" onmouseout="normalImg(this)"
	id="thumb" src="" width="auto" height="auto"
	style="display:none;"
/>
*/
var img = document.createElement("img");
img.addEventListener("load", normalImg); // <--- modified 20181208
img.addEventListener("mouseover", bigImg);
img.addEventListener("mouseout", normalImg);
img.id = "thumb";
img.src = "";
img.width = "auto";
img.height = "auto";
img.style.display = "none";
document.body.append(img);

/*
<br />
*/
var b1 = document.createElement("br");
document.body.append(b1);

/*
<br clear="all" />
*/
var b2 = document.createElement("br");
b2.clear = "all";
document.body.append(b2);

/*
<div>
*/
var div1 = document.createElement("div");
document.body.append(div1);

/*
<input type="button" value="Create" onclick="createImageList();" style="width: 80px;" id="createBtn"/>
</div>
*/
var inp2 = document.createElement("input");
inp2.type = "button";
inp2.value = "Create";
inp2.addEventListener("click", createImageList);
inp2.style.width = "80px";
inp2.id = "createBtn";
div1.append(inp2);

/*
<p style="font-weight: bold; font-size: 11pt;">
	Calibration Setting
</p>
*/
var p3 = document.createElement("p");
p3.style.fontWeight = "bold";
p3.style.fontSize = "11pt";
p3.innerHTML = "Calibration Setting";
document.body.append(p3);

/*
<form>
*/
var frm = document.createElement("form");
document.body.append(frm);

/*
  Radius (dalam cm), garis merah/hitam :
*/
frm.innerHTML = "Radius (dalam cm), garis merah/hitam :";

/*
  <input type="text" id="Jejari" size="5">
*/
var inp3 = document.createElement("input");
inp3.type = "text";
inp3.id = "Jejari";
inp3.size = "5";
frm.append(inp3);

/*
  Lebar Sebenarnya (dalam cm):
*/
frm.innerHTML += "Lebar Sebenarnya (dalam cm):";

/*
  <input type="text" id="xBenar" size="5">
*/
var inp4 = document.createElement("input");
inp4.type = "text";
inp4.id = "xBenar";
inp4.size = "5";
frm.append(inp4);

/*
  <input type="button" value="Submit" onclick="CalibSet();">
</form>
*/
var inp5 = document.createElement("input");
inp5.type = "button";
inp5.value = "Submit";
inp5.addEventListener("click", CalibSet);
frm.append(inp5);

/*
<!-- to jQuery dependence -->
<script type="text/javascript">
	$('#i_file').change( function(event) {
		$("img").fadeIn("slow").attr('src',URL.createObjectURL(event.target.files[0]))
        });
</script>
*/
$("#i_file").change(
	function(event) {
		$("img").fadeIn("slow")
			.attr("src",URL.createObjectURL(event.target.files[0]));
		//console.log(".."); // <--- modified 20181208
	}
);

/*
<div id="ImageContainer" 
style="width: 480px; height: 640px; float: left;
border: 0px #bbb solid; padding-top: 0px;" onclick="getXY(event);">
*/
var div2 = document.createElement("div");
div2.id = "ImageContainer";
div2.style.width = "480px"; 
div2.style.height = "640px"; 
div2.style.float = "left"; 
div2.style.border = "0px #bbb solid";
div2.style.paddingTop = "0px";
div2.addEventListener("click", getXY);
document.body.append(div2);

/*
<!--canvas id="MyCanvas" width="480px"  height="640px"-->
<canvas id="MyCanvas" width="480px"  height="640px" style="border:0px solid black;">
</canvas>
*/
var can1 = document.createElement("canvas");
can1.id= "MyCanvas";
can1.width="480"; // <--- modified 20181208
can1.height="640"; // <--- modified 20181208
can1.style.border = "0px solid black";
div2.append(can1);

/*
<br /><br />
*/
var b3 = document.createElement("br");
div2.append(b3);
var b4 = document.createElement("br");
div2.append(b4);

/*
<canvas id="AnotherOneCanvas" width="480px"  height="15px" style="border:0px solid black;">
</canvas>
</div>
*/
var can2 = document.createElement("canvas");
can2.id= "AnotherOneCanvas";
can2.width="480"; // <--- modified 20181208
can2.height="15"; // <--- modified 20181208
can2.style.border = "0px solid black";
div2.append(can2);

/*
<div id="HeightCalib" style="float: left; padding-left: 5px; width: 15px height: 640px; border: 0px #bbb solid;">
*/
var div3 = document.createElement("div");
div3.id = "HeightCalib";
div3.style.float = "left";
div3.style.paddingLeft = "5px";
div3.style.width = "15px";
div3.style.height = "640px";
div3.style.border = "0px #bbb solid";
document.body.append(div3);

/*
<canvas id="AnotherCanvas" width="15px"  height="640px" style="float: left; padding-left: 5px; border:0px solid black;">
</canvas>
</div>
*/
var can3 = document.createElement("canvas");
can3.id= "AnotherCanvas";
can3.width="15"; // <--- modified 20181208
can3.height="640"; // <--- modified 20181208
can3.style.float = "left";
can3.style.paddingLeft = "5px";
can3.style.border = "0px solid black";
div3.append(can3);

/*
<div style="float: left; width: 135px; height: 670px;
padding-left: 15px; border: 0px #bbb solid; ">
*/
var div4 = document.createElement("div");
div4.id = "HeightCalib";
div4.style.float = "left";
div4.style.paddingLeft = "5px";
div4.style.width = "15px";
div4.style.height = "640px";
div4.style.border = "0px #bbb solid";
document.body.append(div4);

/*
<textarea id="MyList" rows="28" cols="12" style="width: 135px; height: 640px; border: 1px solid black; ">
</textarea>
*/
var ta1 = document.createElement("textarea");
ta1.id = "MyList";
ta1.rows = "28";
ta1.cols = "12";
ta1.style.width = "135px";
ta1.style.height = "640px";
ta1.style.border = "1px solid black";
div4.append(ta1);

/*
<br />
*/
var b5 = document.createElement("br");
div4.append(b5);

/*
<input type="button" value="Clear last" style="width: 135px;"
onclick="clearListLast();" />
*/
var inp3 = document.createElement("input");
inp3.type = "button";
inp3.value = "Clear last";
inp3.style.width = "80px";
inp3.addEventListener("click", clearListLast);
div4.append(inp3);

/*
<br />
*/
var b6 = document.createElement("br");
div4.append(b6);

/*
<input type="button" value="Clear all" style="width: 135px;"
onclick="clearListAll();" />
</div>
*/
var inp4 = document.createElement("input");
inp4.type = "button";
inp4.value = "Clear all";
inp4.style.width = "135px";
inp4.addEventListener("click", clearListAll);
div4.append(inp4);

/*
<div style="float: left; width: 280px; height: 640px; padding-left: 20px; border: 0px #bbb solid; font-weight: bold; font-size: 11pt;">History :
*/
var div5 = document.createElement("div");
//div5.style.float = "left";
div5.style.width = "280px";
div5.style.height = "640px";
div5.style.paddingLeft = "20px";
div5.style.border = "0px #bbb solid";
div5.style.fontWeight = "bold";
div5.style.fontSize = "11pt";
div5.innerHTML = "History : \n";
document.body.append(div5);

/*
<br>
*/
var b7 = document.createElement("br");
div5.append(b7);

/*
<textarea id="MyHistory" rows="28" cols="12" style="width: 280px; height: 640px; border: 0px solid black; ">
</textarea>
</div>
*/
var ta2 = document.createElement("textarea");
ta2.id = "MyHistory";
ta2.rows = "28";
ta2.cols = "12";
ta2.style.width = "280px";
ta2.style.height = "640px";
ta2.style.border = "0px solid black";
div5.append(ta2);

/*
	</script>
</head>
<body onload="firstFocus();">
*/
firstFocus();

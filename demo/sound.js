/*
	sound.js
	Generate sound using pizzicato.js library
	
	Sparisoma Viridi | dudung@gmail.com
	
	20180317
	Start this demo file.
	Fix event triggered by touch screen. Thanks to Jeff about
	the information
	URL https://stackoverflow.com/a/49335268/9475509
*/

// 20180317.1924 !ok
function demoSoundBeat() {
	var eout = document.getElementById("scriptResult");
	eout.innerHTML = "";
	
	var tx1 = document.createElement("text");
	tx1.innerHTML = "Frequency 1 ";
	var tx2 = document.createElement("text");
	tx2.innerHTML = "Frequency 2 ";
	var in1 = document.createElement("input");
	in1.value = "800";
	in1.style.width = "40px";
	var in2 = document.createElement("input");
	in2.value = "801";
	in2.style.width = "40px";
	var br1 = document.createElement("br");
	var br2 = document.createElement("br");
	var bt1 = document.createElement("button");
	bt1.innerHTML = "Play";
	bt1.addEventListener("click", btnClick);
	
	var sw1 = new Pizzicato.Sound({ 
    source: "wave",
    options: {
        frequency: 800
    }
	});
	var sw2 = new Pizzicato.Sound({ 
    source: "wave",
    options: {
        frequency: 801
    }
	});
	
	eout.appendChild(tx1);
	eout.appendChild(in1);
	eout.appendChild(br1);
	eout.appendChild(tx2);
	eout.appendChild(in2);
	eout.appendChild(br2);
	eout.appendChild(bt1);
	
	function btnClick() {
		var t = event.target;
		if(t.innerHTML == "Play") {
			t.innerHTML = "Stop";
			in1.disabled = true;
			in2.disabled = true;
			sw1.frequency = in1.value;
			sw2.frequency = in2.value;
			sw1.play();
			sw2.play();
		} else {
			t.innerHTML = "Play";
			in1.disabled = false;
			in2.disabled = false;
			sw1.stop();
			sw2.stop();
		}
	}
}


// 20180317.1404 ok
function demoSimpleInstrument() {
	var eout = document.getElementById("scriptResult");
	eout.innerHTML = "";
	
	var baseFrequency = 880;
	var sineWave = new Pizzicato.Sound({ 
    source: "wave",
    options: {
        frequency: baseFrequency
    }
	});
	
	var ratio = [1/1, 9/8, 5/4, 4/3, 3/2, 5/3, 15/8, 2/1];
	var label = ["C", "D", "E", "F", "G", "A", "B", "C"];
	for(var i = 0; i < ratio.length; i++) {
		var b = document.createElement("button");
		b.innerHTML = label[i];
		b.id = i;
		eout.appendChild(b);
		b.addEventListener("mousedown", playSound);
		b.addEventListener("mouseup", stopSound);
		b.addEventListener("mouseout", stopSound);
		b.addEventListener("touchstart", playSound);
		b.addEventListener("touchend", stopSound);
	}
	
	function playSound() {
		var t = event.target;
		var f = baseFrequency * ratio[t.id];
		sineWave.frequency = f;
		sineWave.play();
	}
	
	function stopSound() {
		sineWave.stop();
	}
}

// 20180317.1323 !ok 
function demoToggleSound() {
	var eout = document.getElementById("scriptResult");
	eout.innerHTML = "";
	
	var sineWave = new Pizzicato.Sound({
    source: 'wave', 
    options: {
        frequency: 880
    }
	});
	
	var btn = document.createElement("button");
	btn.innerHTML = "Play";
	eout.appendChild(btn);
	btn.addEventListener("click", btnClick);
	
	function btnClick() {
		var t = event.target;
		if(t.innerHTML == "Play") {
			t.innerHTML = "Stop";
			sineWave.play();
		} else {
			t.innerHTML = "Play";
			sineWave.stop();
		}
	}
}

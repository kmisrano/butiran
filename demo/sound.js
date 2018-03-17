/*
	sound.js
	Generate sound using pizzicato.js library
	
	Sparisoma Viridi | dudung@gmail.com
	
	20180317
	Start this demo file.
*/

// 20180317.1404 ok
function demoSimpleInstrument() {
	var baseFrequency = 440;
	var sineWave = new Pizzicato.Sound({ 
    source: 'wave', 
    options: {
        frequency: baseFrequency
    }
	});
	
	var baseFrequency = 440;
	var ratio = [1/1, 9/8, 5/4, 4/3, 3/2, 5/3, 15/8, 2/1];
	var label = ["C", "D", "E", "F", "G", "A", "B", "C"];
	for(var i = 0; i < ratio.length; i++) {
		var b = document.createElement("button");
		b.innerHTML = label[i];
		b.id = i;
		document.body.appendChild(b);
		b.addEventListener("mousedown", playSound);
		b.addEventListener("mouseup", stopSound);
		b.addEventListener("mouseout", stopSound);
	}
	
	//sineWave.play();
	
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
	var sineWave = new Pizzicato.Sound({ 
    source: 'wave', 
    options: {
        frequency: 440
    }
	});
	
	var btn = document.createElement("button");
	btn.innerHTML = "Play";
	document.body.appendChild(btn);
	btn.addEventListener("mousedown", btnClick);
	
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

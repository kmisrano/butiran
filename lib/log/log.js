/*
	log.js
	It is just a log for everything crosses my mind
	
	Sparisoma Viridi | dudung@gmail.com
	
	20180619
	Start this log.
	All application (.html) in development stage need to
	record using this manually, for later constructed in
	a database in the far future.
*/

var logitem;
var logjs = [];

logitem = {
	app: "opseb",
	date: "20180619",
	time: "0436",
	type: "0",
	text: "Change all attributes to string",
}; logjs.push(logitem);

logitem = {
	app: "opseb",
	date: "20180619",
	time: "0434",
	type: "0",
	text: "Produce output in most simplest way",
}; logjs.push(logitem);

logitem = {
	app: "opseb",
	date: "20180619",
	time: "0356",
	type: 0,
	text: "Create opseb based on gstd",
}; logjs.push(logitem);

logitem = {
	app: "opseb",
	date: "20180619",
	time: "0352",
	type: "0",
	text: "Say 'Hello, log of opseb!'",
}; logjs.push(logitem);

function showOnly(logs) {
	var log = {
		forDate: function(date) {
			var items = date + '\n';
			var N = logs.length;
			for(var i = 0; i < N; i++) {
				if(logs[i].date == date) {
					items += logs[i].time + " " + logs[i].text + '\n';
				}
			}
			return items;
		},
	};
	return log;
}
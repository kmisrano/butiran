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
	time: "0541",
	type: "0",
	text: "Create Sample and it works",
}; logjs.push(logitem);

logitem = {
	app: "opseb",
	date: "20180619",
	time: "0457",
	type: "0",
	text: "Add note for removing log when deploy to distribution",
}; logjs.push(logitem);

logitem = {
	app: "opseb",
	date: "20180619",
	time: "0452",
	type: "0",
	text: "Change forDate to forFilter and test for date and app",
}; logjs.push(logitem);

logitem = {
	app: "opseb",
	date: "20180619",
	time: "0446",
	type: "0",
	text: "Forget previous thought and concentrate on designing Sampling",
}; logjs.push(logitem);

logitem = {
	app: "opseb",
	date: "20180619",
	time: "0444",
	type: "0",
	text: "Think whether sort of Tabs but for button should be constructed too or not",
}; logjs.push(logitem);

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
		forFilter: function(filter) {
			var items = "on " + filter.date + " for " +
				filter.app + '\n';
			var N = logs.length;
			for(var i = 0; i < N; i++) {
				if(logs[i].date == filter.date &&
					logs[i].app == filter.app) {
					items += logs[i].time + " " + logs[i].text + '\n';
				}
			}
			return items;
		},
	};
	return log;
}
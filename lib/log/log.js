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
	app: "opsebf",
	date: "20180619",
	time: "1610",
	type: "0",
	text: "Think how to modify Bgroup for disabled buttons",
}; logjs.push(logitem);

logitem = {
	app: "opsebf",
	date: "20180619",
	time: "1556",
	type: "0",
	text: "Rearrange main in providing better visibility for user",
}; logjs.push(logitem);

logitem = {
	app: "opsebf",
	date: "20180619",
	time: "1515",
	type: "0",
	text: "Move Tabs and Bgroup to butiran.js",
}; logjs.push(logitem);

logitem = {
	app: "opsebf",
	date: "20180619",
	time: "1506",
	type: "0",
	text: "Create clear and lines, they work",
}; logjs.push(logitem);

logitem = {
	app: "opsebf",
	date: "20180619",
	time: "1415",
	type: "0",
	text: "Update github and opsebf help empty",
}; logjs.push(logitem);

logitem = {
	app: "opsebf",
	date: "20180619",
	time: "1358",
	type: "0",
	text: "Change name from opseb to opsebf",
}; logjs.push(logitem);

logitem = {
	app: "opsebf",
	date: "20180619",
	time: "1355",
	type: "0",
	text: "Create about with alert and Bgroup works",
}; logjs.push(logitem);

logitem = {
	app: "opsebf",
	date: "20180619",
	time: "1324",
	type: "0",
	text: "Fix Bgroup visibility and start to layout",
}; logjs.push(logitem);

logitem = {
	app: "opsebf",
	date: "20180619",
	time: "1317",
	type: "0",
	text: "Debug Bgroup, which is not visible yet",
}; logjs.push(logitem);

logitem = {
	app: "opsebf",
	date: "20180619",
	time: "1308",
	type: "0",
	text: "Start developing Bgroup",
}; logjs.push(logitem);

logitem = {
	app: "opsebf",
	date: "20180619",
	time: "0614",
	type: "0",
	text: "Keine Ahnung haben",
}; logjs.push(logitem);

logitem = {
	app: "opsebf",
	date: "20180619",
	time: "0606",
	type: "0",
	text: "Update github.com/dudung/butiran",
}; logjs.push(logitem);

logitem = {
	app: "opsebf",
	date: "20180619",
	time: "0558",
	type: "0",
	text: "Advance message related to the use of filter after",
}; logjs.push(logitem);

logitem = {
	app: "opsebf",
	date: "20180619",
	time: "0554",
	type: "0",
	text: "Add filter after",
}; logjs.push(logitem);

logitem = {
	app: "opsebf",
	date: "20180619",
	time: "0541",
	type: "0",
	text: "Create Sample and it works",
}; logjs.push(logitem);

logitem = {
	app: "opsebf",
	date: "20180619",
	time: "0457",
	type: "0",
	text: "Add note for removing log when deploy to distribution",
}; logjs.push(logitem);

logitem = {
	app: "opsebf",
	date: "20180619",
	time: "0452",
	type: "0",
	text: "Change forDate to forFilter and test for date and app",
}; logjs.push(logitem);

logitem = {
	app: "opsebf",
	date: "20180619",
	time: "0446",
	type: "0",
	text: "Forget previous thought and concentrate on designing Sampling",
}; logjs.push(logitem);

logitem = {
	app: "opsebf",
	date: "20180619",
	time: "0444",
	type: "0",
	text: "Think whether sort of Tabs but for button should be constructed too or not",
}; logjs.push(logitem);

logitem = {
	app: "opsebf",
	date: "20180619",
	time: "0436",
	type: "0",
	text: "Change all attributes to string",
}; logjs.push(logitem);

logitem = {
	app: "opsebf",
	date: "20180619",
	time: "0434",
	type: "0",
	text: "Produce output in most simplest way",
}; logjs.push(logitem);

logitem = {
	app: "opsebf",
	date: "20180619",
	time: "0356",
	type: 0,
	text: "Create opseb based on gstd",
}; logjs.push(logitem);

logitem = {
	app: "opsebf",
	date: "20180619",
	time: "0352",
	type: "0",
	text: "Say 'Hello, log of opseb!'",
}; logjs.push(logitem);

function showOnly(logs) {
	var log = {
		forFilter: function(filter) {
			var after = (filter.after == undefined) ? "" :
				" after " + filter.after;
			var items = "on " + filter.date + " for " +
				filter.app + after + '\n';
			var N = logs.length;
			for(var i = 0; i < N; i++) {
				if(logs[i].date == filter.date &&
					logs[i].app == filter.app &&
					logs[i].time > filter.after) {
					items += logs[i].time + " " + logs[i].text + '\n';
				}
			}
			return items;
		},
	};
	return log;
}
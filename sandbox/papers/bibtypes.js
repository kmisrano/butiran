/*
	bibtypes.js
	Create bibliography types
	Sparisoma Viridi | dudung@gmail.com
	
	20150504
		Move this part from script.js to separated script file
		bibtypes.js
	20160918
		Add KnEEng similar to IOPConfSeries variable type.
	20170821
		Add lecture note.
*/

function createBibType(values) {
	var fields = values.split("|");
	var count = values.length; // or fields?
	function constructor() {
		for(var i = 0; i < count; i++) {
			this[fields[i]] = arguments[i];
		}
	}
	return constructor;
}

var Journal = createBibType("author|title|journal|volume|number|page|year|url");
var arXiv = createBibType("author|title|number|category|daymonth|year");
var Proceeding = createBibType("author|title|conference|editor|place|daymonth|year|page|url");
var BlogPost = createBibType("author|title|blog|daymonth|year|url");
var Thesis = createBibType("author|title|type|school|country|year|supervisor|url");
var AIPProceeding = createBibType("author|title|conference|editor|volume|year|page|url");
var Workshop = createBibType("author|title|workshop|place|daymonth|year|url");
var viXra = createBibType("author|title|number|category|monthday|year");
var Workshop = createBibType("author|title|workshop|place|daymonth|year|url");
var IOPConfSeries = createBibType("author|title|journal|volume|number|page|year|url");
var KnEEng = createBibType("author|title|journal|volume|number|page|year|url");
var LectureNote = createBibType("author|title|publisher|version|year|url");


function stringBibItem(item) {
	if(item instanceof Journal) {
		if(item.url != "") {
			var a1 = "<a href='" + item.url + "'>";
			var a2 = "</a>";
		} else {
			var a1 = "";
			var a2 = "";
		}
		var string = item.author + ", " +
		"&quot;" + item.title + "&quot;, " +
		a1 +
		"<i>" + item.journal + "</i> " +
		"<b>" + item.volume + "</b> " +
		"(" + item.number + "), " +
		item.page + " " +
		"(" + item.year + a2 + ").";
	} else if(item instanceof arXiv) {
		var url = "http://arxiv.org/abs/" + item.number;
		var string = item.author + ", " +
		"&quot;" + item.title + "&quot;, " +
		"<a href = '" + url + "'>" +
		"arXiv:" + item.number + " " +
		"[" + item.category + "] " +
		item.daymonth + " " + item.year + "</a>.";
	} else if(item instanceof Proceeding) {
		if(item.url != "") {
			var a1 = "<a href='" + item.url + "'>";
			var a2 = "</a>";
		} else {
			var a1 = "";
			var a2 = "";
		}
		var string = item.author + ", " +
		"&quot;" + item.title + "&quot;, " +
		a1 +
		item.conference + ", " +
		"Eds. " + item.editor + ", " +
		item.place + ", " +
		item.daymonth + " " + item.year + ", " +
		"pp. " + item.page + a2 + ".";
	} else if(item instanceof BlogPost) {
		if(item.url != "") {
			var a1 = "<a href='" + item.url + "'>";
			var a2 = "</a>";
		} else {
			var a1 = "";
			var a2 = "";
		}
		var string = item.author + ", " +
		"&quot;" + item.title + "&quot;, " +
		a1 +
		item.blog + ", " +
		item.daymonth + " " + item.year +
		a2 + ".";
	} else if(item instanceof Thesis) {
		if(item.url != "") {
			var a1 = "<a href='" + item.url + "'>";
			var a2 = "</a>";
		} else {
			var a1 = "";
			var a2 = "";
		}
		var string = item.author + ", " +
		"&quot;" + item.title + "&quot;, " +
		a1 +
		item.type + ", " + 
		item.school + ", " +
		item.country + ", " +
		item.year +
		a2 + ".";
	} else if(item instanceof AIPProceeding) {
		if(item.url != "") {
			var a1 = "<a href='" + item.url + "'>";
			var a2 = "</a>";
		} else {
			var a1 = "";
			var a2 = "";
		}
		var string = item.author + ", " +
		"&quot;" + item.title + "&quot;, " +
		a1 +
		"in <i>" + item.conference + "</i>, " +
		"edited by " + item.editor + ", " +
		"AIP Conference Proceedings " + item.volume + ", " +
		"American Institute of Physics, Melville, NY, " +
		item.year + ", " +
		"pp. " + item.page + a2 + ".";
	} else if(item instanceof Workshop) {
		if(item.url != "") {
			var a1 = "<a href='" + item.url + "'>";
			var a2 = "</a>";
		} else {
			var a1 = "";
			var a2 = "";
		}
		var string = item.author + ", " +
		"&quot;" + item.title + "&quot;, " +
		a1 +
		item.workshop + ", " +
		item.place + ", " +
		item.daymonth + " " + item.year +
		a2 + ".";
	} else if(item instanceof viXra) {
		var url = "http://vixra.org/abs/" + item.number;
		var string = item.author + ", " +
		"&quot;" + item.title + "&quot;, " +
		"<a href = '" + url + "'>" +
		"viXra:" + item.number + " | " +
		item.year + "-" + item.monthday + "</a>.";
	} else if(item instanceof IOPConfSeries) {
		if(item.url != "") {
			var a1 = "<a href='" + item.url + "'>";
			var a2 = "</a>";
		} else {
			var a1 = "";
			var a2 = "";
		}
		var string = item.author + ", " +
		"&quot;" + item.title + "&quot;, " +
		a1 +
		"<i>" + item.journal + "</i> " +
		"<b>" + item.volume + "</b> " +
		"(" + item.number + "), " +
		item.page + " " +
		"(" + item.year + a2 + ").";
	} else if(item instanceof KnEEng) {
		if(item.url != "") {
			var a1 = "<a href='" + item.url + "'>";
			var a2 = "</a>";
		} else {
			var a1 = "";
			var a2 = "";
		}
		var string = item.author + ", " +
		"&quot;" + item.title + "&quot;, " +
		a1 +
		"<i>" + item.journal + "</i> " +
		"<b>" + item.volume + "</b> " +
		"(" + item.number + "), " +
		item.page + " " +
		"(" + item.year + a2 + ").";
	} else if(item instanceof LectureNote) {
		if(item.url != "") {
			var a1 = "<a href='" + item.url + "'>";
			var a2 = "</a>";
		} else {
			var a1 = "";
			var a2 = "";
		}
		var string = item.author + ", " +
		"&quot;" + item.title + "&quot;, " +
		a1 + item.publisher + ", Version " + item.version +
		", " + item.year + a2 + ".";
	}
	return string;
}

var pubs = [];

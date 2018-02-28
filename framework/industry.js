/*
	industry.js
	Framework for industry object
	
	Sparisoma Viridi | dudung@gmail.com
	Tatang Suheri | tatangpl@yahoo.com
	
	20180301
	Start this library.
*/

class Industry {
	constructor(id, type) {
		this.id = id;
		this.type = type;
		this.revenue = { value: this.calculate, source: [] };
		this.cost = {	value: 0, source: [] };
	}
	
	calculate() {
		return 1.23;
	}
}

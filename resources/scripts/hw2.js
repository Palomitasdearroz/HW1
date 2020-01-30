// Constants
const DINGUS_PRICE = 14.25;
const WIDGET_PRICE = 9.99;
const ZERO_FORMAT = '0.00';
const DEBUG = true; // Where might this flag be used? (It's not mandatory)

// Elements
	let dingus = null;
	let widget = null;

	let dingusT = null;
	let widgetT = null;

	let total = null;
	let submit = null;

// Global store (What else would you need here?)
let store = {
  orderHistory: []
};

function generateEntries() {
	// Returns an orderHistory array
	// [ID#, Date, Dingus quantity, Widget quantity]
	return [
	  [1, '01/01/2020', 1, 1], 
	  [2, '01/02/2020', 2, 2]
	]
}

function getElements(){
	dingus = Number(document.getElementById('number_dingus').value);
	widget = Number(document.getElementById('number_widget').value);

	dingusT = document.getElementById('total_dingus');
	widgetT = document.getElementById('total_widget');

	total = document.getElementById('Total');
	submit = document.getElementById('submit');
}

function cancel(){
	dingusT.value = ZERO_FORMAT;
	widgetT.value = ZERO_FORMAT;
	total.value = ZERO_FORMAT;
	submit.disabled = true;
}

function calculate() {
	getElements();

	if(dingus > 0 || widget > 0)
	{
		let x = 0;
		let y = 0;
		if(widget > 0)
		{
			x = Number.parseFloat(widget * WIDGET_PRICE);
			widgetT.value = x;
		}

		if(dingus > 0)
		{
			y = Number.parseFloat(dingus * DINGUS_PRICE);
			dingusT.value = y;
		}

		total.value = Number.parseFloat(x + y).toFixed(2);
		submit.disabled = false;
	}
	else
	{
		cancel();
	}
}
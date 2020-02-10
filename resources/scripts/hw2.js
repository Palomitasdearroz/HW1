// Constants
const DINGUS_PRICE = 14.25;
const WIDGET_PRICE = 9.99;
const ZERO_FORMAT = '0.00';

// Elements
let numberDingus = null;
let numberWidgets = null;
let sales = null;

	let dingus = null;
	let widget = null;

	let dingusT = null;
	let widgetT = null;

	let total = null;
	let submit = null;

// Global store
let orderHistory = [
	[1, '01/01/2020', 1, 1], 
	[2, '01/02/2020', 2, 2]
  ];

function generateEntries() {
	// Returns an orderHistory array
	// [ID#, Date, Dingus quantity, Widget quantity]
	return [
	  [1, '01/01/2020', 1, 1], 
	  [2, '01/02/2020', 2, 2]
	]
}

function getElements(){
	numberDingus = document.getElementById('numberDingus');
	numberWidgets = document.getElementById('numberWidgets');
	sales = document.getElementById('Sales');

	dingus = Number(document.getElementById('number_dingus').value);
	widget = Number(document.getElementById('number_widget').value);

	dingusT = document.getElementById('total_dingus');
	widgetT = document.getElementById('total_widget');

	total = document.getElementById('Total');
	submit = document.getElementById('submit');
}

function cancel(){
	document.getElementById('number_dingus').value = 0;
	document.getElementById('number_widget').value = 0;
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

function getNextID(){
	return orderHistory.length + 1;
}

function getCurrentDate(){
	var today = new Date();
	var dd = String(today.getDate()).padStart(2, '0');
	var mm = String(today.getMonth() + 1).padStart(2, '0');
	var yyyy = today.getFullYear();

	return (mm + '/' + dd + '/' + yyyy);
}

function submitOrder(){
	let newOrder = [getNextID(), getCurrentDate(), dingus, widget]

	// Save it for local storage
	orderHistory.push(newOrder);

	appendData(newOrder);
	storeData();
	bars();
	cancel();
}

function appendData(data){
	let table = document.getElementById("tableBody");

	let row = table.insertRow();
	let cell1 = row.insertCell(0);
	let cell2 = row.insertCell(1);
	let cell3 = row.insertCell(2);
	let cell4 = row.insertCell(3);
	let cell5 = row.insertCell(4);

	cell1.innerHTML = data[0];
	cell2.innerHTML = data[1];
	cell3.innerHTML = data[2];
	cell4.innerHTML = data[3];
	cell5.innerHTML = Number.parseFloat(data[3] * WIDGET_PRICE + data[2] * DINGUS_PRICE).toFixed(2);

	recalculate();
}

function firstLoad(){
	getElements();
	let data = generateEntries();
	data.forEach(element => {
		//appendData(element);
	});

	retrieveData();

	if(orderHistory != null){
		orderHistory.forEach(element => {
			appendData(element);
		});
	}
}

function storeData(){
	localStorage.setItem('orderHistory', JSON.stringify(orderHistory));

	updateHeaders();
}

function updateHeaders(){
	let numDingus = 0;
	let numWidgets = 0;
	orderHistory.forEach(element => {
		numDingus = numDingus + Number(element[2]);
		numWidgets = numWidgets + Number(element[3]);
	});
	numDingus = numDingus + 3;
	numWidgets = numWidgets + 3;
	numberDingus.innerHTML = numDingus;
	numberWidgets.innerHTML = numWidgets;
	sales.innerHTML = Number.parseFloat(numDingus * DINGUS_PRICE + numWidgets * WIDGET_PRICE).toFixed(2);
}

function retrieveData(){
	let storedData = JSON.parse(localStorage.getItem('orderHistory'));
	if(storedData != null)
		orderHistory = storedData;
	updateHeaders();
	bars();
	recalculate();
}

function recalculate(){
	pie = document.getElementById("pie");

	let graphDingus = 0;
	let graphWidgets = 0;
	orderHistory.forEach(element => {
		graphDingus = graphDingus + element[2];
		graphWidgets = graphWidgets + element[3];
	});
	graphWidgets = graphWidgets + 3;
	graphDingus = graphDingus + 3;

	let result = (graphDingus * 100 / (graphWidgets + graphDingus));
	pie.style.strokeDasharray = result +' 100';

	let pienumber1 = document.getElementById("pienumber1");
	let pienumber2 = document.getElementById("pienumber2");
	pienumber1.innerHTML = Math.round(result) + "%";
	pienumber2.innerHTML = Math.round(100 - result) + "%";
}

function bars(){
	let svg = document.getElementById("bars");
	let text = "";
	let counter = 7;
	if(orderHistory.length < 7)
	{
		counter = orderHistory.length;
		console.log("hi!");
	}
	
	for(i = 0; i < counter; i++) {
		console.log(i);
		let percentage = Math.round(orderHistory[(orderHistory.length-1) - i][2] * 100 / (orderHistory[(orderHistory.length-1) - i][2] + orderHistory[(orderHistory.length-1) - i][3]));
		console.log(percentage);
		
		text = text + '<rect class="base" x="' +(91-i*15) +'" y="0" width="10" height="100"></rect>' +
		'<rect class="top" x="' +(91-i*15) +'" y="' + percentage +'" width="10" height="100"></rect>';
		console.log(text);
	}

	svg.innerHTML = text + '<polyline points="0,0 0,100"></polyline>'
	+'<polyline points="0,100 101,100"></polyline>';
}
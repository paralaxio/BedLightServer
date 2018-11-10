var rainbowEnable = false;
var connection = new WebSocket("ws://" + location.hostname + ":81/", "arduino");
connection.onopen = function () {
   connection.send('Connect ' + new Date());
};
connection.onerror = function (error) {
   console.log('WebSocket Error ', error);
};
connection.onmessage = function (e) {
	var strNum = e.data.slice(0, 2);
	var strDat = e.data.substring(3, e.data.length);  
	   
   num= parseInt(strNum);
   switch (num) {
    case 10:
        ReceiveBrightness(strDat);
        break;
    case 11:
        ReceiveR(strDat);
        break;
    case 12:
        ReceiveG(strDat);
        break;
    case 13:
        ReceiveB(strDat);
        break;
	 }   
};

connection.onclose = function(){
    console.log('WebSocket connection closed');
};

function ReceiveBrightness(strDat){
	dat = parseInt(strDat);
	document.getElementById('brightness').value = dat;
}

function ReceiveR(strDat){
	dat = parseInt(strDat);
	document.getElementById('r').value = dat;
}

function ReceiveG(strDat){
	dat = parseInt(strDat);
	document.getElementById('g').value = dat;
}

function ReceiveB(strDat){
	dat = parseInt(strDat);
	document.getElementById('b').value = dat;
}
  
function sendRGB() {
   var r = document.getElementById('r').value;
   var g = document.getElementById('g').value;
   var b = document.getElementById('b').value;
   SendMessage('11', r);
   SendMessage('12', g);
   SendMessage('13', b);
}

function sendBrightness() {
    var bright = document.getElementById('brightness').value;
    SendMessage('10', bright);
 }

function SendMessage(id, dat)
{
   var str = id + '=' + dat.toString();
	connection.send(str);
}


function rainbowEffect(){
	 rainbowEnable = ! rainbowEnable;
    if(rainbowEnable){
        connection.send("R");
        document.getElementById('rainbow').style.backgroundColor = '#00878F';
        document.getElementById('r').className = 'disabled';
        document.getElementById('g').className = 'disabled';
        document.getElementById('b').className = 'disabled';
        document.getElementById('r').disabled = true;
        document.getElementById('g').disabled = true;
        document.getElementById('b').disabled = true;
    } else {
        connection.send("N");
        document.getElementById('rainbow').style.backgroundColor = '#999';
        document.getElementById('r').className = 'enabled';
        document.getElementById('g').className = 'enabled';
        document.getElementById('b').className = 'enabled';
        document.getElementById('r').disabled = false;
        document.getElementById('g').disabled = false;
        document.getElementById('b').disabled = false;
        sendRGB();
    }  
}

function TestSlider(){
        document.getElementById('r').value = 500;
        document.getElementById('g').className = 'disabled';
        document.getElementById('b').className = 'disabled';
			console.log("Value Written");
}


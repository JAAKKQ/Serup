var serialport = require('serialport');
var SerialPort = serialport.SerialPort;

var COMport = "COM0";

var port = new SerialPort(COMport, {
    baudrate: 9600
});

port.on("open", () => {
    console.log('serial port open');
});

//Send r to reset the PowerTimeout() function.
setInterval(() => {
    port.write('r', (err) => {
        if (err) {
            return console.log('Error on write: ', err.message);
        }
        console.log('message written');
    });
}, 20000);
const { SerialPort } = require('serialport')
const fs = require('fs')
const { dirname } = require('path')
const RootFolder = dirname(require.main.filename)

var PortPath = RootFolder + '/port'
var ResetInterval = 20000;

if (fs.existsSync(PortPath)) {
    fs.readFile(PortPath, 'utf8', (err, data) => {
        if (err) {
            console.error(err)
            return
        }

        var COMport = data;
        console.log('Serial Port Set To: ' + data)

        var port = new SerialPort({ path: COMport, baudRate: 9600 })

        port.on("open", () => {
            console.log('Serial Port Open');
        });

        //Send r to reset the PowerTimeout() function.
        setInterval(() => {
            port.write('r', (err) => {
                if (err) {
                    return console.log('Error on write: ', err.message);
                } else {
                    console.log('Reset send to serial port: ' + COMport);
                }
            });
        }, ResetInterval);
    })
} else {
    console.log(PortPath)
    console.error('ERROR: Write the serial port to the "port" file!')
}
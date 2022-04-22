const { SerialPort } = require('serialport')
const { ReadlineParser } = require('@serialport/parser-readline')
const fs = require('fs')
const { dirname } = require('path')
const RootFolder = dirname(require.main.filename)

var PortPath = RootFolder + '/port'

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

        var parser = port.pipe(new ReadlineParser({ delimiter: '\n' }))
        parser.on('data', (data) => {
            if (data === "Callback") {
                port.write('r', (err) => {
                    if (err) {
                        console.log('Error while sending reset: ', err.message);
                    } else {
                        console.log('Sending callback to serial port: ' + COMport);
                    }
                });
            } else {
                console.log(data);
            }
        });
        setTimeout(function () {
            port.write('s', (err) => {
                if (err) {
                    console.log('Error while sending reset: ', err.message);
                } else {
                    console.log('Start send to serial port: ' + COMport);
                }
            });
        }, 2000);
    })
} else {
    console.log(PortPath)
    console.error('ERROR: Write the serial port to the "port" file!')
}
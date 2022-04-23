/*
 * Serup Code (Server)
 * https://github.com/JAAKKQ/Serup
 * Last modified on 23th April 2022 by Jaakko & Jummi
 * total_hours_wasted_here = 5
*/

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
                        console.log('Error sending callback: ', err.message);
                    } else {
                        console.log(COMport + ': Callback received. Sending one back.');
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
                    console.log(COMport + ': Start command send.');
                    console.log("________________________________________________________");
                }
            });
        }, 2000);
    })
} else {
    console.log(PortPath)
    console.error('ERROR: Write the serial port to the "port" file!')
}
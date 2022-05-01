/*
 * Serup Code (Server) by Jaakko & Jummi
 * https://github.com/JAAKKQ/Serup
 * Last modified on 24th April 2022 by Jaakko & Jummi
 * total_hours_wasted_here = 5
 * Copyright (c) 2022 Jaakko & Jummi
 * MIT License
*/

const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');
const fs = require('fs');
const { dirname } = require('path');
const RootFolder = dirname(require.main.filename);

var PortPath = RootFolder + '/port.json'

if (fs.existsSync(PortPath)) {
    fs.readFile(PortPath, 'utf8', (err, data) => {
        if (err) {
            console.error(err)
            return
        }
        let COMportRAW = fs.readFileSync(RootFolder + '/port.json');
        let COMport = JSON.parse(COMportRAW).COMport;

        console.log('\x1b[32m%s\x1b[0m', "-------------------------Serup-------------------------");
        console.log('YOU' + ': Serial Port Set')

        var port = new SerialPort({ path: COMport, baudRate: 9600 })

        port.on("open", () => {
            console.log('YOU' + ': Serial Port Open');
        });

        var parser = port.pipe(new ReadlineParser({ delimiter: '\n' }))
        parser.on('data', (data) => {
            if (data === "c") {
                port.write('r', (err) => {
                    if (err) {
                        console.log('YOU' + ': Error sending callback: ', err.message);
                    } else {
                        console.log('YOU' + ': Callback received. Sending one back.');
                    }
                });
            } else {
                if (data.includes('-')) {
                    console.log('\x1b[32m%s\x1b[0m', "-------------------------------------------------------");
                } else {
                    if (!data.includes("0ms")) {
                        console.log(COMport + ': ' + data);
                    }
                }
            }
        });
        setTimeout(function () {
            port.write('s', (err) => {
                if (err) {
                    console.log('YOU' + ': Error while sending start: ', err.message);
                } else {
                    console.log('YOU' + ': Start command send.');
                }
            });
        }, 2000);
    })
} else {
    console.log(PortPath)
    console.error('YOU' + ': ERROR: Write the serial port to the "port" file!')
}

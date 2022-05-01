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
        let logStyle = JSON.parse(COMportRAW).logStyle;
        
        const logHandler = require(RootFolder + '/logStyles/' + logStyle + '.js')(COMport);
        logHandler.init();

        var port = new SerialPort({ path: COMport, baudRate: 9600 })

        port.on("open", () => {
            logHandler.portOpen();
        });

        var parser = port.pipe(new ReadlineParser({ delimiter: '\n' }))
        parser.on('data', (data) => {
            if (data === "c") {
                port.write('r', (err) => {
                    if (err) {
                        logHandler.callSendError(err.message);
                    } else {
                        logHandler.callSend();
                    }
                });
            } else {
                if (data.includes('-')) {
                    logHandler.divider();
                } else {
                    if (!data.includes("0ms")) {
                        logHandler.took(data);
                    }
                }
            }
        });
        setTimeout(function () {
            port.write('s', (err) => {
                if (err) {
                    logHandler.startError(err.message);
                } else {
                    logHandler.start();
                }
            });
        }, 2000);
    })
} else {
    console.log(PortPath)
    console.error('YOU' + ': ERROR: Write the serial port to the "port" file!')
}

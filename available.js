/*
 * Serup Code (Server) by Jaakko & Jummi
 * https://github.com/JAAKKQ/Serup
 * Last modified on 23th April 2022 by Jaakko & Jummi
 * total_hours_wasted_here = 0
*/

const { SerialPort } = require('serialport')

console.log('\x1b[32m%s\x1b[0m', "__________________________Available Ports__________________________");
SerialPort.list().then(function (ports) {
    ports.forEach(function (port) {
        console.log("Port: ", port);
    })
    console.log('\x1b[32m%s\x1b[0m', "__________________________________________________________________");
});
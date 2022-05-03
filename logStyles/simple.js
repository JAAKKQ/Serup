/*
 * Simple log style for Serup by Jaakko & Jummi
 * Create your own style by making a new file and setting the logStyle value to your style file's name in the port.json file.
 * 
 * https://github.com/JAAKKQ/Serup
 * total_hours_wasted_here = 1
 * Copyright (c) 2022 Jaakko & Jummi
 * MIT License
*/

var COMport = "";

var index = -1;
var lastTook = 0;
var currentTook = 0;
var averageTook = 0;
var uptimeGlobal = 0;
var doOnce = true;

setInterval(() => {
    Report();
}, 900000);

function Report() {
    console.log('\x1b[32m%s\x1b[0m', "------------------------Reports------------------------");
    console.log("Average Took: " + averageTook + "ms\n" + "Uptime(ms): " + uptimeGlobal);
    console.log('\x1b[32m%s\x1b[0m', "-------------------------------------------------------");
}

module.exports = function (COMport) {
    return {
        COMport: COMport,

        init: function () {
            console.log('\x1b[32m%s\x1b[0m', "-------------------------Serup-------------------------");
            console.log('YOU' + ': Serial Port Set');
        },

        portOpen: function () {
            console.log('YOU' + ': Serial Port Open');
        },

        callSend: function () {
        },

        callSendError: function (Err) {
            console.log('YOU' + ': Error sending callback: ', Err);
        },

        divider: function () {
            index += 1;
            currentTook += lastTook;
            averageTook = +[currentTook] / +[index];
        },

        took: function (data) {
            lastTook = parseInt(data);
        },

        uptime: function (data) {
            uptimeGlobal += +[data];
        },

        sendCall: function (data) {
        },

        reboot: function () {
            console.log("Reboot!");
        },

        everything: function (data) {
            //Everything in ever send raw from the board.
        },

        start: function () {
        },

        startReceived: function () {
            console.log(COMport + ': Serup is now running.');
            setTimeout(function () {
                Report();
            }, 5000);
        },

        startError: function (Err) {
            console.log('YOU' + ': Error while sending start: ', Err);
        }
    }
};
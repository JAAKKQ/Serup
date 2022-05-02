/*
 * Default log style for Serup by Jaakko & Jummi
 * Create your own style by making a new file and setting the logStyle value to your style file's name in the port.json file.
 * 
 * https://github.com/JAAKKQ/Serup
 * total_hours_wasted_here = 1
 * Copyright (c) 2022 Jaakko & Jummi
 * MIT License
*/

var COMport = "";

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
            console.log('YOU' + ': Callback received... Sending one back...');
        },

        callSendError: function (Err) {
            console.log('YOU' + ': Error sending callback: ', Err);
        },

        divider: function () {
            console.log('\x1b[32m%s\x1b[0m', "-------------------------------------------------------");
        },

        took: function (data) {
            console.log(COMport + ': Waiting callback for: ' + parseInt(data) + " ms");
        },

        uptime: function (data) {
            console.log('Uptime(ms): ' + data);
        },

        sendCall: function (data) {
            console.log(COMport + ": Sending Callback...");
        },

        reboot: function () {
            console.log("Reboot!");
        },

        everything: function (data) {
            //Everything in ever send raw from the board.
        },

        start: function () {
            console.log('YOU' + ': Start command send.');
        },

        startReceived: function () {
            console.log(COMport + ': Start command received.');
        },

        startError: function (Err) {
            console.log('YOU' + ': Error while sending start: ', Err);
        }
    }
};
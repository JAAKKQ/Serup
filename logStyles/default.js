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
            //Executed before serial communication starts
            console.log('\x1b[32m%s\x1b[0m', "-------------------------Serup-------------------------");
            console.log('YOU' + ': Serial Port Set');
        },

        portOpen: function () {
            //When successful connection to board has been made
            console.log('YOU' + ': Serial Port Open');
        },

        callSend: function () {
            //Executed when call is reseived from board
            console.log('YOU' + ': Callback received... Sending one back...');
        },

        callSendError: function (Err) {
            //Error when sending callback to board
            console.log('YOU' + ': Error sending callback: ', Err);
        },

        divider: function () {
            //Executes when all data received from board has come
            console.log('\x1b[32m%s\x1b[0m', "-------------------------------------------------------");
        },

        took: function (data) {
            //May execute multiple times while wating for response from this program
            console.log(COMport + ': Waiting callback for: ' + parseInt(data) + " ms");
        },

        uptime: function (data) {
            //Executes when board has send the uptime to this program
            console.log('Uptime(ms): ' + data);
        },

        sendCall: function (data) {
            //Executes just before actual call is send from board
            console.log(COMport + ": Sending Callback...");
        },

        reboot: function () {
            //Executed if board has not received callback in time
            console.log("Reboot!");
        },

        everything: function (data) {
            //Everything in ever send raw from the board.
        },

        start: function () {
            //Executes when start command has been send to board
            console.log('YOU' + ': Start command send.');
        },

        startReceived: function () {
            //Executed when board has received start command
            console.log(COMport + ': Start command received.');
        },

        startError: function (Err) {
            //Executes if errors comeup while sending start command to board
            console.log('YOU' + ': Error while sending start: ', Err);
        }
    }
};
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
            if (data > 7) {
                console.log(COMport + ': Waiting callback for(ms): ' + data);
            }
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
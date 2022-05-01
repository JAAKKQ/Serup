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
                console.log(COMport + ': Callback received in(ms): ' + data);
            }
        },

        uptime: function (data) {
            console.log('Uptime: ' + data);
        },

        sendCall: function (data) {
            console.log('YOU: ' + "Sending Callback");
        },

        reboot: function (data) {
            console.log('Uptime: ' + data);
        },

        everything: function (data) {
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
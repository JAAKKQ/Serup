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
            console.log('YOU' + ': Callback received. Sending one back.');
		},

        callSendError: function (Err) {
            console.log('YOU' + ': Error sending callback: ', Err);
		},
        
        divider: function () {
            console.log('\x1b[32m%s\x1b[0m', "-------------------------------------------------------");
		},
        
        took: function (data) {
            console.log(COMport + ': ' + data);
		},

        otherData: function (data) {
		},
        
        start: function () {
            console.log('YOU' + ': Start command send.');
		},
        
        startError: function (Err) {
            console.log('YOU' + ': Error while sending start: ', Err);
		}
	}
};
var secret = require('./secret.js');
var rest = require('restler');

var phoneOptions = {
    from: 'analogmidnight@gmail.com',
    to: secret.myNumber,
    subject: 'ENROLL NOW',
    text: secret.myCCN,
    html: secret.myCCN
};

var emailOptions = {
    from: 'analogmidnight@gmail.com',
    to: 'analogmidnight@gmail.com',
    subject: 'ENROLL NOW',
    text: secret.myCCN,
    html: secret.myCCN
};

var myCheck = /0 student\(s\) are enrolled, with a limit of 180\n[\w\s]*1 student\(s\) are on the waiting list, with a limit of 1\n/;


function spamScheduleBerkeley() {
	console.log('I want to graduate :(');
	rest.post('https://telebears.berkeley.edu/enrollment-osoc/osc', 
		{ data: { '_InField1': 'RESTRIC',
				  '_InField2': secret.myCCN,
				  '_InField3': '13B4' }
		}).on('complete', function(data, res) {
			if (!myCheck.test(res.rawEncoded)) {
				sendMail(phoneOptions);
				sendMail(emailOptions);
			}
		});
	
};


function sendMail(options) {
	secret.smtpTransport.sendMail(options, function(err, res){
    	if (err) {
        	console.log(err);
    	} else {
        	console.log(res.message);
    	}
	});
};


// Retrieve data every 5 minutes.
setInterval(spamScheduleBerkeley, 300000);
var secret = require('./secret.js');
var rest = require('restler');

var options = {
    from: 'analogmidnight@gmail.com',
    to: secret.myNumber,
    subject: 'ENROLL IN 195',
    text: secret.myCCN,
    html: secret.myCCN
};

var myCheck = /0 student\(s\) are enrolled, with a limit of 180 and 1 student\(s\) are on the waiting list, with a limit of 1/;

function spamScheduleBerkeley() {
	rest.post('https://telebears.berkeley.edu/enrollment-osoc/osc', 
		{ data: { '_InField1': 'RESTRIC',
				  '_InField2': secret.myCCN,
				  '_InField3': '13B4' }
		}).on('complete', function(data, res) {
			console.log(data, res);
			/*if (!myCheck.test(res)) {
				sendMail();
			}*/
		});
	
};


function sendMail() {
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
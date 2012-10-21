var secret = require('./secret.js');
var rest = require('restler');
var nodemailer = require('nodemailer');

// create reusable transport method (opens pool of SMTP connections)
var smtpTransport = nodemailer.createTransport('SMTP', {
  service: 'Gmail',
  auth: {
    user: 'analogmidnight@gmail.com',
    pass: secret.myPassword
  }
});

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

var invalidCheck = /Internal Server Error/;

function spamScheduleBerkeley() {
  console.log('I want to graduate :(');
  rest.post('https://telebears.berkeley.edu/enrollment-osoc/osc', 
    { data: { '_InField1': 'RESTRIC',
              '_InField2': secret.myCCN,
              '_InField3': '13B4' }
    }).on('complete', function(data, res) {
      if (data && !myCheck.test(data) && !invalidCheck.test(data)) {
        emailOptions.text = data;
        emailOptions.html = data;
        sendMail(phoneOptions);
        sendMail(emailOptions);
      }
    });
};


function sendMail(options) {
  smtpTransport.sendMail(options, function(err, res){
    if (err) {
        console.log(err);
    } else {
        console.log(res.message);
    }
  });
};


spamScheduleBerkeley();
// Retrieve data every 5 minutes.
setInterval(spamScheduleBerkeley, 300000);

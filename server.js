var secret = require('./secret.js')

var options = {
    from: "analogmidnight@gmail.com",
    to: secret.myNumber,
    subject: "ENROLL IN 195",
    text: "26696",
    html: "26696"
}

secret.smtpTransport.sendMail(options, function(err, res){
    if (err) {
        console.log(err);
    } else {
        console.log(res.message);
    }
});
var nodemailer = require('nodemailer');
const dotenv = require('dotenv')

dotenv.config({
    path: './.env'
})

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});



module.exports  = {
    mail: (emailTo, subj, mesg) => {
        var mailOptions = {
            from: 'MarocShip@gmail.com',
            to: emailTo,
            subject: subj,
            text: mesg
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    },
};
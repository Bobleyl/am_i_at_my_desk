require('dotenv').config();

const nodemailer = require('nodemailer');

const spawn = require("child_process").spawn

const pythonProcess = spawn(process.env.PYTHON_PATH,[process.env.SCRIPT_PATH])
pythonProcess.stdout.on('data', (data) => {
    const response = data.toString()
    console.log(response)

    if (response.includes('true')) {
        // Send email to myself just so I know it's working
        var transporter = nodemailer.createTransport({
            service: 'yahoo',
            auth: {
              user: process.env.EMAIL,
              pass: process.env.PASSWORD
            }
        })
        var mailOptions = {
            from: process.env.EMAIL,
            to: process.env.MY_EMAIL,
            subject: 'Congrats, you were at work on time',
            text: 'Congradulations, you did it!',
            attachments: [{   // stream as an attachment
                filename: 'UserFace.png',
                path: process.env.IMAGE_PATH
            }]
        }

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error)
            } else {
              console.log('Email sent: ' + info.response)
            }
        })
    } else {
        // Send email to Boss
        var transporter = nodemailer.createTransport({
            service: 'yahoo',
            auth: {
              user: process.env.EMAIL,
              pass: process.env.PASSWORD
            }
        })
        var mailOptions = {
            from: process.env.EMAIL,
            to: process.env.BOSS_EMAIL,
            subject: 'Bo missed work',
            text: 'You are getting this email because a bot that holds Bo ' +
            'accountable found him absent from his desk at the start of work hours',
            attachments: [{ // stream as an attachment
                filename: 'UserFace.png',
                path: process.env.IMAGE_PATH
            }]
        }

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error)
            } else {
              console.log('Email sent: ' + info.response)
            }
        })
    }
});

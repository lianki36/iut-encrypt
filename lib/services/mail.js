'use strict';

const { Service } = require('@hapipal/schmervice');
const nodemailer = require('nodemailer');

module.exports = class MailService extends Service {
    sendMail(mailOptions) {   
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'antwan20@ethereal.email',
                pass: 'B67XZ3x5qT5jvj1FWf'
            }
        });

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log("mail error : ", error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }

    mailNewUser(userMail) {
        const mailOptions = {
            from: 'antwan20@ethereal.email',
            to: userMail,
            subject: 'WELCOME !',
            text: 'Welcome to the summoner rift !'
        };

        this.sendMail(mailOptions)
    }

    async mailNewFilm() {
        const { User } = this.server.models();

        const users = (await User.query()).map(user => user.mail)

        const mailOptions = {
            from: 'antwan20@ethereal.email',
            bcc: users,
            to: 'antwan20@ethereal.email',
            subject: 'NEW FILM !',
            text: 'New film for you !'
        };

        this.sendMail(mailOptions)
    }
    
    async mailUpdateFilm(users) {
        const mailOptions = {
            from: 'antwan20@ethereal.email',
            bcc: users,
            to: 'antwan20@ethereal.email',
            subject: 'UPDATE FILM !',
            text: 'Apdate on your favorite film !'
        };

        this.sendMail(mailOptions)
    }
}
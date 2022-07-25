const mongoose = require('mongoose')
const express = require('express')
const jwt = require('jsonwebtoken')
const router = new express.Router()
const authSchema = require('../../../models/auth/register')
const nodemailer = require("nodemailer")
const bcrypt = require('bcrypt')




//FORGOT PASSWORD


router.post("/forget-password", async (req, res) => {

    try {
        const { id } = req.body
        const user = await authSchema.findOne({ _id: id })
        if (!user) {
            res.send('User not found')
        } else {
            const data = user;
            const _id = user._id
            const otp = Math.floor(1000 + Math.random() * 9000);
            data.otp = otp;
            const updateauth = await authSchema.findByIdAndUpdate(_id , data , {
                new:true
            })
            .then(()=>{
                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                      user: 'trello975@gmail.com',
                      pass: 'mvfcgkgtzhraloqc'
                    }
                  });
                  var mailOptions = {
                    from: 'trello975@gmail.com',
                    to: data.email,
                    subject: 'OTP',
                    text: `Please enter ${otp} in your Trello app to verufy your acount`
                  };
                  transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                      console.log(error);
                    } else {
                      console.log('Email sent: ' + info.response);
                    }
        
                  });
        
            })
            res.send('OTP sent to your email')

        }

    }
    catch (e) {
        res.status(204).send(user)
    }

})





//RESEt PASSWORD


router.post("/reset-password", async (req, res) => {
    try {
        const userOtp = req.body.otp
        authSchema.find({ otp: userOtp })
            .exec()
            .then(async (user) => {
                if (user.length < 1) {
                    res.status(404).send({
                        massage: "User Not Found"
                    })
                }
                else {
                    if (req.body.otp == user[0].otp) {
                        res.status(201).send({
                            massage: "User OTP SUCCESS"
                        })
                        const _id = user[0]._id.toString();
                        const securePass = await bcrypt.hash(req.body.password, 10);
                        req.body.password = securePass
                        const updateauth = await authSchema.findByIdAndUpdate(_id, req.body, {
                            new: true
                        })
                        // res.status(201).send(updateauth)

                    }
                    else {
                        console.log("sorry")
                    }
                }
            })
            .catch(e => {
                res.status(404).send({
                    massage: "User Not Found"
                })
            })
    }
    catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router;
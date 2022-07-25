const mongoose = require('mongoose')
const express = require('express')
const jwt = require('jsonwebtoken')
const router = new express.Router()
const authSchema = require('../../../models/auth/register')
const workSpaceSchema = require('../../../models/workspace')
const nodemailer = require("nodemailer")
const bcrypt = require('bcrypt')
const multer = require('multer')
const { v4: uuidv4 } = require('uuid');



router.post("/", async (req, res) => {
    try {
        const userId = req.body.userId
        const idString = userId.toString()
        const user = await authSchema.findOne({_id : userId})
        const allWorkSpaces = await workSpaceSchema.find()
        const userWorkspace = user.workspace
        var newWorkSpaces = []
        for (var i = 0 ; i < allWorkSpaces.length ; i++){
            var adminName = await authSchema.findOne({_id : allWorkSpaces[i].adminId})
            allWorkSpaces[i].admin = adminName.username
            allWorkSpaces[i].adminImg = adminName.img
            const workSpaceUsers  = allWorkSpaces[i].users
            for (var j = 0 ; j < workSpaceUsers.length ; j++){
                if(workSpaceUsers[j].toString() === idString){
                    console.log("Alreadt added")
                    break;
                }else{
                    newWorkSpaces.push(allWorkSpaces[i])
                }
            }   
        }
        res.send(newWorkSpaces) 
    }

    catch (e) {
        res.send("Error")
    }
})



module.exports =
    router;
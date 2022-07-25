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

        //get all users

        const allUsers = await authSchema.find()


        const workspaceId = req.body.workspaceId
        const workspace = await workSpaceSchema.findOne({ _id: workspaceId })
        const workspaceUsers = workspace.users
        const workspaceRequestedUsers = workspace.requestedUsers
        const workspaceUserRequests = workspace.userRequests

        const notShow = [...workspaceUsers, ...workspaceRequestedUsers, ...workspaceUserRequests]

        const userFilter = []
        const requestedFiltered = []
        const userRequestsFiltered = []



        // for (var j = 0; j < workspaceUsers.length; j++) {
        //     const id = workspaceUsers[i].toString()
        //     for (var i = 0; i < allUserId.length; i++) {
        //         if (id !== allUserId[i]) {
        //             userFilter.unshift(allUserId[i])
        //         }
        //     }
        // }

        // for(var i = 0 ; i < workspaceUsers.length ; i++){
        //     const id = workspaceUsers[i].toString()
        //     for(var j = 0 ; j < allUserId.length ; j++){
        //         if(id != allUserId[j].toString()){
        //             // userFilter.unshift(allUserId[j].toString())
        //             console.log(allUserId[j].toString())
        //         }
        //     }
        // }


        // for(var i = 0 ; i < allUserId.length ; i++){
        //     const id = allUserId[i]
        //     for(var j = 0 ; j < workspaceRequestedUsers.length ; j++){
        //         if(workspaceRequestedUsers[j].toString() === allUserId[i]){
        //             requestedFiltered.unshift(workspaceRequestedUsers[j])
        //         }
        //     }
        // }


        // for(var i = 0 ; i < allUserId.length ; i++){
        //     const id = allUserId[i]
        //     for(var j = 0 ; j < workspaceUserRequests.length ; j++){
        //         if(workspaceUserRequests[j].toString() === allUserId[i]){
        //             userRequestsFiltered.unshift(workspaceUserRequests[j])
        //         }
        //     }
        // }

        // const users = [...userFilter , ...requestedFiltered , ...userRequestsFiltered]



        for (var i = 0; i < allUsers.length; i++) {
            for (var j = 0; j < allUsers[i].requestSent.length; j++) {
                if (allUsers[i].requestSent[j] !== workspaceId) {
                    userFilter.unshift(allUsers[i]._id)
                }
            }
        }

        // for (var i = 0; i < allUsers.length; i++) {
        //     for (var j = 0; j < allUsers[i].requests.length; j++) {
        //         if (allUsers[i].requests[j] !== workspaceId) {
        //             console.log(allUsers[i])
        //         }
        //     }
        // }

        res.send(userFilter)
    }

    catch (e) {
        res.send("errorr")
    }
})



module.exports =
    router;
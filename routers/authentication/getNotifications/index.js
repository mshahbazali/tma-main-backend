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
        const userId = req.body.id
        const user = await authSchema.findOne({_id : userId})
        res.send(user) 
    }

    catch (e) {
        res.send(e)
    }
})



module.exports =
    router;
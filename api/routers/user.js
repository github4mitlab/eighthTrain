const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const userModel = require("../models/user");

// Rgister User

router.post("/signup", (req, res) => {
    console.log("here");
    const user = new userModel({
        _id: new mongoose.Types.ObjectId(),
        email: req.body.email,
        password: req.body.password
    });
  
    
    user
    .save()
    .then( result => {
        console.log(result);
        res.status(200).json({
            usr_msg: "사용자 등록됨"
        });
        console.log("here2");
    })
    .catch( err => {
        console.log(err);
        res.status(500).json({
            usr_err: err
        });
    });
});

module.exports = router;

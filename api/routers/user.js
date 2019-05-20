const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userModel = require("../models/user");

// Rgister User
router.post("/signup", (req, res) => {
  userModel
    .find({ email: req.body.email})
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          usr_err: "메일이 있습니다."
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              usr_err: err
            });
          } else {
            const user = new userModel({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash
            });
            user
              .save(console.log("SAVE is done"))
              .then(result => {
                console.log(result);
                res.status(200).json({
                  usr_msg: "사용자 등록됨"
                });
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({
                  usr_err: err
                });
              });
          }
        });
      }
    })
    .catch();
});

//사용자 계정 삭제
router.delete("/:userId", (req, res) => {
    userModel
    .remove( {_id: req.params.userId})
    .exec()
    .then( result => {
        res.status(200).json({
            usr_msg: "사용자 삭제됨"
        });
    })
    .catch( err => {
        console.log(err);
        res.status(500).json({
            usr_err: "삭제중 오류 발생"
        });
    });
});


module.exports = router;

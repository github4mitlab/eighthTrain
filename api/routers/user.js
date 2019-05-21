const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userModel = require("../models/user");
const userController = require("../controller/user");

// Rgister User
router.post("/signup", userController.user_signup);

// POST - user login
router.post("/login", userController.user_login );

//사용자 계정 삭제
router.delete("/:userId", userController.user_delete);


module.exports = router;

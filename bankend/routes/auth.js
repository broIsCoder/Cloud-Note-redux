const express = require("express");
require("dotenv").config();
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchLoginUser = require("../middleware/fetchLoginUser");

const JWT_SECRET = process.env.JWT_SIGN;

// ROUTE 1 : CREATE USER
router.post(
  "/createuser",
  [
    body("name", "enter at least 3 characters").isLength({ min: 3 }),
    body("email", "enter a valid email").isEmail(),
    body("password", "enter at least 3 characters").isLength({ min: 3 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Enter Valid Credential', details: errors.array() });
    }

    try {
      let user = await User.findOne({ email: req.body.email });
      
      if (user) {
        console.log(`\nEmail already exists\n${req.body.email}\n`);
        return res.status(400).json({
          message: "Sorry, a user with this email already exists",
        });
      } else {
        const salt = await bcrypt.genSalt(10);
        let securePassword = await bcrypt.hash(req.body.password, salt);

        user = await User.create({
          name: req.body.name,
          password: securePassword,
          email: req.body.email,
        });

        const data = {
          user: {
            id: user.id,
          },
        };

        const authToken = jwt.sign(data, JWT_SECRET);
        console.log(`\n\nEncrypted New Token :${authToken}`);
        console.log(`\n New account has been created ! \n `);

        res.status(200).json({
          authToken: authToken,
          message: "Created New Account Successful",
        });
      }
    } catch (error) {
      console.log(`An ERROR occurred on Server:\n${error.message}\n`);
      res.status(500).json({ message: 'Error occurred on Server!' });
    }
  }
);

// ROUTE 2 : LOGIN USER
router.post(
  "/loginuser",
  [
    body("email", "enter a valid email").isEmail(),
    body("password", "password cannot be blank").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message:'Enter Valid Credentials' });
    }

    try {
      const { email, password } = req.body;
      let user = await User.findOne({ email });
      if (!user) {
        console.log(`\n User with this Email doesn't exist : ${req.body.email}\n`);
        return res.status(400).json({ message:`${email} doesn't exist` });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);

      if (!passwordCompare) {
        return res.status(400).json({ message: 'Incorrect Password' });
      }

      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, JWT_SECRET);
      console.log(`\n\nEncrypted login data :${authToken}\n`);
      console.log(`\n You have been logged In !!!\n`);
      res.status(200).json({ authToken: authToken, message: "Login Successful" });
    } catch (error) {
      console.log(`An ERROR occurred on Server:\n${error.message}\n`);
      res.status(500).json({ message: 'Error occurred on Server!' });
    }
  }
);

// ROUTE 3 : GET LOGGED IN USER INFO
router.post("/userinfo", fetchLoginUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    console.log("Your Info", user);
    if (user) {
      res.status(200).json({ user: user, message: "User Info Founded" });
    } else {
      res.status(400).json({ message: 'Token not found' });
    }
  } catch (error) {
    console.log(`An ERROR occurred on Server:\n${error.message}\n`);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userModel = require("../models/userModel");


const userRouter = express.Router();
userRouter.use(express.json());

// Register router->
userRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  //   console.log(req.body);

  try {
    await bcrypt.hash(password, 3, async function (err, hash) {
      if (err) {
        console.log(err, "error in hashing");
      } else {
        const user = await userModel.create({ name, email, password: hash });
        // console.log(user.password);
        res.status(201).send({ msg: "signup successfull" });
      }
    });
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

// Login router->

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  console.log(req.body);

  try {
    const user = await userModel.findOne({ email });
    console.log(user);

    const hashedPassword = user?.password;

    if (user) {
      bcrypt.compare(password, hashedPassword, async function (err, result) {
        // result == true
        if (result) {
          const token = jwt.sign({ userId: user._id }, "masai", {
            expiresIn: "7d",
          });

          res.status(201).send({
            token,
            message: `USER SUCCESSFULLY LOGIN `,
            userId: user._id,
          });
        } else {
          console.log(err.message);
        }
      });
    } 
    else {
      console.log(`User Not Found Pls Register`);
      res.status(404).send({ message: "Password Incorrect" });
    }
  } 
  catch (error) {
    console.log(error);
    res.status(404).send({ message: "login error" });
  }
});

module.exports = userRouter;

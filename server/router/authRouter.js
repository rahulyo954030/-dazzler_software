const { Router } = require("express");
const Users = require("../model/user");
const Token = require("../model/token");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const authRouter = Router();

authRouter.post("/signup", async (req, res) => {
  const { userName, email, phoneNo, type, gender, passWord } = req.body;

  const uniqueEmail =
    (await Users.countDocuments({ email })) > 0 ? true : false;
  if (uniqueEmail) {
    return res.status(409).json({ msg: "Email alredy present", uniqueEmail });
  }

  const uniquePhoneNo =
    (await Users.countDocuments({ phoneNo })) > 0 ? true : false;
  if (uniquePhoneNo) {
    return res
      .status(409)
      .json({ msg: "Mobile no alredy present", uniquePhoneNo });
  }

  const passwordPattern =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{8,}$/;
  if (!passwordPattern.test(passWord)) {
    return res.status(400).json({
      msg: "Password must contain at least one capital letter, one number, one small letter, and one symbol",
    });
  }

  const hashPassword = await bcrypt.hash(passWord, 10);
  const createUser = await Users.create({
    userName,
    email,
    phoneNo,
    type,
    gender,
    passWord: hashPassword,
  });
  try {
    if (createUser) {
      return res.status(201).json({ msg: "User created", createUser });
    }
  } catch (error) {
    return res.status(500).json({ msg: "Server error", error });
  }
});

authRouter.post("/login", async (req, res) => {
  const { email, passWord } = req.body;
  const user = await Users.findOne({ email: email });
  if (!user) {
    return res.status(400).json({ msg: "User not found" });
  }

  try {
    const matchUser = await bcrypt.compare(passWord, user.passWord);
    if (matchUser) {
      const accessToken = jwt.sign(
        user.toJSON(),
        process.env.ACCESS_SECRET_KEY,
        { expiresIn: "20m" }
      );
      const refreshToken = jwt.sign(
        user.toJSON(),
        process.env.REFRESH_SECRET_KEY
      );

      const newToken = new Token({ token: refreshToken });
      await newToken.save();

      return res.status(200).send({
        msg: "Login Successfully",
        accessToken: accessToken,
        refreshToken: refreshToken,
        userName: user.userName,
        type: user.type,
        userId: user._id,
      });
    } else {
      return res.status(400).json({ msg: "password does not match" });
    }
  } catch (error) {
    return res.status(500).json({ msg: "Server error", error });
  }
});

module.exports = authRouter;

// "userName" : "nitesh",
// "email" : "niftesh@gmail.com",
// "phoneNo" : 1234567898,
// "type" : "admin",
// "gender" : "male",
// "passWord" : "1234"

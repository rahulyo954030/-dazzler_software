const {Router} = require("express");
const Users = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const usersRouter = Router();

usersRouter.post('/signup', async(req, res)=>{
  const { userName, email, phoneNo, type, gender, passWord } = req.body;

  const uniqueEmail = await Users.countDocuments({email}) > 0 ? true : false;
  if(uniqueEmail){
    return res.status(500).json({ msg: "Email alredy present", uniqueEmail });
  }

  const uniquePhoneNo = await Users.countDocuments({phoneNo}) > 0 ? true : false
  if(uniquePhoneNo){
    return res.status(500).json({ msg: "Mobile no alredy present", uniquePhoneNo });
  }

  const hashPassword = await bcrypt.hash(passWord, 10);
      const createUser = await Users.create({
        userName,
        email,
        phoneNo,
        type,
        gender,
        passWord: hashPassword
      });
      try {
        if (createUser) {
          return res.status(201).json({ msg: "User created", createUser });
        }
      } catch (error) {
        return res.status(500).json({ msg: "Server error", Error :error });
      }
})

module.exports = usersRouter;
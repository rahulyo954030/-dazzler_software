const {Router} = require("express");
const Users = require("../model/user");

const usersRouter = Router();

// Get all
usersRouter.get("/getAll", async (req, res) => {
    const getAllData = await Users.find({});
    try {
      if (getAllData) {
        return res.status(200).json({ msg: "getAllData", getAllData });
      }
    } catch (error) {
      return res.status(500).json({ msg: "server error", Error: error });
    }
  });
  
  
  // Delete
  usersRouter.delete("/delete/:id", async (req, res) => {
    const { id } = req.params;
    const deleteUserData = await Users.findByIdAndRemove({ _id: id });
    try {
      if (deleteUserData) {
        return res.status(200).json({ msg: "deleteUserData", deleteUserData });
      }
    } catch (error) {
      return res.status(500).json({ msg: "server error", Error: error });
    }
  });
  
//   Get single user
  usersRouter.get("/getUserData/:userid", async (req, res) => {
    const { userid } = req.params;
    const getUserData = await Users.findById({ _id: userid });
    try {
      if (getUserData) {
        return res.status(200).json({ msg: "getUserData", getUserData });
      }
    } catch (error) {
      return res.status(500).json({ msg: "server error", Error: error });
    }
  });

module.exports = usersRouter
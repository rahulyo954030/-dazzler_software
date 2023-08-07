const {Router} = require("express");
const Users = require("../model/user");

const usersCreateRouter = Router();

// Get all
usersCreateRouter.get("/getAll", async (req, res) => {
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
  usersCreateRouter.delete("/delete/:id", async (req, res) => {
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
  


module.exports = usersCreateRouter
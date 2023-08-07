const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    userName : {
        type: String
    },
    email : {
        type: String
    },
    phoneNo : {
        type: Number
    },
    type : {
        type: String
    },
    gender : {
        type: String
    },
    passWord : {
        type: String
    },
})

const Users = model("user", userSchema);
module.exports = Users
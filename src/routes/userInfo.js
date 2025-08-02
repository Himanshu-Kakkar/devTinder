const express = require('express');
const User = require("../models/user")

const userInfo = express.Router();

userInfo.get("/user/:id", async (req, res) => {
    const user = await User.findById(req.params.id).select("firstName lastName");
    if (!user)
        return res.status(404).json({ error: "User not found" });
    
    res.json(user);
})

module.exports = {userInfo};
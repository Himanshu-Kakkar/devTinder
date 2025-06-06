const express = require('express');
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth.js");
const { validateEditProfileData } = require('../utils/validation.js');

profileRouter.get("/profile/view", userAuth, async (req,res) => {
    try {
        const user = req.user;
        res.send(user); 
    
    } catch (error) {
        res.status(400).send("Error: "+ error.message)
        
    }
})

profileRouter.patch("/profile/edit", userAuth, async (req,res) => {
    try{
        if(!validateEditProfileData(req)){
            throw new Error("Invalid Edit Request");
            // return res.status(400).send("");
        }

        const loggedInUser = req.user;

        Object.keys(req.body).forEach((key) => loggedInUser[key] = req.body[key]); 

        await loggedInUser.save();

        // res.send(`${loggedInUser.firstName}, Your Profile is updated succesfully`);
        res.json({
            message : `${loggedInUser.firstName}, Your Profile is updated succesfully`,
            data: loggedInUser });
    }
    catch(err){
        res.status(400).send("Error : " + err.message);
    }

})

module.exports = profileRouter;
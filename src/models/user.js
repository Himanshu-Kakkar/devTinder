const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4,
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String,
        lowercase: true,
        required: true,
        unique: true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)) {
                throw new Error("Invalid Email Address"+ value);
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate(value){
            if(!validator.isStrongPassword(value)) {
                throw new Error("Enter a strong password: "+ value);
            }
        }
    },
    age: {
        min: 18,
        type: Number
    },
    gender: {
        type: String,
        // validate() runs by default on post request
        // when a new user created
        // doesnot run by default when edit or update an existing user
        // custom validations to the schema
        validate(value) {
            if(!['male','female','other'].includes(value)){
                throw new Error("gender is not valid");
            }
        }
    },
    photoUrl: {
        type: String,
        default: "/Users/himanshukakkar/Downloads/user-dummy.png",
        // validate(value){
        //     if(!validator.isURL(value)) {
        //         throw new Error("Invalid image URL"+ value);
        //     }
        // }
    },
    about: {
        type: String,
        default: "this is default about of user!",
    },
    skills: {
        type: [String], // array of strings 
    },
    // createdAt: {
    //     type: Date,
    //     default: Date.now
    // }
},
{
    timestamps: true // very usefull we need when user created
    // and when user last updated
}
)

module.exports = mongoose.model("User", userSchema);
// creates a model User, using the schema

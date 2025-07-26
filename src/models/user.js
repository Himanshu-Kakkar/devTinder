const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 2,
        index:true,
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String,
        lowercase: true,
        required: true,
        unique: true, //mongo db automatically create an index
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
            const allowedgenders = ['male','female','other'];
            if(!allowedgenders.includes(value.toLowerCase())){
                throw new Error("gender is not valid");
            }
        },
        // OR
        // enum: {
        //     values: ["male","female", "other"],
        //     message: `{VALUE} is not a valid gender type`,
        // },
    },
    photoUrl: {
        type: String,
        default: "https://freesvg.org/img/abstract-user-flat-4.png",
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
// COMPOUND INDEXING
// User.find({firstName: "xyz", lastName: "abc"});

// userSchema.index({firstName: 1, lastname: 1});

// 1 for ascending and -1 for descending 
// still there are more options 

module.exports = mongoose.model("User", userSchema);
// creates a model User, using the schema

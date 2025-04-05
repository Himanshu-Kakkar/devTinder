const mongoose = require("mongoose");

// without new bhi chalega but documentation suggests new

const userSchema = new mongoose.Schema({
    firstName:{
        type: String
    },
    lastName:{
        type: String
    },
    emailId:{
        type: String
    },
    password:{
        type: String
    },
    age:{
        type: Number
    },
    gender:{
        type: String
    }

});

module.exports = mongoose.model("User",userSchema);



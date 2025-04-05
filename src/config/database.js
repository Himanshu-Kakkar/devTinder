const mongoose = require("mongoose");

const connectDB = async() => {
    
try {
    await mongoose.connect(
        "mongodb+srv://himanshukakkar917:LKGMVPjcFtfRRQEw@cluster0.qzpwzw6.mongodb.net/devTinder"
    )
    console.log("Connection strign passed")
}
 catch (error) {
    console.log(error)  }
 }
 
module.exports = connectDB;
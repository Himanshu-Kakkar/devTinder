// mongodb+srv://devhimanshukakkar:Brke32KA7K1qDmOD@namastenode.ufiagtr.mongodb.net/

const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect(
        "mongodb+srv://devhimanshukakkar:Brke32KA7K1qDmOD@namastenode.ufiagtr.mongodb.net/devTinder"
    );
}

module.exports = connectDB;

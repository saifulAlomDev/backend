const mongoose = require('mongoose');
const URI = "mongodb+srv://saiful:saiful@jws.48akv.mongodb.net/"

async function connectDB() {

    if (mongoose.connection.readyState === 0) {
        try {
            await mongoose.connect(URI)
            console.log("database connected");
        } catch (error) {
            console.log("Flaied to connect database");
        }
    }
}

module.exports = connectDB;
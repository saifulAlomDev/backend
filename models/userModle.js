const { Schema, model } = require("mongoose");

const userSchema = new Schema(
    {
        username: { type: String },
        phoneNumber: { type: String },
        password: { type: String },
    },
    { timestamps: true } // Adds createdAt & updatedAt fields
);

const User = model("User", userSchema);

module.exports = User;

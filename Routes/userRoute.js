const { Router, json } = require("express");
const User = require("../models/userModle");
const jwt = require('jsonwebtoken');
const auth = require("../middleware/jwtAuth");
const router = Router();



router.post("/signup", async (req, res) => {
    console.log(req.body);
    const { username, phoneNumber, password } = req.body;
    
    try {
        const newUser = new User({ username, phoneNumber, password });
        const savedUser = await newUser.save();
        const uerId = savedUser.id;
        console.log(uerId);
        res.status(201).json({ message:"Signin successful", user: uerId });
    } catch (error) {
        console.error("Error saving user:", error);
        res.status(500).json({ message: "Error creating user" });
    }
});
    


router.post("/login", async (req, res) => {
    const { phoneNumber , password } = req.body;
    const user = await User.findOne({ phoneNumber });
console.log(user);
    if (!user) {
        return res.status(404).send("User not found");
    } 
    if( user && password === user.password  ){
        const userId = user.id;
        const token = jwt.sign({ userId }, "secretKey", { expiresIn: "7d" });
        res.status(200).json({token});
    }else{
        return res.status(401).send("Wrong password");
    }
});

router.get("/dashboard" , auth, async (req, res)=>{
    const users = await User.find().select("id username");
    res.json(users)
})

module.exports = router;

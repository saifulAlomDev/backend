const express = require('express');
const jws = require('jsonwebtoken');
const userRoute = require("./Routes/userRoute");
const cors = require('cors');
const connectDB = require('./config/db') ;
const Cookie = require('js-cookie');
const cookieParser = require('cookie-parser');

const app = express()
const PORT = 7000;
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173', // Your frontend's origin
    credentials: true, // Allow credentials (cookies, HTTP authentication)
}))
app.use(cookieParser());
connectDB()

app.use('/' , userRoute)


app.listen(PORT,  () => {
    console.log(`server listen at ${PORT}`);  
})
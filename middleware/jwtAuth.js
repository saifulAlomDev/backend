const jwt = require("jsonwebtoken");

function auth(req, res, next) {
    const token = req.headers.authorization?.split(" ")[1] || req.cookies?.token;

    if (!token) {
        return res.status(403).send("Unautorised");  
    }

    try {
        const decoded = jwt.verify(token, "secretKey");
        req.user = decoded; // Attach user info to the request
        next();  // Allow access to the protected route
    } catch (error) {
        return res.status(403).send("Unautorised");
    }
}


module.exports = auth;


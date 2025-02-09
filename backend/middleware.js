const { JWT_SECRET } = require("./config");
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    //Use Bearer in authorization header
    //Also can use any of the token(signin/signup) in the header

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({
            message: "no auth header"
        });
    }
    //Accessing the second element after splitting
    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        if (decoded.userId) {
            req.userId = decoded.userId;
            next(); 
        } else {
            res.status(403).json({
                message: "Invalid token"
            });
        }
        
    } catch (e) {
        return res.status(403).json({
            message: "Invalid token catch"
        });
    }
}

module.exports = {
    authMiddleware
}
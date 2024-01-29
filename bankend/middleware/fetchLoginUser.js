const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SIGN;

const fetchLoginUser = (req, res, next) => {
    //Get the user from jwt token and add id to request
    const token = req.header("auth-token");
    if (!token) {
        res.status(400).json({message:"please Authenticate using Valid Token"});
    };

    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        console.log("middleware")
        next();
    } catch (error) {
        res.status(400).json({message:"please Authenticate using Valid Token"});
    }
}
module.exports = fetchLoginUser;
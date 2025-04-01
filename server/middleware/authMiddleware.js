const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // ✅ Store decoded user in req.user
        next(); // Continue to the next middleware/route
    } catch (error) {
        console.error(error);
        return res.status(403).json({ message: "Forbidden: Invalid token" });
    }
};

module.exports = verifyToken;

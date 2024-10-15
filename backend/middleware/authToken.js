const jwt = require('jsonwebtoken');
const secret = "This is secret";

async function authToken(req, res, next) {
    try {
        const token = req.cookies?.token;

        // Check if the token exists
        if (!token) {
            return res.status(401).json({
                message: "User is Not Login",
                error: true,
                success: false
            });
        }

        // Verify the token
        const decoded = jwt.verify(token, secret);
        req.userId = decoded?._id;

        next();

    } catch (err) {
        res.status(400).json({
            message: err.message || "Authentication failed",
            error: true,
            success: false,
            data: [],
        });
    }
}

module.exports = authToken;

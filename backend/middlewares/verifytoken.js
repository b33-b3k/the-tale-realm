const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    console.log("Received Token:", token); // logging the token for checking

    if (!token) {
        return res.status(401).json({ message: 'Token not provided' });
    }

    console.log("Secret Key:", process.env.JWT_SECRET); // logging the secret key

    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        if (err) {
            console.log("Error during token verification:", err);
            return res.status(403).json({ message: `Invalid token: ${err.message}` });
        }

        console.log("Decoded Token:", decodedToken); // log the decoded token

        req.userId = decodedToken.userId;
        console.log(req.userId)
        next();
    });
}


module.exports = verifyToken;

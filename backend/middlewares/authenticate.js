const jwt = require('jsonwebtoken');



function authenticateJWT(req, res, next) {
    // Extract the token
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        console.log("Token extracted:", token);

        jwt.verify(token, 'YOUR_SECRET_KEY', (err, user) => {
            if (err) {
                console.log("Error verifying token:", err);
                return res.status(403).json({ error: 'User not authenticated' });
            }

            // Attach user to request object
            req.user = user;
            next();
        });
    } else {
        console.log("No Authorization header found");
        return res.status(403).json({ error: 'User not authenticated' });
    }
}

module.exports = authenticateJWT;
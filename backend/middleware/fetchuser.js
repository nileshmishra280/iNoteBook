const jwt = require('jsonwebtoken');
const JWT_SECRET = 'nileshisagoodboy';

// Middleware to fetch user from JWT token
const fetchuser = (req, res, next) => {
    // Get the token from the 'auth-token' header
    const token = req.header('auth-token');
    if (!token) {
        // If no token is provided, return a 401 Unauthorized error
        return res.status(401).send({ error: 'Please authenticate using a valid token' });
    }

    try {
        // Verify the token using the secret key
        const data = jwt.verify(token, JWT_SECRET);

        // Add the user data from the token to the request object
        req.user = data.user;
        next(); // Proceed to the next middleware or route handler
        
    } catch (error) {
        // If token verification fails, return a 401 Unauthorized error
        res.status(401).send({ error: 'Please authenticate using a valid token' });
    }
};

module.exports = fetchuser;

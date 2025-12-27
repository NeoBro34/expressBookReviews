const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();

app.use(express.json());

// Session middleware
app.use("/customer", session({ secret: "fingerprint_customer", resave: true, saveUninitialized: true }));

// JWT authentication middleware for protected routes
app.use("/customer/auth/*", (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "Authorization header missing" });
    }

    const token = authHeader.split(' ')[1]; // Expecting "Bearer <token>"

    if (!token) {
        return res.status(401).json({ message: "Token missing" });
    }

    try {
        const decoded = jwt.verify(token, 'secretKey'); // 'secretKey' should match the one used in login
        req.user = decoded; // Save decoded user info for later use
        next();
    } catch (err) {
        return res.status(403).json({ message: "Invalid or expired token" });
    }
});

const PORT = 5001;

// Routes
app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

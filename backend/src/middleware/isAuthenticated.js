import jwt from 'jsonwebtoken';

/**
 * Middleware to check if an incoming request has a valid JWT in the Authorization header
 */
const isAuthenticated = (req, res, next) => {
  try {
    // Get the Authorization header (case-insensitive)
    let authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader) {
      return res.status(401).json({
        error: 'Missing Authorization header',
      });
    }

    // Expect "Bearer <token>"
    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      return res.status(401).json({
        error: 'Invalid Authorization format. Use "Bearer <token>"',
      });
    }

    const token = parts[1];

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach decoded payload to request for downstream handlers
    req.user = decoded;

    return next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired' });
    }
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token' });
    }
    console.error('JWT verification failed:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export default isAuthenticated;

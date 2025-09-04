import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import UserDB from '../../models/UserDB.js';

const userDB = new UserDB();

/**
 * Controller: authenticate (login) an existing user
 */
const authenticateUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Query DB for user by email
    const users = await userDB.getByEmail(email);
    if (users.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const user = users[0];

    // Compare password with bcrypt
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Sign JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },     // payload
      process.env.JWT_SECRET,                 // secret (must be set!)
      { expiresIn: '1d' }                     // options
    );

    // Success
    return res.status(200).json({
      message: 'Authentication successful',
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Something went wrong on our side...',
    });
  }
};

export default authenticateUser;

import bcrypt from 'bcrypt';
import UserDB from '../../models/UserDB.js';

const userDB = new UserDB();

/**
 * Controller: register a new user
 */
const registerUser = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;

    // Check if user already exists
    const userExists = await userDB.getByEmail(email);
    if (userExists.length === 1) {
      return res.status(400).json({ message: 'This email is already in use!' });
    }

    // Check password match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new UserDB(email, hashedPassword);
    await userDB.create(newUser);

    // Success
    return res.status(201).json({
      message: `Successfully registered ${email} to the database!`,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: 'Something went wrong on our side...',
    });
  }
};

export default registerUser;

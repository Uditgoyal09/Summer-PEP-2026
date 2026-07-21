import fs from 'fs/promises';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const usersFilePath = './data/users.json';

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide name, email, and password' });
    }

    const data = await fs.readFile(usersFilePath, 'utf-8');
    const users = data ? JSON.parse(data) : [];

    // Check if user already exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    // Hash password before saving
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = { id: Date.now(), name, email, password: hashedPassword };
    users.push(newUser);

    await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), 'utf-8');
    
    res.status(201).json({ message: 'User signed up successfully', user: newUser });
  } catch (error) {
    console.error(`Error in /signup POST:`, error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    const data = await fs.readFile(usersFilePath, 'utf-8');
    const users = data ? JSON.parse(data) : []; 
    
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check if password is correct (bcrypt or plain text fallback for old users)
    const isMatch = user.password.startsWith('$2b$') ? await bcrypt.compare(password, user.password) : user.password === password;
    
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const token = jwt.sign({id:user.id, name:user.name, email:user.email}, process.env.JWT_SECRET, {expiresIn:'1h'});
    
    res.status(200).json({ message: 'Logged in successfully', user: { id: user.id, name: user.name, email: user.email }, token });
  } catch (error) {
    console.error(`Error in /login POST:`, error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON bodies
app.use(express.json());

const dataDir = path.join(__dirname, 'data');
const usersFilePath = path.join(dataDir, 'users.json');
const coursesFilePath = path.join(dataDir, 'courses.json');

app.get('/api/users', async (req, res) => {
  try {
    const data = await fs.readFile(usersFilePath, 'utf-8');
    const users = data ? JSON.parse(data) : [];
    res.status(200).json(users);
  } catch (error) {
    console.error(`Error reading ${usersFilePath}:`, error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/api/users', async (req, res) => {
  try {
    const data = await fs.readFile(usersFilePath, 'utf-8');
    const users = data ? JSON.parse(data) : [];
    
    const newUser = { id: Date.now(),  ...req.body  };
    users.push(newUser);
    await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), 'utf-8');
    res.status(201).json({message: 'User created successfully',user: newUser });

  } catch (error) {
    console.error(`Error in /api/users POST:`, error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});



app.get('/api/courses', async (req, res) => {
  try {
    const data = await fs.readFile(coursesFilePath, 'utf-8');
    const courses = data ? JSON.parse(data) : [];  //store or convert JSON into js Object to manuplate
    res.status(200).json(courses);
  } catch (error) {
    console.error(`Error reading ${coursesFilePath}:`, error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.post('/api/courses', async (req, res) => {
  try {
    const data = await fs.readFile(coursesFilePath, 'utf-8');
    const courses = data ? JSON.parse(data) : [];
    
    const newCourse = {id: Date.now(),  ...req.body };
    
    courses.push(newCourse);
    await fs.writeFile(coursesFilePath, JSON.stringify(courses, null, 2), 'utf-8');
    
    res.status(201).json({
      message: 'Course created successfully',
      course: newCourse
    });
  } catch (error) {
    console.error(`Error in /api/courses POST:`, error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});







app.post('/api/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide name, email, and password' });
    }

    const data = await fs.readFile(usersFilePath, 'utf-8');
    console.log(data);
    const users = data ? JSON.parse(data) : [];  // convert json into object // here users is an array which is a collectipn of data . here array is used to manuplate or find and push the data.
        console.log(users);

    // Check if user already exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    // Hash password before saving
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = { id: Date.now(), name, email, password: hashedPassword };
    users.push(newUser); //here newUser pushed into an array user not directly in the user.json 

    await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), 'utf-8'); //here we write or rewrite the whole user array in the users.json 
    
    res.status(201).json({ message: 'User signed up successfully', user: newUser });
  } catch (error) {
    console.error(`Error in /api/signup POST:`, error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/api/login', async (req, res) => {
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
    const token= jwt.sign({id:user.id, name:user.name, email:user.email}, process.env.JWT_SECRET,{expiresIn:'1h'});  //create Jwt TOKEN
    
    res.status(200).json({ message: 'Logged in successfully', user: { id: user.id, name: user.name, email: user.email },token });
  } catch (error) {
    console.error(`Error in /api/login POST:`, error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

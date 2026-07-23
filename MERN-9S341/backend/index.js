import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.route.js';
import coursesRoutes from './routes/course.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON bodies
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api/courses', coursesRoutes);

// app.get('/api/users', async (req, res) => {
//   try {
//     const data = await fs.readFile(usersFilePath, 'utf-8');
//     const users = data ? JSON.parse(data) : [];
//     res.status(200).json(users);
//   } catch (error) {
//     console.error(`Error reading ${usersFilePath}:`, error.message);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// app.post('/api/users', async (req, res) => {
//   try {
//     const data = await fs.readFile(usersFilePath, 'utf-8');
//     const users = data ? JSON.parse(data) : [];

//     const newUser = { id: Date.now(),  ...req.body  };
//     users.push(newUser);
//     await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), 'utf-8');
//     res.status(201).json({message: 'User created successfully',user: newUser });

//   } catch (error) {
//     console.error(`Error in /api/users POST:`, error.message);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });



// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

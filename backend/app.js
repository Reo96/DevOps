// Import required modules
const express = require('express');  // Web framework
const mongoose = require('mongoose');  // MongoDB ORM
const bcrypt = require('bcryptjs');  // Password hashing
const cors = require('cors');  // Cross-origin resource sharing

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());  // Parses incoming JSON requests
app.use(cors());  // Enables CORS for all routes

// Database Connection
mongoose.connect(process.env.MONGO_URI)  // Uses connection string from environment
  .then(() => console.log('MongoDB Connected'))  // Success callback
  .catch(err => console.log(err));  // Error callback

// User Schema Definition
const User = mongoose.model('User', new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}));

// Registration Endpoint
app.post('/api/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User registered', user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Login Endpoint
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  
  // Finds user by email
  const user = await User.findOne({ email });
  
  // User not found
  if (!user) return res.status(400).send('Invalid credentials');
  
  // Compares hashed passwords
  const isMatch = await bcrypt.compare(password, user.password);
  
  // Password mismatch
  if (!isMatch) return res.status(400).send('Invalid credentials');
  
  // Successful login
  res.send('Login successful');
});

// Get All Users
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find({}, 'username email');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update User
app.put('/api/users/:id', async (req, res) => {
  try {
    const { username } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { username },
      { new: true }
    );
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete User
app.delete('/api/users/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Starts the server
app.listen(5000, () => console.log('Backend running on port 5000'));
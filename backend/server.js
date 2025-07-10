const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB Atlas (specify database name 'Demo')
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Define User schema and model
const userSchema = new mongoose.Schema({
  userId: String,
  userName: String,
  email: String,
});
const User = mongoose.model('User', userSchema);

// Get all users
app.get('/api/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Add a new user
app.post('/api/users', async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.json(user);
});

// Update a user
app.put('/api/users/:id', async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(user);
});

// Delete a user
app.delete('/api/users/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

// Add a root route for homepage
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

app.listen(5000, () => console.log('Server started on port 5000'));
// The collection name 'users' will be used automatically by Mongoose for the User model.
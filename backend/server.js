// backend/server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// using url endpoints
app.use('/api/users', authRoutes);

// run the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`---------------------------`);
  console.log(`Server running on port ${PORT}`);
});

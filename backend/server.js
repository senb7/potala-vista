// backend/server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());


// API ENDPOINTS
// url endpoints for all users
app.use('/api/users', userRoutes);


// run the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`---------------------------`);
  console.log(`Server running on port ${PORT}`);
});

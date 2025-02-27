// backend/server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');


dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());


// API ENDPOINTS
// url endpoints for all users
app.use('/api/users', userRoutes);

// feedback route
app.use('/api/feedback', feedbackRoutes);


// run the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`---------------------------`);
  console.log(`Server running on port ${PORT}`);
});

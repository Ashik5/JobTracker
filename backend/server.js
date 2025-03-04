const express = require('express');
const cors = require('cors');
const { auth } = require('express-oauth2-jwt-bearer');
require('dotenv').config();
const db = require('./models');
const jobRoutes = require('./routes/JobPost');
const userRoutes = require('./routes/User');




const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Auth0 JWT middleware configuration
const jwtCheck = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER,
  tokenSigningAlg: 'RS256'
});

// Protected API route example
app.get('/api/protected', jwtCheck, (req, res) => {
  res.json({
    message: 'This is a protected endpoint',
    user: req.auth
  });
});

// Public API route example
app.get('/api/public', (req, res) => {
  res.json({
    message: 'This is a public endpoint'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({
      message: 'Invalid token or no token provided'
    });
  }
  res.status(500).json({
    message: 'Internal server error'
  });
});



//routes
app.use('/jobs', jobRoutes);
app.use('/users', userRoutes);



db.sequelize.sync({ force: false })
  .then(() => {
    console.log("Database & tables created!");
    app.listen(3001, () => console.log('Server running on port 3000'));
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });
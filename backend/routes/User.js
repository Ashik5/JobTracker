const express = require('express');
const router = express.Router();
const { sequelize } = require('../models');


router.get('/:auth0Id', async (req, res) => {
  try {
    const { auth0Id } = req.params;
    // Input validation
    if (!auth0Id) {
      return res.status(400).json({ error: 'auth0Id is required' });
    }
    
    const userQuery = `
      SELECT * FROM "Users" 
      WHERE auth0_id = $1 
      LIMIT 1;
    `;
    
    const [user] = await sequelize.query(userQuery, {
      bind: [auth0Id],
      type: sequelize.QueryTypes.SELECT
    });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({ user });
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: 'Failed to retrieve user data' });
  }
});

router.post('/check-user', async (req, res) => {
  try {
    const { email, auth0Id, name, picture } = req.body;
    const existingUserQuery = `SELECT * FROM "Users" WHERE auth0_id = $1 LIMIT 1;`;
    const [existingUser] = await sequelize.query(existingUserQuery, {
      bind: [auth0Id],
      type: sequelize.QueryTypes.SELECT
    });

    if (existingUser) {
      return res.json({
        user: existingUser,
        isNewUser: false
      });
    }
    
    res.json({
      isNewUser: true,
      tempUserData: { email, auth0Id, name, picture }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/create-user', async (req, res) => {
  try {
    const { 
      email, 
      auth0Id, 
      name, 
      picture, 
      role, 
      phone_number,
      profession,
      expertise
    } = req.body;
    
    const insertUserQuery = `
      INSERT INTO "Users" (email, auth0_id, name, profile_picture, role, phone_number, profession, expertise)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *;
    `;
    
    const [newUser] = await sequelize.query(insertUserQuery, {
      bind: [email, auth0Id, name, picture, role || 'user', phone_number, profession, expertise],
      type: sequelize.QueryTypes.INSERT
    });
    
    res.status(201).json({ user: newUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;

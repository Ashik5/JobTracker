const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const { sequelize } = require("../models");
const { QueryTypes } = require("sequelize");

const router = express.Router();

// Configure multer for handling file uploads
const storage = multer.memoryStorage(); // Store files in memory (or configure disk storage)
const upload = multer({ storage });




router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID
    if (!id) {
      return res.status(400).json({ error: "User ID is required" });
    }

    // Query to fetch the user by ID
    const userQuery = `SELECT * FROM "Users" WHERE id = :id LIMIT 1`;
    const users = await sequelize.query(userQuery, {
      replacements: { id },
      type: QueryTypes.SELECT
    });

    if (users.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = users[0];

    // Remove password from response
    delete user.password;

    res.status(200).json({
      message: "User fetched successfully",
      user
    });

  } catch (error) {
    console.error("Get User Error:", error);
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
});

// User Login Route
router.post("/login", async (req, res) => {
  try {
    console.log("Login Attempt:", req.body); // Debugging log

    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ error: "Missing email or password" });
    }

    // Check if the user exists
    const userQuery = `SELECT * FROM "Users" WHERE email = :email LIMIT 1`;
    const users = await sequelize.query(userQuery, {
      replacements: { email },
      type: QueryTypes.SELECT
    });

    if (users.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const user = users[0];

    // Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || "your_secret_key",
      { expiresIn: "7d" }
    );

    // Remove password from response
    delete user.password;

    res.status(200).json({
      message: "Login successful",
      user,
      token
    });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
});


// Register User (Use multer middleware to parse FormData)
router.post("/register", upload.single("picture"), async (req, res) => {
  try {
    console.log('Received Registration Data:', req.body); // Debugging log

    const { 
      name, 
      email, 
      password, 
      phone_number, 
      profession, 
      role 
    } = req.body;

    let { expertise } = req.body;
    if (typeof expertise === "string") {
      expertise = [expertise]; // Ensure it's an array
    }

    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Check if the email already exists
    const existingUsers = await sequelize.query(
      `SELECT * FROM "Users" WHERE email = :email LIMIT 1`, 
      { replacements: { email }, type: QueryTypes.SELECT }
    );

    if (existingUsers.length > 0) {
      return res.status(400).json({ error: "Email already in use" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the user into the database
    const insertUserQuery = `
      INSERT INTO "Users" 
      (name, email, password, phone_number, profession, expertise, role) 
      VALUES (:name, :email, :password, :phone_number, :profession, :expertise, :role)
      RETURNING *;
    `;

    const [newUsers] = await sequelize.query(insertUserQuery, {
      replacements: {
        name, 
        email, 
        password: hashedPassword, 
        phone_number, 
        profession, 
        expertise: `{${expertise.join(',')}}`, // ✅ Convert array to PostgreSQL array format
        role: role || "user"
      },
      type: QueryTypes.INSERT
    });
    

    res.status(201).json({ 
      message: "User registered successfully", 
      user: newUsers[0] 
    });

  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
});

module.exports = router;
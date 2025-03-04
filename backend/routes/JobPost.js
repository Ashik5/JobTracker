const express = require('express');
const router = express.Router();
const { sequelize } = require('../models');

// Get all jobs
router.get('/', async (req, res) => {
  try {
    const jobs = await sequelize.query('SELECT * FROM "JobPosts";', {
      type: sequelize.QueryTypes.SELECT
    });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create job
router.post('/', async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary_range_start,
      salary_range_end,
      job_type,
      location,
      is_remote,
      experience_level,
      skills_required,
      benefits,
      application_deadline,
      status,
      created_by
    } = req.body;

    // Add created_by to the query
    const insertQuery = `
      INSERT INTO "JobPosts" (
        title, 
        description, 
        requirements, 
        salary_range_start, 
        salary_range_end, 
        job_type, 
        location, 
        is_remote, 
        experience_level, 
        skills_required, 
        benefits, 
        application_deadline, 
        status,
        created_by
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
      RETURNING *;
    `;

    // Add created_by to the bind parameters
    const [newJob] = await sequelize.query(insertQuery, {
      bind: [
        title,
        description,
        requirements,
        salary_range_start,
        salary_range_end,
        job_type,
        location,
        is_remote,
        experience_level,
        skills_required,
        benefits,
        application_deadline,
        status,
        created_by
      ],
      type: sequelize.QueryTypes.INSERT
    });

    res.status(201).json(newJob);
  } catch (error) {
    console.error('Error creating job post:', error);
    res.status(400).json({ error: error.message });
  }
});

// Get job by id
router.get('/:id', async (req, res) => {
  try {
    const jobQuery = 'SELECT * FROM "JobPosts" WHERE id = $1 LIMIT 1;';
    const [job] = await sequelize.query(jobQuery, {
      bind: [req.params.id],
      type: sequelize.QueryTypes.SELECT
    });

    if (job) {
      res.json(job);
    } else {
      res.status(404).json({ error: 'Job not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update job
router.put('/:id', async (req, res) => {
  try {
    const { title, description, requirements, salary_range_start, salary_range_end, job_type, location, is_remote, experience_level, skills_required, benefits, application_deadline, status } = req.body;

    const updateQuery = `
      UPDATE "JobPosts" 
      SET title = $1, description = $2, requirements = $3, salary_range_start = $4, salary_range_end = $5, job_type = $6, location = $7, is_remote = $8, experience_level = $9, skills_required = $10, benefits = $11, application_deadline = $12, status = $13, updated_at = NOW()
      WHERE id = $14
      RETURNING *;
    `;

    const [updatedJob] = await sequelize.query(updateQuery, {
      bind: [title, description, requirements, salary_range_start, salary_range_end, job_type, location, is_remote, experience_level, skills_required, benefits, application_deadline, status, req.params.id],
      type: sequelize.QueryTypes.UPDATE
    });

    res.json(updatedJob);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete job
router.delete('/:id', async (req, res) => {
  try {
    const deleteQuery = 'DELETE FROM "JobPosts" WHERE id = $1 RETURNING *;';
    const [deletedJob] = await sequelize.query(deleteQuery, {
      bind: [req.params.id],
      type: sequelize.QueryTypes.DELETE
    });

    if (deletedJob) {
      res.json({ message: 'Job deleted successfully', job: deletedJob });
    } else {
      res.status(404).json({ error: 'Job not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

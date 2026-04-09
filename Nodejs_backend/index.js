require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');

const app = express();

// Database Connection
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'growth_club',
  password: process.env.DB_PASSWORD || 'admin',
  port: process.env.DB_PORT || 5432,
});

// Test DB Connection
pool.connect()
  .then(() => console.log("Connected to PostgreSQL ✅"))
  .catch(err => console.error("Database connection error ❌", err.stack));

app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()'); // Get current timestamp
    res.json({
      status: "success",
      message: "Database Connected",
      timestamp: result.rows[0].now
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Error fetching data"
    });
  }
});
app.get('/faq', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM gc_faq'); // Query to fetch data
    res.json({
      status: "success",
      data: result.rows
    });
  } catch (err) {
    console.error('Error executing query', err.stack);
    res.status(500).json({
      status: "error",
      message: "Error fetching data"
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

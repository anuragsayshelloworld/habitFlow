const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

let db;
(async () => {
  try {
    db = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'habitflow'
    });
    console.log("Connected to MySQL database");
  } catch (err) {
    console.error("Error connecting to DB:", err);
  }
})();

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!db) {
      return res.status(500).json({ success: false, message: "Database not initialized" });
    }

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Missing email or password" });
    }

    const [rows] = await db.execute(
      'SELECT * FROM users WHERE email = ? AND password = ?',
      [email, password]
    );

    if (rows.length > 0) {
      const user = rows[0];
      res.json({
        success: true,
        user: {
          id: user.id,
          email: user.email,
          name: user.name || 'User'
        }
      });
    } else {
      res.json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.post('/api/addhabit/', async (req, res) => {
  try {
    const { habitName, habitDescription, habitStreak } = req.body;

    if (!habitName || !habitDescription) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const query = `
      INSERT INTO habits (habitName, habitDescription, habitStreak)
      VALUES (?, ?, ?)
    `;

    const [result] = await db.execute(query, [habitName, habitDescription, habitStreak]);

    res.status(201).json({
      message: 'Habit added successfully.',
      habitId: result.insertId
    });
  } catch (error) {
    console.error('Error adding habit:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

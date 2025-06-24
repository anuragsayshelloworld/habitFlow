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


app.get('/api/habitList', async (req, res) => {
  try {
    if (!db) {
      return res.status(500).json({ success: false, message: "Database not initialized" });
    }

    const [rows] = await db.execute('SELECT * FROM habits');

    res.json({ success: true, habits: rows });
  } catch (error) {
    console.error('Error fetching habit list:', error);
    res.status(500).json({ success: false, message: 'Server error fetching habits' });
  }
});

app.delete('/api/deleteitem', async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ message: 'Habit ID is required' });
    }

    await db.execute('DELETE FROM habits WHERE id = ?', [id]);

    res.json({ success: true, message: 'Habit deleted successfully' });
  } catch (error) {
    console.error('Error deleting habit:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});


app.put('/api/updateitem', async (req, res) => {
  try {
    const { id, habitname, habitdesc } = req.body;
    console.log("Incoming update payload:", { id, habitname, habitdesc });

    if (!id || habitname === undefined || habitdesc === undefined) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const updateQuery = `
      UPDATE habits
      SET habitName = ?, habitDescription = ?
      WHERE id = ?
    `;

    const [result] = await db.execute(updateQuery, [habitname, habitdesc, id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Habit not found.' });
    }

    
    const [updatedHabits] = await db.execute('SELECT * FROM habits');

    res.json({
      success: true,
      message: 'Habit updated successfully.',
      habits: updatedHabits, 
    });
  } catch (error) {
    console.error('Error updating habit:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});



app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

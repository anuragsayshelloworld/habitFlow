const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

app.post('/api/login', (req, res) => {
const { email, password } = req.body;

if (email === 'test@example.com' && password === '123456') {
   res.json({
   success: true,
   user: { email, name: 'Test User' }})
  } 
else{
   res.json({ success: false, message: 'Invalid credentials' })}
  }
);

app.listen(PORT, () => {
console.log(`Server running on http://localhost:${PORT}`);
});

const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// API Endpoint for contact form
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;
    
    console.log(`New Inquiry from: ${name} (${email})`);
    console.log(`Message: ${message}`);

    // Here you would typically save to a database or send an email
    res.status(200).json({ message: "Thank you! Your message has been sent to Naya Hospital." });
});

app.listen(PORT, () => {
    console.log(`Naya Hospital server running at http://localhost:${PORT}`);
});
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const app = express();

const db = new sqlite3.Database('./hospital.db');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// API: Get all tests
app.get('/api/tests', (req, res) => {
    db.all("SELECT * FROM tests", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// API: Book a test
app.post('/api/book', (req, res) => {
    const { patient_name, test_id, date } = req.body;
    db.run(`INSERT INTO bookings (patient_name, test_id, appointment_date) VALUES (?, ?, ?)`, 
    [patient_name, test_id, date], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Booking successful!", bookingId: this.lastID });
    });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));

// ... existing code ...

// Route for Services Page
app.get('/services', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'services.html'));
});

// Route for Home Page (Explicitly)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ... app.listen ...
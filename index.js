const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse JSON
app.use(express.json());

// Root route to serve index.html from views directory
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Route to handle the timestamp API
app.get('/api/:date?', (req, res) => {
    let dateInput = req.params.date;

    // If no date is provided, use the current date
    if (!dateInput) {
        const currentDate = new Date();
        res.json({
            unix: currentDate.getTime(),
            utc: currentDate.toUTCString()
        });
        return;
    }

    // Check if dateInput is a Unix timestamp
    let date;
    if (!isNaN(dateInput)) {
        date = new Date(parseInt(dateInput));
    } else {
        date = new Date(dateInput);
    }

    // Check if the date is valid
    if (date.toString() === 'Invalid Date') {
        res.json({ error: "Invalid Date" });
    } else {
        res.json({
            unix: date.getTime(),
            utc: date.toUTCString()
        });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

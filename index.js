// Required modules
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

// Enable CORS for testing
app.use(cors({ optionsSuccessStatus: 200 }));

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Serve 'index.html' from the 'views' directory
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// API endpoint to return a greeting message
app.get('/api/hello', (req, res) => {
    res.json({ greeting: 'hello API' });
});

// API endpoint to handle timestamp requests
app.get('/api/:date?', (req, res) => {
    const dateInput = req.params.date;

    let date;
    if (!dateInput) {
        date = new Date();
    } else if (!isNaN(dateInput)) {
        date = new Date(parseInt(dateInput));
    } else {
        date = new Date(dateInput);
    }

    if (date.toString() === 'Invalid Date') {
        return res.json({ error: 'Invalid Date' });
    }

    res.json({
        unix: date.getTime(),
        utc: date.toUTCString()
    });
});

// Listen on port set in environment variable or default to 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Your app is listening on port ' + PORT);
});

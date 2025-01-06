const express = require('express');
const mssql = require('mssql');
const app = express();
const cors = require('cors');
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());

// MSSQL configuration
const sqlConfig = {
    user: 'sharath',
    password: 'Tsc@2131',
    server: '103.168.173.174', // e.g., 'localhost'
    database: 'synergy',
    port: 1433, 
    options: {
        encrypt: true, // Use encryption
        trustServerCertificate: true // Use for local development
    }
};

// Route to save location data
app.post('/api/save-location', async (req, res) => {
    const { latitude, longitude } = req.body;

    try {
        // Connect to the database
        await mssql.connect(sqlConfig);

        // SQL query to insert location data into the database
        const result = await mssql.query(`
            INSERT INTO UserLocations (Latitude, Longitude)
            VALUES (${latitude}, ${longitude});
        `);

        res.status(200).json({ message: 'Location saved successfully!' });
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).json({ error: 'An error occurred while saving the location.' });
    } finally {
        // Close the database connection
        await mssql.close();
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

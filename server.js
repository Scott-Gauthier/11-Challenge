const express = require('express');
const path = require('path');
const uuid = require('./helpers/uuid');
const db = require('./db/db.json');
const fs = require('fs');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//return home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

//return dynamic page that has notes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

//return dynamic page that has notes
app.get('/api/notes', (req, res) => {
    const filename = path.join(__dirname, './db/db.json');
    fs.readFile(filename, function (err, data) {
        res.json(JSON.parse(data))
    }
    );
});
app.post('/api/notes', (req, res) => {
    // Log that a POST request was received
    console.info(`${req.method} request received to add a record`);
    console.log(req.body)
    const filename = path.join(__dirname, './db/db.json');
    // Destructuring items in req.body
    const { title, text } = req.body;
    // If all the required properties are present
    if (title && text) {
        // Variable for the object we will save
        const newRecord = {
            title,
            text,
            id: uuid(),
        };
        fs.readFile(filename, function (err, data) {
            const dataWrite = JSON.parse([data]);
            dataWrite.push(newRecord);
            console.log(dataWrite);

        fs.writeFile(filename, JSON.stringify(dataWrite), (err) =>
            err ? console.log(err) : res.json(dataWrite)
        );
    }
    );
    };
});

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});

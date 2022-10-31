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
    fs.readFile(filename, function(err, data){
        res.json(JSON.parse(data))
    }
    );
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});

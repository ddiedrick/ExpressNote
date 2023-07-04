const router = require('express').Router();
const fs = require('fs');
const db = require('../db/db.json')

//creates unique identifiers
const { v4: uuidv4 } = require('uuid');

// Get all the existing notes
router.get('/api/notes', async (req, res) => {
    const jsonDB = await JSON.parse(fs.readFileSync("db/db.json", "utf8"));
    res.json(jsonDB);
});

// Add new note and returns updated notes list
router.post('/api/notes', (req, res) => {
    const jsonDB = JSON.parse(fs.readFileSync("db/db.json", "utf8"));
    const newNote = {
        title: req.body.title,
        text: req.body.text,
        id: uuidv4(),
    };
    jsonDB.push(newNote);
    fs.writeFileSync("db/db.json", JSON.stringify(jsonDB));
    res.json(jsonDB);
});

router.delete('/api/notes/:id',(req, res) => {
    const db2 = db.filter((note) =>
        note.id !== req.params.id)

    // update the db.json file 
    fs.writeFileSync('./db/db.json', JSON.stringify(db2));
    readFile.json(db2);
});

module.exports = router;
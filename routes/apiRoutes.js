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
   // read notes from db.json
   let db = JSON.parse(fs.readFileSync('db/db.json'))
   // removing note with id
   let deleteNote = db.filter(item => item.id !== req.params.id);
   // Rewriting notes list to db.json
   fs.writeFileSync('db/db.json', JSON.stringify(deleteNote));
   res.json(deleteNote);
});

module.exports = router;
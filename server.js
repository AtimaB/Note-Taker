const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//HTML Routes
app.get('/', (req, res) => {
  res.sendfile(path.join(__dirname, './Develop/public/index.html'));
});

app.get('/notes', (re1, res) => {
  res.sendfile(path.join(__dirname, './Develop/public/notes.html'));
});

//CSS Routes
app.get('/assets/css/styles.css', (req, res) => {
  res.sendfile(path.join(__dirname, './Develop/public/assets/css/styles.css'));
});

//JS Routes
app.get('/assets/js/index.js', (req, res) => {
  res.sendfile(path.join(__dirname, './Develop/public/assets/js/index.js'));
});

//Api Routes
app.get('/api/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './Develop/db/db.json'));
});

//Create notes
app.post('/api/notes', (req, res) => {
  let newNote = {
    title: req.body.title,
    text: req.body.text,
  };
  //Create unique ID
  newNote.id = Math.floor(Math.random() * Date.now());

  let notes = fs.readFileSync('./Develop/db/db.json');
  let parsedNote = JSON.parse(notes);
  parsedNote.push(newNote);
  fs.writeFileSync('./Develop/db/db.json', JSON.stringify(parsedNote));
  res.json(newNote);
});

// Delete notes
app.delete('/api/notes/:id', (req, res) => {
  let id = req.params.id;

  fs.readFile('./Develop/db/db.json', 'utf-8', (err, notesDetail) => {
    let note = JSON.parse(notesDetail);
    let newNotesDetail = note.filter((note) => note.id != id);
    fs.writeFile(
      './Develop/db/db.json',
      JSON.stringify(newNotesDetail, null, 2),
      (err) => {
        if (err) throw err;
        res.send(newNotesDetail);
      }
    );
  });
});

// Starts the server to begin listening
app.listen(PORT, function () {
  console.log('App listining on PORT ' + PORT);
});

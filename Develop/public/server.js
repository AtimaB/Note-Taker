var express = require('express');
var path = require('path');
var fs = require('fs');

var app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//HTML Routes
app.get('/', (req, res) => {
  res.sendfile(path.join(__dirname, 'index.html'));
});

app.get('/notes', (re1, res) => {
  res.sendfile(path.join(__dirname, 'notes.html'));
});

//CSS Routes
app.get('/assets/css/styles.css', (req, res) => {
  res.sendfile(path.join(__dirname, '/assets/css/styles.css'));
});

//JS Routes
app.get('/assets/js/index.js', (req, res) => {
  res.sendfile(path.join(__dirname, '/assets/js/index.js'));
});

//Api Routes
app.get('/api/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/db/db.json'));
});

//Create notes
app.post('/api/notes', (req, res) => {
  let newNote = {
    title: 'Test Title',
    text: 'Test text',
    id: 'id',
  };
  let notes = fs.readFileSync('/db/db.json');
  let parsedNote = JSON.parse(notes);
  parsedNote.push(newNote);
  fs.writeFileSync('/db/db.json', JSON.stringify(parsedNote));
  res.json(newNote);
});

// Delete notes
app.delete('/api/notes/:id', (req, res) => {
  var id = req.param('id');
  newNote.remove(
    {
      _id: id,
    },
    function (err) {
      if (err) {
        console.log(err);
      } else {
        return res.send('Removed');
      }
    }
  );
});

// Starts the server to begin listening
app.listen(PORT, function () {
  console.log('App listining on PORT ' + PORT);
});

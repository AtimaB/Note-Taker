var express = require('express');
var path = require('path');

var app = express();
var PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var notes = [
  {
    title: 'Test Title',
    text: 'Test text',
  },
];

// Basic route that sends the user first to the AJAX Page
app.get('/', function (req, res) {
  res.sendfile(path.join(__dirname, 'index.html'));
});

app.get('/notes', function (re1, res) {
  res.sendfile(path.join(__dirname, 'notes.html'));
});

app.get('/api/notes', function (req, res) {
  return res.json(notes);
});

app.get('/api/notes/:note', function (req, res) {
  var note = req.params.notes;

  console.log(note);

  for (var i = 0; i < notes.length; i++) {
    if (note === notes[i].routeName) {
      return res.json(notes[i]);
    }
  }
  return res.json(false);
});

//Create new note
app.post('/api/public/notes', function (req, res) {
  var newNote = req.body;
  newNote.push(newNote);
  res.json(newNote);
});

app.listen(PORT, function () {
  console.log('App listining on PORT' + PORT);
});

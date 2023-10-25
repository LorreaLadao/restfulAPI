var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
function readUsers() {
  const data = fs.readFileSync(__dirname + '/songs.json', 'utf8');
  return JSON.parse(data);
}

//GET
app.get('/listSongs', function (req, res) {
  const users = readUsers();
  res.json(users);
});

//ADD 
app.post('/addSong', function (req, res) {
  fs.readFile(__dirname + "/songs.json", 'utf8', function (err, data) {
    if (err) {
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    const songs = JSON.parse(data);
    const newSongId = "song" + (Object.keys(songs).length + 1);
    const newSong = req.body;
    songs[newSongId] = newSong;
    fs.writeFile(__dirname + "/songs.json", JSON.stringify(songs, null, 2), function (err) {
      if (err) {
        res.status(500).json({ error: 'Internal server error' });
      } else {
        res.json(songs); 
      }
    });
  });
});

// SHOW
app.get('/getSong/:id', function (req, res) {
   const songs = readUsers();
   const song = songs['song' + req.params.id]; 
   res.json(song);
 });
 

// DELETE
app.delete('/deleteSong/:id', function (req, res) {
  const songs = readUsers();
  const songId = 'song' + req.params.id;

  if (songs[songId]) {
     delete songs[songId];
     fs.writeFileSync(__dirname + '/songs.json', JSON.stringify(songs, null, 2));
     res.json(songs);
  } else {
     res.status(404).json({ message: 'Song not found' });
  }
});

var server = app.listen(8081, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});

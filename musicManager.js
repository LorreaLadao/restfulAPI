var express = require('express');
var app = express();
var fs = require("fs");
var song = {
   "song6" : {
      "Song" : "Careless Whisper",
      "Artist" : "George Michael",
      "Genre":"Pop & Soft Rock",
      "Link":"https://www.youtube.com/watch?v=1m6en0SQNFs",
      "id": 6
    }
}
//Show the list
app.get('/listSongs', function (req, res) {
   fs.readFile( __dirname + "/" + "songs.json", 'utf8', function (err, data) {
      console.log( data );
      res.end( data );
   });
})
//Add Song
app.post('/addSong', function (req, res) {
    // First read existing songs.
    fs.readFile( __dirname + "/" + "songs.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       data["song6"] = song["song6"];
       console.log( data );
       res.end( JSON.stringify(data));
    });
})
//Show specific song
app.get('/:id', function (req, res) {
    // First read existing songs.
    fs.readFile( __dirname + "/" + "songs.json", 'utf8', function (err, data) {
       var songs = JSON.parse( data );
       var song = songs["song" + req.params.id];
       console.log( song );
       res.end( JSON.stringify(song));
    });
})
//Delete a Song
app.delete('/deleteSong', function (req, res) {
   // First read existing songs.
   fs.readFile( __dirname + "/" + "songs.json", 'utf8', function (err, data) {
      data = JSON.parse( data );
      delete data["song5"];
      console.log( data );
      res.end( JSON.stringify(data));
   });
})
//delete specific song
app.delete('/deleteSong/:id', function (req, res) {
    // First read existing songs.
    fs.readFile( __dirname + "/" + "songs.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       delete data["song" + req.params.id];
       console.log( data );
       res.end( JSON.stringify(data));
    });
})

var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Song app listening at http://%s:%s", host, port);
})

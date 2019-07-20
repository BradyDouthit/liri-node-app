require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);
var searchParam = process.argv[3] + " " + process.argv[4];
var command = process.argv[2];

function searchSong () {
    spotify
  .search({ type: 'track', query: searchParam })
  .then(function(response) {
    var song = response.tracks.items[0].name;
    var link = response.tracks.items[0].external_urls.spotify;
    var album = response.tracks.items[0].album.name;
    var artist = response.tracks.items[0].artists[0].name;
    console.log("\n--------------------\n")
    console.log("Artist(s): " + artist)
    console.log("Album: " + album);
    console.log("Song: " + song);
    console.log("Link" + link);
    console.log("\n--------------------\n")

  })
  .catch(function(err) {
    console.log(err);
  });
}
if (command === 'spotify-this-song') {
  searchSong();
}

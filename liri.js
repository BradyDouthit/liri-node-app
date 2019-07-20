require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);
var searchParam = process.argv[2] + " " + process.argv[3];
function searchSong () {
    spotify
  .search({ type: 'track', query: searchParam })
  .then(function(response) {
    var name = response.tracks.items[0].name;
    var link = response.tracks.items[0].external_urls.spotify;
    var album = response.tracks.items[0].album.name;
    var artist = response.tracks.items[0].artists.name;
    console.log(response.tracks.items[0]);
    console.log(name);
    console.log(link);
    console.log(album);
    console.log(artist)
  })
  .catch(function(err) {
    console.log(err);
  });
}

searchSong();
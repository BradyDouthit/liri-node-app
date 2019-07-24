require("dotenv").config();
const keys = require("./keys.js");
const Spotify = require('node-spotify-api');
const axios = require('axios');
const moment = require('moment'); 
var spotify = new Spotify(keys.spotify);
var searchParam = process.argv[3];
if (process.argv[4] != undefined) {
  searchParam = process.argv[3] + ' ' + process.argv[4];
}
var command = process.argv[2];

function searchSong() {
  spotify
    .search({ type: 'track', query: searchParam })
    .then(function (response) {
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
    .catch(function (err) {
      console.log(err);
    });
};

function bandsInTown() {
  axios.get("https://rest.bandsintown.com/artists/" + searchParam + "/events?app_id=codingbootcamp")
    .then(response => {
      console.log("\n--------------------\n")
      console.log(response.data[0].venue.name);
      console.log(response.data[0].venue.city + ', ' + response.data[0].venue.region);
      var timeFormatted = new moment(response.data[0].datetime).format("MM/DD/YYYY");
      console.log(timeFormatted);
      console.log("\n--------------------\n")
    })
    .catch(error => {
      console.log(error);
    });
};

if (command === 'spotify-this-song') {
  searchSong();
};

if (command === 'concert-this') {
  bandsInTown();
};

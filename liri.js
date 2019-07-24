require("dotenv").config();
const fs = require('fs');
const keys = require("./keys.js");
const Spotify = require('node-spotify-api');
const axios = require('axios');
const moment = require('moment');
var spotify = new Spotify(keys.spotify);
var searchParam = "";
var nodeArgs = process.argv;
var command = process.argv[2];
var commandAndParam = ""

//Makes sure that searches work even when there are multiple words and spaces
var paramCheck = function () {
  for (var i = 3; i < nodeArgs.length; i++) {
    if (i > 3 && i < nodeArgs.length) {
      searchParam = searchParam + " " + nodeArgs[i];
    }
    else {
      searchParam += nodeArgs[i];

    }
  }
}
//spotify-this-song
function searchSong() {
  paramCheck();
  if (searchParam === "") {
    searchParam = "The Sign " + "Ace of Base";
    console.log("You must specify a song, but heres The Sign by Ace of Base.")
  };

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
      console.log("Link: " + link);
      console.log("\n--------------------\n")

    })
    .catch(function (err) {
      console.log(err);
    });
};
//concert-this
function searchBand() {
  paramCheck();
  axios.get("https://rest.bandsintown.com/artists/" + searchParam + "/events?app_id=codingbootcamp")
    .then(response => {
      console.log(response.data);
      console.log("\n--------------------\n")
      console.log(searchParam.charAt(0).toUpperCase() + searchParam.slice(1) + ":\n")
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
//movie-this
function searchMovie() {
  paramCheck();
  var queryUrl = "http://www.omdbapi.com/?t=" + searchParam + "&y=&plot=short&apikey=trilogy";

  axios.get(queryUrl).then(
    function (response) {
      console.log("\n--------------------\n");
      console.log("Title: " + response.data.Title);
      console.log("Release Year: " + response.data.Year);
      //console.log("Rated: " + response.data.Rated);
      console.log("IMDB Rating: " + response.data.imdbRating);
      console.log("Rotten Tomatoes: " + response.data.Ratings[1].Value);
      console.log("Country: " + response.data.Country);
      console.log("Language: " + response.data.Language);
      console.log("Fun fact: " + response.data.Title + " made " + response.data.BoxOffice + "\n");
      console.log("Plot: " + response.data.Plot + "\n");
      console.log("Actors: " + response.data.Actors);
      console.log("\n--------------------\n");
    }
  );
}


if (command === 'spotify-this-song') {
  searchSong();
};

if (command === 'concert-this') {
  searchBand();
};

if (command === 'movie-this') {
  searchMovie();
};

if (command === 'do-what-it-says') {
  fs.readFile("random.txt","utf8", function (err, data) {
    if (err) {
      console.log(err)
    };
    var dataArray = data.split(",");
    command = dataArray[0];
    searchParam = " " + dataArray[1]; 
    if(command === 'spotify-this-song'){
      searchSong();
    }
  })
}

require("dotenv").config();


var request = require("request");
var keys = require("./keys.js");
var twitter = require("twitter");
var Spotify = require('node-spotify-api');
var fs = require("fs")

var command = process.argv[2];
var parameter = process.argv[3];

var newcommand = "";
var songname = "";
var movietitle = "";
var argument = "";


var client = new twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

var spotify = new Spotify({
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
});

function log(value){
    fs.appendFile("log.txt", value + "\n", function(err){
        if(err){
            throw(err)
        }

    })
}

function getmytweets() {
    var params = {};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (error) {
            console.log("Error occured: " + error)
        } else {
            console.log(tweets);
            log(tweets);
        
            
        }
    });
    log("\n")
}

function spotifythissong() {
    songname = "";
    for (var i = 3; i < process.argv.length; i++) {
        songname += process.argv[i] + " ";
    }

    
    if(songname === ""){
        spotify.search({type: "track", query: "The Sign"}, function(error,data) {
            if (error) {
                return console.log("Error occurred: " + error);
            }else {
                console.log("Artist: " + data.tracks.items[7].artists[0].name);
                console.log('Album Name: ' + data.tracks.items[7].album.name);
                console.log("Song name: " + data.tracks.items[7].name);
                console.log("Link: " + data.tracks.items[7].preview_url);
                log("Artist: " + data.tracks.items[7].artists[0].name);
                log('Album Name: ' + data.tracks.items[7].album.name);
                log("Song name: " + data.tracks.items[7].name);
                log("Link: " + data.tracks.items[7].preview_url);
                log("\n")
            }
        });
    }else {
        spotify.search({ type: "track", query: songname, limit: "1"}, function(error, data) {
            if (error) {
                return console.log("Error occurred: " + error);
            }else {
                
                console.log("Artist: " + data.tracks.items[0].artists[0].name);
                console.log("Album Name: " + data.tracks.items[0].album.name);
                console.log("Song name: " + data.tracks.items[0].name);
                console.log("Link: " + data.tracks.items[0].preview_url);
                log("Artist: " + data.tracks.items[0].artists[0].name);
                log("Album Name: " + data.tracks.items[0].album.name);
                log("Song name: " + data.tracks.items[0].name);
                log("Link: " + data.tracks.items[0].preview_url);
                log("\n")
            }
        });
    }
}

function getmovieinfo() {
    movietitle = "";
    for (var i = 3; i < process.argv.length; i++) {
        movietitle += process.argv[i] + " ";
    
    }
    
    var movieURL = "http://www.omdbapi.com/?apikey=trilogy&s=" + movietitle
    //console.log(movieURL)
    request(movieURL, function (error, response, body) {
        if(error){
            console.log(error);
        } 
        else {
            //console.log(JSON.parse(body).Search[0].imdbID);
            var imdbID = JSON.parse(body).Search[0].imdbID;
            movieURL = "http://www.omdbapi.com/?apikey=trilogy&i=" + imdbID

            request(movieURL, function (error, response, body) {
                if(error){
                    console.log(error)
                }
                else {
                    //console.log(body)
                    console.log("Title: " + JSON.parse(body).Title)
                    console.log("Release Year: " + JSON.parse(body).Year)
                    console.log("imdb Rating: " + JSON.parse(body).imdbRating)
                    console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value)
                    console.log("Country: " + JSON.parse(body).Country)
                    console.log("Plot: " + JSON.parse(body).Plot)
                    console.log("Language: " + JSON.parse(body).Language)
                    console.log("Actors: " + JSON.parse(body).Actors)
                    log("Title: " + JSON.parse(body).Title)
                    log("Release Year: " + JSON.parse(body).Year)
                    log("imdb Rating: " + JSON.parse(body).imdbRating)
                    log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value)
                    log("Country: " + JSON.parse(body).Country)
                    log("Plot: " + JSON.parse(body).Plot)
                    log("Language: " + JSON.parse(body).Language)
                    log("Actors: " + JSON.parse(body).Actors)
                }
            });
        }
    });
}

function getcommandtxt(){
    fs.readFile("random.txt", "utf8", function(error, data) {

        if (error) {
          return console.log(error);
        }

        else{
        //console.log(data);
      
        var dataArr = data.split(",");
      
        // We will then re-display the content as an array for later use.
        //console.log(dataArr);
        newcommand = dataArr[0];
        //console.log(command)
        argument = dataArr[1].replace(/['"]+/g, '');
        //console.log(argument)

        switch(newcommand){
            case "my-tweets":
                getmytweets();
            break;

            case "spotify-this-song":
                songname = argument;
                spotify.search({ type: "track", query: songname, limit: "1"}, function(error, data) {
                    if (error) {
                        return console.log("Error occurred: " + error);
                    }else {
                        
                        console.log("Artist: " + data.tracks.items[0].artists[0].name);
                        console.log("Album Name: " + data.tracks.items[0].album.name);
                        console.log("Song name: " + data.tracks.items[0].name);
                        console.log("Link: " + data.tracks.items[0].preview_url);

                        log("Artist: " + data.tracks.items[0].artists[0].name);
                        log("Album Name: " + data.tracks.items[0].album.name);
                        log("Song name: " + data.tracks.items[0].name);
                        log("Link: " + data.tracks.items[0].preview_url);
                    }
                });
            break;

            case "movie-this":
                movietitle = argument;
                var movieURL = "http://www.omdbapi.com/?apikey=trilogy&s=" + movietitle
                //console.log(movieURL)
                request(movieURL, function (error, response, body) {
                    if(error){
                        console.log(error);
                    } 
                    else {
                        //console.log(JSON.parse(body).Search[0].imdbID);
                        var imdbID = JSON.parse(body).Search[0].imdbID;
                        movieURL = "http://www.omdbapi.com/?apikey=trilogy&i=" + imdbID
            
                        request(movieURL, function (error, response, body) {
                            if(error){
                                console.log(error)
                            }
                            else {
                                //console.log(body)
                                console.log("Title: " + JSON.parse(body).Title)
                                console.log("Release Year: " + JSON.parse(body).Year)
                                console.log("imdb Rating: " + JSON.parse(body).imdbRating)
                                console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value)
                                console.log("Country: " + JSON.parse(body).Country)
                                console.log("Plot: " + JSON.parse(body).Plot)
                                console.log("Language: " + JSON.parse(body).Language)
                                console.log("Actors: " + JSON.parse(body).Actors)

                                log("Title: " + JSON.parse(body).Title)
                                log("Release Year: " + JSON.parse(body).Year)
                                log("imdb Rating: " + JSON.parse(body).imdbRating)
                                log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value)
                                log("Country: " + JSON.parse(body).Country)
                                log("Plot: " + JSON.parse(body).Plot)
                                log("Language: " + JSON.parse(body).Language)
                                log("Actors: " + JSON.parse(body).Actors)
                            }
                        });
                    }
                });
            break;
        }


        }


      
      });
}


//***** Main Conditionals Section*******
switch(command){
    case "my-tweets":
       getmytweets();
    break;

    case "spotify-this-song":
        spotifythissong();
    break;

    case "movie-this":
        getmovieinfo();
    break;

    case "do-what-it-says":
        getcommandtxt();
        
    break;
}


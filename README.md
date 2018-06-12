# Language Interpretation and Recognition Interface

**LIRI** is a command-line application that takes one or two arguments to return information about movies, songs, and, tweets.

Before you run the application, you will need to install the dependencies listed in [package.json](./package.json).

You will also need your own .env file with the keys included in [keys.js](keys.js).

Once you have the appropriate modules and permissions, you can begin using LIRI.

### Entering Commands

You will use the command "node liri.js" at the start of each of the following queries: 
*   "my-tweets" 
    * This command will return the objects of each of your previous 20 tweets
    * Example command: "node liri.js my-tweets"

*   "movie-this [moviename]" where [moviename] is the name of a movie
    * This command will search the omdb Database and return various facts about the movie.
    * Example command: "node liri.js movie-this happy gilmore"

*   "spotify-this-song"
    * This command will search Spotify and give you more information about any song.
    * Example command: "node liri.js spotify-this-song tuesday"

*   "do-what-it-says"
    * This command will look to the [random.txt](random.txt) file and execute the command written in there.
    * Example command: "node liri.js do-what-it-says"

Each of your results will be logged in [log.txt](log.txt).
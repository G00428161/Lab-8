// Import Express and set up the server
const express = require('express');
const app = express();
const port = 4000;

// Allow communication between the frontend and backend
const cors = require('cors');
app.use(cors());

// Allow different types of HTTP requests
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Allow the server to read incoming data
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to the MongoDB database
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin:admin@martinscluster.w5rtkz0.mongodb.net/');

// Define the structure of a movie
const movieSchema = new mongoose.Schema({
  title: String,
  year: String,
  poster: String
});

// Create the Movie model
const Movie = mongoose.model('Movie', movieSchema);



// Display a message on the server homepage
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Delete a movie using its ID
app.delete('/api/movie/:id', async (req, res) => {

        console.log('Deleting movie with ID:', req.params.id);

        // Find and delete the movie from the database
        const movie = await Movie.findByIdAndDelete(req.params.id);

        // Confirm that the movie has been deleted
        res.status(200).send({ message: "Movie deleted successfully", movie });
        console.log("Deleted Movie with ID" +req.params.id);

    });

// Retrieve all movies from the database
app.get('/api/movies', async (req, res) => {
  const movies = await Movie.find({});
  res.json(movies);
});

// Previous method of displaying movies using hardcoded data
// app.get('/api/movies', (req, res) => {
//   const myMovies = [
//     {
//       "Title": "Avengers: Infinity War (server)",
//       "Year": "2018",
//       "imdbID": "tt4154756",
//       "Type": "movie",
//       "Poster": "https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg"
//     },
//     {
//       "Title": "Captain America: Civil War (server)",
//       "Year": "2016",
//       "imdbID": "tt3498820",
//       "Type": "movie",
//       "Poster": "https://m.media-amazon.com/images/M/MV5BMjQ0MTgyNjAxMV5BMl5BanBnXkFtZTgwNjUzMDkyODE@._V1_SX300.jpg"
//     },
//     {
//       "Title": "World War Z (server)",
//       "Year": "2013",
//       "imdbID": "tt0816711",
//       "Type": "movie",
//       "Poster": "https://m.media-amazon.com/images/M/MV5BNDQ4YzFmNzktMmM5ZC00MDZjLTk1OTktNDE2ODE4YjM2MjJjXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg"
//     }
//   ]
//   res.json({ myArray: myMovies });
// })


// Add a new movie to the database
app.post('/api/movies', async (req, res) => {

  // Get the movie details entered by the user
  const { title, year, poster } = req.body;

  // Create and save the new movie
  const newMovie = new Movie({ title, year, poster });
  await newMovie.save();

  // Confirm that the movie has been created
  res.status(201).json({ message: 'Movie created successfully', movie: newMovie });
})

// Retrieve a specific movie using its ID
app.get('/api/movie/:id', async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  res.send(movie);
});

// Start the server on port 4000
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

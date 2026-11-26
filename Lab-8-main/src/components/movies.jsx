// Import the MovieItem component
import MovieItem from './movieItem';

// Create the Movies component
const Movies = (props)=>{
    // Loop through the list of movies
    return props.myMovies.map(
        (movie)=>{
            // Display each movie and pass its unique ID and Reload function
            return <MovieItem mymovie={movie} Reload={props.Reload} key={movie._id}></MovieItem>
        }
    );
}

// Export the Movies component
export default Movies;

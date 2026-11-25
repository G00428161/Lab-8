import MovieItem from './movieItem';
const Movies = (props)=>{
    return props.myMovies.map(
        (movie)=>{
            return <MovieItem mymovie={movie} 
            key={movie.imdbID}Reload={props.RelaodData}></MovieItem>
        }
    );
}
export default Movies;
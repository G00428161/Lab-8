// Import Bootstrap components and Axios
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

// Create the MovieItem component
const MovieItem = (props) => {

    // Function to delete a movie
    const DeleteMovie = (e) =>{
        e.preventDefault();
        console.log("Delete movie")

    // Send a delete request using the movie's unique ID
    axios.delete('http://localhost:4000/api/movie/' + props.mymovie._id)
            .then(() => {
                console.log("Movie Deleted")
                props.Reload(); // Refresh the movie list after deletion
            })
            // Display an error if the movie cannot be deleted
            .catch((error) => {
                console.error("Error deleting movie:", error);
            });
    };

    // Display the movie details using a Bootstrap card
    return (
        <div>
            <Card className="text-center">
                <Card.Body>
                    {/* Display the movie title and poster */}
                    <Card.Title>{props.mymovie.title}</Card.Title>
                    <img src={props.mymovie.poster}/>
                </Card.Body>
                {/* Display the movie release year */}
                <Card.Footer className="text-muted">{props.mymovie.year}</Card.Footer>
                {/* Button to delete the selected movie */}
                <Button variant="danger" onClick={DeleteMovie}>Delete</Button>
            </Card>
        </div>
    );
}

// Export the MovieItem component
export default MovieItem;

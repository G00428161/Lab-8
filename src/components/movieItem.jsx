import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
const MovieItem = (props) => {
 const handleDelete = (e) => {
     e.preventDefault();
     console.log("Delete Movie")

   axios.delete('http://localhost:4000/api/movie/' + props.mymovie._id)
   .then(()=>{
    console.log("Movie Deleted")
    props.Reload();
   })

      .catch((error) => {console.error("Error reloading data:", error)});

    }
    return (
        <div>
            <Card className="text-center">
                <Card.Body>
                    <Card.Title>{props.mymovie.title}</Card.Title>
                    <img src={props.mymovie.poster} />
                </Card.Body>
                <Card.Footer className="text-muted">{props.mymovie.year}</Card.Footer>
                <Button variant="danger" 
                onClick={handleDelete}> Delete</Button>
            </Card>
        </div>
    );
}
export default MovieItem;
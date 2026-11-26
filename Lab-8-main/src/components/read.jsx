// Import React hooks, Axios and the Movies component
import { useEffect, useState } from "react";
import axios from 'axios';
import Movies from "./movies";

// Create the Read component
const Read = () => {

    // Store the list of movies
    const [myMovies, setMovie] = useState([]);

    // Retrieve movies from the server
    const Reload = ()=>{
        axios.get('http://localhost:4000/api/movies')
                .then((response) => {
                    console.log(response.data);

                    // Update the movie list with the retrieved data
                    setMovie(response.data);
                })
                // Display any errors in the console
                .catch((error) => { console.log(error) });

    }

    // Load the movies when the component first opens
    useEffect(
        () => {
            Reload();
        }, []
    );


    // Display the heading and list of movies
    return (
        <div>
            <h1>Hello from Read component</h1>
            <Movies myMovies={myMovies} Reload={Reload}></Movies>
        </div>
    );
}

// Export the Read component
export default Read;

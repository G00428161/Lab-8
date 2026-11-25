import { useEffect, useState } from "react";
import axios from 'axios';
import Movies from "./movies";
const Read = () => {
    const [myMovies, setMovie] = useState([]);
    const Reload = ()=>{
axios.get('http://localhost:4000/api/movies')
.then((response) => {
    setMovie(response.data);
    })
    .catch((error) => {
        console.log(error);
    });
}

    useEffect(
        () => {
            //do some http client work
            axios.get('http://localhost:4000/api/movies')
                .then((response) => {
                    console.log(response.data);
                    setMovie(response.data);
                })
                .catch((error) => { console.log(error) });
        }, []
    );

    
    return (
        <div>
            <h1>Hello from Read component</h1>
            <Movies myMovies={myMovies}>
            ReloadData={Relaod}/>
        </div>
    );
}

export default Read;
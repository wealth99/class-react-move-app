import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../api/axios";

const DetailPage = () => {

    const {movieId} = useParams();
    const [movie, setMovie] = useState({});

    const fetchData = async () => {
        const request = await axios.get(
            `/movie/${movieId}`
        )
        setMovie(request.data);
    }

    useEffect(() => {
        fetchData();
    }, [movieId]);

    if(!movie) return <div>...loading</div>;

    return (
        <section style={{display: 'flex', justifyContent: 'center'}}>
            <img 
                src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                alt="poster"
                style={{width: '80%'}}
            />
        </section>
    )
}

export default DetailPage;

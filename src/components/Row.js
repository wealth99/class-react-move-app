import React, { useEffect, useCallback, useState } from "react";
import axios from "../api/axios";
import MovieModal from "./MovieModal";
import "./Row.css";

const Row = ({ title, id, fetchUrl, isLargeRow }) => {

    const [movies, setMovies] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [movieSelected, setMovieSelected] = useState({});

    const fetchMovieData = useCallback(async () => {
        const request = await axios.get(fetchUrl);
        setMovies(request.data.results);
    }, [fetchUrl]);

    const handleImgClick = (movie) => {
        setModalOpen(true);
        setMovieSelected(movie)
    }

    useEffect(() => {
        fetchMovieData();
    }, [fetchMovieData]);

    if(movies) {
        return (
            <section className="slider">
                <h2>{title}</h2>
                <div id={id} className="row__posters">
                    {movies.map((movie) => (
                        <img 
                            key={movie.id}
                            className={`row__poster ${isLargeRow ? "row__posterLarge" : ""}`}
                            src={`https://image.tmdb.org/t/p/original/${
                                isLargeRow ? movie.poster_path : movie.backdrop_path
                            }`}
                            alt={movie.name}
                            onClick={() => handleImgClick(movie)}
                        />
                    ))}
                    <button
                        type="button"
                        className="btn__arrow left"
                        onClick={() => {
                            document.getElementById(id).scrollLeft -= window.innerWidth - 75;
                        }}
                    >
                        {"<"}
                    </button>
                    <button
                        type="button"
                        className="btn__arrow right"
                        onClick={() => {
                            document.getElementById(id).scrollLeft += window.innerWidth - 75;
                        }}
                    >
                        {">"}
                    </button>
                </div>

                {
                    modalOpen && (
                        <MovieModal {...movieSelected} setModalOpen={setModalOpen} />
                    )
                }
            </section>
        )
    } else {
        return (
            <div>Loding...</div>
        )
    }
}

export default Row;

import React, { useEffect, useCallback, useState } from "react";
import axios from "../api/axios";
import MovieModal from "./MovieModal";
import "./Row.css";

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

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
                <Swiper
                    // install Swiper modules
                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                    navigation
                    spaceBetween={20}
                    pagination={{ clickable: true }}
                    loop={true}
                    speed={800}
                    breakpoints={{
                        1378: {
                            slidesPerView: 5,
                            slidesPerGroup: 5
                        },
                        998: {
                            slidesPerView: 4,
                            slidesPerGroup: 4
                        },
                        625: {
                            slidesPerView: 3,
                            slidesPerGroup: 3
                        },
                        0: {
                            slidesPerView: 2,
                            slidesPerGroup: 2
                        }
                    }}
                >
                    <div id={id} className="row__posters">
                        {movies.map((movie) => (
                            <SwiperSlide>
                                <img 
                                    key={movie.id}
                                    className={`row__poster ${isLargeRow ? "row__posterLarge" : ""}`}
                                    src={`https://image.tmdb.org/t/p/original/${
                                        isLargeRow ? movie.poster_path : movie.backdrop_path
                                    }`}
                                    alt={movie.name}
                                    onClick={() => handleImgClick(movie)}
                                />
                            </SwiperSlide>
                        ))}
                    </div>
                </Swiper>
                {modalOpen && (<MovieModal {...movieSelected} setModalOpen={setModalOpen} />)}
            </section>
        )
    } else {
        return (
            <div>Loding...</div>
        )
    }
}

export default Row;

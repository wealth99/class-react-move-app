import axios from "../api/axios";
import React, { useState, useEffect } from "react";
import requests from "../api/requests";
import "./Banner.css";
import styled from "styled-components";

const Banner = () => {

    const [movie, setMovie] = useState([]);
    const [isClicked, setIsClicked] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        // 현재 상영중인 영화 정보를 가져오기(여러 영화)
        const request = await axios.get(requests['fetchNowPlaying']);
        
        // 여러 영화 중 영화 하나의 id값 가져오기
        const movieId = request.data.results[
            Math.floor(Math.random() * request.data.results.length)
        ].id;

        // 특정 영화의 더 상세한 정보를 가져오기
        const {data: movieDetail} = await axios.get(`movie/${movieId}`, {params: {append_to_response: 'videos'}});
        setMovie(movieDetail);
    }

    const truncate = (str, n) => {
        return str?.length > n ? str.substr(0, n - 1) + '...' : str;
    }

    // style
    const Container = styled.div`
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        width: 100%;
        height: 100vh;
    `;

    const HomeContainer = styled.div`
        width: 100%;
        height: 100%;
    `;

    const Iframe = styled.iframe`
        width: 100%;
        height: 100%;
        z-index: -1;
        /* opacity: 0.65; */
        border: none;

        &::after {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
    `;
    
    if(!isClicked) {
        return (
            <div 
                className="banner"
                style={{
                    backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
                    backgroundPosition: "top center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat"
                }}
            >
                <div className="banner__contents">
                    <h1 className="banner__title">{movie.title || movie.name || movie.original_name}</h1>
                    <div className="banner__buttons">
                        <button type="button" className="banner__button play" onClick={() => setIsClicked(true)}>Play</button>
                        <button type="button" className="banner__button info">More Information</button>
                    </div>
                    <p className="banner__description">
                        {truncate(movie.overview, 100)}
                    </p>
                </div>
                <div className="banner__fadeBottom">
                </div>
            </div>
        )
    } else {
        return (
            <Container>
                <HomeContainer>
                    <Iframe
                        width="640"
                        height="360"
                        src={`https://www.youtube.com/embed/${movie.videos.results[0].key}?controls=0&autoplay=1&loop=1&mute=1&playlist=${movie.videos.results[0].key}`}
                        title="YouTube video player"
                        frameborder="0"
                        allow="autoplay; fullscreen"
                        alllowfullscreen
                    >
                    </Iframe>
                </HomeContainer>
            </Container>
        )
    }
}

export default Banner;

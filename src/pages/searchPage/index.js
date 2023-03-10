import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import useDebounce from "../../hooks/useDebounce";
import "./SearchPage.css";

const SearchPage = () => {

    const navigate = useNavigate();
    const [searchResults, setSearchResults] = useState([]);

    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    }

    let query = useQuery();
    const searchTerm = query.get('q');
    const debounceSearchTerm = useDebounce(searchTerm, 500);

    const fetchSearchMovie = async (searchTerm) => {
        try {
            const request = await axios.get(`/search/multi?include_adult=false&query=${searchTerm}`);
            setSearchResults(request.data.results);
        } catch (error) {
            console.log("error", error);
        }
    }

    const renderSearchResults = () => {
        return searchResults.length > 0 ? (
            <section className="search-container">
                {
                    searchResults
                        .filter(movie => movie.backdrop_path !== null && movie.media_type !== "person")
                        .map(movie => (
                                <div className="movie" key={movie.id}>
                                    <div className="movie__column-poster" onClick={() => navigate(`/${movie.id}`)}>
                                        <img
                                            src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                                            alt="movie"
                                            className="movie__poster"
                                        />
                                    </div>
                                </div>
                            )
                        )
                }
            </section>
        ) : (
            <section className="no-results">
                <div className="no-results__text">
                    <p>찾고자하는 검색어"{debounceSearchTerm}"에 맞는 영화가 없습니다.</p>
                </div>
            </section>
        )
    }

    useEffect(() => {
        if(debounceSearchTerm) {
            fetchSearchMovie(debounceSearchTerm);
        }
    }, [debounceSearchTerm]);

    return renderSearchResults();
}

export default SearchPage;

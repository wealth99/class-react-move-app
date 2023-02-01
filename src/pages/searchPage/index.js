import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "../../api/axios";

const SearchPage = () => {

    const [searchResults, setSearchResults] = useState([]);

    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    }

    let query = useQuery();
    const searchTerm = query.get('q');

    const fetchSearchMovie = async (searchTerm) => {
        try {
            const request = await axios.get(
                `/search/multi?include_adult=false&query=${searchTerm}`
            );
            setSearchResults(request.data.results);
        } catch (error) {
            console.log("error", error);
        }
    }

    useEffect(() => {
        if(searchTerm) {
            fetchSearchMovie(searchTerm);
        }
    }, [searchTerm]);

    return (
        <div>
        
        </div>
    )
}

export default SearchPage;

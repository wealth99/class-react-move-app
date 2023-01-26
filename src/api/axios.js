import axios from 'axios';

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    params: {
        api_key: "bfca4380461c3bfee31c9edb1996cdb0",
        language: "ko-KR"
    }
});

export default instance;
import axios from 'axios';

const BASE_URL = 'https://api.giphy.com/v1/gifs/search';
const API_KEY = process.env.REACT_APP_GIPHY_API_KEY;

export const giphyAPI = {
    async fetchGif(movieName) {
        const url = `${BASE_URL}?q=${movieName}+movie&api_key=${API_KEY}&limit=1`;
        try {
            const response = await axios.get(url);
            const data = response.data;
            return data.data[0].images.original.url;
        } catch (error) {
            console.error('Error fetching gif:', error.message);
            return null;
        }
    }
};

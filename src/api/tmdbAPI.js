import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const tmdbAPI = {
    // Fetch 10 currently popular films
    async getPopularMovies() {
        try {
            const response = await axios.get(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
            const movies = response.data.results.slice(0, 10).map(movie => ({
                id: movie.id,
                title: movie.title,
                releaseYear: movie.release_date ? movie.release_date.split('-')[0] : 'N/A',
                description: movie.overview,
                poster_path: `${IMAGE_BASE_URL}${movie.poster_path}`
            }));
            return movies;
        } catch (error) {
            console.error('Error fetching popular movies:', error.message);
            return [];
        }
    },

    // Search for films by title
    async searchMovies(query) {
        try {
            const response = await axios.get(`${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1`);
            const movies = response.data.results.slice(0, 10).map(movie => ({
                id: movie.id,
                title: movie.title,
                releaseYear: movie.release_date ? movie.release_date.split('-')[0] : 'N/A',
                description: movie.overview,
                poster_path: `${IMAGE_BASE_URL}${movie.poster_path}`
            }));
            return movies;
        } catch (error) {
            console.error('Error searching for movies:', error);
            return [];
        }
    },

    // Fetch a single movie by its ID
    async getMovieById(movieId) {
        try {
            const response = await axios.get(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`);
            const movie = response.data;

            return {
                id: movie.id,
                title: movie.title,
                releaseYear: movie.release_date ? movie.release_date.split('-')[0] : 'N/A',
                description: movie.overview,
                poster_path: `${IMAGE_BASE_URL}${movie.poster_path}`
            };
        } catch (error) {
            console.error(`Error fetching movie with ID ${movieId}:`, error);
            return null;
        }
    }

};

export default tmdbAPI;

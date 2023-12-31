import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import tmdbAPI from '../api/tmdbAPI';
import db from '../database/LocalStorageDB';
import Budget from './Budget';
import FilmsList from './FilmsList';
import Search from './Search';
import Rented from './Rented';

import Modal from './Modal/Modal';
function Catalog({setCurrentUser}) {
    let {userId } = useParams();

    const [movies, setMovies] = useState([]);
    const [rentedMovies, setRentedMovies] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isUserPresent, setIsUserPresent] = useState(Boolean(userId));
    const [budget, setBudget] = useState(0);

    const [showModal, setShowModal] = useState(false);
    const [rentedMovieName, setRentedMovieName] = useState('');

    useEffect(() => {
        if (userId) {
                    setCurrentUser(userId);
                    setBudget(db.getUserBudget(userId));
        }
        async function fetchRentedMovies() {
            let rented = [];
            let availableMovies = [];

            try {
                const rentedMoviesData = db.getUserRentedMovies(userId);
                rented = await Promise.all(rentedMoviesData.map(movie => {
                    if (movie && movie.id) {
                        return tmdbAPI.getMovieById(movie.id);
                    } else { return null; }
                })).then(data => data.filter(movie => movie !== null));

                const popularMovies = await tmdbAPI.getPopularMovies();
                availableMovies = popularMovies.filter(movie =>
                    !rented.some(rentedMovie => rentedMovie.id === movie.id)
                );
            } catch (error) {
                console.error('Error fetching rented or popular movies:', error);
            }

            setRentedMovies(rented);
            setMovies(availableMovies);
        }
        fetchRentedMovies();
    }, [userId]);


    const handleRentMovie = (movieId) => {
        console.log("renting movie" + movieId + " for user " + userId);
        db.rentMovie(userId, movieId);
        const movieToRent = movies.find(movie => movie.id === movieId);
        setMovies(movies => movies.filter(movie => movie.id !== movieId));
        setRentedMovies(rentedMovies => [...rentedMovies, movieToRent]);
        setBudget(prevBudget => prevBudget - 10);

        setRentedMovieName(movieToRent.title);
        setShowModal(true);
    }

    const closeModal = () => {
        setShowModal(false);
    }

    const handleDeleteMovie = (movieId) => {
        console.log("deleting movie" + movieId + " for user " + userId)
        db.deleteMovie(userId, movieId);
        setMovies(movies => [...movies, rentedMovies.find(movie => movie.id === movieId)]);
        setRentedMovies(rentedMovies.filter(movie => movie.id !== movieId));
        setBudget(prevBudget => prevBudget + 10);
    }

    const handleSearchSubmit = async (event) => {
        if (event.key === 'Enter') {
            try {
                const searchResults = await tmdbAPI.searchMovies(searchQuery);
                const availableSearchResults = searchResults.filter(movie =>
                    !rentedMovies.some(rentedMovie => rentedMovie.id === movie.id)
                );
                setMovies(availableSearchResults);
            } catch (error) {
                console.error('Error executing search:', error);
            }
        }
    };

    return (
        <div>
            {showModal && <Modal message={`Rented ${rentedMovieName} Sucessfully!`} onClose={closeModal} movieName={rentedMovieName} />}
            <div className="search-bar">
            <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} handleSearchSubmit={handleSearchSubmit} />
            <Budget budget={budget} />
            </div>
            <Rented rentedMovies={rentedMovies} handleDeleteMovie={handleDeleteMovie} />
            <FilmsList movies={movies} handleRentMovie={handleRentMovie} isUserPresent={isUserPresent} rentedMovies={rentedMovies} />
        </div>
    );
}
export default Catalog;

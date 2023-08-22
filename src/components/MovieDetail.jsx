import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import tmdbAPI from '../api/tmdbAPI';

function MovieDetail() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        async function fetchMovieDetail() {
            const movieData = await tmdbAPI.getMovieById(id);
            setMovie(movieData);
        }

        fetchMovieDetail();
    }, [id]);
    const handleBack = () => {
        if (location.state && location.state.fromCatalog) {
            navigate(-1);
        } else {
            navigate('/');
        }
    }

    if (!movie) return <div>Loading...</div>;

    return (
        <div className={"movieDetail"}>
            <img src={movie.poster_path} alt={movie.title} style={{width: '300px'}} />
            <h2>{movie.title} ({movie.releaseYear})</h2>
            <p>{movie.description}</p>
            <button onClick={handleBack}>Back</button>
        </div>
    );
}

export default MovieDetail;

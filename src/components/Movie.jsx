import {Link} from "react-router-dom";
function Movie({ movie, handleRent, handleUnrent, isRented}) {
    return (
        <div className={'movie'}>
            <Link to={`/movies/${movie.id}`} state={{ fromCatalog: true }}>
                <div className="movie-content">
                    <img src={movie.poster_path} alt={movie.title} />
                    <h3>{movie.title}</h3>
                </div>
            </Link>
            {isRented ? (
                <button onClick={() => handleUnrent(movie.id)}>Give it back</button>
            ) : (
                handleRent && <button onClick={handleRent}>Rent it</button>
            )}
        </div>
    );
}
export default Movie;

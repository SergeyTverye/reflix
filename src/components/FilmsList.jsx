import Movie from "./Movie";
function FilmsList({ movies, handleRentMovie, isUserPresent, rentedMovies }) {
    return (
        <>
            <h2>Catalog</h2>
            <div className="catalog">
                {movies.map(movie => (
                    <Movie
                        key={movie.id}
                        movie={movie}
                        handleRent={isUserPresent ? () => handleRentMovie(movie.id) : null}
                        isRented={rentedMovies.some(rentedMovie => rentedMovie.id === movie.id)}
                    />
                ))}
            </div>
        </>
    );
}

export default FilmsList;

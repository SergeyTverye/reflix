import Movie from "./Movie";
function Rented({ rentedMovies, handleDeleteMovie }) {
    return rentedMovies.length > 0 && (
        <>
            <h2>Rented</h2>
            <div className="rented-section">
                {rentedMovies.map(movie => (
                    <Movie
                        key={movie.id}
                        movie={movie}
                        handleUnrent={() => handleDeleteMovie(movie.id)}
                        isRented={true}
                    />
                ))}
            </div>
        </>
    );
}

export default Rented;
function Search({ searchQuery, setSearchQuery, handleSearchSubmit }) {
    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearchSubmit}
                className={'search-input'}
            />
        </div>
    );
}

export default Search;
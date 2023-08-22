import React, {useEffect} from 'react';
import {Link, useLocation} from 'react-router-dom';
function Header({currentUser, setCurrentUser}) {
    const location = useLocation();
    // Set current user to null when the user navigates to the landing page
    useEffect(() => {
        if (location.pathname === "/") {
            setCurrentUser(null);
        }
    }, [location, setCurrentUser]);

    return (
        <header className="header-container">
            <div className="header-links">
                <Link to="/">Home</Link>
                {!currentUser && (<Link to="/catalog">Catalog</Link>)}
                {currentUser && ( <Link to={`/catalog/${currentUser}`}>Catalog</Link>)}
            </div>
            <Link to="/" className="header-logo">REFLIX</Link>
        </header>
    );
}

export default Header;
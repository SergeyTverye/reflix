import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { useState} from "react";
import './App.css';
import Landing from './components/Landing';
import Catalog from './components/Catalog';
import MovieDetail from './components/MovieDetail';
import Header from "./components/Header";
function App() {
    const [currentUser, setCurrentUser] = useState(null)
    function NotFound() {
        return <div className={"notFound"}>404: Page Not Found</div>;
    }
    function CatalogWrapper(props) {
        return <Catalog setCurrentUser={setCurrentUser} {...props} />;
    }
    return (
        <div className={'content'}>
            <BrowserRouter>
                <Header currentUser={currentUser} setCurrentUser={setCurrentUser} />
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/catalog" element={<Catalog />} />
                    <Route path="/catalog/:userId" element={<CatalogWrapper />} />
                    <Route path="/movies/:id" element={<MovieDetail />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}
export default App;

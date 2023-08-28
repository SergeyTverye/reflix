import React, {useEffect, useRef, useState} from 'react';
import './Modal.css';
import {giphyAPI} from "../../api/giphyAPI";

const Modal = ({ message, onClose, movieName }) => {
    const [gifUrl, setGifUrl] = useState(null);
    const modalRef = useRef();

    useEffect(() => {
        const fetchRelatedGif = async () => {
            const url = await giphyAPI.fetchGif(movieName);
            setGifUrl(url);
        };
        fetchRelatedGif();
    }, [movieName]);

    const handleOutsideClick = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            onClose();
        }
    };

    return (
        <div className="modal" onClick={handleOutsideClick}>
            <div className="modal-content" ref={modalRef}>
                <p>{message}</p>
                {gifUrl && <img src={gifUrl} alt={`${movieName} gif`} />}
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default Modal;
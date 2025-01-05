import React, { useState } from 'react';
import axios from 'axios';

const BookmarkButton = ({ houseId }) => {
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [error, setError] = useState(null);
    const handleBookmark = async () => {
    const token = localStorage.getItem('token');

        if (!token) {
            setError('You must be logged in to bookmark a house.');
            return;
        }
        try {
            const response = await fetch('http://localhost:8000/api/bookmark', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    house_id: houseId, 
                }),
            });

            const data = await response.json();

            if (response.status === 201) {
                setIsBookmarked(true);
            } else if (response.status === 409) {
                setError('This house is already bookmarked.');
            } else {
                setError(data.message || 'An error occurred while bookmarking the house.');
            }
        } catch (error) {
            setError('An error occurred while bookmarking the house.');
        }
    };

    return (
        <div>
            <button 
                onClick={handleBookmark}
                disabled={isBookmarked}
                className={`bookmark-btn ${isBookmarked ? 'bookmarked' : ''}`}
            >
                {isBookmarked ? 'Bookmarked' : 'Bookmark'}
            </button>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default BookmarkButton;

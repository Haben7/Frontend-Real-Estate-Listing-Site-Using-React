import React, { useState } from 'react';
import axios from 'axios';

const BookmarkButton = ({ houseId }) => {
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [error, setError] = useState(null);

    const handleBookmark = async () => {
        // Get the user's authentication token (assumed it's stored in localStorage)
        const token = localStorage.getItem('token');

        if (!token) {
            setError('You must be logged in to bookmark a house.');
            return;
        }

        // Make a POST request to the backend to add the house to the user's bookmarks
        try {
            const response = await fetch('http://localhost:8000/api/bookmark', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Include the JWT token for authentication
                },
                body: JSON.stringify({
                    house_id: houseId, // Send the house ID to be bookmarked
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

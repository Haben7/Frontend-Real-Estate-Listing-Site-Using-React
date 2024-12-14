const API_URL = 'http://localhost:8000/api/bookmarks';

// Fetch bookmarks
export const fetchBookmarks = async () => {
  const token = localStorage.getItem('token'); // Get the token from local storage
  const response = await fetch(API_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, // Include the token for authorization
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch bookmarks');
  }

  return await response.json();
};

// Add a bookmark
export const addBookmark = async (houseId) => {
  const token = localStorage.getItem('token'); // Get the token from local storage
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`, // Include the token for authorization
    },
    body: JSON.stringify({ house_id: houseId }),
  });

  if (!response.ok) {
    throw new Error('Failed to add bookmark');
  }

  return await response.json();
};

// Remove a bookmark
export const removeBookmark = async (houseId) => {
  const token = localStorage.getItem('token'); // Get the token from local storage
  const response = await fetch(`${API_URL}/${houseId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`, // Include the token for authorization
    },
  });

  if (!response.ok) {
    throw new Error('Failed to remove bookmark');
  }

  return await response.json();
};

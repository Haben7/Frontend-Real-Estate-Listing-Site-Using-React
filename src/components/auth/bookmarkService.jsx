const API_URL = 'http://localhost:8000/api/bookmarks';

export const fetchBookmarks = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch(API_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, 
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch bookmarks');
  }

  return await response.json();
};

// Add a bookmark
export const addBookmark = async (houseId) => {
  const token = localStorage.getItem('token');
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`, 
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
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/${houseId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`, 
    },
  });

  if (!response.ok) {
    throw new Error('Failed to remove bookmark');
  }

  return await response.json();
};

// src/redux/housesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk for fetching houses
export const fetchHouses = createAsyncThunk('houses/fetchHouses', async () => {
    const response = await axios.get('/api/houses');
    return response.data;
});

// Thunk for fetching bookmarks
export const fetchBookmarks = createAsyncThunk('houses/fetchBookmarks', async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get('/api/bookmarks', {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
});

// Thunk for adding a bookmark
export const addBookmark = createAsyncThunk('houses/addBookmark', async (houseId) => {
    const token = localStorage.getItem('token');
    await axios.post('/api/bookmarks', { house_id: houseId }, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return houseId;
});

const housesSlice = createSlice({
    name: 'houses',
    initialState: {
        houses: [],
        bookmarks: [],
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchHouses.fulfilled, (state, action) => {
                state.houses = action.payload;
                state.status = 'succeeded';
            })
            .addCase(fetchBookmarks.fulfilled, (state, action) => {
                state.bookmarks = action.payload;
            })
            .addCase(addBookmark.fulfilled, (state, action) => {
                const house = state.houses.find(h => h.id === action.payload);
                if (house) {
                    state.bookmarks.push(house);
                }
            });
    }
});

export default housesSlice.reducer;

// types
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import authActions from './authActions';
import axios from 'axios';
const API = process.env.REACT_APP_API_URL;

// initial state
const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
    ? { user, isLoggedIn: true, isLoading: false, isSuccess: false, error: false }
    : { user: null, isLoggedIn: false, isLoading: false, isSuccess: false, error: false };

// ==============================|| ACTIONS ||============================== //

export const login = createAsyncThunk('login', async (payload, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const response = await axios.post(`${API}/api/login`, payload);
        console.log(payload);
        if (response.data.token) {
            localStorage.setItem('user', JSON.stringify(response.data));
            localStorage.setItem('token', response.data.token);
        }
        return response.data;
    } catch (error) {
        console.log(error);
        return rejectWithValue(error);
    }
});

export const logout = createAsyncThunk('logout', async () => {
    await authActions.logout();
});

// ==============================|| SLICE - MENU ||============================== //

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = '';
        }
    },
    extraReducers: {
        [login.pending]: (state) => {
            state.isLoading = true;
            state.isSuccess = false;
            state.error = false;
        },
        [login.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.user = action.payload;
            state.isSuccess = true;
            state.isLoggedIn = true;
        },
        [login.rejected]: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.error = true;
        },

        [logout.fulfilled]: (state) => {
            state.user = null;
            state.isLoggedIn = false;
        }
    }
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;

// export const { login } = menu.actions;

// types
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import authActions from './authActions';

// initial state
const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
    ? { user, isLoggedIn: true, isLoading: false, isSuccess: false, message: '' }
    : { user: null, isLoggedIn: false, isLoading: false, isSuccess: false, message: '' };

// ==============================|| ACTIONS ||============================== //

export const login = createAsyncThunk('login', async (payload, { rejectWithValue }) => {
    try {
        return await authActions.login(payload);
    } catch (error) {
        console.log(error);
        rejectWithValue(error.response);
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
            state.message = 'failed';
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

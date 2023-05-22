import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = { records: [], loading: false, error: null, record: null };
const API = process.env.REACT_APP_API_URL;
const token = localStorage.getItem('userToken');

export const fetchSpecialites = createAsyncThunk('fetchSpecialites', async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const res = await axios.get(`${API}/api/specialites`, {
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
        });
        return res.data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const fetchSpecialite = createAsyncThunk('fetchSpecialite', async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const res = await fetch(`${API}api/specialites/${id}`);
        const data = await res.json();
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const deleteSpecialite = createAsyncThunk('deleteSpecialite', async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        await fetch(`${API}/api/specialites/${id}`, {
            method: 'DELETE'
        });
        return id;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const insertSpecialite = createAsyncThunk('insertSpecialite', async (item, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    // const { auth } = getState();
    // item.userId = auth.id;

    try {
        const res = await axios.post(
            `${API}/api/specialites`,
            {
                nom: item.nom
            },
            {
                body: JSON.stringify(item),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    Authorization: `Bearer ${token}`
                }
            }
        );
        const data = await res.config.data;
        return data;
    } catch (error) {
        console.log(error);
        return rejectWithValue(error.message);
    }
});

export const editSpecialite = createAsyncThunk('editSpecialite', async (item, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const res = await fetch(`${API}/api/specialites/${item.id}`, {
            method: 'PATCH',
            body: JSON.stringify(item),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                Authorization: `Bearer ${token}`
            }
        });
        const data = await res.json();
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

const specialiteSlice = createSlice({
    name: 'specialites',
    initialState,
    reducers: {
        cleanRecord: (state) => {
            state.record = null;
        }
    },

    extraReducers: {
        //get one user post
        [fetchSpecialite.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [fetchSpecialite.fulfilled]: (state, action) => {
            state.loading = false;
            state.record = action.payload;
        },
        [fetchSpecialite.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        //fetch users
        [fetchSpecialites.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [fetchSpecialites.fulfilled]: (state, action) => {
            state.loading = false;
            state.records = action.payload;
        },
        [fetchSpecialites.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        //create user
        [insertSpecialite.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [insertSpecialite.fulfilled]: (state, action) => {
            state.loading = false;
            state.records.push(action.payload);
        },
        [insertSpecialite.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        //delete user
        [deleteSpecialite.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [deleteSpecialite.fulfilled]: (state, action) => {
            state.loading = false;
            state.records = state.records.filter((el) => el.id !== action.payload);
        },
        [deleteSpecialite.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        //edit user
        [editSpecialite.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [editSpecialite.fulfilled]: (state, action) => {
            state.loading = false;
            state.record = action.payload;
        },
        [editSpecialite.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export default specialiteSlice.reducer;

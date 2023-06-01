import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = { records: [], loading: false, error: null, record: null };
const API = process.env.REACT_APP_API_URL;
const token = localStorage.getItem('userToken');

export const fetchUrgences = createAsyncThunk('fetchUrgences', async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const res = await axios.get(`${API}/api/urgences`, {
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
        });
        return res.data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const fetchUrgence = createAsyncThunk('fetchUrgence', async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const res = await fetch(`${API}api/urgences/${id}`);
        const data = await res.json();
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const deleteUrgence = createAsyncThunk('deleteUrgence', async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        await fetch(`${API}/api/urgences/${id}`, {
            method: 'DELETE'
        });
        return id;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const insertUrgence = createAsyncThunk('insertUrgence', async (item, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    // const { auth } = getState();
    // item.userId = auth.id;

    try {
        const res = await axios.post(
            `${API}/api/urgences`,
            {
                libelle: item.libelle,
                description: item.description,
                image: item.image
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

export const editUrgence = createAsyncThunk('editUrgence', async (item, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const res = await fetch(`${API}/api/urgences/${item.id}`, {
            method: 'PUT',
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

const urgenceSlice = createSlice({
    name: 'urgences',
    initialState,
    reducers: {
        cleanRecord: (state) => {
            state.record = null;
        }
    },

    extraReducers: {
        //get one user post
        [fetchUrgence.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [fetchUrgence.fulfilled]: (state, action) => {
            state.loading = false;
            state.record = action.payload;
        },
        [fetchUrgence.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        //fetch users
        [fetchUrgences.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [fetchUrgences.fulfilled]: (state, action) => {
            state.loading = false;
            state.records = action.payload;
        },
        [fetchUrgences.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        //create user
        [insertUrgence.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [insertUrgence.fulfilled]: (state, action) => {
            state.loading = false;
            state.records.push(action.payload);
        },
        [insertUrgence.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        //delete user
        [deleteUrgence.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [deleteUrgence.fulfilled]: (state, action) => {
            state.loading = false;
            state.records = state.records.filter((el) => el.id !== action.payload);
        },
        [deleteUrgence.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        //edit user
        [editUrgence.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [editUrgence.fulfilled]: (state, action) => {
            state.loading = false;
            state.record = action.payload;
        },
        [editUrgence.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export default urgenceSlice.reducer;

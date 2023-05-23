import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = { records: [], loading: false, error: null, record: null };
const API = process.env.REACT_APP_API_URL;
const token = localStorage.getItem('userToken');

export const fetchSousTypes = createAsyncThunk('fetchSousTypes', async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const res = await axios.get(`${API}/api/soustypes/fk/${id}`, {
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
        });
        return res.data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const fetchSousType = createAsyncThunk('fetchSousType', async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const res = await fetch(`${API}api/soustypes/${id}`);
        const data = await res.json();
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const deleteSousType = createAsyncThunk('deleteSousType', async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        await fetch(`${API}/api/soustypes/${id}`, {
            method: 'DELETE'
        });
        return id;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const insertSousType = createAsyncThunk('insertSousType', async (item, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    // const { auth } = getState();
    // item.userId = auth.id;

    try {
        const res = await axios.post(
            `${API}/api/soustypes`,
            {
                libelle: item.libelle,
                description: item.description,
                image: item.image,
                urgence_id: item.urgence_id
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

export const editSousType = createAsyncThunk('editSousType', async (item, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const res = await fetch(`${API}/api/soustypes/${item.id}`, {
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

const soustypeSlice = createSlice({
    name: 'soustypes',
    initialState,
    reducers: {
        cleanRecord: (state) => {
            state.record = null;
        }
    },

    extraReducers: {
        //get one user post
        [fetchSousType.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [fetchSousType.fulfilled]: (state, action) => {
            state.loading = false;
            state.record = action.payload;
        },
        [fetchSousType.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        //fetch users
        [fetchSousTypes.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [fetchSousTypes.fulfilled]: (state, action) => {
            state.loading = false;
            state.records = action.payload;
        },
        [fetchSousTypes.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        //create user
        [insertSousType.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [insertSousType.fulfilled]: (state, action) => {
            state.loading = false;
            state.records.push(action.payload);
        },
        [insertSousType.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        //delete user
        [deleteSousType.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [deleteSousType.fulfilled]: (state, action) => {
            state.loading = false;
            state.records = state.records.filter((el) => el.id !== action.payload);
        },
        [deleteSousType.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        //edit user
        [editSousType.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [editSousType.fulfilled]: (state, action) => {
            state.loading = false;
            state.record = action.payload;
        },
        [editSousType.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export default soustypeSlice.reducer;

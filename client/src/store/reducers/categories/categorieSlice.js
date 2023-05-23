import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = { records: [], loading: false, error: null, record: null };
const API = process.env.REACT_APP_API_URL;
const token = localStorage.getItem('userToken');

export const fetchCategories = createAsyncThunk('fetchCategories', async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const res = await axios.get(`${API}/api/categories/fk/${id}`, {
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
        });
        return res.data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const fetchCategorie = createAsyncThunk('fetchCategorie', async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const res = await fetch(`${API}api/categories/${id}`);
        const data = await res.json();
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const deleteCategorie = createAsyncThunk('deleteCategorie', async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        await fetch(`${API}/api/categories/${id}`, {
            method: 'DELETE'
        });
        return id;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const insertCategorie = createAsyncThunk('insertCategorie', async (item, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    // const { auth } = getState();
    // item.userId = auth.id;

    try {
        const res = await axios.post(
            `${API}/api/categories`,
            {
                libelle: item.libelle,
                description: item.description,
                image: item.image,
                sous_type_id: item.sous_type_id
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

export const editCategorie = createAsyncThunk('editCategorie', async (item, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const res = await fetch(`${API}/api/categories/${item.id}`, {
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

const categorieSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        cleanRecord: (state) => {
            state.record = null;
        }
    },

    extraReducers: {
        //get one user post
        [fetchCategorie.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [fetchCategorie.fulfilled]: (state, action) => {
            state.loading = false;
            state.record = action.payload;
        },
        [fetchCategorie.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        //fetch users
        [fetchCategories.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [fetchCategories.fulfilled]: (state, action) => {
            state.loading = false;
            state.records = action.payload;
        },
        [fetchCategories.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        //create user
        [insertCategorie.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [insertCategorie.fulfilled]: (state, action) => {
            state.loading = false;
            state.records.push(action.payload);
        },
        [insertCategorie.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        //delete user
        [deleteCategorie.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [deleteCategorie.fulfilled]: (state, action) => {
            state.loading = false;
            state.records = state.records.filter((el) => el.id !== action.payload);
        },
        [deleteCategorie.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        //edit user
        [editCategorie.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [editCategorie.fulfilled]: (state, action) => {
            state.loading = false;
            state.record = action.payload;
        },
        [editCategorie.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export default categorieSlice.reducer;

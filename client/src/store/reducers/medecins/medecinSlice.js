import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = { records: [], loading: false, error: null, record: null };
const API = process.env.REACT_APP_API_URL;
const token = localStorage.getItem('userToken');

export const fetchMedecins = createAsyncThunk('fetchMedecins', async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const res = await axios.get(`${API}/api/medecins`, {
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
        });
        return res.data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const fetchMedecin = createAsyncThunk('fetchMedecin', async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const res = await fetch(`${API}api/medecins/${id}`);
        const data = await res.json();
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const deleteMedecin = createAsyncThunk('deleteMedecin', async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        await fetch(`${API}/api/medecins/${id}`, {
            method: 'DELETE'
        });
        return id;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const insertMedecin = createAsyncThunk('insertMedecin', async (item, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    // const { auth } = getState();
    // item.userId = auth.id;

    try {
        const res = await axios.post(
            `${API}/api/medecins`,
            {
                nom: item.nom,
                prenom: item.prenom,
                email: item.email,
                cin: item.cin,
                telephone: item.telephone,
                naissance: item.naissance,
                civilité: item.civilité,
                specialite_id: item.specialite_id,
                adresse: item.adresse,
                password: item.password,
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

export const editMedecin = createAsyncThunk('editMedecin', async (item, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const res = await fetch(`${API}/api/medecins/${item.id}`, {
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

const medecinSlice = createSlice({
    name: 'medecins',
    initialState,
    reducers: {
        cleanRecord: (state) => {
            state.record = null;
        }
    },

    extraReducers: {
        //get one user post
        [fetchMedecin.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [fetchMedecin.fulfilled]: (state, action) => {
            state.loading = false;
            state.record = action.payload;
        },
        [fetchMedecin.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        //fetch users
        [fetchMedecins.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [fetchMedecins.fulfilled]: (state, action) => {
            state.loading = false;
            state.records = action.payload;
        },
        [fetchMedecins.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        //create user
        [insertMedecin.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [insertMedecin.fulfilled]: (state, action) => {
            state.loading = false;
            state.records.push(action.payload);
        },
        [insertMedecin.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        //delete user
        [deleteMedecin.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [deleteMedecin.fulfilled]: (state, action) => {
            state.loading = false;
            state.records = state.records.filter((el) => el.id !== action.payload);
        },
        [deleteMedecin.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        //edit user
        [editMedecin.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [editMedecin.fulfilled]: (state, action) => {
            state.loading = false;
            state.record = action.payload;
        },
        [editMedecin.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export default medecinSlice.reducer;

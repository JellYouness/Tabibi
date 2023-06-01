import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = { records: [], loading: false, error: null, record: {} };
const API = process.env.REACT_APP_API_URL;
const token = localStorage.getItem('userToken');

export const fetchPatients = createAsyncThunk('fetchPatients', async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const res = await axios.get(`${API}/api/patients`, {
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
        });
        return res.data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const fetchPatient = createAsyncThunk('fetchPatient', async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const res = await fetch(`${API}/api/patients/${id}`);
        const data = await res.json();
        return data.data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const deletePatient = createAsyncThunk('deletePatient', async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        await fetch(`${API}/api/patients/${id}`, {
            method: 'DELETE'
        });
        return id;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const insertPatient = createAsyncThunk('insertPatient', async (item, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    // const { auth } = getState();
    // item.userId = auth.id;

    try {
        const res = await axios.post(
            `${API}/api/patients`,
            {
                nom: item.nom,
                prenom: item.prenom,
                email: item.email,
                cin: item.cin,
                telephone: item.telephone,
                naissance: item.naissance,
                civilité: item.civilité,
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

export const editPatient = createAsyncThunk('editPatient', async (item, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const res = await fetch(`${API}/api/patients/${item.id}`, {
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

const patientSlice = createSlice({
    name: 'patients',
    initialState,
    reducers: {
        cleanRecord: (state) => {
            state.record = null;
        }
    },

    extraReducers: {
        //get one user post
        [fetchPatient.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [fetchPatient.fulfilled]: (state, action) => {
            state.loading = false;
            state.record = action.payload;
        },
        [fetchPatient.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        //fetch users
        [fetchPatients.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [fetchPatients.fulfilled]: (state, action) => {
            state.loading = false;
            state.records = action.payload;
        },
        [fetchPatients.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        //create user
        [insertPatient.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [insertPatient.fulfilled]: (state, action) => {
            state.loading = false;
            state.records.push(action.payload);
        },
        [insertPatient.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        //delete user
        [deletePatient.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [deletePatient.fulfilled]: (state, action) => {
            state.loading = false;
            state.records = state.records.filter((el) => el.id !== action.payload);
        },
        [deletePatient.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        //edit user
        [editPatient.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [editPatient.fulfilled]: (state, action) => {
            state.loading = false;
            state.record = action.payload;
        },
        [editPatient.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export default patientSlice.reducer;

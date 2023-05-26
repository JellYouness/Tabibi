import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = { records: [], loading: false, error: null, record: null, edited: false };
const API = process.env.REACT_APP_API_URL;
const token = localStorage.getItem('TraitementToken');

export const fetchTraitements = createAsyncThunk('fetchTraitements', async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const res = await axios.get(`${API}/api/traitements`, {
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
        });
        return res.data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const fetchTraitement = createAsyncThunk('fetchTraitement', async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const res = await fetch(`${API}/api/traitements/${id}`);
        const data = await res.json();
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const fetchTraitementsMedecin = createAsyncThunk('fetchTraitementMedecin', async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const res = await fetch(`${API}/api/traitements/medecins/${id}`);
        const data = await res.json();
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const fetchTraitementsPatient = createAsyncThunk('fetchTraitement', async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const res = await fetch(`${API}/api/traitements/patients/${id}`);
        const data = await res.json();
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const fetchTraitementsConsulte = createAsyncThunk('fetchTraitementsConsulte', async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const res = await fetch(`${API}/api/traitementsConsulte`);
        const data = await res.json();
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const fetchTraitementsNonConsulte = createAsyncThunk('fetchTraitementsNonConsulte', async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const res = await fetch(`${API}/api/traitementsNonConsulte`);
        const data = await res.json();
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const deleteTraitement = createAsyncThunk('deleteTraitement', async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        await fetch(`${API}/api/traitements/${id}`, {
            method: 'DELETE'
        });
        return id;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const insertTraitement = createAsyncThunk('insertTraitement', async (item, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    // const { auth } = getState();
    // item.TraitementId = auth.id;

    try {
        const res = await axios.post(
            `${API}/api/traitements`,
            {},
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

export const editTraitement = createAsyncThunk('editTraitement', async (item, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const res = await fetch(`${API}/api/traitements/${item.id}`, {
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

const traitementSlice = createSlice({
    name: 'traitements',
    initialState,
    reducers: {
        cleanRecord: (state) => {
            state.record = null;
        }
    },

    extraReducers: {
        //get one Traitement post
        [fetchTraitement.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [fetchTraitement.fulfilled]: (state, action) => {
            state.loading = false;
            state.record = action.payload;
        },
        [fetchTraitement.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        //fetch Traitements
        [fetchTraitements.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [fetchTraitements.fulfilled]: (state, action) => {
            state.loading = false;
            state.records = action.payload;
        },
        [fetchTraitements.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        //fetch Traitements Medecin
        [fetchTraitementsMedecin.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [fetchTraitementsMedecin.fulfilled]: (state, action) => {
            state.loading = false;
            state.records = action.payload;
        },
        [fetchTraitementsMedecin.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        //fetch Traitements Patient
        [fetchTraitementsPatient.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [fetchTraitementsPatient.fulfilled]: (state, action) => {
            state.loading = false;
            state.records = action.payload;
        },
        [fetchTraitementsPatient.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        //fetch Traitements Consulte
        [fetchTraitementsConsulte.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [fetchTraitementsConsulte.fulfilled]: (state, action) => {
            state.loading = false;
            state.records = action.payload;
        },
        [fetchTraitementsConsulte.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        //fetch Traitements Non Consulte
        [fetchTraitementsNonConsulte.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [fetchTraitementsNonConsulte.fulfilled]: (state, action) => {
            state.loading = false;
            state.records = action.payload;
        },
        [fetchTraitementsNonConsulte.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        //create Traitement
        [insertTraitement.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [insertTraitement.fulfilled]: (state, action) => {
            state.loading = false;
            state.records.push(action.payload);
        },
        [insertTraitement.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        //delete Traitement
        [deleteTraitement.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [deleteTraitement.fulfilled]: (state, action) => {
            state.loading = false;
            state.records = state.records.filter((el) => el.id !== action.payload);
        },
        [deleteTraitement.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        //edit Traitement
        [editTraitement.pending]: (state) => {
            state.loading = true;
            state.edited = false;
            state.error = null;
        },
        [editTraitement.fulfilled]: (state, action) => {
            state.loading = false;
            state.edited = true;
            state.record = action.payload;
        },
        [editTraitement.rejected]: (state, action) => {
            state.loading = false;
            state.edited = false;
            state.error = action.payload;
        }
    }
});

export default traitementSlice.reducer;

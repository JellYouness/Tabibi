// third-party
import { combineReducers } from 'redux';

// project import
import menu from './menu';
import authSlice from './auth/authSlice';
import patientSlice from './patients/patientSlice';
import medecinSlice from './medecins/medecinSlice';
import specialiteSlice from './specialites/specialiteSlice';
import urgenceSlice from './urgences/urgenceSlice';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({
    menu: menu,
    auth: authSlice,
    patients: patientSlice,
    medecins: medecinSlice,
    specialites: specialiteSlice,
    urgences: urgenceSlice
});

export default reducers;

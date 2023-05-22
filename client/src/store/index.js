// third-party
import { configureStore } from '@reduxjs/toolkit/';

// project import
import reducers from './reducers';

// ==============================|| REDUX TOOLKIT - MAIN STORE ||============================== //

const store = configureStore({
    reducer: reducers
});

const { dispatch } = store;
// setupListeners(store.dispatch);
export { store, dispatch };

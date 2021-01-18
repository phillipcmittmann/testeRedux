import { combineReducers } from 'redux';

import { listaReducer } from './listaReducer';

export const Reducers = combineReducers({
    listaReducer: listaReducer
});
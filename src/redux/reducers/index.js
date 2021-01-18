import { combineReducers } from 'redux';

import { listaReducer } from './listaReducer';
import { produtoReducer } from './produtoReducer';

export const Reducers = combineReducers({
    listaReducer: listaReducer,
    produtoReducer: produtoReducer
});
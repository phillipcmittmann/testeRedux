import { combineReducers } from 'redux';

import { listaReducer } from './listaReducer';
import { produtoReducer } from './produtoReducer';
import { carrinhoReducer } from './carrinhoReducer';

export const Reducers = combineReducers({
    listaReducer: listaReducer,
    produtoReducer: produtoReducer,
    carrinhoReducer: carrinhoReducer
});
import { LISTA_UPDATE } from '../actions/actionTypes';

const initialState = { listaProdutos: [] };

export const listaReducer = (state = initialState, action) => {
    switch (action.type) {
        case LISTA_UPDATE:
            return {
                ...state,
                listaProdutos: [...action.listaProdutos]
            }

        default:
            return state;
    }
}
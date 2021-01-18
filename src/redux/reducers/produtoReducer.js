import { PRODUTO_UPDATE } from '../actions/actionTypes';

const initialState = { 
    produto: {
        id: '',
        ean: '',
        name: '',
        images: [],
        price: {
            originalPrice: null,
            dealPrice: null,
            percentage: null
        }
    }
};

export const produtoReducer = (state = initialState, action) => {
    switch (action.type) {
        case PRODUTO_UPDATE:
            return {
                ...state,
                produto: { ...action.produto }
            }

        default: 
            return state;
    }
}
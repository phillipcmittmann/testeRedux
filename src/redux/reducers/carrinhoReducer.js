import { CARRINHO_PRODUTO_ADD, CARRINHO_PRODUTO_SUB } from '../actions/actionTypes';

import update from 'immutability-helper';

const initialState = { carrinho: [] };

export const carrinhoReducer = (state = initialState, action) => {

    switch (action.type) {
        case CARRINHO_PRODUTO_ADD:
            if (state.carrinho.some(c => c.produto.id === action.produto.id)) {
                const indexToUpdate = state.carrinho.map((c) => c.produto.id).indexOf(action.produto.id);
            
                const newCarrinho = update(state.carrinho, {
                    [indexToUpdate]: {
                        quantidade: {
                            $set: state.carrinho[indexToUpdate].quantidade + 1 
                        },
                        totalProdutos: {
                            $set: state.carrinho[indexToUpdate].totalProdutos + (action.produto.price.dealPrice ?? action.produto.price.originalPrice)
                        }
                    }
                });

                return {
                    ...state,
                    carrinho: [...newCarrinho]
                }
            } else {
                const newCarrinho = update(state.carrinho, {
                    $push: [
                        {
                            quantidade: 1,
                            totalProdutos: action.produto.price.dealPrice ?? action.produto.price.originalPrice,
                            produto: action.produto
                        }
                    ]
                });

                return {
                    ...state,
                    carrinho: [...newCarrinho]
                }
            }

        
        case CARRINHO_PRODUTO_SUB:
            if (state.carrinho.some(c => c.produto.id === action.produto.id)) {
                const indexToUpdate = state.carrinho.map((c) => c.produto.id).indexOf(action.produto.id);

                let newCarrinho = update(state.carrinho, {
                    [indexToUpdate]: {
                        quantidade: {
                            $set: state.carrinho[indexToUpdate].quantidade - 1 
                        },
                        totalProdutos: {
                            $set: state.carrinho[indexToUpdate].totalProdutos - (action.produto.price.dealPrice ?? action.produto.price.originalPrice)
                        }
                    },
                    
                });

                if (newCarrinho[indexToUpdate].quantidade === 0) {
                    newCarrinho = update(newCarrinho, {
                        $splice: [[indexToUpdate, 1]]
                    });
                }

                return {
                    ...state,
                    carrinho: [...newCarrinho]
                }
            }

            default:
                return state;
    }
}
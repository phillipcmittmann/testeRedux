import React, { useEffect } from 'react';
import {
    View,
    StyleSheet,
    Alert,
    FlatList,
    StatusBar
} from 'react-native';

import { useSelector, useDispatch } from 'react-redux';

import { LISTA_UPDATE } from '../redux/actions/actionTypes';

import axios from 'axios';

import ItemListaProdutos from '../components/ItemListaProdutos';

const ListagemProdutosScreen = () => {
    const dispatch = useDispatch();
    const produtos = useSelector(state => state.listaReducer.listaProdutos);

    useEffect(() => {
        axios.get('http://107.170.96.111:9000/api/items')
            .then(function (response) {
                dispatch({ type: LISTA_UPDATE, listaProdutos: response.data.payload })
            })
            .catch(function (error) {
                Alert.alert(
                    'Erro.',
                    'Não foi possivel carregar os produtos. Feche o app e tente novamente.',
                    [
                        {
                            text: 'OK'
                        }
                    ]
                );
            })
    }, [dispatch, produtos]);

    return (
        <View style={ styles.container }>
            <StatusBar backgroundColor='white' barStyle='dark-content' />

            <FlatList
                data={ produtos }
                keyExtractor={ (item, index ) => index.toString() }
                renderItem={ ({ item, index }) => {
                    return (
                        <ItemListaProdutos
                            item={ item }
                        />
                    )
                }}
                style={ styles.list }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white'
    }
});

export default ListagemProdutosScreen;
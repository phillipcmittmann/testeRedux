import React, { useEffect } from 'react';
import {
    View,
    StyleSheet,
    Alert,
    FlatList
} from 'react-native';

import { connect, useDispatch } from 'react-redux';

import { LISTA_UPDATE } from '../redux/actions/actionTypes';

import axios from 'axios';

import ItemListaProdutos from '../components/ItemListaProdutos';

const ListagemProdutosScreen = (props) => {
    const dispatch = useDispatch();

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
    }, [dispatch]);

    const { produtos } = props;

    return (
        <View style={ styles.container }>
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

const mapStateToProps = store => ({
    produtos: store.listaReducer.listaProdutos
});

export default connect(mapStateToProps)(ListagemProdutosScreen);
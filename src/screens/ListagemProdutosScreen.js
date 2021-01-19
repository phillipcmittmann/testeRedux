import React, { useEffect, useMemo, useState } from 'react';
import {
    View,
    StyleSheet,
    Alert,
    FlatList,
    StatusBar,
    TextInput,
    useWindowDimensions
} from 'react-native';

import { useSelector, useDispatch } from 'react-redux';

import { LISTA_UPDATE } from '../redux/actions/actionTypes';

import axios from 'axios';

import ItemListaProdutos from '../components/ItemListaProdutos';

const ListagemProdutosScreen = () => {
    const dispatch = useDispatch();
    const produtos = useSelector(state => state.listaReducer.listaProdutos);
    const [input, setInput] = useState('');

    const produtosFiltrados = useMemo(() => {
        return produtos.filter(p => (String(p.ean).toLowerCase().includes(input) || String(p.name).includes(input) || String(p.id).includes(input)))
    }, [produtos, input]);

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

            <TextInput
                value={ input }
                onChangeText={ (text) => setInput(text) }
                style={[ 
                    styles.textInput, 
                    { 
                        width: useWindowDimensions().width * 0.7, 
                        fontSize: useWindowDimensions().fontScale * 14 
                    } 
                ]}
            />

            <FlatList
                data={ produtosFiltrados }
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
    },
    textInput: {
        borderColor: 'black',
        borderRadius: 3,
        borderWidth: 1,
        marginVertical: 20
    }
});

export default ListagemProdutosScreen;
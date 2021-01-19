import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    useWindowDimensions,
    Alert,
    Image,
    TextInput,
    ScrollView
} from 'react-native';

import { connect, useDispatch } from 'react-redux';
import { PRODUTO_UPDATE } from '../redux/actions/actionTypes';
import { CARRINHO_PRODUTO_ADD, CARRINHO_PRODUTO_SUB } from '../redux/actions/actionTypes';

import axios from 'axios';

import Carousel from 'react-native-snap-carousel';

import { useRoute, useNavigation } from '@react-navigation/native';

const ProdutoScreen = (props) => {
    const { produto, carrinho } = props;

    const dispatch = useDispatch();

    const route = useRoute();
    const navigation = useNavigation(); 

    const fontScale = useWindowDimensions().fontScale;
    const width = useWindowDimensions().width;

    useEffect(() => {
        axios.get(`http://107.170.96.111:9000/api/items/${route.params.id}`)
            .then(function (response) {
                dispatch({ type: PRODUTO_UPDATE, produto: response.data })
            })
            .catch(function (error) {
                Alert.alert(
                    'Erro.',
                    'Não foi possivel carregar as informaçôes do produto.',
                    [
                        {
                            text: 'OK',
                            onPress: () => navigation.goBack()
                        }
                    ]
                );
            });

    }, [dispatch, route, navigation, useWindowDimensions, useState]);

    return (
        <ScrollView style={ styles.container } bounces={ false }>
            <View style={{ alignItems: 'center' }}>
                {
                    (produto.price.percentage || produto.price.dealPrice)
                    ? (
                        <View style={ styles.containerPercentage }>
                            <Text style={[ styles.textPercentage, { fontSize: fontScale * 12, width: width * 0.09 } ]}>
                                -{ produto.price.percentage }%
                            </Text>
                        </View>
                    )
                    : (
                        <View />
                    )
                }

                <Carousel
                    data={ produto.images }
                    sliderHeight={ 200 }
                    sliderWidth={ 200 }
                    itemWidth={ 200 }
                    renderItem={ ({ item }) => (
                        <Image
                            source={{ uri: item }}
                            style={ styles.image }
                            resizeMode='contain'
                        />
                    ) }
                />

                <View style={{ marginBottom: 15 }} />

                <Text style={{ fontSize: fontScale * 22 }}>
                    { produto.name }
                </Text>

                <TextInput
                    multiline={ true }
                    value={ produto.description }
                    editable={ false }
                    style={[ styles.textDescription, { fontSize: fontScale * 16 } ]}
                />
            </View>

            <Text style={[ styles.textPrice, { marginTop: 15, marginBottom: 5, fontSize: fontScale * 22 } ]}>
                Preço
            </Text>

            {
                (produto.price.percentage || produto.price.dealPrice)
                ? (
                    <View style={ styles.textDeal }>
                        <Text style={[ styles.textPrice, { fontSize: fontScale * 16 } ]}>
                            De R${ produto.price.originalPrice }
                        </Text>

                        <Text style={[ styles.textPrice, { fontSize: fontScale * 16 } ]}>
                            Por R${ produto.price.dealPrice }
                        </Text>
                    </View>
                )
                : (
                    <Text style={[ styles.textPrice, { fontSize: fontScale * 16 } ]}>
                        Por R${ produto.price.originalPrice }
                    </Text>
                )
            }

            <Text style={[ styles.textTotal, { fontSize: fontScale * 22 } ]}>
                Total R${ 
                    carrinho.some(c => c.produto.id === produto.id)
                    ? carrinho[carrinho.map((c) => c.produto.id).indexOf(produto.id)].totalProdutos
                    : 0
                }
            </Text>

            <View style={ styles.containerQuantity }>
                <TouchableOpacity 
                    style={ styles.containerButton }
                    onPress={ () => dispatch({ type: CARRINHO_PRODUTO_SUB, produto: produto })}
                >
                    <Text style={[ styles.textQuantity, { fontSize: fontScale * 30 } ]}>
                        -
                    </Text>
                </TouchableOpacity>

                <Text style={[ styles.textQuantity, { fontSize: fontScale * 24 } ]}>
                    {
                        carrinho.some(c => c.produto.id === produto.id)
                        ? carrinho[carrinho.map((c) => c.produto.id).indexOf(produto.id)].quantidade
                        : 0
                    }
                </Text>

                <TouchableOpacity 
                    style={ styles.containerButton }
                    onPress={ () => dispatch({ type: CARRINHO_PRODUTO_ADD, produto: produto })}
                >
                    <Text style={[ styles.textQuantity, { fontSize: fontScale * 30 } ]}>
                        +
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    containerPercentage: { 
        position: 'absolute', 
        left: 0, 
        top: 20, 
        marginLeft: 20,
        backgroundColor: '#FF6C37',
        borderRadius: 5
    },
    textPercentage: {
        color: 'white',
        marginHorizontal: 15,
        textAlign: 'center'
    },
    image: {
        width: 200,
        height: 200,
    },
    textDescription: {
        borderWidth: 3,
        borderColor: '#C0C0C0',
        color: 'black',
        marginHorizontal: 15
    },
    textPrice: {
        alignSelf: 'flex-start',
        marginHorizontal: 30
    },
    textDeal: { 
        flexDirection: 'row', 
        justifyContent: 'space-between' 
    },
    textTotal: {
        alignSelf: 'center',
        marginTop: 30,
        marginBottom: 20
    },
    containerQuantity: {
        flexDirection: 'row', 
        justifyContent: 'space-between',
        marginHorizontal: 30,
        alignItems: 'center'
    },
    textQuantity: {
        fontFamily: 'bold'
    },
    containerButton: { 
        width: 50, 
        height: 50, 
        alignItems: 'center' 
    }
});

const mapStateToProps = store => ({
    produto: store.produtoReducer.produto,
    carrinho: store.carrinhoReducer.carrinho
});

export default connect(mapStateToProps)(ProdutoScreen);
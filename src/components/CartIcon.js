import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    useWindowDimensions
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import { connect } from 'react-redux';

const CartIcon = (props) => {
    const { carrinho } = props;

    const fontScale = useWindowDimensions().fontScale;

    return (
        <View>
            <Icon name='cart-outline' size={ 45 } color='black' style={{ marginRight: 15 }} />
            
            <View  style={ styles.viewCircle }>
                <Text style={[ styles.text, { fontSize: fontScale * 10 } ]}>
                    { carrinho.length }
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    viewCircle: {
        backgroundColor: 'black',
        width: 20,
        height: 20,
        borderRadius: 15,
        position: 'absolute',
        right: 15,
        marginTop: 3,
        alignItems: 'center'
    },
    text: {
        color: 'white'
    }
});

const mapStateToProps = store => ({
    carrinho: store.carrinhoReducer.carrinho
});

export default connect(mapStateToProps)(CartIcon);
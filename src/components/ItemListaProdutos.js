import React from 'react';
import { 
    StyleSheet,
    Text,
    TouchableOpacity,
    useWindowDimensions,
    Image,
    View
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import NumberFormat from 'react-number-format';

const ItemListaProdutos = (props) => {
    const { item } = props;

    const navigation = useNavigation();

    const fontScale = useWindowDimensions().fontScale;
    const width = useWindowDimensions().width;

    return (
        <TouchableOpacity
            style={[ styles.container, { width: useWindowDimensions().width * 0.9 } ]}
            onPress={ () => navigation.navigate('Produto', { id: item.id }) }
        >
            <Image
                source={{ uri: item.images[0] }}
                style={[ 
                    styles.image, 
                    { 
                        marginLeft: (item.price.percentage || item.price.dealPrice)
                        ? 60
                        : 40
                    } 
                ]}
                resizeMode='contain'
            />

            {
                (item.price.percentage || item.price.dealPrice)
                ? (
                    <View style={ styles.containerPercentage }>
                        <Text style={[ styles.textPercentage, { fontSize: fontScale * 9, width: width * 0.06 } ]}>
                            -{ item.price.percentage }%
                        </Text>
                    </View>
                )
                : (
                    <View />
                )
            }

            <View style={ styles.textContainer }>
                <Text style={{ fontSize: useWindowDimensions().fontScale * 18, marginVertical: 10 }}>
                    { item.name }
                </Text>

                {
                    (item.price.percentage || item.price.dealPrice)
                    ? (
                        <View style={ styles.textDeal }>
                            <NumberFormat
                                value={ item.price.originalPrice }
                                displayType={ 'text' }
                                prefix={ 'R$ ' }
                                decimalSeparator={ ',' }
                                decimalScale={ 2 }
                                fixedDecimalScale={ true }
                                renderText={ value => (
                                    <Text style={[ styles.text, { fontSize: fontScale * 14 } ]}>
                                        De { value }
                                    </Text>
                                ) }
                            />
    
                            <NumberFormat
                                value={ item.price.dealPrice }
                                displayType={ 'text' }
                                prefix={ 'R$ ' }
                                decimalSeparator={ ',' }
                                decimalScale={ 2 }
                                fixedDecimalScale={ true }
                                renderText={ value => (
                                    <Text style={[ styles.text, { fontSize: fontScale * 14 } ]}>
                                        Por { value }
                                    </Text>
                                ) }
                            />
                        </View>
                    )
                    : (
                        <NumberFormat
                            value={ item.price.originalPrice }
                            displayType={ 'text' }
                            prefix={ 'R$ ' }
                            decimalSeparator={ ',' }
                            decimalScale={ 2 }
                            fixedDecimalScale={ true }
                            renderText={ value => (
                                <Text style={[ styles.text, { fontSize: fontScale * 14 } ]}>
                                    Por { value }
                                </Text>
                            ) }
                        />
                    )
                }
            </View>
        </TouchableOpacity>
    )
};


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderColor: 'black',
        borderWidth: 1,
        marginVertical: 10,
        borderRadius: 5
    },
    image: {
        width: 80,
        height: 80,
        margin: 15
    },
    textContainer: { 
        justifyContent: 'center', 
        marginLeft: 20
    },
    containerPercentage: { 
        position: 'absolute', 
        top: 30, 
        marginLeft: 20,
        backgroundColor: '#FF6C37',
        borderRadius: 3
    },
    textPercentage: {
        color: 'white',
        marginHorizontal: 15,
        textAlign: 'center'
    }
});

export default ItemListaProdutos;
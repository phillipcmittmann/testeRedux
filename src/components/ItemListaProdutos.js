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
                style={ styles.image }
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
                <Text style={[ styles.text, { fontSize: useWindowDimensions().fontScale * 18 } ]}>
                    { item.name }
                </Text>

                <Text style={[ styles.text, { fontSize: useWindowDimensions().fontScale * 16 } ]}>
                    { item.price.dealPrice !== undefined 
                        ? `De R$${ item.price.originalPrice }  Por R$${ item.price.dealPrice }`
                        : `Por R$${ item.price.originalPrice }`
                    }
                </Text>
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
        width: 100,
        height: 100,
        margin: 15,
        marginLeft: 40
    },
    textContainer: { 
        justifyContent: 'center', 
        marginLeft: 20
    },
    text: {
        marginVertical: 10
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
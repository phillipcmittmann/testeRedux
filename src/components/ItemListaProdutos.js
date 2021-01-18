import React from 'react';
import { 
    StyleSheet,
    Text,
    TouchableOpacity,
    useWindowDimensions,
    Image,
    View
} from 'react-native'

const ItemListaProdutos = (props) => {
    const { item } = props;

    return (
        <TouchableOpacity
            style={[ styles.container, { width: useWindowDimensions().width * 0.9 } ]}
        >
            <Image
                source={{ uri: item.images[0] }}
                style={ styles.image }
                resizeMode='contain'
            />

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
        borderRadius: 10
    },
    image: {
        width: 100,
        height: 100,
        margin: 15
    },
    textContainer: { 
        justifyContent: 'center', 
        marginLeft: 20
    },
    text: {
        marginVertical: 10
    }
});

export default ItemListaProdutos;
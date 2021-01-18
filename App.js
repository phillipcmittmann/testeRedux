import React from 'react';

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Provider } from 'react-redux';
import { Store } from './src/redux/store/index';

import ListagemProdutosScreen from './src/screens/ListagemProdutosScreen';
import ProdutoScreen from './src/screens/ProdutoScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={ Store }>
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen 
                    name={ 'ListagemProdutos' } 
                    component={ ListagemProdutosScreen } 
                    options={{ headerShown: false }}    
                />
                
                <Stack.Screen
                    name={ 'Produto' }
                    component={ ProdutoScreen }
                    options={{
                        headerTitle: ''
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    </Provider>
  )
}

export default App;
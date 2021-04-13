import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ColorDetail from './screens/ColorDetail';
import ColorPalette from './screens/ColorPalette';

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="ColorPalette" component={ColorPalette} />
                <Stack.Screen name="ColorDetail" component={ColorDetail} />
            </Stack.Navigator>
        </NavigationContainer>
    )
};



export default App;

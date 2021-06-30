import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import SizeSelection from './screens/SizeSelection';
import DoughSelection from './screens/DoughSelection';
import CheeseSelection from './screens/CheeseSelection';
import ToppingSelection from './screens/ToppingSelection';
import Confirmation from './screens/Confirmation'
import OrdersScreen from './screens/OrdersScreens'
import Done from './screens/PizzaDone';
import Menu from './screens/MainMenu';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Menu"
          component={Menu}
        />
        <Stack.Screen
          name="Orders"
          component={OrdersScreen}
          options={{title: 'Ordenes Hechas'}}
        />
        <Stack.Screen
          name="Size"
          component={SizeSelection}
          options={{ title: 'Tamaño' }} />
        <Stack.Screen
          name="Dough"
          component={DoughSelection}
          options={{ title: 'Masa' }} />
        <Stack.Screen
          name="Cheese"
          component={CheeseSelection}
          options={{ title: 'Queso' }} />
        <Stack.Screen
          name="Toppings"
          component={ToppingSelection}
          options={{ title: 'Ingredientes' }} />
        <Stack.Screen
          name="Confirmation"
          component={Confirmation}
          options={{ title: 'Confirmación' }} />
        <Stack.Screen name="Done" component={Done}
          options={{ title: 'Hecho' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
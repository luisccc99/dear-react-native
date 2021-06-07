import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import QuoteModal from './screens/QuoteModal';
import Quotes from './screens/Quotes';

const QuotesStack = createStackNavigator();
const RootStack = createStackNavigator();


const QuotesStackScreen = () => {
  return (
    <QuotesStack.Navigator>
      <QuotesStack.Screen
        name="Quotes"
        component={Quotes}
      />
    </QuotesStack.Navigator>
  );
};


const App = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator mode="modal">

        <RootStack.Screen
          name="QuotesScreen"
          component={QuotesStackScreen}
          options={{ headerShown: false }}
        />

        <RootStack.Screen
          name="QuoteModal"
          component={QuoteModal} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default App;
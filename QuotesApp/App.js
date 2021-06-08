import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import QuoteModal from './screens/QuoteModal';
import QuotesScreen from './screens/QuotesScreen';
import { StyleSheet } from 'react-native';
import QuoteDetail from './screens/QuoteDetail';
import QuoteEdit from './screens/QuoteEdit';

const QuotesStack = createStackNavigator();
const RootStack = createStackNavigator();


const QuotesStackScreen = () => {
  return (
    <QuotesStack.Navigator>
      <QuotesStack.Screen
        name="Quotes"
        options={{
          title: "Frases",
          headerStyle: style.toolbar,
          headerTintColor: '#f0efeb',
        }}
        component={QuotesScreen}
      />
      <QuotesStack.Screen
        name="QuoteDetail"
        options={({ route }) => ({
          title: `Frase de ${route.params.author}`,
          headerStyle: style.toolbar,
          headerTintColor: '#f0efeb',
        })}
        component={QuoteDetail}
      />
      <QuotesStack.Screen
        name="QuoteEdit"
        options={{
          headerStyle: style.toolbar,
          headerTintColor: '#f0efeb',
        }}
        component={QuoteEdit}
      />
    </QuotesStack.Navigator>
  );
};


const App = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator mode="modal">

        <RootStack.Screen
          name="QuotesScreens"
          component={QuotesStackScreen}
          options={{ headerShown: false }}
        />

        <RootStack.Screen
          name="QuoteModal"
          options={({ route }) => (
            {
              title: route.params.name,
              headerStyle: style.toolbar,
              headerTintColor: '#f0efeb',
            })}
          component={QuoteModal} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

const style = StyleSheet.create({
  toolbar: {
    backgroundColor: "#1f363d"
  }
});

export default App;
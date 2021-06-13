import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import PicOfTheDayScreen from './screens/PicOfTheDayScreen';
import CuriosityScreen from './screens/CuriosityScreen';
import SpiritScreen from './screens/SpiritScreen';
import OpportunityScreen from './screens/OpportunityScreen';

const Tab = createMaterialTopTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="APOD"
        tabBarOptions={{
          labelStyle: { fontSize: 14, textTransform: 'capitalize', fontWeight: 'bold' },
          activeTintColor: '#f2e9e4',
          inactiveTintColor: '#9a8c98',
          scrollEnabled: true,
          tabStyle: { width: 105 },
          indicatorStyle: {
            borderBottomColor: '#f2e9e4',
            borderBottomWidth: 2
          },
          style: { backgroundColor: '#293241' },
        }}>
        <Tab.Screen
          name="APOD"
          component={PicOfTheDayScreen} />
        <Tab.Screen
          name="Curiosity"
          component={CuriosityScreen} />
        <Tab.Screen
          name="Spirit"
          component={SpiritScreen} />
        <Tab.Screen
          name="Opportunity"
          component={OpportunityScreen} />
      </Tab.Navigator>
    </NavigationContainer >
  );
};

export default App;
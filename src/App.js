import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import InsightsScreen from './screens/InsightsScreen';
import SchedulePostScreen from './screens/SchedulePostScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Schedule Post" component={SchedulePostScreen} />
        <Stack.Screen name="Insights" component={InsightsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

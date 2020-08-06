import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import Main from './pages/main';

const Stack = createStackNavigator();

function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
         name="JSHunt" 
         component={Main}
         options={{
           headerTitleAlign: 'center',
           headerTintColor: '#FFF',

           headerStyle: {
             backgroundColor: '#DA552F'
           }
         }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
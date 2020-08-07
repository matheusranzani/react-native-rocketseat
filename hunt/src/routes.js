import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Main from './pages/main';
import Product from './pages/product';

const Stack = createStackNavigator();

const Routes = () => {
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
         <Stack.Screen 
          name="Product"
          component={Product}
          options={({ route }) => ({
            title: route.params.product.title
          })}
         />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
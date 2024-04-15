import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import ListaSmartphones from '../pages/ListaSmartphones';
import PesquisaSmartphones from '../pages/PesquisaSmartphones';
import CadastroSmartphone from '../pages/CadastroSmartphone';

const Tab = createBottomTabNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'ListaSmartphones') {
              iconName = 'list';
            } else if (route.name === 'PesquisaSmartphones') {
              iconName = 'search';
            } else if (route.name === 'CadastroSmartphone') {
              iconName = 'plus';
            }

            return <FontAwesome5 name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'black',
          inactiveTintColor: 'black',
          style: {
            backgroundColor: '#d3d3d3',
          },
        }}>
        <Tab.Screen name="ListaSmartphones" component={ListaSmartphones} />
        <Tab.Screen name="PesquisaSmartphones" component={PesquisaSmartphones} />
        <Tab.Screen name="CadastroSmartphone" component={CadastroSmartphone} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import List from './src/components/List'
import Register from './src/components/Register'

const Tab = createBottomTabNavigator();

export default function App() {
  return(
    <NavigationContainer>
      <Tab.Navigator>
      <Tab.Screen name="Lista de Imóveis" component={List} />
      <Tab.Screen name="Cadastrar Imóveis" component={Register} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

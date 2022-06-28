import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../pages/Home';
import Splash from '../pages/Splash';
import Pemesanan from '../pages/Pemesanan';
import Akun from '../pages/Akun';
import {BottomNav} from '../components'
import Login from '../pages/Login'
import Register from '../pages/Register'


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AppUtama = () => {
  return (
    <Tab.Navigator tabBar={props => <BottomNav {...props} />}>
      <Tab.Screen name="Beranda" component={Home} options={{ headerShown: false }} />
      <Tab.Screen name="Pemesanan" component={Pemesanan} options={{ headerShown: false }}/>
      <Tab.Screen name="Akun" component={Akun} options={{ headerShown: false }} />
    </Tab.Navigator>
  )
}

const Router = () => {
  return (
    <Stack.Navigator initialRouteName='AppUtama'>
      <Stack.Screen name="AppUtama" component={AppUtama}options={{ headerShown: false }} />
      <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}

export default Router

const styles = StyleSheet.create({})
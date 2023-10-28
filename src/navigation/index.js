import React, {Component, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthNavigation from './authNavigation';
import AppNavigation from './appNavigation';
import {routes} from '../services';
import {Splash} from '../screens/authFlow';
import {navigationRef} from './rootNavigation';
import {useDispatch, useSelector} from 'react-redux';
import {setUser} from '../services/redux/slice/user';
import auth from '@react-native-firebase/auth';

const MainStack = createNativeStackNavigator();

export default function Navigation() {
  const [loading, setLoading] = useState(true);
  const {user} = useSelector(state => state.user);
  const dispatch = useDispatch();

  function onAuthStateChanged(u) {
    dispatch(setUser(u));
  }

  // useEffect(() => {
  //   const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
  //   return subscriber; // unsubscribe on unmount
  // }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2500);
  });

  if (loading) return <Splash />;
  if (!user)
    return (
      <NavigationContainer ref={navigationRef}>
        <MainStack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName={routes.auth}>
          <MainStack.Screen name={routes.auth} component={AuthNavigation} />
        </MainStack.Navigator>
      </NavigationContainer>
    );
  else
    return (
      <NavigationContainer ref={navigationRef}>
        <MainStack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName={routes.auth}>
          <MainStack.Screen name={routes.auth} component={AuthNavigation} />

          <MainStack.Screen name={routes.app} component={AppNavigation} />
        </MainStack.Navigator>
      </NavigationContainer>
    );
}

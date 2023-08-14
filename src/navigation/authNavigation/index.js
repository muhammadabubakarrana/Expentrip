import React, {Component} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {routes, headers} from '../../services';
import * as Auth from '../../screens/authFlow';

const AuthStack = createNativeStackNavigator();

const AuthNavigation = () => {
  return (
    <AuthStack.Navigator
      screenOptions={headers.screenOptions}
      //screenOptions={{headerStyle:{backgroundColor:'gray',borderBottomWidth:5}}}
      initialRouteName={routes.welcome}>
      <AuthStack.Screen
        name={routes.welcome}
        component={Auth.Welcome}
        options={{
          headerShown: false,
          title: 'Welcome',
        }}
      />
      <AuthStack.Screen
        name={routes.signin}
        component={Auth.Signin}
        options={{
          //headerShown: false,
          title: 'Sign In',
          //presentation: "modal"
        }}
      />
      <AuthStack.Screen
        name={routes.signup}
        component={Auth.Signup}
        options={{
          //headerShown: false,
          title: 'Sign Up',
        }}
      />
    </AuthStack.Navigator>
  );
};

export default AuthNavigation;

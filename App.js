import React, {Component} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Navigation from './src/navigation';
import {RootSiblingParent} from 'react-native-root-siblings';
import {
  AddExpense,
  AddTrips,
  Home,
  TripExpenses,
} from './src/screens/appFlow';
import {Signin, Signup, Welcome} from './src/screens/authFlow';
import {Provider} from 'react-redux';
import {store} from './src/services/redux/store';

export default function App() {
  return (
    <RootSiblingParent>
      <SafeAreaProvider style={{flex: 1}}>
        <Provider store={store}>
          <Navigation />
        </Provider>
      </SafeAreaProvider>
    </RootSiblingParent>
  );
}

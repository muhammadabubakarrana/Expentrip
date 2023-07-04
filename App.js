import React, {Component} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Navigation from './src/navigation';
import {RootSiblingParent} from 'react-native-root-siblings';

export default function App() {
  return (
    <RootSiblingParent>
      <SafeAreaProvider style={{flex: 1}}>
        <Navigation />
      </SafeAreaProvider>
    </RootSiblingParent>
  );
}

import React from 'react';
import {
  Text
} from 'react-native';
import { Provider } from 'react-redux';
import store from '@redux';
import RootNavigator from '@navigation/root';
import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

export default class App extends React.Component {
  render() {
    console.log('APP');
    return <Provider store={store}>
      <RootNavigator />
    </Provider>      
  }
}

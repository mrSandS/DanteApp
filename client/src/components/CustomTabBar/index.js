import React, { Component } from 'react';
import { Animated } from 'react-native';
import { TabBarBottom } from 'react-navigation';

export default class CustomTabBar extends Component {

  render() {
    const navState = this.props.navigation.state;
    const navRoute = navState.routes[navState.index];
    const navParams = navRoute.params;
    return (
      <Animated.View style={{ marginBottom: (navParams && navParams.tabBarMarginBottom) || 0 }}>
        <TabBarBottom 
          {...this.props} 
        />
      </Animated.View>        
    );
  }
}
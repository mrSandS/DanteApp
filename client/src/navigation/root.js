import React from 'react';
import { 
  Text, 
  View
} from 'react-native';
import { AppStyles } from '@styles';
import Icon from 'react-native-ionicons';
import {
  HomeScreen,
  MainTabNav,
  RegisterScreen,
  LoginScreen,
  SplashScreen,
  SettingsScreen
} from '@consts/navigation';
import {
  createStackNavigator
} from 'react-navigation';
import {
	NavBar
} from '@components';
import TabNav from './TabNavigator';
import Home from '@screens/Home';
import Register from '@screens/Auth/Register';
import Login from '@screens/Auth/Login';
import Splash from '@screens/Splash';
import Settings from '@screens/Settings';

const RouteConfigs = {
  [SplashScreen]: {
    screen: Splash
  },
  [RegisterScreen]: {
    screen: Register
  },
  [LoginScreen]: {
    screen: Login
  },
  [HomeScreen]: {
    screen: Home
  },
  [SettingsScreen]: {
    screen: Settings
  }
	// [MainTabNav]: {
	// 	screen: TabNav,
	// }
};
const StackNavigatorConfig = {
	// headerMode: 'screen',
	navigationOptions: ({navigation}) => {
		return {
		  headerMode: 'none',
      headerStyle: {
		    backgroundColor: 'black',
        paddingHorizontal: 15
		  },
			// header: <NavBar navigation={navigation} />,
      // headerRight: <Icon
       //  name='ios-settings-outline'
       //  color='pink'
       //  size={40}
      // />
			// header: null
		}
	}
};

export default createStackNavigator(RouteConfigs, StackNavigatorConfig);

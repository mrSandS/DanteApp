import React from 'react';
import {
  createBottomTabNavigator
} from 'react-navigation';
import { AppStyles } from '@styles';
import {
	HomeScreen,
	PlayerScreen,
	SearchScreen,
	LikesListScreen,
	UserInfoScreen
} from '@consts/navigation';
import {
	CustomTabBar
} from '@components';
import Icon from 'react-native-ionicons';
import Home from '@screens/Home';
import Player from '@screens/Player';
import Search from '@screens/Search';
import LikesList from '@screens/LikesList';
import UserInfo from '@screens/UserInfo';

const getNavigationOptions = ({
	additionalOptions = {},
	tabBarIconName,
	tabBarIconColor = '#fff',
	tabBarIconSize = 40,
	tabBarIconFocusedSize = 45
}) => {
	return {
		navigationOptions: {
		  tabBarIcon: ({ focused }) => {
		  	return <Icon 
		  		name={tabBarIconName}
		  		color={tabBarIconColor}
		  		size={focused ? tabBarIconFocusedSize : tabBarIconSize}
		  	/>
		  }
		}
	} 
};
const RouteConfigs = {
	[HomeScreen]: {
        screen: Home,
        ...getNavigationOptions({
            tabBarIconName: 'ios-home-outline'
        })
	},
  [PlayerScreen]: {
      screen: Player,
      ...getNavigationOptions({
          tabBarIconName: 'ios-bookmarks-outline'
      })
  },
  [SearchScreen]: {
      screen: Search,
      ...getNavigationOptions({
          tabBarIconName: 'ios-search-outline'
      })
  },
  [LikesListScreen]: {
      screen: LikesList,
      ...getNavigationOptions({
          tabBarIconName: 'ios-heart-outline'
      })
  },
  [UserInfoScreen]: {
      screen: UserInfo,
      ...getNavigationOptions({
          tabBarIconName: 'ios-contact-outline'
      })
  },
};
const TabNavigatorConfig = {
  // swipeEnabled: false,
  // tabBarComponent: CustomTabBar,
	// tabBarPosition: 'bottom',
	// initialRouteName: HomeScreen,
	// tabBarOptions: {
	// 	showLabel: false,
	// 	style: AppStyles.tabNav
	// }
};

export default createBottomTabNavigator(RouteConfigs, TabNavigatorConfig);

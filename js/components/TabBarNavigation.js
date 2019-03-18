import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import { Image } from 'react-native';
import TabOneNavigation from './home/HomeView';
import TabTwoNavigation from './smart/SmartView';
import TabThreeNavigation from './mine/MineView';

export default (TabBar = createBottomTabNavigator(
  {
    TabItem1: {
      screen: TabOneNavigation,
      navigationOptions: ({ navigation, screenProps }) => ({
        tabBarLabel: 'My home',
        tabBarIcon: ({ focused }) => (
          <Image
            source={
              focused
                ? require('../img/icon_tab_2_s.png')
                : require('../img/icon_tab_2.png')
            }
          />
        ),
      }),
    },
    TabItem2: {
      screen: TabTwoNavigation,
      navigationOptions: () => ({
        tabBarLabel: 'Automation',
        tabBarIcon: ({ focused }) => (
          <Image
            source={
              focused
                ? require('../img/icon_tab_1_s.png')
                : require('../img/icon_tab_1.png')
            }
          />
        ),
      }),
    },
    TabItem3: {
      screen: TabThreeNavigation,
      navigationOptions: () => ({
        tabBarLabel: 'Profile',
        tabBarIcon: ({ focused }) => (
          <Image
            source={
              focused
                ? require('../img/icon_tab_3_s.png')
                : require('../img/icon_tab_3.png')
            }
          />
        ),
      }),
    },
  },
  {
    //设置TabNavigator的位置
    tabBarPosition: 'bottom',
    //是否在更改标签时显示动画
    animationEnabled: false,
    //是否允许在标签之间进行滑动
    swipeEnabled: false,
    //按 back 键是否跳转到第一个Tab(首页)， none 为不跳转
    backBehavior: 'none',
    lazy: true,
    tabBarOptions: {
      //Android属性
      upperCaseLabel: false, //是否使标签大写，默认为true
      showIcon: true,
      showLabel: true,
      activeTintColor: '#F5c014',
      inactiveTintColor: '#9B9B9B',
      style: {
        backgroundColor: 'white',
        height: 50,
      },
      labelStyle: {
        fontSize: 10,
        marginBottom: 4,
      },
      iconStyle: {
        width: 26,
        height: 22,
      },
    },
  },
));
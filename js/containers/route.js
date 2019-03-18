import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import TabBarNavigation from '../components/TabBarNavigation';
import Register from '../components/common/Register';
import LoginContainer from './mine/LoginContainer';
import SetUpPwd from '../components/common/SetUpPwd';
import EntryContainer from '../containers/EntryContainer';
import React, { Component } from 'react';
import { Text, StatusBar, ActivityIndicator, View } from 'react-native';

const AuthStack = createStackNavigator(
    {
      Login: {
        screen: LoginContainer,
      },
      Register: {
        screen: Register,
      },
      SetUpPwd: {
        screen: SetUpPwd
      },
    },
    {
      navigationOptions: {
        headerStyle: {
          backgroundColor: '#fff', 
          shadowColor: 'transparent',
          elevation: 0,
          shadowOpacity: 0,
      },
        headerTintColor: '#000',
        headerTitleStyle: {
          fontWeight: 'normal',
          fontSize: 16,
          flex: 1,
          alignSelf:'center',
          textAlign: 'center'
        },
      },
    }
  );
  
  const AppStack = createStackNavigator(
    {
      TabBarNavigation: {
        screen: TabBarNavigation,
      },
    },
    {
      mode: 'modal',
      headerMode: 'none',
    },
  );


class Route extends Component {
  constructor() {
    super();
    // this._bootstrapAsync();
  }

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <Text>fgfdgs</Text>
        <StatusBar barStyle="default" />
      </View>
    );
  }
}


export default createSwitchNavigator(
  {
    EntryContainer: EntryContainer,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'EntryContainer',
  }
);
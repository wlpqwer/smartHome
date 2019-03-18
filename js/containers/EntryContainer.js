import React, { Component } from 'react';
import {  NetInfo, AsyncStorage, StatusBar, View } from 'react-native';
import { connect } from 'react-redux';
import * as Actions from '../actions/action';
import * as Selectors from '../selectors/selector';
// import TabBarNavigation from '../components/TabBarNavigation';
import StartPage from '../components/StartPage';

// import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import SplashScreen from 'react-native-splash-screen';
// import Register from '../components/common/Register';
// import LoginContainer from '../containers/mine/LoginContainer';
// import SetUpPwd from '../components/common/SetUpPwd';
// import { View, Text } from 'react-native-animatable';
// import Touch from 'react-native-touch-once';

// const NavigatorRegister = createStackNavigator(
//   {
//     Login: {
//       screen: LoginContainer,
//     },
//     Register: {
//       screen: Register,
//     },
//     SetUpPwd: {
//       screen: SetUpPwd
//     },
//   },
//   {

//     navigationOptions: {
//       headerStyle: {
//         backgroundColor: '#fff', 
//         shadowColor: 'transparent',
//         elevation: 0,
//         shadowOpacity: 0,
//     },
//       headerTintColor: '#000',
//       headerTitleStyle: {
//         fontWeight: 'normal',
//         fontSize: 16,
//         flex: 1,
//         alignSelf:'center',
//         textAlign: 'center'
//       },
//     },
//   }
// );

// const NavigatorGuidance = createStackNavigator(
//   {
//     Main:{
//       screen: NavigatorRegister,
//     },
//     TabBarNavigation: {
//       screen: TabBarNavigation,
//     },
//   },
//   {
//     mode: 'modal',
//     headerMode: 'none',
//   },
// );

class EntryContainer extends Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
    this.state = {
      userToken: null,
    };
  }


  componentWillMount() {
    NetInfo.isConnected.fetch().then(isConnected => {
      console.log('First, is ' + (isConnected ? 'online' : 'offline'));
    });

    handleFirstConnectivityChange = isConnected => {
      console.log('Then, is ' + (isConnected ? 'online' : 'offline'));
      let connectStatus = isConnected ? true : false;
      if (connectStatus == true) {
        this.props.getAppNetInfo(true);
        SplashScreen.hide();
      } else {
        this.props.getAppNetInfo(false);
        console.log(this.props.netInfoStatus);
        SplashScreen.hide();
      }
    };
    NetInfo.isConnected.addEventListener(
      'connectionChange',
      handleFirstConnectivityChange,
    );

    // 去掉安卓版本进不来
    if (this.props.netInfoStatus) {
      SplashScreen.hide();
    } else {
      SplashScreen.hide();
    }
  }


  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    console.log(userToken)
    console.log(await AsyncStorage.getAllKeys());
    this.setState({
      userToken: userToken === null ? undefined : userToken,
    });
    this.props.navigation.navigate(this.state.userToken != undefined && this.state.userToken != '' ? 'App' : 'Auth');
  };

  // _signInAsync = () => {
  //   this.props.navigation.navigate('App');
  // };

  // _signInAsync2 = () => {
  //   this.props.navigation.navigate('Auth');
  // };


  render() {
    // if (this.state.userToken === null) {
      return <StartPage />;
    // } else {
    //   // return (
    //   //   <View >
    //   //     <StatusBar barStyle="default" />
    //   //   </View>
    //   // );
    //   if (this.state.userToken != undefined && this.state.userToken != '') {
    //     // return <TabBarNavigation />;
    //     return (
    //       <Touch onPress={this._signInAsync}><Text style={{marginTop: 100}}>点击跳转tab</Text></Touch>
    //     )
    //   } else {
    //     return(
    //       <Touch onPress={this._signInAsync2}> <Text style={{marginTop: 100}}>点击跳转tab</Text></Touch>
    //     )
    //     // return <NavigatorGuidance />;
    //   }
    // }



        
  }
}

const mapStateToProps = state => {
  return {
    netInfoStatus: Selectors.getNetInfo(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAppNetInfo: bool => dispatch(Actions.netInfoStatus(bool)),
    getAppLanguage: bool => dispatch(Actions.languageType(bool)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EntryContainer);

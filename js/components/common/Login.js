// 注释部分为 react-navigation 身份验证的代码。
import React, { Component } from 'react';
import { Text, ScrollView, SafeAreaView, Image, StyleSheet, View, TextInput, Dimensions } from 'react-native';
import { Toast } from 'antd-mobile-rn';
import { commonStyles } from '../../tools/layout';
import Touch from 'react-native-touch-once';
// import { NavigationActions, StackActions } from 'react-navigation';
import DeviceInfo from 'react-native-device-info';
import { EventRegister } from 'react-native-event-listeners';
import KeyboardSpacer from 'react-native-keyboard-spacer';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.phoneNum = '';
    this.password = '';
    this.state = {
      changeColor: false
    }
  }



    componentWillMount() {
        console.log(this.props.container.navigation.state)
        this.loginListener = EventRegister.addEventListener('loginMeg', status => {
            console.log(status);
            if(status == '200'){
                setTimeout(() => {
                    Toast.hide();
                    // if (this.props.container.navigation.state.hasOwnProperty('params')) {
                    //     this.props.container.navigation.popToTop();
                    //     EventRegister.emit('changeBaseInfo');
                    // } else {
                    //     const resetAction = StackActions.reset({
                    //         index: 0,
                    //         key: null,
                    //         actions: [
                    //         NavigationActions.navigate({
                    //             routeName: 'TabBarNavigation',
                    //         }),
                    //         ],
                    //     });
                    //     this.props.container.navigation.dispatch(resetAction);
                        this.props.container.navigation.navigate('App');
                    // }
                }, 1000);
            } else if(status == '502'){
                Toast.info("The server is busy, please try again later",  2, undefined, false);
            } else {
                Toast.info("Please check if your mobile phone number or password is correct.",  2, undefined, false);
            }
        });
    }



    componentWillUnmount() {
        EventRegister.removeEventListener(this.loginListener);
    }

    phoneNumLogin = () => {
        this.props.container.getUserInfo({
            username: this.phoneNum,
                password: this.password,
                device_id: DeviceInfo.getUniqueID()
            });
        Toast.loading('Login verification', 0);
    }


  render() {
    //   console.log(this.props.container.navigation.state)
    return (
      <SafeAreaView style={commonStyles.containWrap}>
        <ScrollView keyboardShouldPersistTaps={'handled'}>
            <View style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height}}>
                <View style={styles.innerBox}>
                    <Text style={styles.loginTit}>Login</Text>
                    <Image
                        style={styles.loginLineImg}
                        source={require('../../img/pic_yy.png')}
                    />
                    <View style={[commonStyles.padLR20, {marginTop: 25}]}>
                        <View style={[styles.inputBox, commonStyles.flexBox]}>
                            <TextInput
                                style={styles.writeCon}
                                numberOfLines={1}
                                placeholderTextColor={'#9B9B9B'}
                                selectionColor="#FFBB00"
                                placeholder="Phone number"
                                underlineColorAndroid="transparent"
                                keyboardType={'numeric'}
                                onChangeText={phoneNum => {
                                    this.phoneNum = phoneNum;
                                    if(this.phoneNum.length > 0 && this.password.length > 0) {
                                        this.setState({changeColor: true});                                
                                    } else {
                                        this.setState({changeColor: false});   
                                    }
                                }}
                            />
                        </View>
                        <View style={[styles.inputBox, commonStyles.flexBox]}>
                            <TextInput
                                style={styles.writeCon}
                                numberOfLines={1}
                                placeholderTextColor={'#9B9B9B'}
                                selectionColor="#FFBB00"
                                placeholder="Password"
                                secureTextEntry={true}
                                underlineColorAndroid="transparent"
                                onChangeText={password => {
                                    this.password = password;
                                    if(this.phoneNum.length > 0 && this.password.length > 0) {
                                        this.setState({changeColor: true});                                
                                    } else {
                                        this.setState({changeColor: false});   
                                    }
                                }}
                                // keyboardType={'email-address'}
                            />
                            <Touch style={[commonStyles.flexBox, {height:'100%'}]} onPress={() => this.props.container.navigation.navigate('SetUpPwd')}>
                                <Text style={styles.forgetpwd}>Forget?</Text>
                            </Touch>
                        </View>
                        <Touch style={[styles.loginBtn,commonStyles.flexBox, {backgroundColor: this.state.changeColor ? '#FFBB00' : 'rgba(252,191,0,.4)'}]}
                            onPress = {() => this.state.changeColor && this.phoneNumLogin()}
                        >
                            <Text style={styles.loginText}>Login</Text>
                        </Touch>
                        <View style={commonStyles.flexBox}>
                            <Text style={styles.noAccount}>Don't have an account? </Text>
                            <Touch style={[commonStyles.flexBox, {height: 40}]} onPress={() => this.props.container.navigation.navigate('Register')}>
                                <Text style={styles.zhuce}>Sign up now</Text>
                            </Touch>
                        </View>
                    </View>
                </View>
                {/* <View style={[styles.otherWay, commonStyles.flexBoxColumn]}>
                    <Text style={styles.oherWayTit}>其他登录方式</Text>
                    <View style={commonStyles.flexBox}>
                        <Touch style={{marginRight: 30}}>
                            <Image
                                style={styles.otherLogo}
                                source={require('../../img/pic_facebook.png')}
                            />
                        </Touch>
                        <Touch style={{marginLeft: 30}}>
                            <Image
                                style={styles.otherLogo}
                                source={require('../../img/pic_twitter.png')}
                            />
                        </Touch>
                    </View>
                </View> */}
            </View>
        </ScrollView>
       </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
    innerBox:{

    },
    loginTit:{
        marginTop: 50,
        marginBottom: 56,
        paddingHorizontal: 20,
        fontSize: 34,
        color: '#2C2D30'
    },
    inputBox:{
        height: 50,
        borderBottomWidth: 1,
        borderBottomColor: '#F2F2F2',
        paddingHorizontal:5
    },
    writeCon:{
        fontSize: 15,
        flex: 1,
        height: '100%'
    },
    forgetpwd: {
        fontSize: 15,
        color: '#2C2D30'
    },
    loginBtn:{
        marginTop: 42,
        height: 42,
        marginBottom: 22,
        borderRadius: 2,
    },
    loginText:{
        fontSize: 17,
        color: '#fff'
    },
    loginLineImg:{
        width: '100%',
        height: 12
    },
    noAccount:{
        color:'#CCCCCC',
        fontSize: 15,
        marginRight: 5
    },
    zhuce:{
        fontSize: 15,
        color: '#FFBB00'
    },
    otherWay:{
        position: 'absolute',
        width: '100%',
        bottom: 64,
    },
    oherWayTit:{
        fontSize: 14,
        color: '#ccc',
        marginBottom: 24   
    },
    otherLogo:{
        width: 100,
        height: 24
    }
});

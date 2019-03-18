import React, { Component } from 'react';
import { Text, ScrollView, SafeAreaView, StyleSheet, View, TextInput, Keyboard } from 'react-native';
import { Toast } from 'antd-mobile-rn';
import { commonStyles } from '../../tools/layout';
import Touch from 'react-native-touch-once';
import { postUserRegister, postUserSmsCode } from '../../network_request/fetch_api';
import { EventRegister } from 'react-native-event-listeners';

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.postData = {
        username: '',
        password: '',
        sms_code: '',
        password2: '',
    };
    this.state = {
        changeColor: false,
        isShowCountdown: false,
        num: 60
    };
  }

  static navigationOptions = ({ navigation, navigationOptions }) => ({
    // headerTintColor: navigationOptions.headerStyle.backgroundColor,
    // headerTruncatedBackTitle: '返回',
    // // headerTitleStyle: {
    // //     fontWeight: 'normal',
    // //     fontSize: 16,
    // // },
    // headerStyle: {
    //     backgroundColor: navigationOptions.headerTintColor, 
    //     shadowColor: 'transparent',
    //     elevation: 0,
    //     shadowOpacity: 0,
    // },
    headerTitle: "registered",
    headerRight: <View />
  });


  componentWillMount() {
    this.registerListener = EventRegister.addEventListener('registerScuu', data => {
        console.log(data);
        if(data.status == '400'){
            let firstCutIndex = data.statusText.indexOf("\["); 
            let secondCutIndex =  data.statusText.indexOf("\]");
            let resultText = data.statusText.slice(firstCutIndex+2, secondCutIndex-1);
            console.log(resultText);
            Toast.info(resultText, 2);
        } else {
            this.props.navigation.pop();
            Toast.hide();
        }
    });
}


componentWillUnmount() {
    EventRegister.removeEventListener(this.registerListener);
}

    countdown = () => {
        let fun = setInterval(() => {
            this.setState({ num: --this.state.num });  
            if(this.state.num == 0){
                clearInterval(fun);
                this.setState({
                    isShowCountdown: false,
                    num: 60
                });
            }
            // console.log(this.state.num)
            }, 1000);
    }

    phoneNumRegister = () => {
        if(this.postData.password.length < 6 || this.postData.password.length > 12){
            Toast.info("Password should be 6-12 digits long",  1, undefined, false)
        } else if(this.postData.password != this.postData.password2){
            Toast.info("The password entered twice is different",  1, undefined, false)
        } else {
            // console.log(this.postData.username)
            // console.log(this.postData.password)
            // console.log(this.postData.sms_code)
            // console.log(this.postData.password2)
            postUserRegister(
                {
                    username: this.postData.username,
                    password: this.postData.password,
                    sms_code: this.postData.sms_code,
                    password2: this.postData.password2,
                    allow: 1
                },
            );
            Toast.loading('Registration verification', 0);
        }
    }

  render() {
    return (
      <SafeAreaView style={commonStyles.containWrap}>
        <ScrollView keyboardShouldPersistTaps={'handled'}>
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
                            this.postData.username = phoneNum.replace(/\s+/g,"");
                            if(this.postData.username.length > 0 && this.postData.password.length > 0 && this.postData.password2.length > 0 && this.postData.sms_code.length > 0) {
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
                        placeholder="Set password(6-12）"
                        secureTextEntry={true}
                        underlineColorAndroid="transparent"
                        onChangeText={password => {
                            this.postData.password = password.replace(/\s+/g,"");
                            if(this.postData.username.length > 0 && this.postData.password.length > 0 && this.postData.password2.length > 0 && this.postData.sms_code.length > 0) {
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
                        placeholder="Repeat the password"
                        secureTextEntry={true}
                        underlineColorAndroid="transparent"
                        onChangeText={repeatPassword => {
                            this.postData.password2 = repeatPassword.replace(/\s+/g,"");
                            if(this.postData.username.length > 0 && this.postData.password.length > 0 && this.postData.password2.length > 0 && this.postData.sms_code.length > 0) {
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
                        placeholder="Verification code"
                        keyboardType={'numeric'}
                        underlineColorAndroid="transparent"
                        onChangeText={VerificationCode => {
                            this.postData.sms_code = VerificationCode;
                            if(this.postData.username.length > 0 && this.postData.password.length > 0 && this.postData.password2.length > 0 && this.postData.sms_code.length > 0) {
                                this.setState({changeColor: true});                                
                            } else {
                                this.setState({changeColor: false});   
                            }
                        }}
                    />
                    {this.state.isShowCountdown ? (
                        <Text style={{color:'#9B9B9B'}}>Get verification code{`${this.state.num}`}S）</Text>
                    ) : (
                        <Touch style={[commonStyles.flexBox, {height:'100%'}]} 
                            onPress = {() => {
                                Keyboard.dismiss();
                                if(this.postData.username.length != 0){
                                    console.log(this.postData.username)
                                    this.countdown();
                                    this.setState({isShowCountdown: true});
                                    postUserSmsCode(
                                        {
                                            country_code: 86,
                                            phone_number: this.postData.username,
                                        },
                                    );
                                } else {
                                    Toast.info("Please enter the correct phone number",  2, undefined, false);
                                }
                            }}
                        >
                            <Text style={styles.forgetpwd}>Get verification code</Text>
                        </Touch>
                    )}
                </View>
                <Touch style={[styles.loginBtn,commonStyles.flexBox, 
                    {backgroundColor: this.state.changeColor ? '#FFBB00' : 'rgba(252,191,0,.4)'}]}
                    onPress = {() => this.state.changeColor && this.phoneNumRegister()}
                >
                    <Text style={styles.loginText}>Sign up</Text>
                </Touch>
            </View>
        </ScrollView>
       </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
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
        marginBottom: 42,
        borderRadius: 2,
    },
    loginText:{
        fontSize: 17,
        color: '#fff'
    },
});



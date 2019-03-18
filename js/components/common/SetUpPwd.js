import React, { Component } from 'react';
import { Text, ScrollView, SafeAreaView, StyleSheet, View, TextInput, Keyboard, Platform } from 'react-native';
import { Toast } from 'antd-mobile-rn';
import { commonStyles } from '../../tools/layout';
import Touch from 'react-native-touch-once';
import { postUserSetUpPwd, postUserSmsCode } from '../../network_request/fetch_api';
import { EventRegister } from 'react-native-event-listeners';

export default class SetUpPwd extends Component {
  constructor(props) {
    super(props);
    this.state = {
        changeColor: false,
        isShowCountdown: false,
        num: 60
    };
    this.phoneNum = '';
    this.smsCode = '';
    this.passWord = '';
    this.repeatPwd = '';

  }

  static navigationOptions = ({ navigation}) => ({
    headerTitle: "Set password",
    headerRight: <View />
  });

  forgetpwd = () => {
    if(this.passWord.length < 6 || this.passWord.length > 12){
        Toast.info("Password should be 6-12 digits long",  1, undefined, false)
    } else if(this.passWord != this.repeatPwd){
        Toast.info("The password entered twice is different",  1, undefined, false)
    } else {
        postUserSetUpPwd(
            {
                country_code: 86,
                phone_number: this.phoneNum,
                verify_code: this.smsCode,
                new_password: this.repeatPwd
            },
        );
        Toast.loading('Please wait', 0);
    }
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
        }, 1000);
}


componentWillMount() {
    this.updatePwdSuccListener = EventRegister.addEventListener('updatePwdSucc', data => {
        if(data.status == '200201'){
            this.props.navigation.pop();
        }
        Toast.info(data.msg,  2, undefined, false);
    });
}

componentWillUnmount() {
    Keyboard.dismiss();
    EventRegister.removeEventListener(this.updatePwdSuccListener);
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
                            this.phoneNum = phoneNum.replace(/\s+/g,"");
                            if(this.phoneNum.length > 0 && this.smsCode.length > 0 && this.passWord.length > 0 && this.repeatPwd.length > 0) {
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
                        underlineColorAndroid="transparent"
                        keyboardType={'numeric'}
                        onChangeText={smsCode => {
                            this.smsCode = smsCode.replace(/\s+/g,"");
                            if(this.phoneNum.length > 0 && this.smsCode.length > 0 && this.passWord.length > 0 && this.repeatPwd.length > 0) {
                                this.setState({changeColor: true});                                
                            } else {
                                this.setState({changeColor: false});   
                            }
                        }}
                    />
                    {this.state.isShowCountdown ? (
                        <Text style={{color:'#9B9B9B'}}>Get verification code {`${this.state.num}`} (S)</Text>
                    ) : (
                        <Touch style={[commonStyles.flexBox, {height:'100%'}]} onPress = {() => {
                                    Keyboard.dismiss();
                                    if(this.phoneNum != 0){
                                        this.countdown();
                                        this.setState({isShowCountdown: true});
                                        postUserSmsCode(
                                            {
                                                country_code: 86,
                                                phone_number: this.phoneNum,
                                            },
                                        );
                                    } else {
                                        Toast.info("Please enter the correct phone number",  2, undefined, false);
                                    }
                                }}>
                            <Text style={styles.forgetpwd}>Get verification code</Text>
                        </Touch>
                    )}
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
                        onChangeText={passWord => {
                            this.passWord = passWord.replace(/\s+/g,"");
                            if(this.phoneNum.length > 0 && this.smsCode.length > 0 && this.passWord.length > 0 && this.repeatPwd.length > 0) {
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
                        onChangeText={repeatPwd => {
                            this.repeatPwd = repeatPwd.replace(/\s+/g,"");
                            if(this.phoneNum.length > 0 && this.smsCode.length > 0 && this.passWord.length > 0 && this.repeatPwd.length > 0) {
                                this.setState({changeColor: true});                                
                            } else {
                                this.setState({changeColor: false});   
                            }
                        }}
                    />
                </View>
                <Touch style={[styles.loginBtn,commonStyles.flexBox, {backgroundColor: this.state.changeColor ? '#FFBB00' : 'rgba(252,191,0,.4)'}]}
                     onPress = {() => this.state.changeColor && this.forgetpwd()}
                >
                    <Text style={styles.loginText}>verify</Text>
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
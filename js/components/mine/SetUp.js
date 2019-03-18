import React, { Component } from 'react';
import { Text, ScrollView, SafeAreaView, Image, StyleSheet, Dimensions, View, Switch, Platform } from 'react-native';
import { Toast } from 'antd-mobile-rn';
import { commonStyles } from '../../tools/layout';
import Touch from 'react-native-touch-once';
import { Header } from 'react-navigation';
import {I18n} from '../../language/I18n';
import DeviceInfo from 'react-native-device-info'
import ModalDialog from '../common/ModalDialog';
import { checkVersion } from '../../network_request/fetch_api';
// import DataRepository from '../../language/DataRepository'
import { EventRegister } from 'react-native-event-listeners';

export default class SetUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      localeLanguage: null,
      isShowVersion: false,
      openStatus: false
    };
  }

  componentWillMount() {
    // let locale = DeviceInfo.getDeviceLocale();

    // new DataRepository().saveLocalRepository('localLanguage',locale, (error) => {
    //     if(error){
    //         alert(error);
    //     }
    // });

    this.checkVersionListener = EventRegister.addEventListener('checkVersionMsg', data => {
        if(data.status == '200901'){
            if(data.isUpdate){
                Toast.hide();
                this.setState({isShowVersion: true})
            }
        } else {
            Toast.info(data.msg,  2, undefined, false);
        }
    })

    
}

  refreshLanguage = (index) => {

    switch (index) {
        case 0:
            I18n.locale = 'en-US';
            break;
        case 1:
            I18n.locale = 'zh-Hans-US';
            break;
        case 2:
            I18n.locale = DeviceInfo.getDeviceLocale();
            break;
    }

    this.setState({
        localeLanguage: I18n.locale
    });

};

  render() {
    return (
      <SafeAreaView style={commonStyles.containGrayWrap}>
        <ScrollView>
            <View style={commonStyles.addDevicesBox}>
                <View style={[commonStyles.flexBox, commonStyles.padLR20, commonStyles.lineSty, {height: 60}]}>
                    {/* <Text style={commonStyles.deviceName}>{I18n.t('helpCenter')}</Text> */}
                    <Text style={commonStyles.deviceName}>Notifications</Text>
                    <Switch value={this.state.openStatus} 
                      onTintColor={'#FCBF00'}
                      tintColor={'#E5E5E5'} 
                      thumbTintColor={Platform.OS === 'android' ? '#E5E5E5' : ''}
                      style={commonStyles.switchStyle}
                      onValueChange={(value)=> {
                        this.setState({
                            openStatus: value,
                        });
                      }}
                    />
                </View>
                {/* <Touch style={[commonStyles.flexBox, commonStyles.padLR20, commonStyles.lineSty, {height: 60}]}
                  onPress={() => {
                    //   this.refreshLanguage(1);
                    //   EventRegister.emit('ssss')
                    // let a ="zh-Hans-US";
                    // console.log(this.props.navigation.state.params.data.container.netInfoStatus)
                    // this.props.navigation.state.params.data.container.localLanguage = "zh-Hans-US"
                    // this.props.getAppNetInfo(false);
                    
                    // this.props.navigation.state.params.data.container.languageType(a);
                    // let { store } = configureStore();
                    }}
                >
                    <Text style={commonStyles.deviceName}>语言</Text>
                    <Text style={commonStyles.familyName}>简体中文</Text>
                    <Image style={commonStyles.moreIconSty} source={require('../../img/icon_gd.png')} />
                </Touch> */}
                <Touch style={[commonStyles.flexBox, commonStyles.padLR20, commonStyles.lineSty, {height: 60}]}
                    onPress={() => this.props.navigation.navigate('AboutUs')}
                >
                    <Text style={commonStyles.deviceName}>About APP</Text>
                    <Image style={commonStyles.moreIconSty} source={require('../../img/icon_gd.png')} />
                </Touch>
                <Touch style={[commonStyles.flexBox, commonStyles.padLR20, {height: 60}]}
                    onPress={() => {
                        checkVersion(
                            {
                              platform: Platform.OS,
                              current_version: DeviceInfo.getVersion(),
                            },
                            this.props.navigation.state.params.token,
                        );
                        Toast.loading('Loading', 0);
                    }}
                >
                    <Text style={commonStyles.deviceName}>Check for updates</Text>
                    <Image style={commonStyles.moreIconSty} source={require('../../img/icon_gd.png')} />
                </Touch>
            </View>
        </ScrollView>
        <ModalDialog
            _dialogVisible={this.state.isShowVersion}
            _dialogTitle={"The new version is coming, download and install now"}
            _dialogContent={""}
            _dialogLeftBtnTitle= {'INSTALLATION'}
            _dialogRightBtnTitle= {'CANCEL'}
            _dialogLeftBtnAction={() => {
                this.setState({ isShowVersion: false });
            }}
            _dialogRightBtnAction={() => {
                this.setState({ isShowVersion: false });
            }}
        />
       </SafeAreaView>
    );
  }
}
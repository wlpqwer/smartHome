import React, { Component } from 'react';
import { Text, ScrollView, SafeAreaView, Image, View } from 'react-native';
import { Toast } from 'antd-mobile-rn';
import { commonStyles } from '../../tools/layout';
import Touch from 'react-native-touch-once';
import ModalDialog from '../common/ModalDialog';
import { EventRegister } from 'react-native-event-listeners';
import { deleteDevice } from '../../network_request/fetch_api';

export default class DeviceSetUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isShowMsg: false
    };
  }

  componentDidMount() {
    this.listener = EventRegister.addEventListener('deleteDeviceSucc', msg => {
      Toast.info(msg);
      this.props.navigation.pop(2);
    });
  }

  componentWillUnmount() {
    EventRegister.removeEventListener(this.listener);
  }


  render() {
    console.log(this.props.navigation.state.params)
    return (
      <SafeAreaView style={commonStyles.containGrayWrap}>
        <ScrollView>
            <View style={commonStyles.addDevicesBox}>
                <Touch style={[commonStyles.flexBox, commonStyles.padLR20, commonStyles.lineSty, {height: 60}]}
                  onPress={() => { this.props.navigation.navigate("DeviceLocationManage", {
                    id: this.props.navigation.state.params.deviceId,
                    roomName: this.props.navigation.state.params.roomName,
                    roomId: this.props.navigation.state.params.roomId,
                    });
                  }}
                >
                    <Text style={commonStyles.deviceName}>位置管理</Text>
                    <Image style={commonStyles.moreIconSty} source={require('../../img/icon_gd.png')} />
                </Touch>
                <Touch style={[commonStyles.flexBox, commonStyles.padLR20, {height: 60}]}
                    onPress={() => { this.setState({isShowMsg: true})

                    }}
                >
                    <Text style={commonStyles.deviceName}>删除设备</Text>
                    <Image style={commonStyles.moreIconSty} source={require('../../img/icon_gd.png')} />
                </Touch>
            </View>
        </ScrollView>
        <ModalDialog
          _dialogVisible={this.state.isShowMsg}
          _dialogTitle={"删除设备吗？"}
          _dialogContent={""}
          _dialogLeftBtnAction={() => {
            this.setState({ isShowMsg: false });
          }}
          _dialogRightBtnAction={() => {
            this.setState({ isShowMsg: false });
            deleteDevice(
              this.props.navigation.state.params.token,
              this.props.navigation.state.params.deviceId
            );
          }}
        />
       </SafeAreaView>
    );
  }
}
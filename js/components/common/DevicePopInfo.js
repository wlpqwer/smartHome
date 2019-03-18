import React, { Component } from 'react';
import {
  Text,
  View,
  Image,Modal, StyleSheet
} from 'react-native';
import { Toast } from 'antd-mobile-rn';
import Touch from 'react-native-touch-once';
import ModalDialog from '../common/ModalDialog';
import { commonStyles } from '../../tools/layout';
import { EventRegister } from 'react-native-event-listeners';
import { deleteDevice } from '../../network_request/fetch_api';
export default class DevicePopInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isShowDeviceBtn: false,
        isShowMsg: false
    }
    this.navigation = props.container;
  }

  componentDidMount() {
    this.listener = EventRegister.addEventListener('deleteDeviceSucc', msg => {
      Toast.info(msg,  2, undefined, false);
      this.props.container.navigation.pop();
    });
  }

  componentWillUnmount() {
    EventRegister.removeEventListener(this.listener);
  }

  render() {
      console.log(this.props.container.navigation.state.params)
    return (
        <View>
            <Touch
              style={commonStyles.flexBox}
              activeOpacity={0.5}
              onPress={() => { this.setState({isShowDeviceBtn : true})}}
            >
                <Image
                    style={{
                        width: 30,
                        height: 30,
                        marginRight: 12
                    }}
                    source={require('../../img/icon_sbxq.png')}
                />
            </Touch>
            <Modal
                visible={this.state.isShowDeviceBtn}
                transparent={true}
                onRequestClose={() => {}} //如果是Android设备 必须有此方法
            >
                <View style={commonStyles.popMask}>
                    <View style={styles.otherItems}>
                        <View style={[commonStyles.flexBox, {marginTop:36, justifyContent: 'flex-end'}]}>
                            <Touch 
                                 onPress={() => { this.setState({isShowDeviceBtn : false})}}
                            >
                                <Image
                                    style={{width: 32, height: 32, marginRight: 12}}
                                    source={require('../../img/icon_sb_close.png')}
                                />
                            </Touch>
                        </View>
                        <Touch style={[styles.deviceOption, commonStyles.flexBox, {justifyContent:'flex-start', borderTopColor:'#F2F2F2', borderTopWidth:1}]}
                            onPress={() => {
                                this.setState({isShowDeviceBtn: false});
                                this.props.container.navigation.navigate('DeviceAddShare');
                            }}
                        >
                            <Text style={styles.deviceOptionName}>Share device</Text>
                        </Touch>
                        {/* <Touch style={[styles.deviceOption, commonStyles.flexBox, {justifyContent:'flex-start'}]}
                            onPress={() => {
                                this.setState({isShowDeviceBtn: false});
                                this.props.container.navigation.navigate('DeviceSetUp', {
                                    deviceId: this.props.container.navigation.state.params.id,
                                    roomName: this.props.container.navigation.state.params.roomName,
                                    roomId: this.props.container.navigation.state.params.roomId,
                                    token: this.props.container.navigation.state.params.token
                                });
                                console.log(this.props.container)
                            }}
                        >
                            <Text style={styles.deviceOptionName}>通用设置</Text>
                        </Touch> */}
                        <Touch style={[styles.deviceOption, commonStyles.flexBox, {justifyContent:'flex-start'}]}
                            onPress={() => {
                                this.setState({
                                    isShowDeviceBtn: false,
                                    isShowMsg: true
                                });
                            }}
                        >
                            <Text style={styles.deviceOptionName}>Delete device</Text>
                        </Touch>              
                    </View>
                </View>
            </Modal>
            <ModalDialog
                _dialogVisible={this.state.isShowMsg}
                _dialogTitle={"Delete device?"}
                _dialogContent={""}
                _dialogLeftBtnAction={() => {
                    this.setState({ isShowMsg: false });
                }}
                _dialogRightBtnAction={() => {
                    this.setState({ isShowMsg: false });
                    deleteDevice(
                        this.props.container.navigation.state.params.token,
                        this.props.container.navigation.state.params.id
                    );
                    Toast.loading('Loading', 0);
                }}
            />
        </View>
    );
  }
}


const styles = StyleSheet.create({
    otherItems: {
        backgroundColor: '#fff',
        paddingBottom: 24
    },
    deviceOption: {
        marginLeft: 20,
        height: 41,
        borderBottomWidth: 1,
        borderBottomColor: '#F2F2F2',
        
    },
    deviceOptionName: {
        fontSize: 15,
        color: '#2C2D30',
        paddingLeft: 10,
    }
});
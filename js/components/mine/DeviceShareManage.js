import React, { Component } from 'react';
import { Text, ScrollView, SafeAreaView, Image, View, } from 'react-native';
import { commonStyles } from '../../tools/layout';
import { Toast } from 'antd-mobile-rn';
import Touch from 'react-native-touch-once';
import ModalDialog from '../common/ModalDialog';
import { postDeleteShareDevice } from '../../network_request/fetch_api';
import { EventRegister } from 'react-native-event-listeners';

export default class DeviceShareManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isDialogVisible: false
    }
    this.user = null;
    this.equipment = null;
  }

  componentDidMount() {
    this.addShareDeviceListener = EventRegister.addEventListener('AddShareDevice', msg => {
        this.props.container.FetchData(this.props.container.navigation.state.params.deviceId);
        this.props.container.FetchShareData();
    });

    this.delShareDeviceListener = EventRegister.addEventListener('DelShareDevice', msg => {
        Toast.info(msg,  2, undefined, false);
        this.props.container.FetchData(this.props.container.navigation.state.params.deviceId);
        this.props.container.FetchShareData();
    });
    
  }

  componentWillUnmount() {
    EventRegister.removeEventListener(this.addShareDeviceListener);
    EventRegister.removeEventListener(this.delShareDeviceListener);
  }



  render() {
      console.log(this.props.container.data)
    return (
      <SafeAreaView style={commonStyles.containGrayWrap}>
        <ScrollView>
             <View style={commonStyles.addDevicesBox}>
                {this.props.container.data.map((item, index) => {
                    return (
                        <View style={[commonStyles.flexBox, commonStyles.padLR20, commonStyles.lineSty, {height: 74}]}
                            // onPress={() => this.props.container.navigation.navigate('DeviceShareManage')}
                            key={index}
                        >
                            <Image style={commonStyles.deviceImg} source={require('../../img/pic_fs.png')} />
                            <View style={commonStyles.currentRoomDevTextBox}>
                                <Text style={commonStyles.deviceText}>{`Shared with ${item.user}`}</Text>
                                <Text style={[commonStyles.deviceTextStatus, {color:'#8E8E93', fontSize: 12}]}>Accepted</Text>
                                {/* <Text style={[commonStyles.deviceTextStatus, {color:'#8E8E93', fontSize: 12}]}>2018年10月10日共享 已接受</Text> */}
                            </View>
                            <Touch  style={[commonStyles.delBtn, commonStyles.flexBox]} onPress={() => 
                                {
                                    this.setState({isDialogVisible: true});
                                    this.user = item.user;
                                    this.equipment = item.equipment;
                                }}>
                                <Text style={commonStyles.delText}>Delete</Text>
                            </Touch>
                        </View>
                    )
                })}

            </View>
            <Touch style={[commonStyles.addItemsBox, commonStyles.flexBox]}  activeOpacity={1}  
                onPress={() => this.props.container.navigation.navigate('AddShare', {
                    token: this.props.container.userInfoData.token,
                    deviceId: this.props.container.navigation.state.params.deviceId
                })}
            >
                <Text style={commonStyles.addItemsText}>Add share</Text>
            </Touch>
        </ScrollView>
        <ModalDialog
              _dialogVisible={this.state.isDialogVisible}
              _dialogContent={"This member cannot use this device after deleting the device"}
              _dialogLeftBtnAction={() => {
                this.setState({isDialogVisible: false})
              }}
              _dialogRightBtnAction={() => {
                postDeleteShareDevice(
                    {
                        delete_user: this.user,
                        delete_equipment: this.equipment,
                    },
                    this.props.container.userInfoData.token,
                );
                  this.setState({isDialogVisible: false})
              }}
            />
       </SafeAreaView>
    );
  }
}

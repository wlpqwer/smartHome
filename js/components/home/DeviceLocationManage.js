import React, { Component } from 'react';
import { Text, ScrollView, SafeAreaView, Image, View } from 'react-native';
import { Toast } from 'antd-mobile-rn';
import { commonStyles } from '../../tools/layout';
import Touch from 'react-native-touch-once';
import ModalDialog from '../common/ModalDialog';
import { EventRegister } from 'react-native-event-listeners';
import Loading from '../common/Loading';
import { postRoomsAddOrDelDev } from '../../network_request/fetch_api';

export default class DeviceLocationManage extends Component {
  constructor(props) {
    super(props);
    this.checkedRoomName = this.props.container.navigation.state.params.roomName;
    this.checkedRoomId = null;
    this.state = {
        selectIndex: null,
      }
  }

  componentDidMount() {
    this.props.container.navigation.setParams({ deviceChange: this.deviceChange});
  }

  deviceChange = () => {
    
      const devicesId = [];
      devicesId.push(this.props.container.navigation.state.params.id);
      const currentRoomId = this.checkedRoomId;
        if(this.props.container.navigation.state.params.roomName == this.checkedRoomName){
            this.props.container.navigation.goBack();
        } else {
            postRoomsAddOrDelDev(
            { 
                devicesId,
                room_id: currentRoomId
            },
            this.props.container.userInfoData.token,
            this.props.container.navigation.state.params.roomId
            );
            this.props.container.navigation.goBack()
        }
  }
  
//   componentDidMount() {
//     this.listener = EventRegister.addEventListener('deleteDeviceSucc', msg => {
//       Toast.info(msg);
//       this.props.navigation.pop(2);
//     });
//   }

//   componentWillUnmount() {
//     EventRegister.removeEventListener(this.listener);
//   }

devChangeRoom = (index) => {
   this.setState({selectIndex : index});
}



  render() {
      console.log(this.props.container.navigation.state.params.id);
    if(this.props.container.data.length != 0){
        return (
          <SafeAreaView style={commonStyles.containGrayWrap}>
            <ScrollView>
                <View style={commonStyles.addDevicesBox}>
                    {this.props.container.data.map((item, index) => {
                            return(
                                <Touch key={index} style={[commonStyles.flexBox, commonStyles.padLR20, commonStyles.lineSty, {height: 60}]}
                                    onPress={() => {
                                        this.devChangeRoom(index);
                                        this.checkedRoomName = item.room_name;
                                        this.checkedRoomId = item.id;
                                        console.log(this.checkedRoomId)
                                    }}
                                >
                                    <Text style={commonStyles.deviceName}>{item.room_name}</Text>
                                    {this.state.selectIndex == null ? (
                                        <Image style={{width:22, height:22}} 
                                            source={
                                                this.props.container.navigation.state.params.roomName == item.room_name
                                                ? require('../../img/icon_xz.png') 
                                                : require('../../img/icon_wxz.png')
                                            } 
                                        />
                                    ) : (
                                        <Image style={{width:22, height:22}} 
                                            source={
                                                this.state.selectIndex == index
                                                ? require('../../img/icon_xz.png') 
                                                : require('../../img/icon_wxz.png')
                                            } 
                                        />
                                    )}
                                </Touch>
                            )
                        })}
                    
                </View>
            </ScrollView>
           </SafeAreaView>
        );
    } else {
        return <Loading />
    }
  }
}
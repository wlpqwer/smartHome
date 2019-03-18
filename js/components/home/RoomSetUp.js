import React from 'react';
import { Text, ScrollView, SafeAreaView, Image, StyleSheet, View, Platform, StatusBar } from 'react-native';
import { Modal, Toast } from 'antd-mobile-rn';
import { commonStyles } from '../../tools/layout';
import Touch from 'react-native-touch-once';
import { postRoomsAddOrDelDev, putUpdateRoomName } from '../../network_request/fetch_api';
import { EventRegister } from 'react-native-event-listeners';
import Loading from '../common/Loading';
import ModalInput from '../common/ModalInput';

export default class RoomSetUp extends React.Component {
  constructor(props) {
    super(props);
    this.currentRoomName = this.props.container.navigation.state.params.roomName;
    this.state = {
      isDelStatus: false,
      isShowRoomNamePop: false,
    }
    this.notInRoomData = {};
    this.inRoomData ={};
    this.updateDevId = [];
  }

  componentDidMount() {
    this.props.container.navigation.setParams({ _changeRoomDev: this._changeRoomDev });
    this.listener = EventRegister.addEventListener('addOrDelDevSucc', msg => {
      Toast.info(msg,  2, undefined, false);
      this.props.container.navigation.pop();
    });
  }


  componentWillUnmount() {
    EventRegister.removeEventListener(this.listener);
  }

  _changeRoomDev = () => {
    let devicesId = this.updateDevId;
    console.log(devicesId);
    if(devicesId.length == 0){
      this.props.container.navigation.pop();
    } else {
      postRoomsAddOrDelDev(
        { devicesId },
        this.props.container.userInfoData.token,
        this.props.container.navigation.state.params.id
      );
      Toast.loading('Loading', 0);
    }
  }

  // _tipToast = () => {
  //   Toast.info('房间名称不能为空');
  // }

  // onButtonClick5 = () => {
  //   Modal.prompt(
  //     '编辑房间名称',
  //     null,
  //     (RoomName) => {
  //       console.log(`password: ${RoomName}`);
  //       console.log(RoomName)
  //       if(RoomName == null ){
  //         this._tipToast();
  //       } else {
  //         this.setState({
  //           currentRoomName: RoomName
  //         })
  //         putUpdateRoomName(
  //           {
  //             room_name: RoomName,
  //             room_id:this.props.container.navigation.state.params.id
  //           },
  //           this.props.container.userInfoData.token,
  //         );
  //       }
  //     },
  //     'default',
  //     null,
  //     [this.state.currentRoomName],
  //   );
  // }

  addItems = (index) => {
    this.addTemporaryData = {};
    this.inRoomData = this.props.container.data.data.in_room;
    this.notInRoomData = this.props.container.data.data.not_in_room;
    this.addTemporaryData['equipment__id'] =this.notInRoomData[index].id;
    this.addTemporaryData['equipment__name'] = this.notInRoomData[index].name;
    this.addTemporaryData['equipment__room_name'] = this.notInRoomData[index].room_name;
    this.inRoomData.push(this.addTemporaryData);
    if(this.updateDevId.indexOf(this.notInRoomData[index].id) == -1){
      this.updateDevId.push(this.notInRoomData[index].id);
    } else{
      this.updateDevId.splice(this.updateDevId.indexOf(this.notInRoomData[index].id), 1);
    }
    this.notInRoomData.splice(index, 1);
    this.setState({isDelStatus : true}); 
  }


  deleteItems = (index) => {
    this.deleteTemporaryData = {};
    this.inRoomData = this.props.container.data.data.in_room;
    this.notInRoomData = this.props.container.data.data.not_in_room;
    this.deleteTemporaryData['room_name'] = this.inRoomData[index].equipment__room_name;
    this.deleteTemporaryData['name'] = this.inRoomData[index].equipment__name;
    this.deleteTemporaryData['id'] = this.inRoomData[index].equipment__id;
    this.notInRoomData.unshift(this.deleteTemporaryData);
    if(this.updateDevId.indexOf(this.inRoomData[index].equipment__id) == -1){
      this.updateDevId.push(this.inRoomData[index].equipment__id);
    } else {
      this.updateDevId.splice(this.updateDevId.indexOf(this.inRoomData[index].equipment__id), 1);
    }
    this.inRoomData.splice(index,1); 
    this.setState({isDelStatus : true})
  }

  render() {
    console.log(this.updateDevId);
    console.log(this.props.container.data);
    console.log(this.props.container.navigation.state.params.id)
    if(this.props.container.data.length != 0){
      return (
        <SafeAreaView style={[commonStyles.containWrap, { backgroundColor:'#F8F8F8'}]}>
          <ScrollView>
            <View style={{paddingTop:5, backgroundColor:'#fff'}}>
              <Touch style={[commonStyles.flexBox, commonStyles.noneLineList, {marginTop:0}]}  activeOpacity={1} 
                onPress={() => this.setState({isShowRoomNamePop: true})}
              >
                <Text style={commonStyles.deviceName}>Room name</Text>
                <Text style={styles.familyName}>{this.currentRoomName}</Text>
                <Image style={commonStyles.moreIconSty} source={require('../../img/icon_gd.png')} />
              </Touch>
            </View>
            <View style={commonStyles.currentRoomDevices}>
              {this.props.container.data.data.in_room.map((item, index) => {
                return(
                  <Touch style={[commonStyles.flexBox, commonStyles.padLR20, {height: 71, borderBottomColor:'#F2F2F2', borderBottomWidth: 1}]}
                    key={index}
                    onPress={() => this.deleteItems(index)}
                  >
                      <Image style={commonStyles.editorDelImg} source={require('../../img/icon_sc.png')} />
                      <Image style={commonStyles.deviceImg} source={require('../../img/pic_fs.png')} />
                      <View style={commonStyles.currentRoomDevTextBox}>
                        <Text style={commonStyles.deviceText}>{item.equipment__name}</Text>
                        {item.equipment__room_name != "" && item.equipment__room_name !=  this.props.container.navigation.state.params.roomName? (
                          <Text style={commonStyles.deviceTextStatus} numberOfLines={1}>{`Remove from ${item.equipment__room_name} location`}</Text>
                        ) : null}
                      </View>
                      {/* <Image style={commonStyles.moreIconSty} source={require('../../img/icon_px.png')} /> */}
                  </Touch>
                )
              })}
            </View> 
            <View style={commonStyles.addDevicesBox}>
              <Text style={commonStyles.noHere}>Equipment not in this room</Text>
              {this.props.container.data.data.not_in_room.map((item, index) => {
                return(
                  <View style={[commonStyles.flexBox, commonStyles.padLR20, {height: 80}]}
                    key={index}
                  >
                    <Touch onPress={() => this.addItems(index)}>
                        <Image style={commonStyles.editorDelImg} source={require('../../img/icon_tj.png')} />
                    </Touch>
                    <Image style={commonStyles.deviceImg} source={require('../../img/pic_fs.png')} />
                    <View style={commonStyles.currentRoomDevTextBox}>
                      <Text style={commonStyles.deviceText}>{item.name}</Text>
                      {item.room_name != '' ? (
                        <Text style={[commonStyles.deviceTextStatus, {color:'#8E8E93'}]}>{item.room_name}</Text>
                      ) : null }
                    </View>
                  </View>
                )
              })}
              </View>
          </ScrollView>
          <ModalInput
              ref='setUpRoomNameNode'
              _popupInputBoxVisible={this.state.isShowRoomNamePop}
              _popupInputBoxTitle = {"Edit room name"}
              _popupInputBoxDefaultText = {this.currentRoomName}
              _popupInputBoxLeftBtnAction ={() => {this.setState({isShowRoomNamePop: false})}}
              _popupInputBoxRightBtnAction ={() => {
                if(this.refs.setUpRoomNameNode.state.value != this.currentRoomName && 
                  this.refs.setUpRoomNameNode.state.value != '' &&
                  this.refs.setUpRoomNameNode.state.value.length < 32){
                  this.currentRoomName = this.refs.setUpRoomNameNode.state.value;
                  putUpdateRoomName(
                    {
                      room_name: this.currentRoomName,
                      room_id:this.props.container.navigation.state.params.id
                    },
                    this.props.container.userInfoData.token,
                  );
                } else {
                  Toast.info("Length cannot be greater than 32",  2, undefined, false);
                }
                this.setState({isShowRoomNamePop: false})
                console.log(this.refs.setUpRoomNameNode.state.value)
              }}
          />
        </SafeAreaView>
      );
    } else {
      return <Loading />
    }
  }
}

const styles = StyleSheet.create({
  familyName:{
    color:'#9B9B9B',
    fontSize:15,
    flex:2,
    textAlign:'right',
  }
});
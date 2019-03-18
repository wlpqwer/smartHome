import React, { Component } from 'react';
import { Text, ScrollView, SafeAreaView, Image, StyleSheet, View, FlatList } from 'react-native';
import { Toast } from 'antd-mobile-rn';
import { commonStyles } from '../../tools/layout';
import Touch from 'react-native-touch-once';
import { EventRegister } from 'react-native-event-listeners';
import ModalDialog from '../common/ModalDialog';
import Loading from '../common/Loading';

export default class RoomManage extends Component {
  constructor(props) {
    super(props);
    this.checkedRoomId = 0;
    this.delRoomArr = [];
    this.selectIndex = null;
    this.state = {
      isEditorStatus: false,
      isDialogVisible: false,
      isDeleteItem: false
    }
  }

  componentWillMount() {
    this.listener = EventRegister.addEventListener('showEditorItems', () => {
      this.setState({
          isEditorStatus: true,
      })
      this.props.container.navigation.setParams({
         isEditorStatus: true,
      });
    });

    this.addRommsListener = EventRegister.addEventListener('addRommsSucc', msg => {
      this.props.container.fetchData(this.props.container.navigation.state.params.homeId);
      this.props.container.fetchHomeRoomAndDevData(this.props.container.navigation.state.params.homeId);
    });

    this.delRommsListener = EventRegister.addEventListener('delRoomSuccess', msg => {
      Toast.info(msg,  2, undefined, false);
      this.setState({
        isEditorStatus: false,
      })
      this.props.container.navigation.setParams({
        isEditorStatus: false,
      });
      this.props.container.fetchHomeRoomAndDevData(this.props.container.navigation.state.params.homeId);
    });

    this.updateRoomNameListener = EventRegister.addEventListener('updateRoomNameSucc', msg => {
      this.props.container.fetchData(this.props.container.navigation.state.params.homeId);
      this.props.container.fetchHomeRoomAndDevData(this.props.container.navigation.state.params.homeId);
    });

    this.addOrDelDevListener = EventRegister.addEventListener('addOrDelDevSucc', msg => {
      this.props.container.fetchData(this.props.container.navigation.state.params.homeId);
      this.props.container.fetchHomeRoomAndDevData(this.props.container.navigation.state.params.homeId);
    });

  }



  componentWillUnmount() {
    EventRegister.removeEventListener(this.listener);
    EventRegister.removeEventListener(this.addRommsListener);
    EventRegister.removeEventListener(this.delRommsListener);
    EventRegister.removeEventListener(this.updateRoomNameListener);
    EventRegister.removeEventListener(this.addOrDelDevListener);
  }




  _showDialog = () => {
    this.setState({
      isDialogVisible: true,
    });
  };

  hideDialog() {
    this.setState({ isDialogVisible: false });
  }


  render() {
    if(this.props.container.isLoading){
      return <Loading /> 
    } else {
      return (
        <SafeAreaView style={commonStyles.containGrayWrap}>
          <ScrollView>
            <View style={{backgroundColor:'#fff'}}>
              {this.props.container.data.map((item, index) => {
                  return (
                    <Touch
                      style={[commonStyles.flexBox, commonStyles.noneLineList, {
                        marginTop: index == 0 ? 27: 22, 
                        marginBottom: index == this.props.container.data.length -1 ? 27 : 0 
                      }]}
                      activeOpacity={1}
                      key={index}
                      onPress={() => !this.state.isEditorStatus && this.props.container.navigation.navigate('RoomSetUp', {id: item.id, roomName: item.room_name})}
                    >
                      {this.state.isEditorStatus ? (
                        <Touch onPress={() => {
                          this._showDialog();
                          this.checkedRoomId = item.id;
                          this.selectIndex = index; 
                        }}>
                          <Image style={commonStyles.editorDelImg} source={require('../../img/icon_sc.png')} />
                        </Touch>
                      ) : null}
                      <Text style={commonStyles.deviceName}>{item.room_name}</Text>
                      
                      {!this.state.isEditorStatus ? (
                        <Text style={styles.familyName}>{item.equipment_count} devices</Text>
                      ) : null }
                      <Image style={commonStyles.moreIconSty} source={this.state.isEditorStatus ? require('../../img/icon_px.png') : require('../../img/icon_gd.png')} />
                    </Touch>
                  );
                },
              )}
            </View>
            {!this.state.isEditorStatus ? (
              <Touch style={[commonStyles.addItemsBox, commonStyles.flexBox]} activeOpacity={1} 
                onPress={() => 
                  this.props.container.navigation.navigate('AddRoom', 
                  {
                    homeId: this.props.container.navigation.state.params.homeId,
                    token: this.props.container.userInfoData.token
                  }
                )}
              >
                <Text style={commonStyles.addItemsText}>Add</Text>
              </Touch>
            ) : null }
          </ScrollView>
          <ModalDialog
            _dialogVisible={this.state.isDialogVisible}
            _dialogContent={"Devices will be moved out after you delete this room"} //删除房间后，原房间内的设备将被移出。
            _dialogLeftBtnAction={() => {
              this.hideDialog();
            }}
            _dialogRightBtnAction={() => {
              this.hideDialog();
              this.setState({ isDeleteItem: true})
              this.props.container.data.splice(this.selectIndex,1);
              this.delRoomArr.push(this.checkedRoomId);
              this.props.container.navigation.setParams({
                postDelRoom: this.delRoomArr,
              });
              console.log(this.delRoomArr);
            }}
          />
        </SafeAreaView>
      );
    }
  }
}

const styles = StyleSheet.create({
  familyName: {
    color: '#9B9B9B',
    fontSize: 15,
    textAlign: 'right',
  }
});
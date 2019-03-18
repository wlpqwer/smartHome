import React, { Component } from 'react';
import { Text, ScrollView, SafeAreaView, Image, View } from 'react-native';
import { Modal, Toast } from 'antd-mobile-rn';
import { commonStyles } from '../../tools/layout';
import Touch from 'react-native-touch-once';
import ModalDialog from '../common/ModalDialog';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { deleteFamily } from '../../network_request/fetch_api';
import { EventRegister } from 'react-native-event-listeners';
import { updateFamilyInfo } from '../../network_request/fetch_api';
import Loading from '../common/Loading';
import ModalInput from '../common/ModalInput';

export default class FamilySetUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // currentFamilyLocal: '',
      isDialogVisible: false,
      isShowFamilyNamePop: false,
      isShowFamilyLocalPop: false,
    }
  }

  componentDidMount() {
    this.listener = EventRegister.addEventListener('deleteFamilySucc', data => {
      Toast.info(data.msg,  2, undefined, false);
      this.props.container.navigation.pop();
    });

    this.delRommsParentListener = EventRegister.addEventListener('delRoomSuccess', msg => {
      this.props.container.fetchData(this.props.container.navigation.state.params.id);
    });

    this.addRommsParentListener = EventRegister.addEventListener('addRommsSucc', msg => {
      this.props.container.fetchData(this.props.container.navigation.state.params.id);
    });

  }

  componentWillUnmount() {
    EventRegister.removeEventListener(this.listener);
    EventRegister.removeEventListener(this.delRommsParentListener);
    EventRegister.removeEventListener(this.addRommsParentListener);
  }
 
  // _familyLocation =() => {
  //   Modal.prompt(
  //     '编辑家庭位置',
  //     null,
  //     (familyLocation) => {
  //       if(familyLocation == null ){
  //         Toast.info("家庭位置不能为空",  2, undefined, false);
  //       } else {
  //         this.setState({
  //           currentFamilyLocal: familyLocation
  //         })
  //         this.props.container.data.local = familyLocation;
  //         updateFamilyInfo(
  //           {
  //             name: '',
  //             local: familyLocation
  //           },
  //           this.props.container.userInfoData.token,
  //           this.props.container.data.id
  //          );
  //       }
  //     },
  //     'default',
  //     null,
  //     [this.props.container.data.local],
  //   );
  // }


  _showDialog = () => {
    this.setState({
      isDialogVisible: true,
    });
  };

  hideDialog() {
    this.setState({ isDialogVisible: false });
  }

  render() {
    if(!this.props.container.isLoading){
      if(Object.keys(this.props.container.data).length != 0){
        return (
          <SafeAreaView style={commonStyles.containGrayWrap}>
            <ScrollView>
              <View style={commonStyles.homeContainerBox}>
                <Touch style={[commonStyles.flexBox, commonStyles.noneLineList]}  activeOpacity={1} 
                  onPress={() => this.setState({isShowFamilyNamePop: true})}
                  
                >
                  <Text style={[commonStyles.deviceName, {flex: 2}]}>Home name</Text>
                  <Text style={commonStyles.familyName} numberOfLines={1}>{this.props.container.data.name}</Text>
                  <Image style={commonStyles.moreIconSty} source={require('../../img/icon_gd.png')} />
                </Touch>
                <Touch style={[commonStyles.flexBox, commonStyles.noneLineList]} activeOpacity={1} 
                  // onPress={() => this._familyLocation()}
                  onPress={() => this.setState({isShowFamilyLocalPop: true})}
                >
                  <Text style={[commonStyles.deviceName, {flex: 2}]}>Family location</Text>
                  <Text style={commonStyles.familyName} numberOfLines={1}>{this.props.container.data.local}</Text>
                  <Image style={commonStyles.moreIconSty} source={require('../../img/icon_gd.png')} />
                </Touch>
                <Touch style={[commonStyles.flexBox, commonStyles.noneLineList]} activeOpacity={1} 
                  onPress={() => this.props.container.navigation.navigate('RoomManage', {homeId: this.props.container.data.id})}
                >
                  <Text style={[commonStyles.deviceName, {flex: 2}]}>Manage rooms</Text>
                  <Text style={commonStyles.familyName} numberOfLines={1}>{this.props.container.data.rooms.length} rooms</Text>
                  <Image style={commonStyles.moreIconSty} source={require('../../img/icon_gd.png')} />
                </Touch>
                <Touch style={[commonStyles.flexBox, commonStyles.noneLineList]} activeOpacity={1} 
                  onPress={() => this.props.container.navigation.navigate('FamilyMember', {id: this.props.container.data.id})}
                >
                  <Text style={[commonStyles.deviceName, {flex: 2}]}>Family member</Text>
                  <Text style={commonStyles.familyName} numberOfLines={1}>{this.props.container.data.members.length} members</Text>
                  <Image style={commonStyles.moreIconSty} source={require('../../img/icon_gd.png')} />
                </Touch>
              </View>
              <Touch style={[commonStyles.addItemsBox, commonStyles.flexBox]}  
                activeOpacity={1}  
                onPress={() => this._showDialog()}
              >
                <Text style={[commonStyles.addItemsText, { color:'#9B9B9B', textAlign:'center'}]}>Delete home</Text>
              </Touch>
            </ScrollView>
            <ModalDialog
              _dialogVisible={this.state.isDialogVisible}
              _dialogLeftBtnAction={() => {
                this.hideDialog();
              }}
              _dialogRightBtnAction={() => {
                deleteFamily(
                  this.props.container.userInfoData.token,
                  this.props.container.data.id
                );
                this.hideDialog();
                Toast.loading('Loading', 0);
              }}
            />
            <ModalInput
              ref='childern'
              _popupInputBoxVisible={this.state.isShowFamilyNamePop}
              _popupInputBoxTitle = {"Edit family name"}
              _popupInputBoxDefaultText = {this.props.container.data.name}
              _popupInputBoxLeftBtnAction ={() => {this.setState({isShowFamilyNamePop: false})}}
              _popupInputBoxRightBtnAction ={() => {
                if(this.refs.childern.state.value != this.props.container.data.name && this.refs.childern.state.value != '' && 
                  this.refs.childern.state.value.length < 32){
                    this.props.container.data.name = this.refs.childern.state.value;
                    console.log(this.refs.childern.state.value.length )
                    updateFamilyInfo(
                      {
                        name: this.refs.childern.state.value,
                        local: ''
                      },
                      this.props.container.userInfoData.token,
                      this.props.container.data.id
                    );
                } else{
                  Toast.info("Length cannot be greater than 32",  2, undefined, false);
                }
                this.setState({isShowFamilyNamePop: false})
                console.log(this.refs.childern.state.value)
              }}
            />
            <ModalInput
              ref='secondChildern'
              _popupInputBoxVisible={this.state.isShowFamilyLocalPop}
              _popupInputBoxTitle = {"Edit family location"}
              _popupInputBoxDefaultText = {this.props.container.data.local}
              _popupInputBoxLeftBtnAction ={() => {this.setState({isShowFamilyLocalPop: false})}}
              _popupInputBoxRightBtnAction ={() => {
                if(this.refs.secondChildern.state.value != this.props.container.data.local && this.refs.secondChildern.state.value != '' &&
                   this.refs.secondChildern.state.value.length < 64){
                    this.props.container.data.local = this.refs.secondChildern.state.value;
                    updateFamilyInfo(
                      {
                        local: this.refs.secondChildern.state.value,
                        name: ''
                      },
                      this.props.container.userInfoData.token,
                      this.props.container.data.id
                    );
                } else {
                  Toast.info("Length cannot be greater than 64",  2, undefined, false);
                }
                this.setState({isShowFamilyLocalPop: false})
                console.log(this.refs.secondChildern.state.value)
              }}
            />
          </SafeAreaView>
        );
      } else {
        return <Loading />
      }
    } else {
      return <Loading />
    }
  }
}

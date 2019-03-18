import React, { Component } from 'react';
import { Text, ScrollView, SafeAreaView, Image, StyleSheet, View, Platform, StatusBar } from 'react-native';
import { Modal, Toast } from 'antd-mobile-rn';
import { commonStyles } from '../../tools/layout';
import Touch from 'react-native-touch-once';
import Swipeout from 'react-native-swipeout';
import { EventRegister } from 'react-native-event-listeners';
import {iconCollect, deviceInfoData} from '../../tools/mockData';
import deviceCommand from '../../tools/deviceCommand';
import { postAddScene } from '../../network_request/fetch_api';
import ModalInput from '../common/ModalInput';
import ModalDialog from '../common/ModalDialog';
export default class CreateNewScene extends Component {
  constructor(props) {
    super(props);
    this.currentSceneName = "Enter a name";
    this.state = {
        checkedIconName: null,
        isShowDelSceneMsg: false,
        rowIndex: null, 
        refresh: false,
        isShowSceneNamePop: false,
        isShowDelAction: false,
      }
    this.updateIconId = null;
    this.promptInfo = null;
    this.addSceneArr = [];
    this.swipeoutBtns = [
        {
          text: 'DELETE',
          onPress: ()=>(this.swipeHandleDelete()),
          backgroundColor: 'red',
          color: 'white',
        }
    ];
    this.showSortObj = {};
    this.removeActionIndex = null;  //动作数组的下标（传给删除）
  }


    componentWillMount() {
        this.props.container.navigation.setParams({ createNewScene: this.createNewScene });
        this.iconListener = EventRegister.addEventListener(
            'chooseIconEvent', icon_name => {
                this.setState({
                    checkedIconName: icon_name,
                });
                console.log(icon_name);
                console.log(this.state.checkedIconName);
                this.updateIconId = this._getIconIdValue( iconCollect, icon_name);
                console.log(this.updateIconId + "图片的id");
            }, 
        );
        this.deviceListener = EventRegister.addEventListener( 'addDeviceOperate', deviceItem => {
            if(this.addSceneArr.length == 0){
                this.addSceneArr.push(deviceItem);
            } else {
                let isHasDevice = [];
                for(index in this.addSceneArr) {
                    isHasDevice.push(this.addSceneArr[index].equipment_id);
                }
                if(isHasDevice.indexOf(deviceItem.equipment_id) == -1){
                    this.addSceneArr.push(deviceItem);
                    console.log("mieyou---" + this.addSceneArr[index].equipment_id)
                } else {
                    console.log("等于了---" + this.addSceneArr[index].equipment_id)
                    this.addSceneArr.splice(index,1,deviceItem);
                }
            
            }
            console.log(this.addSceneArr)
            if(this.addSceneArr.length != 0){
                this.setState({refresh: true});
            }
        })

        this.addSceneListener = EventRegister.addEventListener('addSceneSucc', data => {
            Toast.info(data.msg, 2, undefined, false);
            if(this.props.container.navigation.state.params.page == 'smartHomeTab'){
                this.props.container.navigation.pop();
            } else {
                this.props.container.navigation.pop(2);
            }
        });
    }

    createNewScene = () => {
        if(this.currentSceneName == "Enter a name" || this.addSceneArr.length == 0){
            Toast.info("Please set the scene name or add specific actions",  2, undefined, false);
        } else {
            if(this.updateIconId == null){
                this.updateIconId = 1;
            }
            postAddScene(
                {
                    name: this.currentSceneName,
                    icon: this.updateIconId,
                    action_type: "A",
                    contents: this.addSceneArr
                },
                this.props.container.userInfoData.token,
                this.props.container.userInfoData.globalHomeId
            );
            Toast.loading('Loading', 0);

            
        }
    }

    // editorScene = () => {
    //     Modal.prompt(
    //         '编辑场景名称',
    //         null,
    //         (sceneName) => {
    //         // console.log(`password: ${sceneName}`)
    //         if(sceneName == null ){
    //             Toast.info("场景名称不能为空！");
    //         } else {
    //             this.setState({
    //                 currentSceneName: sceneName
    //             })
    //         }
            
    //         },
    //         'default',
    //         null,
    //         [this.state.currentSceneName],
    //     );
    // }

    onSwipeOpen (rowIndex) {
        this.setState({
            rowIndex: rowIndex
        })
    }

    onSwipeClose(rowIndex) {
        if (rowIndex === this.state.rowIndex) {
            this.setState({ rowIndex: null });
        }
    } 

    _getIconIdValue = (iconArray, value) => {
        for (const key in iconArray) {
            if (iconArray.hasOwnProperty(key)) {
                if (iconArray[key] == value) {
                    return key;
                }
            }
        }
    };

    _getIconIdValue2 = (iconArray, value) => {
        for (const key in iconArray) {
            if (iconArray.hasOwnProperty(key)) {
                if (key == value) {
                    return iconArray[key];
                }
            }
        }
    };
    

    isSHowDelModal = () => {
        this.setState({isShowDelSceneMsg: true})
    }

    swipeHandleDelete = () => {
        console.log(this.state.rowIndex)
        let str = this.state.rowIndex.substring(0,1);
        this.removeActionIndex = str;
        // let str_after = this.state.rowIndex;
            // str  = str.split("_")[0];
            // str.substring(0,1)
        //     str_after = str_after.split("_")[1];
            // console.log(str)
            // console.log(str_after)
        // let operateList = this.addSceneArr[str].operation;
        // delete operateList[str_after];
        // if(Object.keys(this.addSceneArr[str].operation).length == 0){
        //     this.addSceneArr.splice(str, 1);
        // }


        this.setState({isShowDelAction: true})
    }

    _getDeviceIdValue = (iconArray, value) => {
        for (const key in iconArray) {
            if (iconArray.hasOwnProperty(key)) {
                if (iconArray[key] == value) {
                    return key;
                }
            }
        }
    };

    componentWillUnmount() {
        EventRegister.removeEventListener(this.iconListener);
        EventRegister.removeEventListener(this.deviceListener);
    }
    
  render() {
          return (
            <SafeAreaView style={commonStyles.containGrayWrap}>
              <ScrollView>
                  <View style={[commonStyles.setionListBox, {paddingHorizontal:0, marginTop:0}]}>
                      <Touch style={[commonStyles.setionItems, commonStyles.flexBox, commonStyles.lineSty,{ paddingHorizontal:20}]}
                          onPress={() => this.setState({isShowSceneNamePop: true})}
                      >
                          <Text style={commonStyles.setionItemText}>Scene name</Text>
                          <Text style={commonStyles.familyName}>{this.currentSceneName }</Text>
                          <Image style={commonStyles.moreIconSty} source={require('../../img/icon_gd.png')} />
                      </Touch>
                      
                  </View>
                  <View style={[commonStyles.setionListBox, {paddingHorizontal:0}]}>
                      <Touch style={[commonStyles.setionItems, commonStyles.flexBox, commonStyles.lineSty,{ paddingHorizontal:20}]}
                          onPress={() => this.props.container.navigation.navigate('SceneIcon')}
                      >
                          <Text style={commonStyles.setionItemText}>Scene icon</Text>
                              <Image style={{ width:30, height:30}} 
                                source={
                                    this.state.checkedIconName == null 
                                    ? require('../../img/icon_tb1.png')
                                    : {uri:this.state.checkedIconName}
                                    } 
                              />
                          
                          <Image style={commonStyles.moreIconSty} source={require('../../img/icon_gd.png')} />
                      </Touch>
                  </View>
                  <View style={commonStyles.addDevicesBox}>
                          <Text style={commonStyles.noHere}>When clicking on the {this.currentSceneName == "Enter a name" ? "'current'" : `"${this.currentSceneName}"` } scene</Text>
                      
                      <View style={[commonStyles.addPerformBox, {paddingBottom: 40}]}>
                          <Text style={[commonStyles.performTit, commonStyles.padLR20]}>Then will do the following</Text>
                          {this.addSceneArr.length == 0 ? (
                            <Touch style={[commonStyles.performWrap, commonStyles.flexBox, {marginHorizontal: 20}]}
                                  onPress={() => this.props.container.navigation.navigate('ChooseEquipment', {where: 'creatNewScene'})}
                              >
                                  <Text style={commonStyles.performText}>Add execution action</Text>
                              </Touch> 
                          ) : (
                              <View style={styles.devicesBorder}>
                                  {this.addSceneArr.map((item, index) => {
                                      console.log(this.addSceneArr)
                                      this.showSortObj = this._getIconIdValue2(deviceInfoData, item.equipment_name);
                                      console.log(this.showSortObj)
                                         let childrenData = Object.keys(item.operation).map((info, idx) => {
                                          return(
                                              <Swipeout right={this.swipeoutBtns} backgroundColor={'white'}
                                                  key={`${index}_${idx}`}
                                                //   onOpen={()=>(this.onSwipeOpen(index))}
                                                //   close={this.state.rowIndex !== index}
                                                //   onClose={()=>(this.onSwipeClose(index))}
                                                //   rowIndex={index}
                                                  onOpen={()=>(this.onSwipeOpen(`${index}_${info}`))}
                                                  close={this.state.rowIndex !== `${index}_${info}`}
                                                  onClose={()=>(this.onSwipeClose(`${index}_${info}`))}
                                                  rowIndex={`${index}_${info}`}
                                                  sectionId={0}
                                                  autoClose={true}
                                                  scroll={event => console.log(event) }
                                              >
                                                  <Touch style={[commonStyles.flexBox, commonStyles.padLR20, {height: 80}]}
                                                      key={index}
                                                  >
                                                      <Image style={commonStyles.deviceImg} source={require('../../img/pic_fs.png')} />
                                                      <View style={commonStyles.currentRoomDevTextBox}>
                                                          <Text style={commonStyles.deviceText}>{item.equipment_name}</Text>
                                                          <Text style={[commonStyles.deviceTextStatus, {color:'#8E8E93'}]}>{item.room_name}</Text>
                                                      </View>
                                                        <Text style={styles.scenceDeviceStatus}>{`${this._getIconIdValue2(this.showSortObj['action'][0], info)}：${item.operation[info]}`}</Text>
                                                  </Touch>
                                              </Swipeout>
                                          )
                                      })
                                      return(
                                          <View key= {index}>
                                              {childrenData}
                                          </View>
                                      )
                                  })} 
                              </View> 
                          )}
                              
                          
                          {this.addSceneArr.length != 0 ? (
                              <Touch style={[commonStyles.addItemsBox, commonStyles.flexBox, {marginTop: 0}]}  activeOpacity={1}  
                                  onPress={() => this.props.container.navigation.navigate('ChooseEquipment', {where: 'creatNewScene'})}
                              >
                                  <Text style={commonStyles.addItemsText}>Add</Text>
                              </Touch>
                          ) : null}
                      </View>
                </View>

              </ScrollView>

              <ModalDialog
                _dialogVisible={this.state.isShowDelAction}
                _dialogTitle={"You sure you want to delete it?"}
                _dialogContent={"After the action is deleted, all actions under the device will be deleted."}
                _dialogLeftBtnAction={() => {
                    this.setState({isShowDelAction: false})
                }}
                _dialogRightBtnAction={() => {
                    this.addSceneArr.splice(this.removeActionIndex, 1);
                    this.setState({isShowDelAction: false});
                }}
             />

              <ModalInput
                ref='setUpScenenNameNode'
                _popupInputBoxVisible={this.state.isShowSceneNamePop}
                _popupInputBoxTitle = {"Please enter a scene name"}
                _popupInputBoxDefaultText = {this.currentSceneName}
                _popupInputBoxLeftBtnAction ={() => {this.setState({isShowSceneNamePop: false})}}
                _popupInputBoxRightBtnAction ={() => {
                    this.refs.setUpScenenNameNode.state.value = this.refs.setUpScenenNameNode.state.value.replace(/\s+/g,"");
                    if(this.refs.setUpScenenNameNode.state.value != this.currentSceneName && this.refs.setUpScenenNameNode.state.value != '' && this.refs.setUpScenenNameNode.state.value.length < 32){
                        this.currentSceneName = this.refs.setUpScenenNameNode.state.value;
                    } else {
                        Toast.info("Length cannot be greater than 32",  2, undefined, false);
                    }
                    this.setState({isShowSceneNamePop: false})
                    console.log(this.refs.setUpScenenNameNode.state.value)
                }}
            />

             </SafeAreaView>
          );
  }
}


const styles = StyleSheet.create({
    devicesBorder:{
      borderTopWidth: 1,
      borderTopColor: '#F2F2F2',
      borderBottomWidth: 1,
      borderBottomColor: '#F2F2F2'
    },
    deviceStatus:{
        fontSize: 17,
        color: '#2C2D30'
    }
  });
import React, { Component } from 'react';
import { Text, ScrollView, SafeAreaView, Image, StyleSheet, Dimensions, View, Switch, StatusBar, Platform } from 'react-native';
import { WingBlank, Modal, Toast } from 'antd-mobile-rn';
import { commonStyles } from '../../tools/layout';
import Touch from 'react-native-touch-once';
import { Header } from 'react-navigation';
import Swipeout from 'react-native-swipeout';
import { EventRegister } from 'react-native-event-listeners';
import {iconCollect, deviceInfoData} from '../../tools/mockData';
import deviceCommand from '../../tools/deviceCommand';
import { putUpdateSceneName, deleteSceneContent } from '../../network_request/fetch_api';
import ModalDialog from '../common/ModalDialog';
import Loading from '../common/Loading';
import { putUpdateSceneContent } from '../../network_request/fetch_api';
import ModalInput from '../common/ModalInput';

export default class SceneSetUp extends Component {
  constructor(props) {
    super(props);
    this.currentSceneName = this.props.container.navigation.state.params.sceneName;
    this.state = {
        checkedIconName: null,
        isShowDelSceneMsg: false,
        rowIndex: null,
        isShowDelAction: false,
        clear: true,
        isUpdateDom: false,
        isShowEditSceneNamePop: false,
      }
    this.updateIconId = null;
    this.deviceWorkArr = [];
    this.delSceneActionIndex = null;
    this.delSceneContentId = null;
    this.swipeoutBtns = [
        {
          text: 'DELETE',
          onPress: ()=>(this.swipeHandleDelete()),
          backgroundColor: 'red',
          color: 'white',
        }
    ];
    this.addNewSceneArr = [];
    this.updateOldSceneArr = [];
    this.deleteOldSceneArr = [];
    this.initialData = [];
  }

    componentWillMount() {
        this.props.container.navigation.setParams({ saveUpdateScene: this.saveUpdateScene });
        this.props.container.navigation.setParams({ goBack: this._goBack });
        this.iconListener = EventRegister.addEventListener(
            'chooseIconEvent', icon_name => {
                this.setState({
                    checkedIconName: icon_name,
                });
                console.log(icon_name);
                this.updateIconId = this._getIconIdValue( iconCollect, icon_name);
                console.log(this.updateIconId + "图片的id");
                if(this.updateIconId != this.props.container.data.scene[0].icon){
                    putUpdateSceneName(
                        {
                            icon: this.updateIconId,
                        },
                        this.props.container.userInfoData.token,
                        this.props.container.navigation.state.params.sceneId
                    );
                }
            }, 
        );

        this.delSceneListener = EventRegister.addEventListener(
            'delScene', msg => {
                Toast.info(msg);
                this.props.container.navigation.goBack()
            }, 
        );

        this.updateDeviceOperateListener = EventRegister.addEventListener( 'updateDeviceOperate', updateOriginalData => {
            console.log(this.deviceWorkArr);
            let updateItem = {};
            for (let i=0; i < this.deviceWorkArr.length; i++) {
                if(this.deviceWorkArr[i].operation_equipment == updateOriginalData.operation_equipment){
                    for (const key in updateOriginalData.operation_order) {
                        if (this.deviceWorkArr[i].operation_order.hasOwnProperty(key)) {
                            this.deviceWorkArr[i].operation_order[key] = updateOriginalData.operation_order[key];
                        } else{
                            this.deviceWorkArr[i].operation_order[key] = updateOriginalData.operation_order[key]; 
                            console.log("没有这个"+ key)
                        }
                    }
                    if(this.deviceWorkArr[i].content_id != 0){
                        if(this.updateOldSceneArr.indexOf(this.deviceWorkArr[i].content_id) == -1){   
                            updateItem["content_id"] = this.deviceWorkArr[i].content_id;
                            updateItem["operation_order"] = this.deviceWorkArr[i].operation_order;
                            this.updateOldSceneArr.push(updateItem);
                        }
                    }
                }
                
            }
            this.setState({isUpdateDom: true});
            console.log(this.deviceWorkArr);       
        })

        this.editSceneAddDevListener = EventRegister.addEventListener( 'editSceneAddDev', oldAddData => {
            let abc = [];
            for(var i in this.deviceWorkArr){
                abc.push(this.deviceWorkArr[i].operation_equipment);   
            }
            let resultIndex = abc.indexOf(oldAddData.operation_equipment);
            if(resultIndex == -1){
                this.deviceWorkArr.push(oldAddData);
                this.addNewSceneArr.push(oldAddData);
                console.log("aaaaaaaaaaaaa")
                this.setState({clear: false})
            } else {
                Toast.info("The device is already in the current scene")
                console.log("uiuiuiuiuiuiui")
            }
        })
        
        
        
    }

    saveUpdateScene =() => {
        // console.log(this.addNewSceneArr.length +"添加场景的长度");
        // console.log(this.updateOldSceneArr.length + "修改的场景");
        // console.log(this.deleteOldSceneArr.length + "删除的场景内容ID");
        // console.log(this.addNewSceneArr);
        // console.log(this.updateOldSceneArr);
        console.log(this.deleteOldSceneArr);
        if(this.addNewSceneArr.length == 0 && this.updateOldSceneArr.length == 0 && this.deleteOldSceneArr.length ==0){
            this.props.container.navigation.pop();
        } else{
            if(this.deviceWorkArr.length == 0){
                Toast.info("Scene action can't be empty!", 2, undefined, false);
            } else {
                putUpdateSceneContent(
                    {
                        scene_id: this.props.container.navigation.state.params.sceneId,
                        scene_created: this.addNewSceneArr,
                        scene_delete: this.deleteOldSceneArr,
                        scene_update: this.updateOldSceneArr
                    },
                    this.props.container.userInfoData.token,
                    this.props.container.navigation.state.params.sceneId
                );
                this.props.container.navigation.pop();
            }
        }
    }

    _goBack = () => {
        if(this.deviceWorkArr.length == 0){
            Toast.info("Scene action can't be empty!", 2, undefined, false);
        } else {
            this.props.container.navigation.pop();
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
    //             putUpdateSceneName(
    //             {
    //                 name: sceneName,
    //             },
    //             this.props.container.userInfoData.token,
    //             this.props.container.navigation.state.params.sceneId
    //             );
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

    _delScene = () => {
        Toast.info("Loading...", 0);
        console.log(this.props.container.userInfoData.globalHomeId)
        deleteSceneContent(
            {
                scene_id: this.props.container.navigation.state.params.sceneId,
            },
            this.props.container.userInfoData.token,
            this.props.container.userInfoData.globalHomeId,
        );
        this.setState({isShowDelSceneMsg: false})
    }

    swipeHandleDelete = () => {
        // 删除单个动作后移除整个设备
        let str = this.state.rowIndex;
        this.delSceneActionIndex  = str.split("_")[0];
        let str_after = this.state.rowIndex;
        let index = str_after.lastIndexOf("\_");  
        this.delSceneContentId = str_after.substring(index + 1);
        // console.log(this.delSceneActionIndex)
        console.log('----'+ this.delSceneContentId);
        this.setState({isShowDelAction: true})
    }

    componentWillUnmount() {
        EventRegister.removeEventListener(this.listener);
        EventRegister.removeEventListener(this.delSceneListener);
        EventRegister.removeEventListener(this.updateDeviceOperateListener); 
        EventRegister.removeEventListener(this.editSceneAddDevListener); 
        
        // alert("909090")
    }
    
  render() {
    let sceneContentArr = [];
    // console.log(Object.keys(this.props.container.data).length + "获取数据的长度");
    if(Object.keys(this.props.container.data).length != 0 && this.state.clear){
        for(key in this.props.container.data) {
          if(key != "scene" ){
            let length = this.props.container.data[key].length;
            for (let i=0; i < length; i++) {
                sceneContentArr.push(this.props.container.data[key][i])
            }
          }
        }
        this.deviceWorkArr = sceneContentArr;
        this.initialData = sceneContentArr;
    } 
      if(!this.props.container.isLoading && Object.keys(this.props.container.data).length != 0){
          return (
            <SafeAreaView style={commonStyles.containGrayWrap}>
              <ScrollView>
                  <View style={[commonStyles.setionListBox, {paddingHorizontal:0, marginTop:0}]}>
                      <Touch style={[commonStyles.setionItems, commonStyles.flexBox, commonStyles.lineSty,{ paddingHorizontal:20}]}
                          onPress={() => this.setState({isShowEditSceneNamePop: true})}
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
                              <Image style={{ width:30, height:30}} source={{
                                  uri: this.state.checkedIconName == null 
                                  ? this._getIconIdValue2(iconCollect, this.props.container.data.scene[0].icon) 
                                  : this.state.checkedIconName}} 
                              />
                          
                          <Image style={commonStyles.moreIconSty} source={require('../../img/icon_gd.png')} />
                      </Touch>
                  </View>
                  <View style={commonStyles.addDevicesBox}>
                      <Text style={commonStyles.noHere}>When clicking on the "{this.props.container.data.scene[0].name}"scene</Text>
                      <View style={[commonStyles.addPerformBox, {paddingBottom: this.deviceWorkArr.length == 0 ? 40 : 0}]}>
                          <Text style={[commonStyles.performTit, commonStyles.padLR20]}>Then will do the following</Text>
                          {this.deviceWorkArr.length == 0 ? (
                              <Touch style={[commonStyles.performWrap, commonStyles.flexBox, {marginHorizontal: 20}]}
                                  onPress={() => this.props.container.navigation.navigate('ChooseEquipment', {page: 'editScene', where: 'creatNewScene'})}
                              >
                                  <Text style={commonStyles.performText}>Add execution action</Text>
                              </Touch> 
                          ) : (
                              <View style={styles.devicesBorder}>
                                  {this.deviceWorkArr.map((item, index) => {
                                      let showSortObj = this._getIconIdValue2(deviceInfoData, item.operation_equipment__name);
                                      console.log(Object.keys(item.operation_order))
                                      let childrenData = Object.keys(item.operation_order).map((info, idx) => {
                                          return(
                                              <Swipeout right={this.swipeoutBtns} backgroundColor={'white'}
                                                  key={`${index}_${idx}`}
                                                  onOpen={()=>(this.onSwipeOpen(`${index}_${info}_${item.content_id}`))}
                                                  close={this.state.rowIndex !== `${index}_${info}_${item.content_id}`}
                                                  onClose={()=>(this.onSwipeClose(`${index}_${info}_${item.content_id}`))}
                                                  rowIndex={`${index}_${info}_${item.content_id}`}
                                                  sectionId={0}
                                                  autoClose={true}
                                                  scroll={event => console.log(event) }
                                              >
                                                  <Touch style={[commonStyles.flexBox, commonStyles.padLR20, {height: 80}]}
                                                    onPress = {() => this.props.container.navigation.navigate(showSortObj['route'], {page: 'sceneSetUp', deviceAction: item})}
                                                      key={index}
                                                  >
                                                      <Image style={commonStyles.deviceImg} source={require('../../img/pic_fs.png')} />
                                                      <View style={commonStyles.currentRoomDevTextBox}>
                                                          <Text style={commonStyles.deviceText}>{item.operation_equipment__name}</Text>
                                                          <Text style={[commonStyles.deviceTextStatus, {color:'#8E8E93'}]}>{item.operation_equipment__room_name}</Text>
                                                      </View>
                                                      <Text style={styles.scenceDeviceStatus}>{`${info}: ${item.operation_order[info]}`}</Text>
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
                          {this.deviceWorkArr.length != 0 ? (
                              <Touch style={[commonStyles.addItemsBox, commonStyles.flexBox, {marginTop: 0}]}  activeOpacity={1}  
                                  onPress={() => {
                                      this.props.container.navigation.navigate('ChooseEquipment', 
                                      {sceneId: this.props.container.navigation.state.params.sceneId, page: 'editScene', where: 'creatNewScene'})
                                    }}
                              >
                                  <Text style={commonStyles.addItemsText}>Add</Text>
                              </Touch>
                          ) : null}
                      </View>
                </View>
                  {this.deviceWorkArr.length != 0 ? (
                          <Touch style={[commonStyles.addItemsBox, commonStyles.flexBox]}  
                          activeOpacity={1}  
                          onPress={() => this.isSHowDelModal()}
                      >
                              <Text style={[commonStyles.addItemsText, { color:'#9B9B9B', textAlign:'center'}]}>DELETE</Text>
                      </Touch>
                  ) : null }
              </ScrollView>
              <ModalDialog
                _dialogVisible={this.state.isShowDelSceneMsg}
                _dialogTitle={"You sure you want to delete it?"}
                _dialogContent={"Device tasks will not work properly after deletion"}
                _dialogLeftBtnAction={() => {
                    this.setState({isShowDelSceneMsg: false})
                }}
                _dialogRightBtnAction={() => {
                    this._delScene();
                }}
             />

             <ModalDialog
                _dialogVisible={this.state.isShowDelAction}
                _dialogTitle={"You sure you want to delete it?"}
                _dialogContent={"After the action is deleted, all actions under the device will be deleted."}
                _dialogLeftBtnAction={() => {
                    this.setState({isShowDelAction: false})
                }}
                _dialogRightBtnAction={() => {
                    this.deviceWorkArr.splice(this.delSceneActionIndex, 1);
                    this.setState({isShowDelAction: false, clear: false});
                    if(this.delSceneContentId != 0) {
                        this.deleteOldSceneArr.push(this.delSceneContentId); 
                    }
                }}
             />
             <ModalInput
                ref='editSceneNameNode'
                _popupInputBoxVisible={this.state.isShowEditSceneNamePop}
                _popupInputBoxTitle = {"Edit scene name"}
                _popupInputBoxDefaultText = {this.currentSceneName}
                _popupInputBoxLeftBtnAction ={() => {this.setState({isShowEditSceneNamePop: false})}}
                _popupInputBoxRightBtnAction ={() => {
                this.refs.editSceneNameNode.state.value = this.refs.editSceneNameNode.state.value.replace(/\s+/g,"");
                if(this.refs.editSceneNameNode.state.value != this.currentSceneName && this.refs.editSceneNameNode.state.value != '' && this.refs.editSceneNameNode.state.value.length < 32){
                    this.currentSceneName = this.refs.editSceneNameNode.state.value;
                    putUpdateSceneName(
                    {
                        name: this.currentSceneName,
                    },
                    this.props.container.userInfoData.token,
                    this.props.container.navigation.state.params.sceneId
                    );
                } else {
                    Toast.info("Length cannot be greater than 32",  2, undefined, false);
                }
                this.setState({isShowEditSceneNamePop: false})
                console.log(this.refs.editSceneNameNode.state.value)
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
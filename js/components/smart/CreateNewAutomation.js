import React, { Component } from 'react';
import { Text, ScrollView, SafeAreaView, Image, StyleSheet, View } from 'react-native';
import { Modal, ActionSheet, Toast } from 'antd-mobile-rn';
import { commonStyles } from '../../tools/layout';
import Touch from 'react-native-touch-once';
import Picker from 'react-native-picker';
import { EventRegister } from 'react-native-event-listeners';
import getObjKey from '../../tools/getObjKey';
import getObjValue from '../../tools/getObjValue';
import {iconCollect, deviceInfoData} from '../../tools/mockData';
import { postAddAutoMation } from '../../network_request/fetch_api';
import Swipeout from 'react-native-swipeout';
import ModalInput from '../common/ModalInput';
import ModalDialog from '../common/ModalDialog';
import sec_to_time_symbol from '../../tools/formatTimeToSymbol';

export default class CreateNewAutomation extends Component {
  constructor(props) {
    super(props); 
    this.currentAutoMationName = "Enter a name";
    this.state = {
        // condition: '当满足任一条件时',
        checkedIconName: null,
        rowIndex: null,
        actionRowIndex: null,
        autoMationCondition:[],
        autoMationAction: [],
        isShowAutoMationNamePop: false,
        isShowDelAction: false,
      };
    this.updateIconId = null;
    this.conditionArr = [];  //条件数组
    this.actionArr = [];   //选择动作页面传递过来的动作数组的集合
    this.addAutoMationArr = [];
    this.removeActionIndex = null;  //动作数组的下标（传给删除）
    this.swipeoutBtns = [
        {
          text: 'DELETE',
          onPress: ()=>(this.swipeHandleDelete()),
          backgroundColor: 'red',
          color: 'white',
        }
    ];
    this.swipeoutActionBtns = [
        {
            text: 'DELETE',
            onPress: ()=>(this.swipeDeleteAction()),
            backgroundColor: 'red',
            color: 'white',
          } 
    ];
}

    swipeHandleDelete = () => {
        let str = this.state.rowIndex;
        let delData = this.state.autoMationCondition;
        delData.splice(str, 1);
        this.setState({autoMationCondition: delData})
    }

    swipeDeleteAction = () => {
        let str = this.state.actionRowIndex;
            str  = str.split("_");
            // console.log(this.state.autoMationAction[str[0]])
            if(this.state.autoMationAction[str[0]].action_type == "Scene"){
                this.state.autoMationAction[str[0]].content.splice(str[1], 1);
            } else {
                this.setState({isShowDelAction: true});
                this.removeActionIndex = str[0];
                // let operateList = this.state.autoMationAction[str[0]].content.operation_order;
                //     delete operateList[str[1]];  
                // if(Object.keys(operateList).length == 0){
                //     this.state.autoMationAction.splice(str[0], 1);
                // }     
            }
            console.log(this.state.autoMationAction)
    }

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

    onSwipeOpenAction (actionRowIndex) {
        console.log(actionRowIndex)
        this.setState({
            actionRowIndex: actionRowIndex
        })
    }

    onSwipeCloseAction(actionRowIndex) {
        if (actionRowIndex === this.state.actionRowIndex) {
            this.setState({ actionRowIndex: null });
        }
    } 

    createNewAutoMation = () => {
        if(this.currentAutoMationName == "Enter a name" || this.state.autoMationCondition.length == 0 || this.state.autoMationAction.length == 0){
            Toast.info("Please set the automation name or add specific actions",  2, undefined, false);
        } else {
            if(this.updateIconId == null){
                this.updateIconId = 1;
            }
            this.addAutoMationArr['condition'] = this.state.autoMationCondition;
            this.addAutoMationArr['content'] = this.state.autoMationAction;
            this.addAutoMationArr['icon'] = this.updateIconId;
            this.addAutoMationArr['name'] = this.currentAutoMationName;
            console.log(this.addAutoMationArr)
            console.log(this.state.autoMationCondition)
            postAddAutoMation(
                {
                    name: this.currentAutoMationName,
                    icon: this.updateIconId,
                    content: this.state.autoMationAction,
                    condition: this.state.autoMationCondition
                },
                this.props.container.userInfoData.token,
                this.props.container.userInfoData.globalHomeId
            );
            Toast.loading('Loading', 0);
        }
    }

    componentWillMount() {
        this.props.container.navigation.setParams({ createNewAutoMation: this.createNewAutoMation });
        this.iconListener = EventRegister.addEventListener(
            'chooseIconEvent', icon_name => {
                this.setState({
                    checkedIconName: icon_name,
                });
                console.log(icon_name);
                this.updateIconId = getObjKey( iconCollect, icon_name);
                console.log(this.updateIconId + "图片的id");
            }, 
        );

        this.addAutoMationSuccListener = EventRegister.addEventListener('addAutoMationSucc', msg => {
            if(this.props.container.navigation.state.params.page == 'smartHomeTab'){
                this.props.container.navigation.pop();
            } else {
                this.props.container.navigation.pop(2);
            }
        });

        this.conditionListener = EventRegister.addEventListener('setUpTiming', condition => {
                // this.conditionArr.push(condition);
                // this.setState({autoMationCondition: this.conditionArr})
                // console.log(this.state.autoMationCondition);
                // let timObj = condition;
                let arr = [];
                for(let index in this.conditionArr){
                    if(Object.prototype.toString.call(this.conditionArr[index].condition_type) == '[object String]'){
                        arr.push(this.conditionArr[index].condition_type);  
                    } else {
                        arr.push("Timing"); 
                    }
                }
                console.log(arr)
                if(arr.indexOf('Timing') == -1){
                    this.conditionArr.push(condition);
                } else{
                    this.conditionArr.splice(arr.indexOf('Timing'),1,condition);
                }
                console.log(this.conditionArr);
                this.setState({autoMationCondition: this.conditionArr})

        });

        this.temperatureListener = EventRegister.addEventListener('setUpTemperature', condition => {
            let arr = [];
            for(let index in this.conditionArr){
                if(Object.prototype.toString.call(this.conditionArr[index].condition_type) == '[object String]'){
                    arr.push(this.conditionArr[index].condition_type);  
                } else {
                    arr.push("Timing"); 
                }
            }
            if(arr.indexOf(condition.condition_type) == -1){
                this.conditionArr.push(condition);
            } else{
                this.conditionArr.splice(arr.indexOf(condition.condition_type),1,condition);
            }
            console.log(this.conditionArr);
            this.setState({autoMationCondition: this.conditionArr})
        });

        

        this.actionListener = EventRegister.addEventListener('chooseSceneEvent', action => {
                let isHasScene = [];   
                let typeArr = [];
                if(this.actionArr.length == 0){
                    this.actionArr.push(action);
                    // this.setState({autoMationAction: this.actionArr});
                } else {
                    for(index in this.actionArr) {
                        typeArr.push(this.actionArr[index].action_type);
                    }
                    console.log(typeArr);
                    if(typeArr.indexOf("Scene") == -1){
                        this.actionArr.push(action);
                    } else{
                        // if (this.actionArr[index].hasOwnProperty("action_type")) {
                        //     if(this.actionArr[index].action_type == "Scene"){
                        //         console.log("是场景列表")
                        //         for( let idx in this.actionArr[index].content){
                        //             isHasScene.push(this.actionArr[index].content[idx].id);
                        //         }
                        //         for(let contId = 0; contId < action.content.length; contId++){
                        //             if(isHasScene.indexOf(action.content[contId].id) == -1){
                        //                 console.log("mieyou---" + action.content[contId].id)
                        //                 this.actionArr[index].content.push(action.content[contId])
                        //             } 
                        //         }
                        //     }
                        // }
                        for(let index in this.actionArr){
                            if(this.actionArr[index].action_type == "Scene"){
                                for( let idx in this.actionArr[index].content){
                                    isHasScene.push(this.actionArr[index].content[idx].id);
                                }
                            }
                        }
                        for(let contId = 0; contId < action.content.length; contId++){
                            if(isHasScene.indexOf(action.content[contId].id) == -1){
                                console.log("mieyou---" + action.content[contId].id)
                                this.actionArr.push(action)
                            } 
                        }
                    }
                    console.log(this.actionArr)
                }
                this.setState({autoMationAction: this.actionArr});
        });

        this.actionDeviceListener = EventRegister.addEventListener('addDeviceAuto', device => {
            console.log(device.content.operation_equipment_id)
            let isHasDevice  = [];
            let typeArr = [];
            if(this.actionArr.length == 0){
                this.actionArr.push(device);
                this.setState({autoMationAction: this.actionArr});
            } else {
                for(index in this.actionArr) {
                    typeArr.push(this.actionArr[index].action_type);
                }
                if(typeArr.indexOf("Device") == -1){
                    this.actionArr.push(device);
                } else {
                    console.log(this.actionArr)
                    for(let i =0; i< this.actionArr.length; i++){
                        if(this.actionArr[i].action_type == "Device"){
                            isHasDevice.push(this.actionArr[i].content.operation_equipment_id);
                        }           
                    }
                    console.log(isHasDevice)
                    if(isHasDevice.indexOf(device.content.operation_equipment_id) == -1){
                        console.log("没有这个设备--------------")
                        this.actionArr.push(device)
                    } else {
                        console.log("有啦，替换吧-------------")
                        this.actionArr.splice(index,1,device);
                    }
                }
            }
            console.log(this.actionArr)
            this.setState({autoMationAction: this.actionArr});
        });
        
    }

    componentWillUnmount() {
        EventRegister.removeEventListener(this.iconListener);
        EventRegister.removeEventListener(this.conditionListener);
        EventRegister.removeEventListener(this.actionListener);
        EventRegister.removeEventListener(this.temperatureListener);
    }

    // editorScene = () => {
    //     Modal.prompt(
    //         '编辑自动化名称',
    //         null,
    //         (autoMationName) => {
    //             if(autoMationName == null ){
    //                 Toast.info("自动化名称不能为空！");
    //             } else {
    //                 this.setState({
    //                     currentAutoMationName: autoMationName
    //                 })
    //             }
    //         },
    //         'default',
    //         null,
    //         [this.state.currentAutoMationName],
    //     );
    // }


    formatCondition = (type) => {
        let resultText = '';
        if(type.constructor === Array){
            let everyDay = [0,1,2,3,4,5,6];
            let workDay = [0,1,2,3,4];
            let onlyOne = [0];
            if(type.sort().toString() == everyDay.sort().toString()){
                resultText = 'Every day';
                return resultText;
            } else if(type.sort().toString() == workDay.sort().toString()){
                resultText = 'Workdays';
                return resultText;
            } else if(type.sort().toString() == onlyOne.sort().toString()){
                resultText = 'Once';
                return resultText;
            }else{
                var N = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"];
                // var N = ["6", "0", "1", "2", "3", "4", "5", "6"];
                var str = type.toString();
                console.log(str);
                str = str.replace(/\,/g, "");
                console.log(str);
                var C_Num = [];
                for(var i = 0; i < str.length; i++){
                    C_Num.push(N[str.charAt(i)]); // str.charAt(i)返回位置 i 的字符
                }
                console.log(C_Num)
                return C_Num.join(',');
            }
        } else {
            resultText = type;
            return resultText; 
        }
    }


//   showActionSheet = () => {
//     const BUTTONS = [
//       '当满足所有条件时',
//       '当满足任一条件时',
//       '取消',
//     ];
//     ActionSheet.showActionSheetWithOptions(
//       {
//         title: '请选择条件的类型',
//         options: BUTTONS,
//         cancelButtonIndex: 2,
//       },
//       (buttonIndex) => {
//           if(buttonIndex < 2){
//               this.setState({ condition: BUTTONS[buttonIndex] });
//           }
//       },
//     );
//   }

  render() {
    // console.log(this.state.autoMationAction);
    return (
      <SafeAreaView style={commonStyles.containGrayWrap}>
        <ScrollView>
            <View style={[commonStyles.setionListBox, {paddingHorizontal:0, marginTop:0}]}>
                <Touch style={[commonStyles.setionItems, commonStyles.flexBox, commonStyles.lineSty,{ paddingHorizontal:20}]}
                    onPress={() => this.setState({isShowAutoMationNamePop: true})}
                >
                    <Text style={[commonStyles.setionItemText, {flex:0, marginRight: 8}]}>Automation name</Text>
                    <Text style={commonStyles.familyName} numberOfLines={1}>{this.currentAutoMationName}</Text>
                    <Image style={commonStyles.moreIconSty} source={require('../../img/icon_gd.png')} />
                </Touch>
            </View>
            <View style={[commonStyles.setionListBox, {paddingHorizontal:0}]}>
                <Touch style={[commonStyles.setionItems, commonStyles.flexBox, commonStyles.lineSty,{ paddingHorizontal:20}]}
                    onPress={() => this.props.container.navigation.navigate('SceneIcon')}
                >
                    <Text style={commonStyles.setionItemText}>Automation icon</Text>
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
            <View style={[commonStyles.addDevicesBox, {marginTop:16, marginBottom: this.state.autoMationCondition.length == 0 ? 20 : 0}]}>
                <View style={[commonStyles.addPerformBox, {paddingBottom: this.state.autoMationCondition.length == 0 ? 40 : 0}]}>
                    <View style={[commonStyles.flexBox, { justifyContent:'flex-start'}]}
                        // onPress={() => this.showActionSheet()}
                    >
                        <Text style={[commonStyles.performTit, {paddingLeft: 20, paddingRight: 10}]}>When any condition is met</Text>
                        <Image style={{width:24, height:24}}source={require('../../img/icon_wdj_qhzh.png')} />
                    </View>
                    {this.state.autoMationCondition.length == 0 ? (
                        <Touch style={[commonStyles.performWrap, commonStyles.flexBox, {marginHorizontal: 20}]}
                            onPress={() => this.props.container.navigation.navigate('ChooseCondition', {operationType: 'addCondition'})}
                        >
                            <Text style={commonStyles.performText}>When one of the following conditions is met</Text>
                        </Touch> 
                    ) : (
                        <View style={styles.devicesBorder}>
                            {this.state.autoMationCondition.map((item, index) => {
                                return (
                                    <Swipeout right={this.swipeoutBtns} backgroundColor={'white'}
                                        key={index}
                                        onOpen={()=>(this.onSwipeOpen(index))}
                                        close={this.state.rowIndex !== index}
                                        onClose={()=>(this.onSwipeClose(index))}
                                        rowIndex={index}
                                        sectionId={0}
                                        autoClose={true}
                                        scroll={event => console.log(event) }   //禁止父级元素滚动
                                    >
                                        <View style={[commonStyles.flexBox, commonStyles.padLR20, {height: 80}]}>
                                            <Image style={commonStyles.deviceImg} source={require('../../img/icon_qc.png')} />
                                            <View style={commonStyles.currentRoomDevTextBox}>
                                                <Text style={commonStyles.deviceText}>{this.formatCondition(item.condition_type)}</Text>
                                                <Text style={[commonStyles.deviceTextStatus, {color:'#8E8E93'}]}>
                                                    {item.condition_type.constructor === Array ? sec_to_time_symbol(item.condition_value) : item.condition_value}
                                                </Text>
                                            </View>
                                        </View>
                                    </Swipeout>
                                );
                            })} 
                        </View>
                    )}
                    {this.state.autoMationCondition.length != 0 ? (
                        <Touch style={[commonStyles.addItemsBox, commonStyles.flexBox, {marginTop: 0}]}  activeOpacity={1}  
                            onPress={() => this.props.container.navigation.navigate('ChooseCondition', {operationType: 'addCondition'})}
                        >
                            <Text style={commonStyles.addItemsText}>Add</Text>
                        </Touch>
                    ) : null}
                </View>
            </View>
            <View style={[commonStyles.addDevicesBox, {marginTop:16}]}>
                <View style={[commonStyles.addPerformBox, {paddingBottom: this.state.autoMationAction.length == 0 ? 40 : 0}]}>
                    <Text style={[commonStyles.performTit, commonStyles.padLR20]}>Then will do the following</Text>
                    {this.state.autoMationAction.length == 0 ? (
                        <Touch style={[commonStyles.performWrap, commonStyles.flexBox, {marginHorizontal: 20}]}
                            onPress={() => this.props.container.navigation.navigate('ChooseAction', {actionType: 'addAutoMationAction'})}
                        >
                            <Text style={commonStyles.performText}>Add execution action</Text>
                        </Touch> 
                    ) : (
                        <View style={styles.devicesBorder}>
                            {this.state.autoMationAction.map((item, index) => {
                                let childrenData = null;
                                let showDeviceObj = getObjValue(deviceInfoData, item.content.operation_equipment__name);
                                if(item.action_type == 'Scene'){
                                    childrenData = item.content.map((info, idx) => {
                                        return (
                                            <Swipeout right={this.swipeoutActionBtns} backgroundColor={'white'}
                                                key={`${index}_${idx}`}
                                                onOpen={()=>(this.onSwipeOpenAction(`${index}_${idx}`))}
                                                close={this.state.actionRowIndex !== `${index}_${idx}`}
                                                onClose={()=>(this.onSwipeCloseAction(`${index}_${idx}`))}
                                                // actionRowIndex={`${index}_${idx}`}
                                                sectionId={0}
                                                autoClose={true}
                                                scroll={event => console.log(event) }
                                            >
                                                <View style={[commonStyles.flexBox, commonStyles.padLR20, {height: 80}]}
                                                    // key={`${index}_${idx}`}
                                                >
                                                    <Image style={commonStyles.deviceImg} source={{uri: getObjValue(iconCollect, info.icon)}} />
                                                    <View style={commonStyles.currentRoomDevTextBox}>
                                                        <Text style={commonStyles.deviceText}>{info.name}</Text>
                                                        <Text style={[commonStyles.deviceTextStatus, {color:'#8E8E93'}]}>{item.action_type}</Text>
                                                    </View>
                                                    <Text style={styles.deviceStatus}>Run</Text>
                                                </View>
                                            </Swipeout>
                                        );
                                    })
                                } else {
                                    childrenData = Object.keys(item.content.operation_order).map((info, idx) => {
                                        console.log(showDeviceObj['action'][0])
                                        console.log()
                                        return (
                                            <Swipeout right={this.swipeoutActionBtns} backgroundColor={'white'}
                                                key={`${index}_${idx}`}
                                                onOpen={()=>(this.onSwipeOpenAction(`${index}_${info}`))}
                                                close={this.state.actionRowIndex !== `${index}_${info}`}
                                                onClose={()=>(this.onSwipeCloseAction(`${index}_${info}`))}
                                                // actionRowIndex={`${index}_${idx}`}
                                                // sectionId={0}
                                                autoClose={true}
                                                scroll={event => console.log(event) }
                                            >
                                                <View style={[commonStyles.flexBox, commonStyles.padLR20, {height: 80}]}
                                                    // key={`${index}_${idx}`}
                                                >
                                                {/* <Image style={commonStyles.deviceImg} source={{uri: showDeviceObj.image}} /> */}
                                                    <Image style={commonStyles.deviceImg} source={require('../../img/pic_fs.png')} />
                                                    <View style={commonStyles.currentRoomDevTextBox}>
                                                        <Text style={commonStyles.deviceText}>{item.content.operation_equipment__name}</Text>
                                                        <Text style={[commonStyles.deviceTextStatus, {color:'#8E8E93'}]}>{item.action_type}</Text>
                                                    </View>
                                                    <Text style={styles.scenceDeviceStatus}>{getObjValue(showDeviceObj['action'][0], info)}<Text>{`: ${item.content.operation_order[info]}`}</Text></Text>
                                                </View>
                                            </Swipeout>
                                        );
                                    })
                                }
                                return(<View key= {index}>{childrenData}</View>)
                            })} 
                        </View>
                    )}
                    {this.state.autoMationAction.length != 0 ? (
                        <Touch style={[commonStyles.addItemsBox, commonStyles.flexBox, {marginTop: 0}]}  activeOpacity={1}  
                            onPress={() => this.props.container.navigation.navigate('ChooseAction', {actionType: 'addAutoMationAction'} )}
                        >
                            <Text style={commonStyles.addItemsText}>Add</Text>
                        </Touch>
                    ) : null}
                </View>
          </View>
{/* <Touch style={{ backgroundColor:'#fff'}} onPress={() => {
     let data = [
        [1,2,3,4],
        [5,6,7,8,],
    ];
     Picker.init({
        pickerData: data,
        selectedValue: [1,5],
        pickerBg:[255, 255, 255, 1],  //内容背景颜色
        pickerToolBarBg: [252, 191, 0, 1], //工具栏背景色
        // onPickerConfirm: data => {
        //     console.log(data);
        // },
        // onPickerCancel: data => {
        //     console.log(data);
        // },
        // onPickerSelect: data => {
        //     console.log(data);
        // }
    });
    Picker.show();



        
}}>

</Touch> */}

        </ScrollView>
        <ModalInput
              ref='setUpAutoMationNameNode'
              _popupInputBoxVisible={this.state.isShowAutoMationNamePop}
              _popupInputBoxTitle = {"Please enter an automation name"}
              _popupInputBoxDefaultText = {this.currentAutoMationName}
              _popupInputBoxLeftBtnAction ={() => {this.setState({isShowAutoMationNamePop: false})}}
              _popupInputBoxRightBtnAction ={() => {
                this.refs.setUpAutoMationNameNode.state.value = this.refs.setUpAutoMationNameNode.state.value.replace(/\s+/g,"");
                if(this.refs.setUpAutoMationNameNode.state.value != this.currentAutoMationName && this.refs.setUpAutoMationNameNode.state.value != '' &&
                   this.refs.setUpAutoMationNameNode.state.value.length < 32){
                    this.currentAutoMationName = this.refs.setUpAutoMationNameNode.state.value;
                } else {
                    Toast.info("Length cannot be greater than 32",  2, undefined, false);
                }
                this.setState({isShowAutoMationNamePop: false})
                console.log(this.refs.setUpAutoMationNameNode.state.value)
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
                    this.state.autoMationAction.splice(this.removeActionIndex, 1);
                    this.setState({isShowDelAction: false});
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
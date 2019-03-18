import React, { Component } from 'react';
import { commonStyles } from '../../tools/layout';
import { Modal, Toast } from 'antd-mobile-rn';
import { Text, ScrollView, SafeAreaView, Image, StyleSheet, View } from 'react-native';
import Touch from 'react-native-touch-once';
import Loading from '../common/Loading';
import getObjValue from '../../tools/getObjValue';
import getObjKey from '../../tools/getObjKey';
import { EventRegister } from 'react-native-event-listeners';
import {iconCollect, deviceInfoData} from '../../tools/mockData';
import Swipeout from 'react-native-swipeout';
import ModalDialog from '../common/ModalDialog';
import ModalInput from '../common/ModalInput';
import sec_to_time_symbol from '../../tools/formatTimeToSymbol';
import { 
    postDeleteAutoMation, 
    putUpdateAutoMationItem,
    editorAutoMationConditionAdd,
    editorAutoMationConditionDel,
    editorAutoMationConditionUpdate,
    editorAutoMationActionUpdate, 
    editorAutoMationActionDel,
    editorAutoMationActionAdd,
} from '../../network_request/fetch_api';  

export default class AutoMationSetUp extends Component {
  constructor(props) {
    super(props);
    this.currentAutoMationName = this.props.container.navigation.state.params.autoMationName;
    this.state = {
        isShowDelAction: false,
        isShowDelActionDevice: false,
        checkedIconId: null,
        rowIndex: null,
        isRefresh: false,
        actionRowIndex: null,
        isShowEditAutoNamePop: false,
      }
    this.updateIconId = null;
    this.switchItemIndex = null;
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

    componentWillMount() {
        this.props.container.navigation.setParams({ backToBefore: this.backToBefore });

        this.iconListener = EventRegister.addEventListener(
            'chooseIconEvent', icon_name => {
                this.setState({
                    checkedIconId: icon_name,
                });
                this.updateIconId = getObjKey( iconCollect, icon_name);
                console.log(this.updateIconId + "图片的id");
                if(this.updateIconId != this.props.container.data.icon && this.updateIconId != null){
                    putUpdateAutoMationItem(
                        {
                            icon: this.updateIconId
                        },
                        this.props.container.userInfoData.token,
                        this.props.container.navigation.state.params.autoMationId
                    );
                }
            }, 
        );

        // 修改当前已有的条件，回来页面不用请求数据
        this.updateConditionItemListener = EventRegister.addEventListener('updateConditionItem', data => {
            console.log(data)
            let conditionId = 0;
            for(let key in this.props.container.data.condition){
                console.log(this.props.container.data.condition[key].hasOwnProperty("condition_type"))
                if (this.props.container.data.condition[key].hasOwnProperty("condition_type")) {
                    if (this.props.container.data.condition[key].condition_type == data.condition_type) {
                        conditionId = this.props.container.data.condition[key].condition_id;
                        console.log("类型相等" + conditionId)
                        this.props.container.data.condition[key].condition_value = data.condition_value;
                        // this.props.container.data.condition.splice(key, 1, data);
                    } else if(Object.prototype.toString.call(this.props.container.data.condition[key].condition_type) == '[object Array]' && Object.prototype.toString.call(data.condition_type) == '[object Array]'){
                        conditionId = this.props.container.data.condition[key].condition_id;
                        console.log("类型不等，是数组" + conditionId);
                        this.props.container.data.condition[key].condition_value = data.condition_value;
                        this.props.container.data.condition[key].condition_type = data.condition_type;
                        // this.props.container.data.condition.splice(key, 1, data);
                    }
                }
            }
            console.log(this.props.container.data.condition)
            editorAutoMationConditionUpdate(
                {
                    condition_type: data.condition_type,
                    condition_value: data.condition_value,
                    condition_id: conditionId
                },
                this.props.container.userInfoData.token,
                this.props.container.navigation.state.params.autoMationId
            );
            this.setState({isRefresh: true})
        });


        this.editAddConditionListener = EventRegister.addEventListener('addConditionItem', data => {
            let typeArr = [];
            let dataType = data.condition_type;
            if(Object.prototype.toString.call(dataType) == '[object Array]'){
                dataType = 'Timing';
            }
            for(let key in this.props.container.data.condition){
                if(Object.prototype.toString.call(this.props.container.data.condition[key].condition_type) == '[object Array]'){
                    typeArr.push("Timing");
                } else {
                    typeArr.push(this.props.container.data.condition[key].condition_type);  
                }  
            }
            if(typeArr.indexOf(dataType) == -1){
                this.props.container.data.condition.push(data);
                editorAutoMationConditionAdd(
                    {
                        condition_type: data.condition_type,
                        condition_value: data.condition_value
                    },
                    this.props.container.userInfoData.token,
                    this.props.container.navigation.state.params.autoMationId
                );
                this.setState({isRefresh: true});
            } else{
                Toast.info("The selected condition type already exists and cannot be added repeatedly",  2, undefined, false);
            }

            console.log(this.props.container.data.condition)       
        });

        this.editorActionAddSceneListener = EventRegister.addEventListener('editorActionAddScene', data => {
            console.log(data)
            let actionArr = [];
            if(this.props.container.data.content.length == 0){
                if(data.action_type == "Scene"){
                    let newIdArr = [];
                    for(let i in data.content){
                        newIdArr.push(data.content[i].id)
                    }
                    editorAutoMationActionAdd(
                        {
                            operation_type: "Scene",
                            scene_id: newIdArr
                        },
                        this.props.container.userInfoData.token,
                        this.props.container.navigation.state.params.autoMationId
                    );
                } else {
                    editorAutoMationActionAdd(
                        {
                            operation_type: "Device",
                            operation_content: {
                                equipment_id: data.content.operation_equipment_id,
                                content_value: data.content.operation_order
                            }
                        },
                        this.props.container.userInfoData.token,
                        this.props.container.navigation.state.params.autoMationId
                    );
                }
            } else{

                // 循环取出当前页面所有动作的 action_type
                for(let index in this.props.container.data.content){
                    actionArr.push(this.props.container.data.content[index].action_type)
                }

                // 如果当前页面动作数据的type， 没有data的type（场景是-scene_id， 设备--equipment_id和value）
                if (actionArr.indexOf(data.action_type) == -1) {
                    if(data.action_type == "Scene"){
                        let newIdArr = [];
                        for(let i in data.content){
                            newIdArr.push(data.content[i].id)
                        }
                        editorAutoMationActionAdd(
                            {
                                operation_type: "Scene",
                                scene_id: newIdArr
                            },
                            this.props.container.userInfoData.token,
                            this.props.container.navigation.state.params.autoMationId
                        );
                    } else {
                        editorAutoMationActionAdd(
                            {
                                operation_type: "Device",
                                operation_content: {
                                    equipment_id: data.content.operation_equipment_id,
                                    content_value: data.content.operation_order
                                }
                            },
                            this.props.container.userInfoData.token,
                            this.props.container.navigation.state.params.autoMationId
                        );
                    }
                    
                    // this.props.container.data.content.push(data);
                } else {
                    console.log(data.action_type)
                    if(data.action_type == "Scene"){
                        let newIdArr = [];  //场景列表页选取的ID集合
                        let oldIdArr = [];  //现在页面上有的场景ID集合
    
                        for(let key in this.props.container.data.content){
                            console.log(this.props.container.data.content[key])
                            console.log(this.props.container.data.content[key].hasOwnProperty("action_type"))
                            if (this.props.container.data.content[key].hasOwnProperty("action_type")){
                                if(this.props.container.data.content[key].action_type == "Scene"){
                                    for(let innderIdx in this.props.container.data.content[key].content){
                                        oldIdArr.push(this.props.container.data.content[key].content[innderIdx].id)
                                    }
                                }
                            }
                        }
    
                        // 循环取出传递过来的场景id
                        for(let secondkey in data.content){
                            newIdArr.push(data.content[secondkey].id)
                        }
                        
                        // 循环取出现在页面有的场景id
                        for( i = 0; i < oldIdArr.length; i++){
                            var array1=oldIdArr[i];
                            for( j = 0; j < newIdArr.length; j++){
                                var array2=newIdArr[j];
                                if(array1==array2){
                                    newIdArr.splice(j,1);
                                }
                            }
                        }
    
                        if(newIdArr.length > 0){
                            let refreshActionSceneMode = [];  //xunhua
                            editorAutoMationActionAdd(
                                {
                                    operation_type: "Scene",
                                    scene_id: newIdArr
                                },
                                this.props.container.userInfoData.token,
                                this.props.container.navigation.state.params.autoMationId
                            );
    
                            // 新添加的场景去重后添加
                            for( i = 0; i < newIdArr.length; i++){
                                for( j = 0; j < data.content.length; j++){
                                    if(newIdArr[i] == data.content[j].id){
                                        refreshActionSceneMode.push(data.content[j]);
                                    }
                                }
                            }
    
                            //  循坏添加 action_type key，
                            for(var refreshIdx in refreshActionSceneMode){
                                let obj = {};
                                let objContent = [];
                                objContent.push(refreshActionSceneMode[refreshIdx]);
                                obj['action_type'] = 'Scene';
                                obj['content'] = objContent;
                                this.props.container.data.content.push(obj)
                                console.log(obj)
                            }
                            // this.setState({isRefresh: true})
                        }
                        console.log(oldIdArr)
                        console.log(newIdArr)
                    } else {
                        let equipmentIdArr = [];
                        for(let key in this.props.container.data.content){
                            console.log(this.props.container.data.content[key])
                            console.log(this.props.container.data.content[key].hasOwnProperty("action_type"))
                            if (this.props.container.data.content[key].hasOwnProperty("action_type")){
                                if(this.props.container.data.content[key].action_type == "Device"){
                                    console.log(this.props.container.data.content[key].content.operation_equipment_id)
                                    equipmentIdArr.push(this.props.container.data.content[key].content.operation_equipment_id)
                                }
                            }
                        }
                        if(equipmentIdArr.indexOf(data.content.operation_equipment_id) == -1){
                            editorAutoMationActionAdd(
                                {
                                    operation_type: "Device",
                                    operation_content: {
                                        equipment_id: data.content.operation_equipment_id,
                                        content_value: data.content.operation_order
                                    }
                                },
                                this.props.container.userInfoData.token,
                                this.props.container.navigation.state.params.autoMationId
                            );
                        } else {
                            Toast.info("The selected device already exists and cannot be added repeatedly",  2, undefined, false);
                        }

                    }
                    
                }
            }
            console.log(actionArr)
            console.log(this.props.container.data)

            // for(let key in this.props.container.data.condition){
            //     if(Object.prototype.toString.call(this.props.container.data.condition[key].condition_type) == '[object Array]'){
            //         typeArr.push("Timing");
            //     } else {
            //         typeArr.push(this.props.container.data.condition[key].condition_type);  
            //     }  
            // }
            // console.log(this.props.container.data.condition)      
        });


        // 修改-修改项
        this.editorActionUpdateSceneListener = EventRegister.addEventListener('editorActionUpdateScene', data => {
            console.log(data)
            if(data.action_type == "Scene"){
                for(let i = 0; i < this.props.container.data.content.length; i++){
                    if(this.props.container.data.content[i].content_id == data.contentid){
                        if(this.props.container.data.content[i].action_type == "Scene"){
                            this.props.container.data.content[i].content.splice(0, 1, data.item);
                        } 
                    }
                }
            } else {
                for(let i = 0; i < this.props.container.data.content.length; i++){
                    if(this.props.container.data.content[i].content_id == data.contentid){
                        if(this.props.container.data.content[i].action_type == "Device"){
                            console.log(this.props.container.data.content[i].content['operation_order'])
                            this.props.container.data.content[i].content['operation_order'] = data.operation_order;
                        }
                    }
                }
                editorAutoMationActionUpdate(
                    {
                        content_type: data.action_type,
                        content_id: data.contentid,
                        content_value: data.operation_order
                    },
                    this.props.container.userInfoData.token,
                    this.props.container.navigation.state.params.autoMationId
                );
            }
            console.log(this.props.container.data.content)
            this.setState({isRefresh: true});
        });



        this.refreshListener = EventRegister.addEventListener('postEditUpdateAtuoMation', status => {
            if( status == '200000'){
                this.props.container.fetchData(this.props.container.navigation.state.params.autoMationId);
            }
        });


        this.refreshListener2 = EventRegister.addEventListener('updateAutoAddConSucc', status => {
            if( status == '200010'){
                this.props.container.fetchData(this.props.container.navigation.state.params.autoMationId);
                console.log(this.props.container.data)
            }
        });

        
        this.postEditDelAtuoMationListener = EventRegister.addEventListener('postEditDelAtuoMation', status => {
                 console.log("删除场景啦啦啦啦啦啦啦")
                if( status == '200006'){
                    Toast.info("Successfully deleted",  2, undefined, false);
                console.log(this.switchItemIndex);

                    this.props.container.data.content.splice(this.switchItemIndex, 1);
                    this.setState({isRefresh: true})
                }
            }); 

        this.delAutoMationSuccListener = EventRegister.addEventListener('delAutoMationSucc', data => {
            Toast.info(data.msg,  2, undefined, false);
            this.props.container.navigation.pop();
        });

    }

    componentWillUnmount() {
        EventRegister.removeEventListener(this.iconListener);
        EventRegister.removeEventListener(this.updateConditionItemListener);
        EventRegister.removeEventListener(this.editAddConditionListener);
        EventRegister.removeEventListener(this.editorActionAddSceneListener);
        EventRegister.removeEventListener(this.editorActionUpdateSceneListener);
        EventRegister.removeEventListener(this.refreshListener);
        EventRegister.removeEventListener(this.refreshListener2);
        EventRegister.removeEventListener(this.postEditDelAtuoMationListener);
        EventRegister.removeEventListener(this.delAutoMationSuccListener);
    }

    backToBefore = () => {
        if(this.props.container.data.condition == 0 || this.props.container.data.content.length == 0){
            Toast.info("Automated conditions and actions can't be empty~",  2, undefined, false);
        } else {
            this.props.container.navigation.pop();
        }
    }

    // editorAutoMation = () => {
    //     Modal.prompt(
    //         '编辑自动化名称',
    //         null,
    //         (name) => {
    //             if(name == null ){
    //                 Toast.info("自动化名称不能为空！",  2, undefined, false);
    //             } else {
    //                 this.setState({
    //                     currentAutoMationName: name
    //                 })
    //                 putUpdateAutoMationItem(
    //                 {
    //                     name: name
    //                 },
    //                 this.props.container.userInfoData.token,
    //                 this.props.container.navigation.state.params.autoMationId
    //                 );
    //             }
    //         },
    //         'default',
    //         null,
    //         [this.state.currentAutoMationName],
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

    swipeHandleDelete = () => {
        let str = this.state.rowIndex;
        editorAutoMationConditionDel(
            {
                condition_id: this.props.container.data.condition[str].condition_id
            },
            this.props.container.userInfoData.token,
            this.props.container.navigation.state.params.autoMationId
        );
        this.props.container.data.condition.splice(str, 1);
    }

    swipeDeleteAction = () => {
        let str = this.state.actionRowIndex;
        str  = str.split("_")[0];
        this.switchItemIndex = str;
        // console.log(str + "------当前的下标");
        // console.log(this.props.container.data.content[str].content_id +"----删除的ID")
        if(this.props.container.data.content[str].action_type == "Scene"){
            editorAutoMationActionDel(
                {
                    content_type: 'Scene',
                    content_id: this.props.container.data.content[str].content_id,
                },
                this.props.container.userInfoData.token,
                this.props.container.navigation.state.params.autoMationId
            );
            
            // this.postEditDelAtuoMationListener = EventRegister.addEventListener('postEditDelAtuoMation', status => {
            //      console.log("删除场景啦啦啦啦啦啦啦")
            //     if( status == '200006'){
            //         Toast.info("删除成功",  2, undefined, false);
            //     console.log(str);

            //         this.props.container.data.content.splice(str, 1);
            //         this.setState({isRefresh: true})
            //     }
            // }); 
        } else {
            this.setState({isShowDelActionDevice: true})
        }
        console.log(this.props.container.data.content)
    }

    swipeDeleteActionDevice = () => {
        editorAutoMationActionDel(
            {
                content_type: 'Device',
                content_id: this.props.container.data.content[this.switchItemIndex].content_id,
            },
            this.props.container.userInfoData.token,
            this.props.container.navigation.state.params.autoMationId
        );
        this.setState({isShowDelActionDevice: false})
        // this.postEditDelAtuoMationListener = EventRegister.addEventListener('postEditDelAtuoMation', status => {
        //     console.log("删除设备啦啦啦啦啦啦啦")
        //     if( status == '200006'){
        //         Toast.info("删除成功",  2, undefined, false);
        //         console.log(this.switchItemIndex);
        //         this.props.container.data.content.splice(this.switchItemIndex, 1);
        //         this.setState({isRefresh: true})
        //     }
        // }); 
    }

    routePath = (conditionType) => {
        switch (conditionType){
            case 'Temperature':
                conditionType= "ConditionInfo";
                return conditionType;
            default :
                conditionType="Timing";
                return conditionType;
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

  formatCondition = (condition_type) => {
    // console.log(Object.prototype.toString.call(condition_type))
    if(Object.prototype.toString.call(condition_type) == '[object Array]'){
        let everyDay = [0,1,2,3,4,5,6];
        let workDay = [0,1,2,3,4];
        let onlyOne = [0];
        let resultText = '';
        if(condition_type.sort().toString() == everyDay.sort().toString()){
            resultText = 'Every day';
            return resultText;
        } else if(condition_type.sort().toString() == workDay.sort().toString()){
            resultText = 'Workdays';
            return resultText;
        } else if(condition_type.sort().toString() == onlyOne.sort().toString()){
            resultText = 'Once';
            return resultText;
        }else{
            var N = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"];
            // var N = ["6", "0", "1", "2", "3", "4", "5", "6"];
            var str = condition_type.toString();
            console.log(str);
            str = str.replace(/\,/g, "");
            console.log(str);
            var C_Num = [];
            for(var i = 0; i < str.length; i++){
                C_Num.push(N[str.charAt(i)]); // str.charAt(i)返回位置 i 的字符
            }
            // console.log(C_Num)
            return C_Num.join(',');
        }
    } else {
        resultText = condition_type;
        return resultText; 
    }

}


  render() {
      console.log(this.props.container.data)
    let sendData = [];
    if(!this.props.container.isLoading && this.props.container.data.length != 0 ){
        return (
            <SafeAreaView style={commonStyles.containGrayWrap}>
                <ScrollView>
                    <View style={[commonStyles.setionListBox, {paddingHorizontal:0, marginTop:0}]}>
                        <Touch style={[commonStyles.setionItems, commonStyles.flexBox, commonStyles.lineSty,{ paddingHorizontal:20}]}
                            onPress={() => this.setState({isShowEditAutoNamePop: true})}
                        >
                            <Text style={[commonStyles.setionItemText, {flex: 0, marginRight: 8}]}>Automation name</Text>
                            <Text style={commonStyles.familyName}>{this.currentAutoMationName}</Text>
                            <Image style={commonStyles.moreIconSty} source={require('../../img/icon_gd.png')} />
                        </Touch>
                        
                    </View>
                    <View style={[commonStyles.setionListBox, {paddingHorizontal:0}]}>
                        <Touch style={[commonStyles.setionItems, commonStyles.flexBox, commonStyles.lineSty,{ paddingHorizontal:20}]}
                            onPress={() => this.props.container.navigation.navigate('SceneIcon')}
                        >
                            <Text style={commonStyles.setionItemText}>Automation icon</Text>
                            <Image style={{ width:30, height:30}} source={{
                                  uri: this.state.checkedIconId == null 
                                  ? getObjValue(iconCollect, this.props.container.data.icon)
                                  : this.state.checkedIconId}} 
                              />
                            <Image style={commonStyles.moreIconSty} source={require('../../img/icon_gd.png')} />
                        </Touch>
                    </View>
                    <View style={[commonStyles.addDevicesBox, {marginTop:16}]}>
                        <View style={[commonStyles.addPerformBox, {paddingBottom: this.props.container.data.condition.length == 0 ? 40 : 0}]}>
                            <View style={[commonStyles.flexBox, { justifyContent:'flex-start'}]}>
                                <Text style={[commonStyles.performTit, {paddingLeft: 20, paddingRight: 10}]}>When any condition is met</Text>
                                <Image style={{width:24, height:24}}source={require('../../img/icon_wdj_qhzh.png')} />
                            </View>
                            {this.props.container.data.condition.length == 0 ? (
                                <Touch style={[commonStyles.performWrap, commonStyles.flexBox, {marginHorizontal: 20}]}
                                    onPress={() => this.props.container.navigation.navigate('ChooseCondition', {operationType: 'editAddCondition'})}
                                >
                                    <Text style={commonStyles.performText}>When any condition is met</Text>
                                </Touch> 
                            ) : (
                                <View style={styles.devicesBorder}>
                                    {this.props.container.data.condition.map((item, index) => {
                                        return (
                                            <Swipeout right={this.swipeoutBtns} backgroundColor={'white'}
                                                key={index}
                                                onOpen={()=>(this.onSwipeOpen(index))}
                                                close={this.state.rowIndex !== index}
                                                onClose={()=>(this.onSwipeClose(index))}
                                                rowIndex={index}
                                                sectionId={0}
                                                autoClose={true}
                                                scroll={event => console.log(event) }
                                            >
                                                <Touch style={[commonStyles.flexBox, commonStyles.padLR20, {height: 80}]}
                                                    onPress={() => this.props.container.navigation.navigate(this.routePath(item.condition_type), {
                                                        operationType: 'editUpdateCondition',
                                                        num: item.condition_value
                                                    })}
                                                >
                                                    {/* <Image style={commonStyles.deviceImg} source={require('../../img/icon_qc.png')} /> */}
                                                    <View style={commonStyles.currentRoomDevTextBox}>
                                                        <Text style={commonStyles.deviceText}>{this.formatCondition(item.condition_type)}</Text>
                                                        <Text style={[commonStyles.deviceTextStatus, {color:'#8E8E93'}]}>
                                                            {Object.prototype.toString.call(item.condition_type) == '[object Array]' ? sec_to_time_symbol(item.condition_value) : item.condition_value}
                                                        </Text>
                                                    </View>
                                                </Touch>
                                            </Swipeout>
                                        );
                                    })} 
                                </View>
                            )}
                            {this.props.container.data.condition.length != 0 ? (
                                <Touch style={[commonStyles.addItemsBox, commonStyles.flexBox, {marginTop: 0}]}  activeOpacity={1}  
                                    onPress={() => this.props.container.navigation.navigate('ChooseCondition', {operationType: 'editAddCondition'})}
                                >
                                    <Text style={commonStyles.addItemsText}>Add</Text>
                                </Touch>
                            ) : null}
                        </View>
                    </View>
                    <View style={[commonStyles.addDevicesBox, {marginTop:16}]}>
                        <View style={[commonStyles.addPerformBox, {paddingBottom: this.props.container.data.content.length == 0 ? 40 : 0}]}>
                            <Text style={[commonStyles.performTit, commonStyles.padLR20]}>Then will do the following</Text>
                            {this.props.container.data.content.length == 0 ? (
                                <Touch style={[commonStyles.performWrap, commonStyles.flexBox, {marginHorizontal: 20}]}
                                    onPress={() => this.props.container.navigation.navigate('ChooseAction', {actionType: 'editorActionAdd'})}
                                >
                                    <Text style={commonStyles.performText}>Add execution action</Text>
                                </Touch> 
                            ) : (
                                <View style={styles.devicesBorder}>
                                    {this.props.container.data.content.map((item, index) => {
                                        let childrenData = null;
                                        if(item.action_type == 'Scene'){
                                            // console.log(item);
                                            // console.log(item.content)
                                            childrenData = item.content.map((info, idx) => {
                                                // sendData.push(info);
                                                return (
                                                    <Swipeout right={this.swipeoutActionBtns} backgroundColor={'white'}
                                                        key={`${index}_${idx}`}
                                                        onOpen={()=>(this.onSwipeOpenAction(`${index}_${idx}`))}
                                                        close={this.state.actionRowIndex !== `${index}_${idx}`}
                                                        onClose={()=>(this.onSwipeCloseAction(`${index}_${idx}`))}
                                                        sectionId={0}
                                                        autoClose={true}
                                                        scroll={event => console.log(event) }
                                                    >
                                                        <Touch style={[commonStyles.flexBox, commonStyles.padLR20, {height: 80}]}
                                                            onPress = {() => {this.props.container.navigation.navigate('ChooseScene', {
                                                                actionType: 'editorActionUpdate',
                                                                contentId: item.content_id,
                                                                sceneId: info.id,
                                                                autoMationId: this.props.container.navigation.state.params.autoMationId
                                                            })
                                                        }}
                                                        >
                                                            <Image style={commonStyles.deviceImg} source={{uri: getObjValue(iconCollect, info.icon)}} />
                                                            <View style={commonStyles.currentRoomDevTextBox}>
                                                                <Text style={commonStyles.deviceText}>{info.name}</Text>
                                                                <Text style={[commonStyles.deviceTextStatus, {color:'#8E8E93'}]}>{item.action_type}</Text>
                                                            </View>
                                                            <Text style={styles.deviceStatus}>Run</Text>
                                                        </Touch>
                                                    </Swipeout>
                                                );
                                            })
                                        } else {
                                            let showDeviceObj = getObjValue(deviceInfoData, item.content.operation_equipment__name);
                                            console.log(showDeviceObj)
                                            console.log(showDeviceObj['automationroute'])
                                            childrenData = Object.keys(item.content.operation_order).map((info, idx) => {
                                                return (
                                                    <Swipeout right={this.swipeoutActionBtns} backgroundColor={'white'}
                                                        key={`${index}_${idx}`}
                                                        onOpen={()=>(this.onSwipeOpenAction(`${index}_${idx}`))}
                                                        close={this.state.actionRowIndex !== `${index}_${idx}`}
                                                        onClose={()=>(this.onSwipeCloseAction(`${index}_${idx}`))}
                                                        sectionId={0}
                                                        autoClose={true}
                                                        scroll={event => console.log(event) }
                                                    >
                                                        <Touch style={[commonStyles.flexBox, commonStyles.padLR20, {height: 80}]}
                                                           onPress = {() => {this.props.container.navigation.navigate(showDeviceObj['automationroute'], {
                                                                info: 'isHas',
                                                                deviceAction: item.content.operation_order,
                                                                actionType: "editorActionUpdateEqu",
                                                                contentId: item.content_id
                                                                })
                                                            }}
                                                        >
                                                            <Image style={commonStyles.deviceImg} source={require('../../img/pic_fs.png')} />
                                                            <View style={commonStyles.currentRoomDevTextBox}>
                                                                <Text style={commonStyles.deviceText}>{item.content.operation_equipment__name}</Text>
                                                                <Text style={[commonStyles.deviceTextStatus, {color:'#8E8E93'}]}>{item.action_type}</Text>
                                                            </View>
                                                            <Text style={styles.scenceDeviceStatus}>{getObjValue(showDeviceObj['action'][0], info)}<Text>{`: ${item.content.operation_order[info]}`}</Text></Text>
                                                        </Touch>
                                                    </Swipeout>
                                                );
                                            })
                                        }
                                        return(<View key= {index}>{childrenData}</View>)
                                    })} 
                                </View>
                            )}
                            {this.props.container.data.content.length != 0 ? (
                                <Touch style={[commonStyles.addItemsBox, commonStyles.flexBox, {marginTop: 0}]}  activeOpacity={1}  
                                    onPress={() => this.props.container.navigation.navigate('ChooseAction', {actionType: 'editorActionAdd'})}
                                >
                                    <Text style={commonStyles.addItemsText}>Add</Text>
                                </Touch>
                            ) : null}
                        </View>
                </View>
                    {this.props.container.data.length != 0 ? (
                            <Touch style={[commonStyles.addItemsBox, commonStyles.flexBox]}  
                            activeOpacity={1}  
                            onPress={() => this.setState({isShowDelAction: true})}
                        >
                                <Text style={[commonStyles.addItemsText, { color:'#9B9B9B', textAlign:'center'}]}>Remove automation</Text>
                        </Touch>
                    ) : null }
                </ScrollView>
                <ModalDialog
                    _dialogVisible={this.state.isShowDelAction}
                    _dialogTitle={"You sure you want to delete it?"}
                    _dialogContent={"After the automation is deleted, the content will be deleted under this automation."}
                    _dialogLeftBtnAction={() => {
                        this.setState({isShowDelAction: false})
                    }}
                    _dialogRightBtnAction={() => {
                        postDeleteAutoMation(
                            this.props.container.navigation.state.params.autoMationId,
                            this.props.container.userInfoData.token
                        );
                        this.setState({isShowDelAction: false});
                        Toast.loading('Loading', 0);
                    }}
                />

            <ModalDialog
                _dialogVisible={this.state.isShowDelActionDevice}
                _dialogTitle={"You sure you want to delete it?"}
                _dialogContent={"After the action is deleted, all actions under the device will be deleted."}
                _dialogLeftBtnAction={() => {
                    this.setState({isShowDelActionDevice: false})
                }}
                _dialogRightBtnAction={() => {
                    this.swipeDeleteActionDevice();
                }}
            />   

            <ModalInput
                ref='editAutoMationNameNode'
                _popupInputBoxVisible={this.state.isShowEditAutoNamePop}
                _popupInputBoxTitle = {"Edit automation name"}
                _popupInputBoxDefaultText = {this.currentAutoMationName}
                _popupInputBoxLeftBtnAction ={() => {this.setState({isShowEditAutoNamePop: false})}}
                _popupInputBoxRightBtnAction ={() => {
                    this.refs.editAutoMationNameNode.state.value = this.refs.editAutoMationNameNode.state.value.replace(/\s+/g,"");
                if(this.refs.editAutoMationNameNode.state.value != this.currentAutoMationName && this.refs.editAutoMationNameNode.state.value != '' && this.refs.editAutoMationNameNode.state.value.length < 32){
                    this.currentAutoMationName = this.refs.editAutoMationNameNode.state.value;
                    putUpdateAutoMationItem({
                            name: this.currentAutoMationName
                        },
                        this.props.container.userInfoData.token,
                        this.props.container.navigation.state.params.autoMationId
                    );
                } else {
                    Toast.info("Length cannot be greater than 32",  2, undefined, false);
                }
                this.setState({isShowEditAutoNamePop: false})
                console.log(this.refs.editAutoMationNameNode.state.value)
                }}
            />
            </SafeAreaView>
        );
    }else {
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
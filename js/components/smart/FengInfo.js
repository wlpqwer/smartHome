import React, { Component } from 'react';
import {
  Text,
  View,
  Image, SafeAreaView, ScrollView, StyleSheet, Slider, Switch, Platform
} from 'react-native';
import Touch from 'react-native-touch-once';
import { commonStyles } from '../../tools/layout';
import { EventRegister } from 'react-native-event-listeners';
import { Picker } from 'antd-mobile-rn';
import ModalToast from '../common/ModalToast';
import Loading from '../common/Loading';

export default class FengInfo extends Component {
  constructor(props) {  
    super(props);
    let paramsItem = props.navigation.state.params;
    this.state = {
        lampLight: paramsItem.page == 'sceneSetUp' ? paramsItem.deviceAction.operation_order.FANS_LIGHT_BRIGHT == undefined ? 25 : paramsItem.deviceAction.operation_order.FANS_LIGHT_BRIGHT : 25,
        fengSLamp: paramsItem.page == 'sceneSetUp' ? paramsItem.deviceAction.operation_order.FANS_LIGHT_SWITCH == undefined ? false : paramsItem.deviceAction.operation_order.FANS_LIGHT_SWITCH : false,
        fengS: paramsItem.page == 'sceneSetUp' ? paramsItem.deviceAction.operation_order.FANS_SWITCH == undefined ? false : paramsItem.deviceAction.operation_order.FANS_SWITCH : false,
        isShowMsg: false,
        msg: ''
    }

    this.deviceAction = {};
    this.actionGroup = {};

    this.updateOriginalData = {};   //场景修改的设备数组
    this.updateOriginalAction = {};  //场景修改的设备动作
    // 场景修改设备的功能参数 - 风扇开关 - 风扇灯开关 - 风扇灯亮度
    this.oldFenSwitch = paramsItem.page == 'sceneSetUp' ? paramsItem.deviceAction.operation_order.FANS_SWITCH : false;
    this.oldFenLampSwitch = paramsItem.page == 'sceneSetUp' ? paramsItem.deviceAction.operation_order.FANS_LIGHT_SWITCH : false;
    this.oldFenLampLight = paramsItem.page == 'sceneSetUp' ? paramsItem.deviceAction.operation_order.FANS_LIGHT_BRIGHT : 25;

    this.oldAddData = {};  //编辑场景-添加- 数据
    this.oldAddOperate = {};   //编辑场景-添加 -设备的动作
  }


    static navigationOptions = ({ navigation }) => {
    // console.log(navigation.state)
    const { params = {} } = navigation.state;
    return {
        headerRight: (
        <View style={[commonStyles.flexBox, { height: '100%', width: 88 }]}>
            <Touch
            style={[commonStyles.flexBox, { flex: 1, height: '100%' }]}
            activeOpacity={0.5}
            onPress={() => params.saveDeviceAction()}
            >
            <Text style={{fontSize:17, color:'#2C2D30'}}>SAVE</Text>
            </Touch>
        </View>
        ),
    };
    };


    saveDeviceAction = () => {
        if(this.props.navigation.state.params.page == 'sceneSetUp'){
            if(Object.keys(this.updateOriginalData).length == 0){
                this.props.navigation.goBack();
            } else {
                // console.log(this.updateOriginalData);
                this.updateOriginalData['operation_order'] = this.updateOriginalAction;
                EventRegister.emit('updateDeviceOperate', this.updateOriginalData);
                this.props.navigation.goBack();
            }
        } else if(this.props.navigation.state.params.page == 'editScene'){
            this.oldAddData['operation_order'] = this.oldAddOperate;
            console.log(this.oldAddData)
            EventRegister.emit('editSceneAddDev', this.oldAddData);
            this.props.navigation.pop(2);
            // if(Object.keys(this.oldAddOperate).length == 0){
            //     this.props.navigation.pop(2);
            // } else {
            //     this.oldAddData['operation_order'] = this.oldAddOperate;
            //     // console.log(this.oldAddData);
            //     EventRegister.emit('editSceneAddDev', this.oldAddData);
            //     this.props.navigation.pop(2);
            // }
        } else {
            this.deviceAction['operation'] = this.actionGroup;
            EventRegister.emit('addDeviceOperate', this.deviceAction);
            console.log(this.deviceAction);
            this.props.navigation.pop(2);
        }
    }

    _onChange =(value)=>{
        // this.props.container.data.FANS_LIGHT_BRIGHT = value;
        this.setState({
            lampLight: value
        })
    };

    componentWillMount() {
        this.props.navigation.setParams({ saveDeviceAction: this.saveDeviceAction });
        if(this.props.navigation.state.params.page == "chooseEquipment"){
            this.deviceAction['equipment_id'] = this.props.navigation.state.params.item.id;
            this.deviceAction['equipment_name'] = this.props.navigation.state.params.item.name;
            this.deviceAction['room_name'] = this.props.navigation.state.params.item.room_name;
            this.actionGroup['1'] = false;
            this.actionGroup['2'] = false;
            this.actionGroup['3'] = 25;
        } else if(this.props.navigation.state.params.page == "editScene"){
            this.oldAddData['content_id'] = 0;
            this.oldAddData['operation_equipment'] = this.props.navigation.state.params.item.id;
            this.oldAddData['operation_equipment__name'] = this.props.navigation.state.params.item.name;
            this.oldAddData['operation_equipment__room_name'] = this.props.navigation.state.params.item.room_name;
            this.oldAddOperate["FANS_LIGHT_BRIGHT"] = 25;
            this.oldAddOperate["FANS_LIGHT_SWITCH"] = false;
            this.oldAddOperate["FANS_SWITCH"] = false;
        } else {
            this.updateOriginalData['operation_equipment'] = this.props.navigation.state.params.deviceAction.operation_equipment;
        }        
    }


    componentWillUnmount() {}

  render() {
        return (
            <SafeAreaView style={commonStyles.containGrayWrap}>
                <ScrollView>
                    <View style={styles.marT16}>
                        <View style={[ commonStyles.addDevicesBox, { paddingLeft: 40, paddingRight:30}]}>
                            <View style={[commonStyles.flexBox, {marginBottom:20}]}>
                                <Text style={styles.deviceFunTit}>Light</Text>
                                <Switch 
                                    value= {this.state.fengSLamp}
                                    onTintColor={'#FCBF00'}
                                    tintColor={'#E5E5E5'} 
                                    thumbTintColor={Platform.OS === 'android' ? '#E5E5E5' : ''}
                                    style={commonStyles.switchStyle}
                                    onValueChange={(value)=> {
                                        this.setState({
                                            fengSLamp: value,
                                        });
                                        if(this.props.navigation.state.params.page == 'sceneSetUp'){
                                            if(value != this.oldFenLampSwitch){
                                                this.updateOriginalAction['FANS_LIGHT_SWITCH'] = value;
                                            }
                                        } else if(this.props.navigation.state.params.page == "editScene"){
                                            // if(value){
                                                this.oldAddOperate['FANS_LIGHT_SWITCH'] = value;
                                            // } else {
                                            //     delete this.oldAddOperate['FANS_LIGHT_SWITCH'];
                                            // }
                                        } else {
                                            // if(value){
                                                this.actionGroup['2'] = value;
                                            // } 
                                            // else {
                                            //     delete this.actionGroup['2'];
                                            // }
                                        }
                                    }}
                                />
                            </View>
                            <View style={commonStyles.flexBox}>
                                <Text style={styles.deviceFunTit}>Brightness</Text>
                                <Text style={{color:'#8E8E93', fontSize: 14, marginTop: 24}}>{this.state.lampLight}</Text>
                            </View>

                            <View style={[commonStyles.flexBox, {marginTop: 26, marginBottom: 30}]}>
                                <Image
                                    style={styles.funImgSty}
                                    source={require('../../img/icon_ld1.png')}
                                />
                                <Slider style={styles.slider}
                                    minimumValue={25}
                                    maximumValue={255}
                                    value={this.state.lampLight}
                                    step={1}
                                    thumbTintColor={'#E5E5E5'} //仅安卓滑块颜色
                                    onValueChange={this._onChange}
                                    minimumTrackTintColor={'#FCBF00'}
                                    onSlidingComplete={(value)=> {
                                        if(this.props.navigation.state.params.page == 'sceneSetUp'){
                                            if(value != this.oldFenLampLight){
                                                this.updateOriginalAction['FANS_LIGHT_BRIGHT'] = value;
                                            }
                                        } else if(this.props.navigation.state.params.page == "editScene"){
                                            // if(value != 25){
                                                this.oldAddOperate['FANS_LIGHT_BRIGHT'] = value;
                                                this.setState({lampLight: value})
                                            // }else {
                                            //     delete this.oldAddOperate['FANS_LIGHT_BRIGHT'];
                                            // }
                                        } else {
                                            // if(value != 25){
                                                this.actionGroup['3'] = value;
                                                this.setState({lampLight: value})
                                            // }
                                            // else {
                                            //     delete this.actionGroup['3'];
                                            // }
                                        }
                                    }}
                                />
                                <Image
                                    style={styles.funImgSty}
                                    source={require('../../img/icon_ld2.png')}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={styles.marT16}>
                        <View style={[ commonStyles.addDevicesBox, { paddingLeft:40, paddingRight:30, paddingVertical:22, marginBottom: 54 }]}>
                            <Touch style={[commonStyles.flexBox, commonStyles.noneLineList, {paddingHorizontal: 0}]} activeOpacity={1}>
                                <Text style={commonStyles.deviceName}>Fan</Text>
                                <Switch 
                                    value={ this.state.fengS} 
                                    onTintColor={'#FCBF00'}
                                    tintColor={'#E5E5E5'} 
                                    thumbTintColor={Platform.OS === 'android' ? '#E5E5E5' : ''}
                                    style={commonStyles.switchStyle}
                                    onValueChange={(value)=> {
                                        this.setState({
                                            fengS: value,
                                        });
                                        if(this.props.navigation.state.params.page == 'sceneSetUp'){
                                            if(value != this.oldFenSwitch){
                                                this.updateOriginalAction['FANS_SWITCH'] = value;
                                            }
                                        } else if(this.props.navigation.state.params.page == "editScene"){
                                            // if(value){
                                                this.oldAddOperate['FANS_SWITCH'] = value;
                                            // }else {
                                            //     delete this.oldAddOperate['FANS_SWITCH'];
                                            // }
                                        }else {
                                            // if(value){
                                                this.actionGroup['1'] = value;
                                            // }
                                            // else {
                                            //     delete this.actionGroup['1'];
                                            // }
                                        }
                                    }}
                                />
                            </Touch>
                        </View>
                    </View>
                </ScrollView>
                <ModalToast
                    _dialogVisible={this.state.isShowMsg}
                    _dialogContent={this.state.msg}
                    _dialogLeftBtnAction={() => {
                        this.hideDialog();
                    }}
                />
        </SafeAreaView>
        );
  }
}

const styles = StyleSheet.create({
    marT16:{
        marginTop: 16
    },
    deviceImg:{
        width: 160,
        height: 160
    },
    funImgSty:{
        width:25,
        height: 25
    },
    deviceFunTit:{
        marginTop: 24,
        fontSize: 17,
        color: '#2C2D30',
        flex: 1
    },
    slider: {
       flex: 1,
       marginHorizontal: 13
    },
    deviceFunImg:{
        width: 56,
        height: 56
    },
    deviceFunText: {
        color:'#2C2D30',
        fontSize: 15,
        marginTop: 20,
        width:'100%',
    },
    countTime:{
        color:'#9B9B9B',
        fontSize: 14
    }
});
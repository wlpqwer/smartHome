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

export default class FengInfoAtuoMation extends Component {
  constructor(props) {  
    super(props);
    let paramsItem = props.navigation.state.params;
    this.temporaryData = paramsItem.deviceAction;
    this.state = {
        lampLight: paramsItem.info == 'isHas' ? paramsItem.deviceAction['3']== undefined ? 25 : paramsItem.deviceAction['3'] : 25,
        fengSLamp: paramsItem.info == 'isHas' ? paramsItem.deviceAction['2'] == undefined ? false : paramsItem.deviceAction['2'] : false,
        fengS: paramsItem.info == 'isHas' ? paramsItem.deviceAction['1'] == undefined ? false : paramsItem.deviceAction['1'] : false,
        isShowMsg: false,
        msg: ''
    }

    this.deviceAction = {};
    this.actionGroup = {};
    this.updateOriginalData = {};   //场景修改的设备数组
    this.creatAutoMation = {};
    console.log(this.props.navigation.state.params)
  }


    static navigationOptions = ({ navigation }) => {
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
        if(this.props.navigation.state.params.actionType == 'editorActionUpdateEqu'){
            this.updateOriginalData['action_type'] = 'Device';
            this.updateOriginalData['contentid'] = this.props.navigation.state.params.contentId;
            console.log(this.actionGroup)
            this.updateOriginalData['operation_order'] = this.actionGroup;
            console.log(this.updateOriginalData)
            EventRegister.emit('editorActionUpdateScene', this.updateOriginalData);
            this.props.navigation.goBack();
        } else {
            // if(Object.keys(this.actionGroup).length == 0){
            //     this.props.navigation.goBack();
            // } else {
                this.deviceAction['operation_order'] = this.actionGroup;
                this.creatAutoMation['content'] = this.deviceAction;
                console.log(this.deviceAction)
                // 从自动化内容页，点击添加按钮
                if(this.props.navigation.state.params.actionType == 'editorActionAdd'){
                    EventRegister.emit('editorActionAddScene', this.creatAutoMation);
                } else {
                    EventRegister.emit('addDeviceAuto', this.creatAutoMation);
                }
                this.props.navigation.pop(3);
            // }
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

        if(this.props.navigation.state.params.actionType != 'editorActionUpdateEqu'){
            this.creatAutoMation['action_type'] = "Device";
            this.deviceAction['operation_equipment_id'] = this.props.navigation.state.params.item.id;
            this.deviceAction['operation_equipment__name'] = this.props.navigation.state.params.item.name;
            this.deviceAction['operation_equipment__room_name'] = this.props.navigation.state.params.item.room_name;
            this.actionGroup['1'] = false;
            this.actionGroup['2'] = false;
            this.actionGroup['3'] = 25;
        } else {
            console.log(this.temporaryData)
            this.actionGroup['1'] = this.temporaryData['1'] == undefined ? false: this.temporaryData['1'];
            this.actionGroup['2'] = this.temporaryData['2'] == undefined ? false: this.temporaryData['2'];
            this.actionGroup['3'] = this.temporaryData['3'] == undefined ? 25: this.temporaryData['3'];
        }       
    }


    // componentWillUnmount() {}

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
                                        // if(value){
                                            this.actionGroup['2'] = value;
                                        // } else {
                                        //     delete this.actionGroup['2'];
                                        // }
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
                                    thumbTintColor={'#E5E5E5'}
                                    onValueChange={this._onChange}
                                    minimumTrackTintColor={'#FCBF00'}
                                    onSlidingComplete={(value)=> {
                                    // if(value != 25){
                                        this.actionGroup['3'] = value;
                                        this.setState({lampLight: value})
                                    // }else {
                                    //     delete this.actionGroup['3'];
                                    // }
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
                                        this.setState({fengS: value});
                                        // if(value){
                                            this.actionGroup['1'] = value;
                                        // }else {
                                        //     delete this.actionGroup['1'];
                                        // }
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
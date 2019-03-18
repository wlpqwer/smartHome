import React, { Component } from 'react';
import {
  Text,
  View,
  Image,Modal, Platform, SafeAreaView, ScrollView, StyleSheet, Slider, Switch
} from 'react-native';
import Touch from 'react-native-touch-once';
import { commonStyles } from '../../tools/layout';
import { EventRegister } from 'react-native-event-listeners';
import { Header } from 'react-navigation';
import { Picker, DatePicker, List } from 'antd-mobile-rn';
import { postOperationDevies } from '../../network_request/fetch_api';
import formatSeconds from '../../tools/formatTime';
import time_to_sec from '../../tools/timeToSec';
import ModalToast from '../common/ModalToast';
import Loading from '../common/Loading';
import {timingJson} from '../../tools/mockData';
import date_picker_locale from 'antd-mobile-rn/lib/date-picker/locale/en_US';

const CustomChildren = (props) => (
    <Touch style={[commonStyles.flexBox, commonStyles.noneLineList, {paddingHorizontal: 0}]} activeOpacity={1}  
        onPress={props.onClick}
    >
        <Text style={commonStyles.deviceName}>{props.children}</Text>
        <Text style={commonStyles.familyName}>{props.extra}</Text>
        <Image style={commonStyles.moreIconSty} source={require('../../img/icon_gd.png')} />
    </Touch>
  );

  const CustomChildrenSen = (props) => (
    <Touch style={[commonStyles.flexBox, commonStyles.noneLineList, {paddingHorizontal: 0}]} activeOpacity={1}  
        onPress={props.onClick}
    >
        <Text style={commonStyles.deviceName}>{props.children}</Text>
        <Text style={commonStyles.familyName}>{props.extra}</Text>
        <Image style={commonStyles.moreIconSty} source={require('../../img/icon_gd.png')} />
    </Touch>
  );

export default class Device_FengS extends Component {
  constructor(props) {
    super(props);
    this.state = {
        value: 0,
        fengSLamp: '',
        fengS: '',
        switchStatus: this.props.container.data.FANS_SWITCH ==1 || this.props.container.data.FANS_LIGHT_SWITCH == 1 ? true : false,
        isShowCountDown: false,
        isOpenFenS: false,
        isOpenFenS_Lamp: false,
        checkedItem: '',
        checkedLamp: '',
        isShowMsg: false,
        msg: '',
        fanLampCountDownNum: undefined,
        fanCountDownNum: undefined,
    }
  }

_onChange =(value)=>{
    this.props.container.data.FANS_LIGHT_BRIGHT = value;
    this.setState({
        value: value
    })
};

setFanLampCoundownVal = (value) => {
    this.setState({ fanLampCountDownNum: value });
    console.log(value)
}

setFanCoundownVal = (value) => {
    this.setState({ fanCountDownNum: value });
    console.log(value)
}


_getFanLampPicker = (value) => {
    console.log(value);
    let getTimeHour = value.getHours();
    let getTimeMinute = value.getMinutes();
    let groupTime = getTimeHour +":"+ getTimeMinute +":"+ '00';
    console.log(groupTime);
    console.log(time_to_sec(groupTime));
    if(time_to_sec(groupTime) != this.props.container.data.FANS_LIGHT_COUNTDOWN){
        postOperationDevies(
            {
                method_name: this.props.container.navigation.state.params.deviceName,
                payload: { FANS_LIGHT_COUNTDOWN:  time_to_sec(groupTime)}
            },
            this.props.container.userInfoData.token,
            this.props.container.navigation.state.params.id
        );
    }
}



_getFanPicker = (value) => {
    console.log(value);
    let getTimeHour = value.getHours();
    let getTimeMinute = value.getMinutes();
    let groupTime = getTimeHour +":"+ getTimeMinute +":"+ '00';
    console.log(groupTime);
    console.log(time_to_sec(groupTime));
    if(time_to_sec(groupTime) != this.props.container.data.FANS_COUNTDOWN){
        postOperationDevies(
            {
                method_name: this.props.container.navigation.state.params.deviceName,
                payload: { FANS_COUNTDOWN: time_to_sec(groupTime)}
            },
            this.props.container.userInfoData.token,
            this.props.container.navigation.state.params.id
        );
    }
}

hideDialog() {
    this.setState({ 
      isShowMsg: false, 
     });
     this.props.container.navigation.pop();
  }

_changeStatus = () => {
    if(this.state.switchStatus){
        postOperationDevies(
            {
                method_name: this.props.container.navigation.state.params.deviceName,  //设备的pid
                payload: {
                    FANS_LIGHT_SWITCH: false,
                    FANS_SWITCH: false,
                    }
            },
            this.props.container.userInfoData.token,
            this.props.container.navigation.state.params.id
        );
    } else {
        postOperationDevies(
            {
                method_name: this.props.container.navigation.state.params.deviceName,
                payload: {
                    FANS_LIGHT_SWITCH: true,
                    FANS_SWITCH: true,
                    }
            },
            this.props.container.userInfoData.token,
            this.props.container.navigation.state.params.id
        );
    }
}

componentWillMount() {
    // console.log(this.props.con)
    this.listener = EventRegister.addEventListener('deviceConnectStatus', msg => {
      this.setState({
        isShowMsg: true,
        msg: msg
       });
    });

    this.deviceForRoomlistener = EventRegister.addEventListener('deviceForRoom', () => {
         this.props.container.navigation.setParams({ 
             roomName: this.props.container.data.room_name,
             roomId:this.props.container.data.room_id,
             token: this.props.container.userInfoData.token
        });
      });
    
  }


componentWillUnmount() {
    // postOperationDevies(
    //     {
    //        method_name: 'F',
    //        payload: {
    //             FANS_LIGHT_BRIGHT: 60,
    //             FANS_SWITCH: 1,
    //             FANS_LIGHT_COUNTDOWN: 2,
    //             FANS_LIGHT_SWITCH: 0,
                    // FANS_COUNTDOWN:0
    //         }
    //     },
    //     this.props.container.userInfoData.token,
    // );
    EventRegister.removeEventListener(this.listener);
    EventRegister.removeEventListener(this.deviceForRoomlistener);
}

  render() {
      console.log(this.props.container.navigation.state.params)
      if(!this.props.container.isLoading){
        return (
            <SafeAreaView style={commonStyles.containGrayWrap}>
                <ScrollView>
                    {/* <Touch style={[commonStyles.flexBoxColumn, commonStyles.containWrap, {paddingVertical: 42}]}
                        onPress={() => this._changeStatus()}
                    >
                        <Image
                            style={styles.deviceFunImg}
                            source={this.state.switchStatus ? require('../../img/icon_sb_kq.png') : require('../../img/icon_sb_gb.png')}
                        />
                        <View style={{textAlgin: 'center'}}>
                            <Text style={[styles.deviceFunText, { color: this.state.switchStatus ? '#FCBF00' : '#2C2D30'}]}>{this.state.switchStatus ? "开启" : "关闭" }</Text>
                        </View>
                    </Touch> */}
                    <View style={styles.marT16}>
                        <View style={[ commonStyles.addDevicesBox, { paddingLeft: 40, paddingRight:30}]}>
                            <View style={[commonStyles.flexBox, {marginBottom:20}]}>
                                <Text style={styles.deviceFunTit}>Light</Text>
                                <Switch 
                                    value= {this.props.container.data.FANS_LIGHT_SWITCH == 1 ? true : false}
                                    onTintColor={'#FCBF00'}
                                    tintColor={'#E5E5E5'} 
                                    thumbTintColor={Platform.OS === 'android' ? '#E5E5E5' : ''}
                                    style={commonStyles.switchStyle}
                                    onValueChange={(value)=> {
                                        this.setState({
                                            fengSLamp: value,
                                        });
                                        this.props.container.data.FANS_LIGHT_SWITCH = value;
                                        postOperationDevies(
                                            {
                                                method_name: this.props.container.navigation.state.params.deviceName,
                                                payload: {
                                                    FANS_LIGHT_SWITCH: value,
                                                    }
                                            },
                                            this.props.container.userInfoData.token,
                                            this.props.container.navigation.state.params.id
                                        );
                                        if(value || this.props.container.data.FANS_SWITCH){
                                            this.setState({ switchStatus: true})
                                        } else {
                                            this.setState({ switchStatus: false})
                                        }
                                    }}
                                />
                            </View>
                            <View style={commonStyles.flexBox}>
                                <Text style={styles.deviceFunTit}>Brightness</Text>
                                <Text style={{color:'#8E8E93', fontSize: 14, marginTop: 24}}>{this.props.container.data.FANS_LIGHT_BRIGHT}</Text>
                            </View>

                            <View style={[commonStyles.flexBox, {marginTop: 26, marginBottom: 30}]}>
                                <Image
                                    style={styles.funImgSty}
                                    source={require('../../img/icon_ld1.png')}
                                />
                                <Slider style={styles.slider}
                                    minimumValue={25}
                                    maximumValue={255}
                                    value={this.props.container.data.FANS_LIGHT_BRIGHT}
                                    step={1}
                                    thumbTintColor={'#E5E5E5'} //仅安卓滑块颜色
                                    onValueChange={this._onChange}
                                    minimumTrackTintColor={'#FCBF00'}
                                    onSlidingComplete={(value)=> {
                                        postOperationDevies(
                                            {
                                                method_name: this.props.container.navigation.state.params.deviceName,
                                                payload: {
                                                        FANS_LIGHT_BRIGHT: this.props.container.data.FANS_LIGHT_BRIGHT,
                                                    }
                                            },
                                            this.props.container.userInfoData.token,
                                            this.props.container.navigation.state.params.id
                                        );
                                    }}
                                />
                                <Image
                                    style={styles.funImgSty}
                                    source={require('../../img/icon_ld2.png')}
                                />
                            </View>
                            {/* <Touch style={[commonStyles.flexBox, {paddingBottom:23}]} activeOpacity={1} onPress={() => this.props.navigation.navigate('FamilyMember')}>
                                <Text style={commonStyles.deviceName}>倒计时</Text>
                                <Text style={commonStyles.familyName}>{this.props.container.data.FANS_LIGHT_COUNTDOWN == 0 ? '未设置' : formatSeconds(this.props.container.data.FANS_LIGHT_COUNTDOWN)}</Text>
                                <Image style={commonStyles.moreIconSty} source={require('../../img/icon_gd.png')} />
                            </Touch> */}
                            {/* <Picker
                                title="Countdown"
                                data={timingJson}
                                cols={2}
                                okText='OK'
                                dismissText = 'CANCEL'
                                extra={this.props.container.data.FANS_LIGHT_COUNTDOWN == 0 ? 'Not set' : formatSeconds(this.props.container.data.FANS_LIGHT_COUNTDOWN)}
                                itemStyle={{ color:'#2C2D30', fontSize: 15}}
                                indicatorStyle={{backgroundColor:'red'}}
                                value={this.state.checkedLamp}
                                onChange={(v) => {
                                    this.setState({ checkedLamp: v });
                                    console.log(v)
                                }}
                                onOk={(v) => {
                                    let fengSText = '';
                                    this.setState({ checkedLamp: v });
                                    if(v.length == 1){
                                        postOperationDevies(
                                            {
                                                method_name: this.props.container.navigation.state.params.deviceName,
                                                payload: { FANS_LIGHT_COUNTDOWN:  0}
                                            },
                                            this.props.container.userInfoData.token,
                                            this.props.container.navigation.state.params.id
                                        );
                                    } else {
                                        for(index in v) {
                                            fengSText += v[index];
                                        }
                                        let changeH = fengSText.replace("h",":");
                                        let changeM = changeH.replace("m",":");
                                        changeM += '00';
                                        console.log(changeM);
                                        console.log(time_to_sec(changeM))
                                        postOperationDevies(
                                            {
                                                method_name: this.props.container.navigation.state.params.deviceName,
                                                payload: { FANS_LIGHT_COUNTDOWN:  time_to_sec(changeM)}
                                            },
                                            this.props.container.userInfoData.token,
                                            this.props.container.navigation.state.params.id
                                        );
                                    }
                                }}
                            >
                                <CustomChildren>Countdown</CustomChildren>
                            </Picker> */}
                        </View>
                        <View>
    <List >
        <DatePicker
            value={this.state.fanLampCountDownNum}
            mode="time"
            onChange={this.setFanLampCoundownVal}
            onOk={this._getFanLampPicker}
            format="HH:mm"
            extra={this.props.container.data.FANS_LIGHT_COUNTDOWN == 0 ? 'Not set' : formatSeconds(this.props.container.data.FANS_LIGHT_COUNTDOWN)}
            locale={date_picker_locale}
        >
            <List.Item arrow="horizontal" style={{paddingRight: 15, paddingLeft: 40, backgroundColor:'white'}}>Countdown</List.Item>
        </DatePicker>
    </List>
    {/* <Text style={{backgroundColor:'#fff', fontSize: 14, color:'#8E8E93', paddingLeft:40, paddingRight: 30, paddingVertical: 17}}>选择00:00时，取消倒计时</Text> */}
</View>
                    </View>
                    <View style={styles.marT16}>
                    <View style={[ commonStyles.addDevicesBox, { paddingLeft:40, paddingRight:30, paddingVertical:22, }]}>
                        <Touch style={[commonStyles.flexBox, commonStyles.noneLineList, {paddingHorizontal: 0}]} activeOpacity={1} onPress={() => this.props.navigation.navigate('FamilyMember')}>
                            <Text style={commonStyles.deviceName}>Fan</Text>
                            <Switch 
                                // value={true}
                                value={this.props.container.data.FANS_SWITCH == 1 ? true : false} 
                                onTintColor={'#FCBF00'}
                                tintColor={'#E5E5E5'} 
                                thumbTintColor={Platform.OS === 'android' ? '#E5E5E5' : ''}
                                style={commonStyles.switchStyle}
                                onValueChange={(value)=> {
                                    this.setState({
                                        fengS: value,
                                    });
                                    this.props.container.data.FANS_SWITCH = value;
                                    postOperationDevies(
                                        {
                                            method_name: this.props.container.navigation.state.params.deviceName,
                                            payload: { FANS_SWITCH: value}
                                        },
                                        this.props.container.userInfoData.token,
                                        this.props.container.navigation.state.params.id
                                    );
                                    if(value || this.props.container.data.FANS_LIGHT_SWITCH){
                                        this.setState({ switchStatus: true})
                                    } else {
                                        this.setState({ switchStatus: false})
                                    }
                                }}
                            />
                        </Touch>
                        {/* <Touch style={[commonStyles.flexBox, commonStyles.noneLineList, {paddingHorizontal: 0}]} activeOpacity={1} onPress={() => this.props.navigation.navigate('FamilyMember')}>
                            <Text style={commonStyles.deviceName}>定时</Text>
                            <Text style={commonStyles.familyName}>未设置</Text>
                            <Image style={commonStyles.moreIconSty} source={require('../../img/icon_gd.png')} />
                        </Touch>
                        <Touch style={[commonStyles.flexBox, commonStyles.noneLineList, {paddingHorizontal: 0}]} activeOpacity={1} onPress={() => this.props.navigation.navigate('FamilyMember')}>
                            <Text style={commonStyles.deviceName}>调速</Text>
                            <Text style={commonStyles.familyName}>未设置</Text>
                            <Image style={commonStyles.moreIconSty} source={require('../../img/icon_gd.png')} />
                        </Touch>
                        <Touch style={[commonStyles.flexBox, commonStyles.noneLineList, {paddingHorizontal: 0}]} activeOpacity={1} onPress={() => this.props.navigation.navigate('FamilyMember')}>
                            <Text style={commonStyles.deviceName}>微风</Text>
                            <Switch value={true} 
                                onTintColor={'#FCBF00'}
                                tintColor={'#E5E5E5'} 
                                style={commonStyles.switchStyle}
                            />
                        </Touch>
                        <Touch style={[commonStyles.flexBox, commonStyles.noneLineList, {paddingHorizontal: 0}]} activeOpacity={1} onPress={() => this.props.navigation.navigate('FamilyMember')}>
                            <Text style={commonStyles.deviceName}>转向</Text>
                            <Text style={commonStyles.familyName}>未设置</Text>
                            <Image style={commonStyles.moreIconSty} source={require('../../img/icon_gd.png')} />
                        </Touch> */}
                        {/* <Touch style={[commonStyles.flexBox, commonStyles.noneLineList, {paddingHorizontal: 0}]} activeOpacity={1} onPress={() => this.props.navigation.navigate('FamilyMember')}>
                            <Text style={commonStyles.deviceName}>倒计时</Text>
                            <Text style={commonStyles.familyName}>{this.props.container.data.FANS_COUNTDOWN == 0 ? '未设置' : formatSeconds(this.props.container.data.FANS_COUNTDOWN)}</Text>
                            <Image style={commonStyles.moreIconSty} source={require('../../img/icon_gd.png')} />
                        </Touch> */}

                        {/* <Picker
                            title="Countdown"
                            data={timingJson}
                            cols={2}
                            okText='OK'
                            dismissText = 'CANCEL'
                            extra={this.props.container.data.FANS_COUNTDOWN == 0 ? 'Not set' : formatSeconds(this.props.container.data.FANS_COUNTDOWN)}
                            itemStyle={{ color:'#2C2D30', fontSize: 15}}
                            indicatorStyle={{backgroundColor:'red'}}
                            value={this.state.checkedItem}
                            onChange={(v) => {
                                this.setState({ checkedItem: v });
                                console.log(v)
                            }}
                            onOk={(v) => {
                                let fengSText = '';
                                this.setState({ checkedItem: v });
                                if(v.length == 1){
                                    postOperationDevies(
                                        {
                                            method_name: this.props.container.navigation.state.params.deviceName,
                                            payload: { FANS_COUNTDOWN:  0}
                                        },
                                        this.props.container.userInfoData.token,
                                        this.props.container.navigation.state.params.id
                                    );
                                } else {
                                    for(index in v) {
                                        fengSText += v[index];
                                    }
                                    let changeH = fengSText.replace("h",":");
                                    let changeM = changeH.replace("m",":");
                                    changeM += '00';
                                    console.log(changeM);
                                    console.log(time_to_sec(changeM))
                                    postOperationDevies(
                                        {
                                            method_name: this.props.container.navigation.state.params.deviceName,
                                            payload: { FANS_COUNTDOWN:  time_to_sec(changeM)}
                                        },
                                        this.props.container.userInfoData.token,
                                        this.props.container.navigation.state.params.id
                                    );
                                }
                            }}
                        >
                            <CustomChildren>Countdown</CustomChildren>
                        </Picker> */}





                    </View>
<View>
    <List >
        <DatePicker
            value={this.state.fanCountDownNum}
            mode="time"
            onChange={this.setFanCoundownVal}
            onOk={this._getFanPicker}
            format="HH:mm"
            extra={this.props.container.data.FANS_COUNTDOWN == 0 ? 'Not set' : formatSeconds(this.props.container.data.FANS_COUNTDOWN)}
            locale={date_picker_locale}
        >
            <List.Item arrow="horizontal" style={{paddingRight: 15, paddingLeft: 40, backgroundColor:'white'}}>Countdown</List.Item>
        </DatePicker>
    </List>
    {/* <Text style={{backgroundColor:'#fff', fontSize: 14, color:'#8E8E93', paddingLeft:40, paddingRight: 30, paddingVertical: 17}}>选择00:00时，取消倒计时</Text> */}
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
    } else {
        return <Loading />
    }
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
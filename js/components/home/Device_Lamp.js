import React, { Component } from 'react';
import {
  Text,
  View,
  Image,Modal, Dimensions, SafeAreaView, ScrollView, StyleSheet, Slider
} from 'react-native';
import Touch from 'react-native-touch-once';
import { commonStyles } from '../../tools/layout';
import { EventRegister } from 'react-native-event-listeners';
import { Header } from 'react-navigation';
import DevicePopInfo from '../../components/common/DevicePopInfo';
export default class Device_Lamp extends Component {
  constructor(props) {
    super(props);
    this.state = {
        value: 20,
        switchStatus: false,
        isShowCountDown: false
    }
  }

  _onChange =(value)=>{
    this.setState({
        value: value
    })
};
_changeStatus = () => {
    this.setState({switchStatus: !this.state.switchStatus})
}

  render() {
    return (
        <SafeAreaView style={commonStyles.containGrayWrap}>
        <ScrollView>
          <View style={styles.marT16}>
            <View style={[commonStyles.flexBox, commonStyles.addDevicesBox, { paddingVertical: 23}]}>
                <Image
                    style={styles.deviceImg}
                    source={require('../../img/pic_sb_d.png')}
                />
            </View>
          </View>
          <View style={styles.marT16}>
            <View style={[ commonStyles.addDevicesBox, { paddingLeft: 40, paddingRight:30}]}>
                <View style={commonStyles.flexBox}>
                    <Text style={styles.deviceFunTit}>亮度调节</Text>
                    <Text style={{color:'#8E8E93', fontSize: 14, marginTop: 24}}>{this.state.value}%</Text>
                </View>
               <View style={[commonStyles.flexBox, {marginTop: 26, marginBottom: 30}]}>
               <Image
                    style={styles.funImgSty}
                    source={require('../../img/icon_ld1.png')}
                />
                <Slider style={styles.slider}
                    minimumValue={0}
                    maximumValue={100}
                    value={this.state.value}
                    step={1}
                    onValueChange={this._onChange}
                    minimumTrackTintColor={'#FCBF00'}
                />
                <Image
                    style={styles.funImgSty}
                    source={require('../../img/icon_ld2.png')}
                />
               </View>
            </View>
          </View>
          <View style={styles.marT16}>
            <View style={[ commonStyles.addDevicesBox, { paddingHorizontal: 42, paddingBottom:54, paddingTop: 24, }]}>
                {this.state.isShowCountDown ? (
                    <View style={commonStyles.flexBox}>
                        <Text style={styles.countTime}>3小时56分后关闭</Text>
                    </View>
                ) : null}
                <View style={[commonStyles.flexBox, {justifyContent: 'space-between', marginTop:24}]}>
                    <Touch style={commonStyles.flexBoxColumn}
                        onPress={() => this._changeStatus()}
                    >
                            <Image
                                style={styles.deviceFunImg}
                                source={this.state.switchStatus ? require('../../img/icon_sb_kq.png') : require('../../img/icon_sb_gb.png')}
                            />
                            <View style={{textAlgin: 'center'}}>
                                <Text style={[styles.deviceFunText, { color: this.state.switchStatus ? '#FCBF00' : '#2C2D30'}]}>{this.state.switchStatus ? "开启" : "关闭" }</Text>
                            </View>
                    </Touch>
                    <Touch style={commonStyles.flexBoxColumn}
                        onPress={() => this.props.navigation.navigate('DeviceTiming')}
                    >
                            <Image
                                style={styles.deviceFunImg}
                                source={require('../../img/icon_sb_ds.png')}
                            />
                            <View style={{textAlgin: 'center'}}>
                                <Text style={styles.deviceFunText}>定时</Text>
                            </View>
                    </Touch>
                    <View style={commonStyles.flexBoxColumn}>
                        <Image
                            style={styles.deviceFunImg}
                            source={require('../../img/icon_sb_djs.png')}
                        /> 
                        <View style={{textAlgin: 'center'}}>
                            <Text style={styles.deviceFunText}>倒计时</Text>
                        </View>
                    </View>
               </View>
            </View>
          </View>
        </ScrollView>         
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
import React, { Component } from 'react';
import {
  Text,
  View,
  Image,Modal, Dimensions, SafeAreaView, ScrollView, StyleSheet, Slider, Switch
} from 'react-native';
import Touch from 'react-native-touch-once';
import { commonStyles } from '../../tools/layout';
import { EventRegister } from 'react-native-event-listeners';
import { Header } from 'react-navigation';
export default class Device_ChaPai extends Component {
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
                <Touch style={[commonStyles.flexBoxColumn, commonStyles.containWrap, {paddingVertical: 42}]}
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
                <View style={styles.marT16}>
                    <View style={[ commonStyles.addDevicesBox, { paddingLeft: 40, paddingRight:30}]}>
                        <View style={[commonStyles.flexBox, {marginBottom:20}]}>
                            <Text style={styles.deviceFunTit}>一路</Text>
                            <Switch value={true} 
                                onTintColor={'#FCBF00'}
                                tintColor={'#E5E5E5'} 
                                style={{ transform: [{ scaleX: .8 }, { scaleY: .8 }], marginTop: 24 }}
                            />
                        </View>
                        <Touch style={[commonStyles.flexBox, {paddingBottom:23}]} activeOpacity={1} onPress={() => this.props.navigation.navigate('FamilyMember')}>
                            <Text style={commonStyles.deviceName}>定时</Text>
                            <Text style={commonStyles.familyName}>未设置</Text>
                            <Image style={commonStyles.moreIconSty} source={require('../../img/icon_gd.png')} />
                        </Touch>
                    </View>
                </View>
                <View style={styles.marT16}>
                    <View style={[ commonStyles.addDevicesBox, { paddingLeft: 40, paddingRight:30}]}>
                        <View style={[commonStyles.flexBox, {marginBottom:20}]}>
                            <Text style={styles.deviceFunTit}>二路</Text>
                            <Switch value={true} 
                                onTintColor={'#FCBF00'}
                                tintColor={'#E5E5E5'} 
                                style={{ transform: [{ scaleX: .8 }, { scaleY: .8 }], marginTop: 24 }}
                            />
                        </View>
                        <Touch style={[commonStyles.flexBox, {paddingBottom:23}]} activeOpacity={1} onPress={() => this.props.navigation.navigate('FamilyMember')}>
                            <Text style={commonStyles.deviceName}>定时</Text>
                            <Text style={commonStyles.familyName}>未设置</Text>
                            <Image style={commonStyles.moreIconSty} source={require('../../img/icon_gd.png')} />
                        </Touch>
                    </View>
                </View>
                <View style={styles.marT16}>
                    <View style={[ commonStyles.addDevicesBox, { paddingLeft: 40, paddingRight:30}]}>
                        <View style={[commonStyles.flexBox, {marginBottom:20}]}>
                            <Text style={styles.deviceFunTit}>三路</Text>
                            <Switch value={true} 
                                onTintColor={'#FCBF00'}
                                tintColor={'#E5E5E5'} 
                                style={{ transform: [{ scaleX: .8 }, { scaleY: .8 }], marginTop: 24 }}
                            />
                        </View>
                        <Touch style={[commonStyles.flexBox, {paddingBottom:23}]} activeOpacity={1} onPress={() => this.props.navigation.navigate('FamilyMember')}>
                            <Text style={commonStyles.deviceName}>定时</Text>
                            <Text style={commonStyles.familyName}>未设置</Text>
                            <Image style={commonStyles.moreIconSty} source={require('../../img/icon_gd.png')} />
                        </Touch>
                    </View>
                </View>
                <View style={[styles.marT16, {marginBottom: 50}]}>
                    <View style={[ commonStyles.addDevicesBox, { paddingLeft: 40, paddingRight:30}]}>
                        <View style={[commonStyles.flexBox, {marginBottom:20}]}>
                            <Text style={styles.deviceFunTit}>四路</Text>
                            <Switch value={true} 
                                onTintColor={'#FCBF00'}
                                tintColor={'#E5E5E5'} 
                                style={{ transform: [{ scaleX: .8 }, { scaleY: .8 }], marginTop: 24 }}
                            />
                        </View>
                        <Touch style={[commonStyles.flexBox, {paddingBottom:23}]} activeOpacity={1} onPress={() => this.props.navigation.navigate('FamilyMember')}>
                            <Text style={commonStyles.deviceName}>定时</Text>
                            <Text style={commonStyles.familyName}>未设置</Text>
                            <Image style={commonStyles.moreIconSty} source={require('../../img/icon_gd.png')} />
                        </Touch>
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
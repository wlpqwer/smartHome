import React, { Component } from 'react';
import { Text, ScrollView, SafeAreaView, Image, StyleSheet, Dimensions, View } from 'react-native';
import { WingBlank, Modal } from 'antd-mobile-rn';
import { commonStyles } from '../../tools/layout';
import Touch from 'react-native-touch-once';
import { Header } from 'react-navigation';

export default class ChooseCondition extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.operationType = this.props.navigation.state.params.operationType;
  }

  render() {
    console.log(this.props.navigation.state.params)
    return (
      <SafeAreaView style={commonStyles.containGrayWrap}>
        <ScrollView>
          <View style={commonStyles.homeContainerBox}>
            {/* <Touch style={[commonStyles.flexBox, commonStyles.noneLineList]}  
              activeOpacity={1} 
              onPress={() => this.props.navigation.navigate('ConditionInfo', {operationType: this.operationType})}
            >
              <Text style={commonStyles.deviceName}>温度</Text>
              <Image style={commonStyles.moreIconSty} source={require('../../img/icon_gd.png')} />
            </Touch> */}
            {/* <Touch style={[commonStyles.flexBox, commonStyles.noneLineList]} activeOpacity={1} onPress={() => this.props.navigation.navigate('ConditionInfo')}>
              <Text style={commonStyles.deviceName}>湿度</Text>
              <Image style={commonStyles.moreIconSty} source={require('../../img/icon_gd.png')} />
            </Touch>
            <Touch style={[commonStyles.flexBox, commonStyles.noneLineList]} activeOpacity={1} onPress={() => this.props.navigation.navigate('Weather')}>
              <Text style={commonStyles.deviceName}>天气</Text>
              <Image style={commonStyles.moreIconSty} source={require('../../img/icon_gd.png')} />
            </Touch> */}
            {/* <Touch style={[commonStyles.flexBox, commonStyles.noneLineList]} activeOpacity={1} onPress={() => this.props.navigation.navigate('ConditionInfo')}>
              <Text style={commonStyles.deviceName}>日出日落</Text>
              <Image style={commonStyles.moreIconSty} source={require('../../img/icon_gd.png')} />
            </Touch> */}
            <Touch style={[commonStyles.flexBox, commonStyles.noneLineList]} 
              activeOpacity={1} 
              onPress={() => this.props.navigation.navigate('Timing', {operationType: this.operationType})
            }>
              <Text style={commonStyles.deviceName}>Timer</Text>
              <Image style={commonStyles.moreIconSty} source={require('../../img/icon_gd.png')} />
            </Touch>
            {/* <Touch style={[commonStyles.flexBox, commonStyles.noneLineList]} activeOpacity={1} onPress={() => this.props.navigation.navigate('ConditionInfo')}>
              <Text style={commonStyles.deviceName}>控制智能设备</Text>
              <Image style={commonStyles.moreIconSty} source={require('../../img/icon_gd.png')} />
            </Touch> */}
          </View>
        </ScrollView>
       </SafeAreaView>
    );
  }
}

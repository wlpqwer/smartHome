import React, { Component } from 'react';
import { Text, ScrollView, SafeAreaView, Image, View } from 'react-native';
import { commonStyles } from '../../tools/layout';
import Touch from 'react-native-touch-once';

export default class ChooseAction extends Component {
  constructor(props) {
    super(props);
    this.params = this.props.navigation.state.params.actionType; 
    console.log(this.props.navigation.state.params)
  }

  render() {
    return (
      <SafeAreaView style={commonStyles.containGrayWrap}>
        <ScrollView>
          <View style={commonStyles.homeContainerBox}>
            <Touch style={[commonStyles.flexBox, commonStyles.noneLineList]}  activeOpacity={1} 
              onPress={() => this.props.navigation.navigate('ChooseScene', {actionType: this.params})}
            >
              <Text style={commonStyles.deviceName}>Execution scenario</Text>
              <Image style={commonStyles.moreIconSty} source={require('../../img/icon_gd.png')} />
            </Touch>
            <Touch style={[commonStyles.flexBox, commonStyles.noneLineList]} activeOpacity={1} 
              onPress={() => this.props.navigation.navigate('ChooseEquipment', {where: 'autoMationTurn', actionType: this.params})}
            >
              <Text style={commonStyles.deviceName}>Control smart devices</Text>
              <Image style={commonStyles.moreIconSty} source={require('../../img/icon_gd.png')} />
            </Touch>
          </View>
        </ScrollView>
       </SafeAreaView>
    );
  }
}

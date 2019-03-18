import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
} from 'react-native';
import Touch from 'react-native-touch-once';
import { commonStyles } from '../../tools/layout';
export default class CurrentLocation extends Component {
  constructor(props) {
    super(props);
    // this.navigation = props.container.container.navigation;
  }
  render() {
    return (
        <View style={commonStyles.homeContainerBox}>
            <Touch style={[commonStyles.flexBox, commonStyles.noneLineList]}  activeOpacity={1}>
                <Text style={commonStyles.deviceName}>当前城市</Text>
                <Text style={commonStyles.familyName}>北京市</Text>
                <Image style={commonStyles.moreIconSty} source={require('../../img/icon_gd.png')} />
            </Touch>
        </View>
    );
  }
}
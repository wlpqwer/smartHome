import React, { Component } from 'react';
import { commonStyles } from '../../tools/layout';
import Touch from 'react-native-touch-once';
import {
  Text,
  Image,
  SafeAreaView,ScrollView
} from 'react-native';
import { WingBlank } from 'antd-mobile-rn';
export default class ChooseDevice extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SafeAreaView style={commonStyles.containWrap}>
        <ScrollView>
          <WingBlank>
            <Touch style={[commonStyles.flexBox, commonStyles.deviceList]}  onPress={() => this.props.navigation.navigate('AddDevice')}>
              <Image style={[commonStyles.deviceImg, {marginRight: 20}]}
                  source={require('../../img/pic_fs.png')}
                />
              <Text style={commonStyles.deviceName}>Fan</Text>
              <Image style={commonStyles.moreIconSty} source={require('../../img/icon_gd.png')} />
            </Touch>
            <Touch style={[commonStyles.flexBox, commonStyles.deviceList]}  onPress={() => this.props.navigation.navigate('AddDevice')}>
              <Image style={[commonStyles.deviceImg, {marginRight: 20}]}
                  source={require('../../img/pic_fs.png')}
                />
              <Text style={commonStyles.deviceName}>Adjustable speed fan</Text>
              <Image style={commonStyles.moreIconSty} source={require('../../img/icon_gd.png')} />
            </Touch>
            {/* <Touch style={[commonStyles.flexBox, commonStyles.deviceList]}  onPress={() => this.props.navigation.navigate('AddDevice')}>
              <Image style={[commonStyles.deviceImg, {marginRight: 20}]}
                  source={require('../../img/pic_fs.png')}
                />
              <Text style={commonStyles.deviceName}>开关</Text>
              <Image style={commonStyles.moreIconSty} source={require('../../img/icon_gd.png')} />
            </Touch>
            <Touch style={[commonStyles.flexBox, commonStyles.deviceList]}  onPress={() => this.props.navigation.navigate('AddDevice')}>
              <Image style={[commonStyles.deviceImg, {marginRight: 20}]}
                  source={require('../../img/pic_fs.png')}
                />
              <Text style={commonStyles.deviceName}>RGB灯</Text>
              <Image style={commonStyles.moreIconSty} source={require('../../img/icon_gd.png')} />
            </Touch> */}
          </WingBlank>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
import React, { Component } from 'react';
import { Text, ScrollView, SafeAreaView, Image, StyleSheet, View } from 'react-native';
import { commonStyles } from '../../tools/layout';
import DeviceInfo from 'react-native-device-info'

export default class AboutUs extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SafeAreaView style={commonStyles.containWrap}>
        <ScrollView>
            <View style={[commonStyles.flexBoxColumn, {paddingTop: 48}]}>
                <Image style={styles.versionImg} source={require('../../img/icon_gywm.png')} />
                <Text style={styles.versionText}>V{DeviceInfo.getVersion()}</Text>
            </View>
        </ScrollView>
       </SafeAreaView>
    );
  }
}


const styles = StyleSheet.create({
    versionImg:{
        width: 80,
        height: 80,
    },
    versionText:{
        color: '#2C2D30',
        fontSize: 13,
        lineHeight: 50
    },
  });
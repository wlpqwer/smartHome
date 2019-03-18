import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import {commonStyles} from '../tools/layout';
export default class StartPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={[commonStyles.containWrap, { justifyContent: "flex-end" }]}>
        <View style={[commonStyles.flexBoxColumn, {paddingVertical:38}]}>
          <Image style={styles.appIcon} source={require('../img/pic_qdy.png')} />
          <Text style={styles.launchText}>Light up your life</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  appIcon: {
    width:60,
    height:60
  },
  launchText:{
    color:'#3B3FB6',
    fontSize:15,
    marginTop:18
  }
});

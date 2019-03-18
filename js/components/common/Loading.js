import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import { commonStyles } from '../../tools/layout';

export default class Loading extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
        <View style={[commonStyles.flexBoxColumn, commonStyles.containWrap]}>
            <Image
                style={commonStyles.loadingText}
                source={require('../../img/loading.gif')}
            />
            <Text style={{ marginTop: 20, fontSize: 15, color:'#8E8D94'}}>Loading...</Text>
        </View>
    );
  }
}

import React, { Component } from 'react';
import { Text, SafeAreaView, Image, StyleSheet, View, ScrollView } from 'react-native';
import { commonStyles } from '../../tools/layout';

export default class MessageInfo extends Component {
  constructor(props) {
    super(props);
    this.params = this.props.navigation.state.params.data;
  }



  render() {
      console.log(this.props.navigation.state.params)
    return (
      <SafeAreaView style={commonStyles.containGrayWrap}>
        <ScrollView>
            <View style={[commonStyles.flexBox, {height: 60}]}>
                <Text style={styles.messageTime}>{this.params.time}</Text>
            </View>
            <View style={styles.messageContBox}>
                <Text style={styles.messageContText}>{this.params.text}</Text>
            </View>
        </ScrollView>
       
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
    messageTime:{
        color: '#8E8E93',
        fontSize: 13
    },
    messageContBox:{
        backgroundColor:'#fff',
        padding: 20
    },
    messageContText: {
        color: '#4A4A4A',
        fontSize: 14
    }
    
});

import React, { Component } from 'react';
import { Text, ScrollView, SafeAreaView, StyleSheet, Dimensions, View, TextInput } from 'react-native';
import { WingBlank, Modal,Toast } from 'antd-mobile-rn';
import { commonStyles } from '../../tools/layout';
import Touch from 'react-native-touch-once';
import { Header } from 'react-navigation';
import DeviceInfo from 'react-native-device-info';
import { postFeedBack } from '../../network_request/fetch_api';

export default class Feedback extends Component {
  constructor(props) {
    super(props);
    this.feedBackContent = '';
  }

  
  _feedback = () => {
    if(this.feedBackContent.length == 0){
      Toast.info("Feedback can't be empty~",  2, undefined, false);
    } else {
      console.log(this.props.navigation.state.params.token)
      postFeedBack(
        {
            equipment_id: DeviceInfo.getUniqueID(),
            feedback_info: this.feedBackContent
        },
        this.props.navigation.state.params.token,
      );
      this.props.navigation.pop();
    }
  }
  render() {
    return (
      <SafeAreaView style={commonStyles.containWrap}>
        <ScrollView>
          <View style={styles.freeBackBox}>
            {/* <View style={[styles.writeItems, commonStyles.flexBox, commonStyles.padLR20]}>
              <TextInput
                style={styles.writeCon}
                numberOfLines={1}
                placeholderTextColor={'#9B9B9B'}
                selectionColor="#FFBB00"
                placeholder="请写下您的电话"
              />
            </View> */}
            <View style={[commonStyles.flexBox, commonStyles.padLR20, {borderBottomColor: '#F1F0F0',borderBottomWidth: 1}]}>
              <TextInput
                style={styles.writeCon2}
                placeholderTextColor={'#9B9B9B'}
                selectionColor="#FFBB00"
                multiline={true}
                numberOfLines={40}
                placeholder="Describe your issue"
                onChangeText={feedBackContent => {
                  this.feedBackContent = feedBackContent.replace(/\s+/g,"");
              }}
              />
            </View>
            <Touch style={[commonStyles.flexBox, styles.submitBtn]} onPress = {() => this._feedback()}>
                <Text style={styles.submitText}>Submit</Text>
            </Touch>
          </View>
        </ScrollView>    
       </SafeAreaView>
    );
  }
}


const styles = StyleSheet.create({
    freeBackBox:{
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - Header.HEIGHT,
    },
    writeItems: {
      height: 69,
      borderBottomColor: '#F1F0F0',
      borderBottomWidth: 1,
    },
    writeCon: {
      flex: 1,
      fontSize: 15,
      color: '#9B9B9B',
      lineHeight: 20,
      paddingVertical: 16,
    },
    writeCon2: {
      marginVertical: 16,
      flex: 1,
      fontSize: 15,
      color: '#9B9B9B',
      lineHeight: 20,
      height: 136,
      textAlignVertical: 'top'
    },
    submitBtn:{
        borderColor: '#CCCCCC',
        borderWidth: 1,
        borderRadius: 4,
        height:48,
        position:"absolute",
        bottom: 60,
        left: '5.5%',
        width: '89%'
    },
    submitText:{
        color: '#8E8E93',
        fontSize:17
    }
  });
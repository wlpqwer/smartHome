import React, { Component } from 'react';
import { Text, ScrollView, SafeAreaView, Image, StyleSheet, View, TextInput } from 'react-native';
import { Toast } from 'antd-mobile-rn';
import { commonStyles } from '../../tools/layout';
import Touch from 'react-native-touch-once';
import { postShareDevice } from '../../network_request/fetch_api';
import { EventRegister } from 'react-native-event-listeners';

export default class AddShare extends Component {
  constructor(props) {
    super(props);
    this.phoneNum = '';
  }

  componentDidMount() {
    this.addShareDeviceListener = EventRegister.addEventListener('AddShareDevice', msg => {
      Toast.info(msg,  2, undefined, false);
      this.props.navigation.pop();
    });
  }

  componentWillUnmount() {
    EventRegister.removeEventListener(this.addShareDeviceListener);
  }

  static navigationOptions = ({ navigation }) => {
    console.log(navigation.state)
    const { params = {} } = navigation.state;
    return {
      headerTitle: 'Add share',
      headerRight: <View /> 
    };
  };

  newShareDevice = () => {
    if(this.phoneNum.length == 0){
      Toast.info("Please fill in the correct mobile number",  2, undefined, false);
    } else{
      console.log(this.phoneNum);
      postShareDevice(
        {
          share_to: this.phoneNum,
          share_equipment: this.props.navigation.state.params.deviceId,
        },
        this.props.navigation.state.params.token,
      );
      // Toast.loading('请稍等', 0);
    }
  }



  render() {
    console.log(this.props.navigation.state.params)
    return (
      <SafeAreaView style={commonStyles.containGrayWrap}>
        <ScrollView>
        <View style={styles.addMemberBox}>
            <View style={[styles.memeberItems, commonStyles.flexBox, commonStyles.padLR20]}>
              <Text style={styles.tagName} numberOfLines={1}>Country</Text>
              <Text style={styles.centerName}>China+86</Text>
              <Image style={commonStyles.moreIconSty} source={require('../../img/icon_gd.png')} />
            </View>
            <View style={[styles.memeberItems, commonStyles.flexBox, commonStyles.padLR20]}>
              <Text style={styles.tagName}>Account ID</Text>
              <TextInput
                style={commonStyles.writeCon}
                numberOfLines={1}
                placeholderTextColor={'#9B9B9B'}
                selectionColor="#FCBF00"
                placeholder="Entre Phone"
                keyboardType={'numeric'}
                onChangeText={phoneNum => {
                  this.phoneNum = phoneNum;
              }}
              />
            </View>
            <Touch style={[styles.loginBtn,commonStyles.flexBox]}
              onPress = {() => this.newShareDevice()}
            >
                    <Text style={styles.loginText}>SAVE</Text>
            </Touch>
          </View>
          
        </ScrollView>
       </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
    addMemberBox:{
      backgroundColor:'#fff',
    },
    memeberItems:{
      height:71,
      borderBottomWidth:1,
      borderBottomColor:'#F2F2F2'
    },
    tagName:{
      color:'#2C2D30',
      fontSize:16,
      width:'32%',
    },
    centerName:{
      flex:1,
      fontSize:16
    },
    loginBtn:{
      marginTop: 42,
      height: 42,
      marginHorizontal: 20,
      marginBottom: 42,
      borderRadius: 2,
      backgroundColor: '#FFBB00'
  },
  loginText:{
      fontSize: 17,
      color: '#fff'
  },
  });
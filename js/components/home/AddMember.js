import React, { Component } from 'react';
import { Text, ScrollView, SafeAreaView, Image, StyleSheet, View, TextInput, Switch } from 'react-native';
import { Toast } from 'antd-mobile-rn';
import { commonStyles } from '../../tools/layout';
import Touch from 'react-native-touch-once';
import ModalToast from '../common/ModalToast';
import { postAddFamilyMember } from '../../network_request/fetch_api';
import { EventRegister } from 'react-native-event-listeners';
export default class AddMember extends Component {
  constructor(props) {
    super(props);
    this.state = {
      memberValue: '',
      msg: '',
      isShowMsg: false
    }
    this.memberNum = '';
  }

  componentDidMount() {
    this.props.navigation.setParams({ _addMember: this._addMember });
    this.listener = EventRegister.addEventListener('addMemberSucc', data => {
      Toast.hide();
      if(data.status == "201201"){
        this.props.navigation.pop();
      } else{
        this.setState({ 
          msg: data.msg,
          isShowMsg: true
         });
      }
    });
  }

  componentWillUnmount() {
    EventRegister.removeEventListener(this.listener);
  }

  _addMember = () => {
    this.memberNum = this.memberNum.replace(/\s+/g,"");
    if(this.memberNum == ''){
      Toast.info("Phone number can not be blank!",  2, undefined, false);  
    } else {
      postAddFamilyMember(
        {
          phone_number: this.memberNum,
        },
        this.props.navigation.state.params.token,
        this.props.navigation.state.params.id
      );
      Toast.loading('Loading', 0);
    }
    console.log(this.memberNum)
  }

  static navigationOptions = ({ navigation }) => {
    console.log(navigation.state.params.id)
    const { params = {} } = navigation.state;
    return {
      headerTitle: 'Add a new member',
      headerRight: (
        <View style={[commonStyles.flexBox, { height: '100%', width: 88 }]}>
          <Touch
            style={[commonStyles.flexBox, { flex: 1, height: '100%' }]}
            activeOpacity={0.5}
            onPress={() => {params._addMember()}}
          >
           <Text style={{fontSize:17, color:'#2C2D30'}}>OK</Text>
          </Touch>
        </View>
      ),
    };
  };

  hideDialog() {
    this.setState({
      isShowMsg: false,
      memberNum: ''
    });
  }

  render() {
    return (
      <SafeAreaView style={[commonStyles.containWrap, { backgroundColor:'#F8F8F8'}]}>
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
                keyboardType = {'numeric'}
                // value = {"this.state.memberValue"}
                onChangeText={memberNum => {
                  this.memberNum = memberNum;
                }}

              />
            </View>
            {/* <View style={[styles.memeberItems, commonStyles.flexBox, commonStyles.padLR20]}>
              <Text style={styles.tagName}>设为管理员</Text>
              <View style={styles.centerName}></View>
              <Switch value={true} 
                style={commonStyles.switchStyle}
                onTintColor={'#FCBF00'}
                tintColor={'#E5E5E5'} />
            </View> */}
          </View>
          <View style={[commonStyles.padLR20,{marginTop:20}]}>
            <Text style={styles.tagInfo}>Once added, you can sign in to your home with the account registered with this phone number.</Text>
            <Text style={styles.tagInfo}>The home manager has all the operating privileges, including removing the entire family. Ordinary members can only operate devices and scenarios, and cannot add and remove them.</Text>
          </View>
        </ScrollView>
        <ModalToast
          _dialogVisible={this.state.isShowMsg}
          _dialogContent={this.state.msg}
          _dialogLeftBtnAction={() => {
            this.hideDialog();
          }}
        />
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
  tagInfo:{
    color:'#767676',
    fontSize:14,
    lineHeight:21
  }
});
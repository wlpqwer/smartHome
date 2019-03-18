import React, { Component } from 'react';
import { Text, ScrollView, SafeAreaView, Image, StyleSheet, View, Switch } from 'react-native';
import { commonStyles } from '../../tools/layout';
import Touch from 'react-native-touch-once';
import { Toast } from 'antd-mobile-rn';
import { deleteFamyilyMember } from '../../network_request/fetch_api';
import ModalDialog from '../common/ModalDialog';
import { EventRegister } from 'react-native-event-listeners';

export default class AdminSetUp extends Component {
  constructor(props) {
    super(props);
    this.params = props.navigation.state.params;
    this.state = {
      isShowMsg: false,
    }
  }

  componentDidMount() {
    this.delFamilyMemberListener = EventRegister.addEventListener('delFamilyMemberSucc', returnData => {
        Toast.info(returnData.msg,  2, undefined, false);
        this.props.navigation.pop();
    }); 
  }

  componentWillUnmount() {
    EventRegister.removeEventListener(this.delFamilyMemberListener);
  }

  hideDialog = () =>{
    this.setState({ isShowMsg: false });
  }

  delMemberFun = () => {
    deleteFamyilyMember(
      {
        phone_number: this.params.data.user_phone,
      },
      this.params.token,
      this.params.id
    );
    this.hideDialog();
    Toast.loading('Loading', 0);
  }

  render() {
    return (
      <SafeAreaView style={commonStyles.containGrayWrap}>
        <ScrollView>
          <View style={{ paddingTop: 30, backgroundColor: '#fff' }}>
            <Touch style={[commonStyles.flexBox, commonStyles.memberList]}  activeOpacity={1}>
              <Image
                style={commonStyles.memberImg}
                defaultSource={require('../../img/pic_mrtx.png')}
                source={this.params.data.image == '' ? require('../../img/pic_mrtx.png') : {uri: this.params.data.image}}
              />
              <View style={commonStyles.memberInfo}>
                <Text style={commonStyles.memberName}>{this.params.data.name == '' ? 'Member' : this.params.data.name}</Text>
                <Text style={commonStyles.memberTel}>{this.params.data.user_phone}</Text>
              </View>
              {!this.params.data.is_admin ? (
                <Touch  style={[commonStyles.delBtn, commonStyles.flexBox]}
                  onPress={() => this.setState({ isShowMsg: true}) } 
                >
                    <Text style={commonStyles.delText}>Delete</Text>
                </Touch>
              ) : null}
            </Touch>
          </View>
          {/* <View style={[commonStyles.flexBox, styles.setUpAdmin]}>
            <Text style={styles.textSty}>设为管理员</Text>
            <Switch value={true} 
              style={commonStyles.switchStyle}
              onTintColor={'#FCBF00'}
              tintColor={'#E5E5E5'} 
            />
          </View> */}
        </ScrollView>
        <ModalDialog
          _dialogVisible={this.state.isShowMsg}
          _dialogTitle={"Delete member"}
          _dialogContent={""}
          _dialogLeftBtnAction={() => {
            this.hideDialog();
          }}
          _dialogRightBtnAction={() => {
            this.delMemberFun();
          }}
        />
       </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  setUpAdmin:{
    height:60,
    marginTop:10,
    paddingHorizontal:20,
    backgroundColor:'#fff'
  },
  textSty:{
    color:'#2C2D30',
    fontSize:17,
    flex:1
  }
});
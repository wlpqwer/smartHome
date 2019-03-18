import React, { Component } from 'react';
import { Text, ScrollView, SafeAreaView, Image, StyleSheet, Dimensions, View } from 'react-native';
import { WingBlank, Modal, Toast } from 'antd-mobile-rn';
import { commonStyles } from '../../tools/layout';
import Touch from 'react-native-touch-once';
import { Header } from 'react-navigation';
import { EventRegister } from 'react-native-event-listeners';
import Loading from '../common/Loading';

export default class FamilyMember extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.listener = EventRegister.addEventListener('addMemberSucc', data => {
      if(data.status == "201201"){
        this.props.container.fetchData(this.props.container.navigation.state.params.id);
        this.props.container.fetchFamilyInfoData(this.props.container.navigation.state.params.id);
      }
    });

    this.delFamilyMemberListener = EventRegister.addEventListener('delFamilyMemberSucc', returnData => {
      console.log(returnData)
      if(returnData.status == '204032'){
        this.props.container.fetchData(this.props.container.navigation.state.params.id);
        this.props.container.fetchFamilyInfoData(this.props.container.navigation.state.params.id);
      } 
      // Toast.info(returnData.msg,  2, undefined, false);
    }); 
  }

  componentWillUnmount() {
    EventRegister.removeEventListener(this.listener);
    EventRegister.removeEventListener(this.delFamilyMemberListener);
  }

  render() {
    console.log(this.props.container.data)
    if(this.props.container.isLoading){
      return <Loading /> 
    } else {
      return (
        <SafeAreaView style={commonStyles.containGrayWrap}>
          <ScrollView>
            <View style={[commonStyles.homeContainerBox, { paddingTop: 0, paddingBottom: 0}]}>
              {this.props.container.data.map((item, index) => {
                return(    
                  <Touch style={[commonStyles.flexBox, commonStyles.memberList, {
                    paddingTop: index == 0 ? 30: 0, 
                  }]}  
                    activeOpacity={1} 
                    key={index} 
                    onPress={() => 
                      this.props.container.navigation.navigate('AdminSetUp', {
                        data: item, 
                        id: this.props.container.navigation.state.params.id,
                        token: this.props.container.userInfoData.token
                      })
                    }
                  >
                    <Image
                      style={commonStyles.memberImg}
                      defaultSource={require('../../img/pic_mrtx.png')}
                      source={item.image == '' ? require('../../img/pic_mrtx.png') : {uri: item.image}}
                    />
                    <View style={commonStyles.memberInfo}>
                      <Text style={commonStyles.memberName}>{item.name == '' ? 'Member' : item.name}</Text>
                      <Text style={commonStyles.memberTel}>{item.user_phone}</Text>
                    </View>
                      <Text style={styles.familyName}>{item.is_admin ? "Manager" : "Ordinary member"}</Text>
                      <Image style={commonStyles.moreIconSty} source={require('../../img/icon_gd.png')} />
                  </Touch>
                 )
              })} 
  
            </View>
              <Touch style={[commonStyles.addItemsBox, commonStyles.flexBox]} activeOpacity={1} 
                onPress={() => 
                  this.props.container.navigation.navigate('AddMember', {
                    id: this.props.container.navigation.state.params.id,
                    token: this.props.container.userInfoData.token
                  })}
              >
                <Text style={commonStyles.addItemsText}>Add</Text>
              </Touch>
          </ScrollView>
         </SafeAreaView>
      );
    }
  }
}

const styles = StyleSheet.create({
  familyName:{
    color:'#9B9B9B',
    fontSize:15,
  }
});
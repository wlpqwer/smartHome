import React, { Component } from 'react';
import { Text, ScrollView, SafeAreaView, Image, StyleSheet, Dimensions, View, Switch, TextInput } from 'react-native';
import { WingBlank, Modal } from 'antd-mobile-rn';
import { commonStyles } from '../../tools/layout';
import Touch from 'react-native-touch-once';
import { Header } from 'react-navigation';

export default class UpdatePassword extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <SafeAreaView style={commonStyles.containWrap}>
        <ScrollView>
        <View style={[styles.addMemberBox, commonStyles.padLR20, {marginTop: 25}]}>
            <View style={[styles.memeberItems, commonStyles.flexBox]}>
              <Text style={styles.tagName}>当前密码</Text>
              <TextInput
                style={[commonStyles.writeCon, { fontSize: 15}]}
                numberOfLines={1}
                placeholderTextColor={'#9B9B9B'}
                selectionColor="#FCBF00"
                placeholder="请输入当前密码"
                // value = {this.state.newFamilyName}
                // onChangeText={familyName => (this.state.newFamilyName = familyName)}
              />
            </View>
            <View style={[styles.memeberItems, commonStyles.flexBox]}>
              <Text style={styles.tagName}>新密码</Text>
              <TextInput
                style={[commonStyles.writeCon, { fontSize: 15}]}
                numberOfLines={1}
                placeholderTextColor={'#9B9B9B'}
                selectionColor="#FCBF00"
                placeholder="设置密码（6-12位）"
                // value = {this.state.newFamilyName}
                // onChangeText={familyName => (this.state.newFamilyName = familyName)}
              />
            </View>
            <Touch style={[commonStyles.buttonBox,{marginTop:42, backgroundColor:'#FCBF00'}]}  onPress={() => {this.setPwdVisible(true)}}>
              <Text style={commonStyles.buttonText}>确认</Text>
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
      height:45,
      borderBottomWidth:1,
      borderBottomColor:'#F2F2F2'
    },
    tagName:{
      color:'#2C2D30',
      fontSize:15,
      width:'28%',
    },
    centerName:{
      flex:1,
      fontSize:16
    },
  });
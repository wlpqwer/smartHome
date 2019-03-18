// 目前没用的页面
import React, { Component } from 'react';
import { Text, ScrollView, SafeAreaView, Image, StyleSheet, Dimensions, View, Switch } from 'react-native';
import { WingBlank, Modal } from 'antd-mobile-rn';
import { commonStyles } from '../../tools/layout';
import Touch from 'react-native-touch-once';
import { Header } from 'react-navigation';

export default class ChooseAutoMation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      data: [{
        id: 1,
        text: '回家',
        status: false,
        isChecked: false
      },{
        id: 2,
        text: '离家',
        status: false,
        isChecked: false
      }],
      openStatus: false
    };
    this.selectIndexs = [];
  }

  _click = index => {
    this.setState({
      checked: true
    })
    if(this.selectIndexs.indexOf(index) == -1){
      this.selectIndexs.push(index);
    } else {     
      let resultIndex = this.selectIndexs.indexOf(index);
      this.selectIndexs.splice(resultIndex, 1);
      // console.log(item)
      // if(item.isChecked){
      //   item.isChecked = false;
      // }
      // this.setState({
      //   openStatus: true
      // })
    }
    console.log(this.selectIndexs)
  };

  render() {
    return (
      <SafeAreaView style={commonStyles.containGrayWrap}>
        <ScrollView>
          {this.state.data.map((item, index) => {
            return (
              <View style={[commonStyles.flexBox, commonStyles.padLR20, { marginTop: 20}]} 
                key={index}
              >
                <Touch 
                    activeOpacity={1}
                    onPress={() => this._click(index)}
                >
                  <Image style={styles.checkImg} 
                    source={
                      this.state.checked 
                      ? this.selectIndexs.indexOf(index) != -1 
                      ? require('../../img/icon_xz.png') 
                      : require('../../img/icon_wxz.png') 
                      : require('../../img/icon_wxz.png')
                    } 
                  />
                </Touch>
                <View style={[commonStyles.flexBox, commonStyles.sceneModule, {flex: 1, marginTop: 0}]}>
                  <Image
                    style={styles.equipmentImg}
                    source={require('../../img/icon_lj.png')}
                  />
                  <View style={[commonStyles.flexBoxColumn, {flex:1, alignItems:'flex-start'}]}
                  >
                    <Text style={commonStyles.sceneName}>{item.text}</Text>
                  </View>
                  <Switch 
                    value={this.state.checked && this.selectIndexs.indexOf(index) == -1 ? false : item.isChecked} 
                    testID={"index"}
                    style={{ transform: [{ scaleX: .8 }, { scaleY: .8 }] }}
                    onValueChange={(value)=> { 
                      this.setState({
                        checked: true,
                      });
                      item.isChecked = value
                      console.log(value + "----" + item.isChecked);
                      if(item.isChecked && this.selectIndexs.indexOf(index) == -1) {
                        this.selectIndexs.push(index);
                      } 
                      console.log(this.selectIndexs)
                    }}
                    onTintColor={'#FCBF00'}
                    tintColor={'#E5E5E5'} 
                  />
                </View>
              </View>
            )
          })}
        </ScrollView>
       </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  checkImg:{
    width:24,
    height: 24,
    marginRight: 16
  },
  equipmentImg: {
    width:60, 
    height:60,
    marginHorizontal:12
  },
});
import React, { Component } from 'react';
import { Text, ScrollView, SafeAreaView, Image, StyleSheet, Dimensions, View, } from 'react-native';
import { commonStyles } from '../../tools/layout';
import Touch from 'react-native-touch-once';
import {iconCollect} from '../../tools/mockData';
import { EventRegister } from 'react-native-event-listeners';
const iconWidth = Dimensions.get('window').width - 143;
export default class SceneIcon extends Component {
  constructor(props) {
    super(props);
    this.selectIndex = null;
    this.state = {
      iconData: [],
      isShowBorder: false
    }
  }


  componentDidMount() {
    let temporaryArr = [];
    for(let index in iconCollect) {
      temporaryArr.push(iconCollect[index]);
    }
    this.setState({iconData: temporaryArr});
    this.props.navigation.setParams({ _sendIcon: this._sendIcon });
  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerTitle: 'Select icon',
      headerRight: (
        <View style={[commonStyles.flexBox, { height: '100%', width: 88 }]}>
          <Touch
            style={[commonStyles.flexBox, { flex: 1, height: '100%' }]}
            activeOpacity={0.5}
            onPress={() => {params._sendIcon()}}
          >
           <Text style={{fontSize:17, color:'#2C2D30'}}>SAVE</Text>
          </Touch>
        </View>
      ),
    };
  };  

  _sendIcon = () => {
    if(this.selectIndex !== null){
      EventRegister.emit('chooseIconEvent', this.state.iconData[this.selectIndex]);
    }
    this.props.navigation.goBack();
  }

  _checkedSceneIcon = (index) => {
    this.setState({isShowBorder: true})
    this.selectIndex = index;
  }





  render() {
    return (
      <SafeAreaView style={commonStyles.containGrayWrap}>
        <ScrollView>
            <View style={styles.scenceIconWrap}>
            {this.state.iconData.map((item, index) => { 
                return(
                    <Touch
                        key={index}
                        style={[styles.iconBox, {borderColor: this.state.isShowBorder && this.selectIndex == index ? '#FCBF00' : '#fff'}]}
                        activeOpacity={0.5}
                        onPress={() => this._checkedSceneIcon(index)}
                    >
                      <Image
                        resizeMode= "contain"
                        style={styles.iconStyle}
                        defaultSource={require('../../img/icon_mrcj.png')}
                        source={{uri:item}}
                      />
                    </Touch>
                )
            })}
            </View>
        </ScrollView>
       </SafeAreaView>
    );
  }
}


const styles = StyleSheet.create({
  scenceIconWrap: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    paddingTop:20, 
    paddingRight: 5, 
    paddingLeft: 30, 
  },
  iconBox: {
    width: iconWidth/4 +2,
    height:iconWidth/4 +2,
    borderWidth: 1,
    borderRadius: 2,
    marginBottom: 25,
    marginRight: 25
  },
  iconStyle: {
    width: iconWidth /4,
    height: iconWidth/4,
  }
});
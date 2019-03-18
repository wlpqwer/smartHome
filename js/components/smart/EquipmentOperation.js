import React, { Component } from 'react';
import { Text, ScrollView, SafeAreaView, Image, StyleSheet, Dimensions, View } from 'react-native';
import { WingBlank, Modal } from 'antd-mobile-rn';
import { commonStyles } from '../../tools/layout';
import Touch from 'react-native-touch-once';
import { Header } from 'react-navigation';

export default class EquipmentOperation extends Component {
  constructor(props) {
    super(props);
    this.state = {
        data: [{
            id: 1,
            text: '开启',
          },{
            id: 2,
            text: '关闭',
        }],
        selectIndex: null
    }
  }

  static navigationOptions = ({ navigation }) => ({
    headerTintColor: '#000',
    headerTruncatedBackTitle: '返回',
    headerTitleStyle: {
        fontWeight: 'normal',
        fontSize: 16,
    },
    headerStyle: {
        backgroundColor: '#fff', 
        shadowColor: 'transparent',
        elevation: 0,
        shadowOpacity: 0,
    },
    headerTitle: navigation.state.params.title,
  });

  _click = index => {
    this.setState({
      selectIndex: index,
    });
  };

  render() {
    return (
      <SafeAreaView style={commonStyles.containGrayWrap}>
        <ScrollView>
            <View style={[commonStyles.setionListBox, {paddingHorizontal:0, marginTop:0}]}>
                {this.state.data.map((item, index) => {
                    return (
                        <Touch style={[commonStyles.setionItems, commonStyles.flexBox, commonStyles.lineSty,{ paddingHorizontal:20}]}
                            key={index}
                            activeOpacity={1}
                            onPress={() => {
                                this.setState({ selectIndex: index});
                                setTimeout(() => {
                                    console.log(this.state.selectIndex + "----" + index)
                                },100)
                            }
                        }
                        >
                            <Text style={commonStyles.setionItemText}>{item.text}</Text>
                            {this.state.selectIndex == index ? (
                                <Image style={commonStyles.moreIconSty} source={require('../../img/icon_xzdx.png')} />
                            ) : null}
                            
                        </Touch>
                    );
                })} 
                
            </View>
        </ScrollView>
       </SafeAreaView>
    );
  }
}

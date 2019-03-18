import React from 'react';
import { Text, ScrollView, SafeAreaView, Image, View } from 'react-native';
import { commonStyles } from '../../tools/layout';
import Touch from 'react-native-touch-once';
import CurrentLocation from './CurrentLocation';

  
export default class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedItem:'',
      data: [{
        id: 1,
        text: '晴天',
      },{
        id: 2,
        text: '阴天',
    },{
        id: 3,
        text: '雨天',
    },{
        id: 4,
        text: '霾天',
    },{
        id: 5,
        text: '雪天',
    }],
    }
  }

  _click = index => {
    this.setState({
      selectIndex: index,
    });
  };

  static navigationOptions = ({ navigation }) => ({
    headerRight: (
        <View style={[commonStyles.flexBox, { height: '100%', width: 88 }]}>
          <Touch
            style={[commonStyles.flexBox, { flex: 1, height: '100%' }]}
            activeOpacity={0.5}
            onPress={() => {navigation.goBack()}}
          >
           <Text style={{fontSize:17, color:'#2C2D30'}}>下一步</Text>
          </Touch>
        </View>
      ),
  });

  render() {
    return (
        <SafeAreaView style={commonStyles.containGrayWrap}>
            <ScrollView>
                <CurrentLocation/>
                <View style={[commonStyles.setionListBox, {paddingHorizontal:0}]}>
                    {this.state.data.map((item, index) => {
                        return (
                            <Touch style={[commonStyles.setionItems, commonStyles.flexBox, commonStyles.lineSty,{ paddingHorizontal:20, height:71}]}
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
import React from 'react';
import { Text, ScrollView, SafeAreaView, Image, View, Modal, Dimensions, Switch, StyleSheet } from 'react-native';
import { commonStyles } from '../../tools/layout';
import Touch from 'react-native-touch-once';
import { ActionSheet, Picker } from 'antd-mobile-rn';

const CustomChildren = (props) => (
    <Touch style={[commonStyles.addItemsBox, commonStyles.flexBox, {marginTop: 0}]}  
        activeOpacity={1}  
        onPress={props.onClick}
    >
        <Text style={commonStyles.deviceName}>{props.children}</Text>
        <Text style={commonStyles.familyName}>{props.extra}</Text>
        <Image style={commonStyles.moreIconSty} source={require('../../img/icon_gd.png')} />
    </Touch> 
  );
  const seasons = [
    {
        label: 'AM',
        value: 'AM',
        children:[{
            label: '1h',
            value: '1h',
            children:[{
                label: '1m',
                value: '1m', 
            }]
        },{
            label: '2h',
            value: '2h',
            children:[{
                label: '1m',
                value: '1m', 
            },{
                label: '2m',
                value: '2m', 
            }]
        },{
            label: '3h',
            value: '3h',
            children:[{
                label: '1m',
                value: '1m', 
            },{
                label: '2m',
                value: '2m', 
            },{
                label: '3m',
                value: '3m', 
            }]
        },{
            label: '4h',
            value: '4h',
            children:[{
                label: '1m',
                value: '1m', 
            },{
                label: '2m',
                value: '2m', 
            },{
                label: '3m',
                value: '3m', 
            },{
                label: '4m',
                value: '4m', 
            }]
        },{
            label: '5h',
            value: '5h',
            children:[{
                label: '1m',
                value: '1m', 
            },{
                label: '2m',
                value: '2m', 
            },{
                label: '3m',
                value: '3m', 
            },{
                label: '4m',
                value: '4m', 
            },{
                label: '5m',
                value: '5m', 
            }]
        },{
            label: '6h',
            value: '6h',
            children:[{
                label: '1m',
                value: '1m', 
            },{
                label: '2m',
                value: '2m', 
            },{
                label: '3m',
                value: '3m', 
            },{
                label: '4m',
                value: '4m', 
            },{
                label: '5m',
                value: '5m', 
            },{
                label: '6m',
                value: '6m', 
            }]
        }],
    },{
        label: 'PM',
        value: 'PM',
        children:[{
            label: '21ºC',
            value: '21ºC',
        },{
            label: '22ºC',
            value: '22ºC',
        },]
    }  
];
export default class DeviceTiming extends React.Component {
  constructor(props) {
    super(props);
    this.currentCustionContent = [];
    this.state = {
      checkedItem:'',
      chooseTime:'每天',
      isShowCustomContent:false,
      checked: false,
      data: [{
        id: 1,
        text: '星期日',
      },{
        id: 2,
        text: '星期一',
    },{
        id: 3,
        text: '星期二',
    },{
        id: 4,
        text: '星期三',
    },{
        id: 5,
        text: '星期四',
    },{
        id: 6,
        text: '星期五',
    },{
        id: 7,
        text: '星期六',
    }],
    }
  }

  _getCustomContent = (index) => {
    this.setState({
        checked: true
      })
    if(this.currentCustionContent.indexOf(index) == -1){
        this.currentCustionContent.push(index);
      } else {     
        let resultIndex = this.currentCustionContent.indexOf(index);
        this.currentCustionContent.splice(resultIndex, 1);
      }
  }
  showActionSheet = () => {
    const BUTTONS = [
      '只执行一次',
      '每天',
      '工作日',
      '自定义',
      '取消'
    ];
    ActionSheet.showActionSheetWithOptions(
      {
        // title: '请选择条件的类型',
        options: BUTTONS,
        cancelButtonIndex: 4,
      },
      (buttonIndex) => {
          if(buttonIndex < 3){
              this.setState({ chooseTime: BUTTONS[buttonIndex] });
          } else if(buttonIndex == 3){
            this.setState({isShowCustomContent: true });
          }
        console.log(BUTTONS[buttonIndex])
      },
    );
  }


  static navigationOptions = ({ navigation }) => ({
    headerRight: (
        <View style={[commonStyles.flexBox, { height: '100%', width: 88 }]}>
          <Touch
            style={[commonStyles.flexBox, { flex: 1, height: '100%' }]}
            activeOpacity={0.5}
            onPress={() => {navigation.goBack()}}
          >
           <Text style={{fontSize:17, color:'#2C2D30'}}>编辑</Text>
          </Touch>
        </View>
      ),
  });

  render() {
    return (
        <SafeAreaView style={[commonStyles.containWrap, commonStyles.flexBoxColumn, { width: '100%'}]}>
            <View style={{ flex: 1, width: '100%'}}>
                <ScrollView>
                    <View style={[commonStyles.flexBox, styles.deviceTimBox, commonStyles.padLR20]}>
                        <View style={styles.deviceTime}>
                            <Text style={styles.timeText}>开启时间 今天10:10</Text>
                            <Text style={styles.timeDay}>今天</Text>
                        </View>
                        <Switch value={true} 
                            style={commonStyles.switchStyle}
                            onTintColor={'#FCBF00'}
                            tintColor={'#E5E5E5'} 
                            onValueChange={(value)=> { 
                            // this.setState({
                            //   checked: true,
                            // });
                            // item.isChecked = value;
                            }}
                        />
                    </View>
                </ScrollView>
            </View>
            <Touch style={[commonStyles.noDevices, commonStyles.flexBoxColumn, { bottom: 0, paddingTop: 10, paddingBottom: 20, }]}
                onPress = {() => this.props.navigation.navigate("SetUpDeviceTiming")}
            >
            <Image
                style={commonStyles.deviceImg}
                source={require('../../img/icon_tjds.png')}
            />
            </Touch> 
        </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
    deviceTimBox: {
      height: 82,
      backgroundColor:'#fff',
      borderBottomWidth: 1,
      borderBottomColor:'#F2F2F2'
    },
    deviceTime: {
        flex: 1
    },
    timeText: {
        color:'#2C2D30',
        fontSize: 16
    },
    timeDay:{
        fontSize: 12,
        color:'#8E8E93',
        marginTop:8 
    }
  });
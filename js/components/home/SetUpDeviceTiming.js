import React from 'react';
import { Text, ScrollView, SafeAreaView, Image, View, Modal, Dimensions } from 'react-native';
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

  const CustomChildrenEnd = (props) => (
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
        label: '1h',
        value: '1h',
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
        }],
    },{
        label: '2h',
        value: '2h',
        children:[{
            label: '1m',
            value: '1m',
        },{
            label: '2m',
            value: '2m',
        },]
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
        },]
    }  
];
const seasonsl = [
    {
        label: '11h',
        value: '11h',
        children:[{
            label: '1m',
            value: '1m',
        }],
    },{
        label: '12h',
        value: '12h',
        children:[{
            label: '1m',
            value: '1m',
        },{
            label: '2m',
            value: '2m',
        },]
    },{
        label: '13h',
        value: '13h',
        children:[{
            label: '1m',
            value: '1m',
        },{
            label: '2m',
            value: '2m',
        },{
            label: '3m',
            value: '3m',
        },]
    }  
];
export default class SetUpDeviceTiming extends React.Component {
  constructor(props) {
    super(props);
    this.currentCustionContent = [];
    this.state = {
      checkedItem:'',
      endTime:'',
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
           <Text style={{fontSize:17, color:'#FCBF00'}}>确定</Text>
          </Touch>
        </View>
      ),
  });

  render() {
    return (
        <SafeAreaView style={commonStyles.containGrayWrap}>
            <ScrollView>
                <Text style={commonStyles.noHere}>重复设置</Text>
                <View style={[commonStyles.padLR20, {backgroundColor:'#fff'}]}>
                    <Touch style={[commonStyles.setionItems, commonStyles.flexBox]}
                        onPress={() => this.showActionSheet()}
                    >
                        <Text style={commonStyles.setionItemText}>{this.state.chooseTime}</Text>
                        <Image style={commonStyles.moreIconSty} source={require('../../img/icon_gd.png')} />
                    </Touch>
                </View>
                <Text style={commonStyles.noHere}>开启时间</Text>
                <Picker
                    title="设置开启时间"
                    data={seasons}
                    cols={2}
                    extra="未设置"
                    itemStyle={{ color:'#2C2D30', fontSize: 15}}
                    indicatorStyle={{backgroundColor:'red'}}
                    value={this.state.checkedItem}
                    onChange={(v) => this.setState({ checkedItem: v })}
                    onOk={(v) => this.setState({ checkedItem: v })}
                >
                    <CustomChildren>开始时间</CustomChildren>
                </Picker>
                <Text style={commonStyles.noHere}>关闭时间</Text>
                <Picker
                    title="设置关闭时间"
                    data={seasonsl}
                    cols={2}
                    extra="未设置"
                    itemStyle={{ color:'#2C2D30', fontSize: 15}}
                    indicatorStyle={{backgroundColor:'red'}}
                    value={this.state.endTime}
                    onChange={(v) => this.setState({ endTime: v })}
                    onOk={(v) => this.setState({ endTime: v })}
                >
                    <CustomChildrenEnd>关闭时间</CustomChildrenEnd>
                </Picker>
            </ScrollView>
            <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.isShowCustomContent}
                onRequestClose={() => {
                    this.setState({isShowCustomContent: false})
                }}
            >
                <Touch style={{
                        backgroundColor:'rgba(0,0,0,.4)',
                        width: Dimensions.get('window').width,
                        height: Dimensions.get('window').height,
                    }}
                    // onPress={() => {
                    //     this.setState({isShowFamiy: false})
                    // }}
                >
                    <View style={{ position:'absolute', bottom: 8, left:'2%', borderRadius:6, width:'96%', backgroundColor:'#fff'}}>
                        {this.state.data.map((item, index) => {
                            return(
                                <Touch
                                    key={index}
                                    style={[commonStyles.flexBox, commonStyles.padLR20, commonStyles.lineSty, {height:49, justifyContent:'flex-start', }]}
                                    activeOpacity={1}
                                    onPress={() => this._getCustomContent(index)}
                                >
                                    <Text style={{ color:'#2C2D30', fontSize: 17, flex:1 }}>{item.text}</Text>
                                    <Image style={{width:22, height:22}} source={
                                        this.state.checked ? this.currentCustionContent.indexOf(index) == -1 
                                        ? require('../../img/icon_wxz.png')
                                        : require('../../img/icon_xz.png')
                                        : require('../../img/icon_wxz.png')} 
                                    />
                                </Touch>
                            )
                        })}
                        <View style={commonStyles.flexBox}>
                            <Touch style={[commonStyles.flexBox, {height:44, flex: 1}]}
                                activeOpacity={0.5}
                                onPress={() => {
                                    console.log(this.currentCustionContent);
                                    this.setState({isShowCustomContent: false});
                                }}
                            >
                                <Text style={{marginLeft:36,  color:'#2C2D30', fontSize: 17}}>确定</Text>
                            </Touch>
                            <View style={{width: 1, height: 44, backgroundColor:'#f2f2f2'}}></View>
                            <Touch style={[commonStyles.flexBox, {height:44, flex: 1}]}
                                activeOpacity={0.5}
                                onPress={() => {
                                    this.setState({isShowCustomContent: false});
                                }}
                            >
                                <Text style={{marginLeft:36,  color:'#2C2D30', fontSize: 17}}>取消</Text>
                            </Touch>
                        </View>
                    </View>
                </Touch>
            </Modal>
       </SafeAreaView>
    );
  }
}
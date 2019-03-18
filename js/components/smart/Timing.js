import React, { Component } from 'react';
import { 
    Text, 
    ScrollView, 
    SafeAreaView, 
    Image, 
    View, 
    Modal, 
    Dimensions, 
    StyleSheet, 
    Keyboard, 
    DatePickerIOS, TimePickerAndroid, ToastAndroid, Platform } from 'react-native';
import { commonStyles } from '../../tools/layout';
import Touch from 'react-native-touch-once';
import { ActionSheet, Picker, Toast } from 'antd-mobile-rn';
import time_to_sec from '../../tools/timeToSec';
import { EventRegister } from 'react-native-event-listeners';
let hours = new Date().getHours();
let minutes = new Date().getMinutes();
      minutes = minutes < 10 ? '0' + minutes : minutes;
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

export default class Timing extends Component {
  constructor(props) {
    super(props);
    console.log(new Date())
    this.currentCustionContent = [];
    this.state = {
      checkedItem:'',
      chooseTime:'Every day',
      isShowCustomContent:false,
      checked: false,
      showDatePicker: false,  //是否显示 react-native 时间组件
      date:new Date(),   // react-native 时间组件需要定义的，更改这个才能更改时间插件
      timeData: hours + ": " + minutes,   //显示的时间（format）
    }
    this.getCheckedTime = '';
    this.timingData ={};
    this.cycleDay = [];
    this.cycleSeconds = 0;
    this.data = [{
            id: 1,
            text: 'Sun',
        },{
            id: 2,
            text: 'Mon',
        },{
            id: 3,
            text: 'Tues',
        },{
            id: 4,
            text: 'Wed',
        },{
            id: 5,
            text: 'Thurs',
        },{
            id: 6,
            text: 'Fri',
        },{
            id: 7,
            text: 'Sat',
        }];
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
      'Once',
      'Every day',
      'Workdays',
      'Custom',
      'Cancel'
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
        // console.log(BUTTONS[buttonIndex])
      },
    );
  }


static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
        headerRight: (
            <View style={[commonStyles.flexBox, { height: '100%', width: 88 }]}>
            <Touch
                style={[commonStyles.flexBox, { flex: 1, height: '100%' }]}
                activeOpacity={0.5}
                onPress={() => params._nextStep()}
            >
            <Text style={{fontSize:17, color:'#2C2D30'}}>NEXT</Text>
            </Touch>
            </View>
        ),
    };
};

componentWillMount() {
    this.props.navigation.setParams({ _nextStep: this._nextStep });
}


_nextStep = () => {
    let time = this.state.chooseTime;
    switch (time)
    {
        case 'Every day':
            this.cycleDay = [0,1,2,3,4,5,6];
            break;
        case 'Workdays':
            this.cycleDay = [0,1,2,3,4];
            break;
        case 'Once':
            this.cycleDay = [0];
            break;
        default:
            this.cycleDay = this.currentCustionContent;
            for(let i = 0; i<this.currentCustionContent.length; i++){
                if(this.currentCustionContent[i] == 0){
                    this.currentCustionContent[i] = 7;
                    break;
                }
            }
    }
    this.timingData["condition_type"] = this.cycleDay;
    if(this.cycleSeconds == 0){
        let nowTime = hours + ":" + new Date().getMinutes() + ':00';
        this.timingData["condition_value"] = time_to_sec(nowTime);
    }
    console.log(this.timingData)
    if(this.props.navigation.state.params.operationType == "editUpdateCondition"){
        let dataValue = this.props.navigation.state.params.num;
        console.log(dataValue);
        console.log(this.timingData.condition_value)
        if(dataValue == this.timingData.condition_value){
            this.props.navigation.pop();
        } else {
            EventRegister.emit('updateConditionItem', this.timingData); 
            this.props.navigation.pop();
        }
    } else if(this.props.navigation.state.params.operationType == "editAddCondition"){
        EventRegister.emit('addConditionItem', this.timingData); 
        this.props.navigation.pop(2);    
    } else {
        console.log(this.timingData)
        EventRegister.emit('setUpTiming', this.timingData);
        this.props.navigation.pop(2);
    }
}

_cancelDatePicker = () => {
    this.setState({ showDatePicker: false });
  };

  async showAndroidPicker(options) {
    Keyboard.dismiss();
    try {
        const { action, minute, hour } = await TimePickerAndroid.open({
            options,
            is24Hour: true
        });
        if (action === TimePickerAndroid.timeSetAction) {
            let joinTime = '';
            joinTime = this._formatTime(hour, minute);
            let groupTime = hour +":"+ minute +":"+ '00';
        console.log(time_to_sec(groupTime))
        this.cycleSeconds = time_to_sec(groupTime);
        this.timingData["condition_value"] = this.cycleSeconds;
        this.setState({timeData: joinTime});
        console.log(this.timingData["condition_value"])
      } else if (action === TimePickerAndroid.dismissedAction) {
        ToastAndroid.show('Selector close cancel', ToastAndroid.SHORT);
      }
    } catch ({ code, message }) {
        console.log(code)
        console.log(message)
      ToastAndroid.show('Error message:' + message, ToastAndroid.SHORT);
    }
  }

  _formatTime(hour, minute) {
    return hour + ':' + (minute < 10 ? '0' + minute : minute);
  }

_getDatePicker = () => {
    console.log(this.getCheckedTime);
    if(this.getCheckedTime == ""){
        this.getCheckedTime = new Date();
    }
    let getTimeHour = this.getCheckedTime.getHours();
    let getTimeMinute = this.getCheckedTime.getMinutes();
    let groupTime = getTimeHour +":"+ getTimeMinute +":"+ '00';
    console.log(groupTime)
    console.log(time_to_sec(groupTime))
    this.cycleSeconds = time_to_sec(groupTime);
    this.timingData["condition_value"] = this.cycleSeconds;
    getTimeHour = getTimeHour < 10 ? '0' + getTimeHour : getTimeHour;
    getTimeMinute = getTimeMinute < 10 ? '0' + getTimeMinute : getTimeMinute;
    console.log(getTimeHour+":"+getTimeMinute)
    this.setState({ 
        timeData: getTimeHour+": "+getTimeMinute,
        showDatePicker: false,
    });
};

  render() {
    return (
        <SafeAreaView style={commonStyles.containGrayWrap}>
            <ScrollView>
                <Text style={commonStyles.noHere}>Repeat</Text>
                <View style={[commonStyles.padLR20, {backgroundColor:'#fff'}]}>
                    <Touch style={[commonStyles.setionItems, commonStyles.flexBox]}
                        onPress={() => this.showActionSheet()}
                    >
                        <Text style={commonStyles.setionItemText}>{this.state.chooseTime}</Text>
                        <Image style={commonStyles.moreIconSty} source={require('../../img/icon_gd.png')} />
                    </Touch>
                </View>
                <Text style={commonStyles.noHere}>Power on</Text>
                <View style={[commonStyles.padLR20, commonStyles.flexBoxColumn, {backgroundColor:'#fff'}]}>
                    {Platform.OS === 'ios' ? (
                        <Touch style={[commonStyles.setionItems, commonStyles.flexBox]}
                            onPress={() => {
                                Keyboard.dismiss();
                                this.setState({showDatePicker: true})
                            }}
                            >
                            <Text style={commonStyles.setionItemText}>Time</Text>
                            <Text style={commonStyles.familyName}>{this.state.timeData}</Text>
                            <Image style={commonStyles.moreIconSty} source={require('../../img/icon_gd.png')} />
                        </Touch>
                    ) : (
                        <Touch style={[commonStyles.setionItems, commonStyles.flexBox]}
                            onPress={this.showAndroidPicker.bind(this)}
                        >
                            <Text style={commonStyles.setionItemText}>Time</Text>
                            <Text style={commonStyles.familyName}>{this.state.timeData}</Text>
                            <Image style={commonStyles.moreIconSty} source={require('../../img/icon_gd.png')} />
                        </Touch>
                    )}
                            
                </View>


            </ScrollView>
            {this.state.showDatePicker ? (
                <View>
                    <View style={styles.showDateBox}>
                        <Touch
                            activeOpacity={1}
                            onPress={() => this._cancelDatePicker()}
                        >
                            <Text style={styles.datePickerSty}>CANCEL</Text>
                        </Touch>
                        <Touch
                            activeOpacity={1}
                            onPress={() => {
                                this._getDatePicker();
                            }}
                        >
                            <Text style={styles.datePickerSty}>OK</Text>
                        </Touch>
                    </View>
                    <DatePickerIOS
                        date={this.state.date}
                        minuteInterval={10}
                        onDateChange={time => {
                            console.log(time)
                            this.getCheckedTime = time;
                            this.setState({date: time})
                        }}
                        mode="time"
                    />
                </View>
            ) : null}
            <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.isShowCustomContent}
                onRequestClose={() => {
                    this.setState({isShowCustomContent: false})
                }}
            >
                <View style={{
                        backgroundColor:'rgba(0,0,0,.4)',
                        width: Dimensions.get('window').width,
                        height: Dimensions.get('window').height,
                    }}
                >
                    <View style={{ position:'absolute', bottom: 8, left:'2%', borderRadius:6, width:'96%', backgroundColor:'#fff'}}>
                        {this.data.map((item, index) => {
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
                                    let customDay = [];
                                    let workDay = [1,2,3,4,5];
                                    console.log(this.currentCustionContent)
                                    if(this.currentCustionContent.length != 0){
                                        if(this.currentCustionContent.length == 7 ){
                                            this.setState({chooseTime: 'Every day'})
                                        } else if(this.currentCustionContent.length == 5){
                                            if(workDay.sort().toString()== this.currentCustionContent.sort().toString()){
                                                this.setState({chooseTime: 'Workdays'})
                                            } else{
                                                for(let i = 0; i<this.currentCustionContent.length; i++){
                                                    customDay.push(this.data[this.currentCustionContent[i]].text)
                                                }
                                                this.setState({chooseTime: customDay.toString()})
                                            }
                                        } else {
                                            for(let i = 0; i<this.currentCustionContent.length; i++){
                                                customDay.push(this.data[this.currentCustionContent[i]].text)
                                            }
                                            this.setState({chooseTime: customDay.toString()})
                                        }
                                          
                                    }
                                    this.setState({isShowCustomContent: false});
                                }}
                            >
                                <Text style={{marginLeft:36,  color:'#2C2D30', fontSize: 17}}>OK</Text>
                            </Touch>
                            <View style={{width: 1, height: 44, backgroundColor:'#f2f2f2'}}></View>
                            <Touch style={[commonStyles.flexBox, {height:44, flex: 1}]}
                                activeOpacity={0.5}
                                onPress={() => {
                                    this.setState({isShowCustomContent: false});
                                }}
                            >
                                <Text style={{marginLeft:36,  color:'#2C2D30', fontSize: 17}}>CANCEL</Text>
                            </Touch>
                        </View>
                    </View>
                </View>
            </Modal>
       </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
    showDateBox: {
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'row',
      backgroundColor:'#fff',
      height: 40,
    },
    datePickerSty: {
      color: '#007AFF',
      fontSize: 15,
      lineHeight: 40,
      paddingHorizontal: 20,
    },
  });
import React, { Component } from 'react';
import { Text, ScrollView, SafeAreaView, Image, View } from 'react-native';
import { Picker } from 'antd-mobile-rn';
import { commonStyles } from '../../tools/layout';
import Touch from 'react-native-touch-once';
import CurrentLocation from './CurrentLocation';
import { EventRegister } from 'react-native-event-listeners';

const CustomChildren = (props) => (
    <Touch style={[commonStyles.addItemsBox, commonStyles.flexBox]}  
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
        label: '高于',
        value: '高于',
        children:[{
            label: '23ºC',
            value: '23ºC',
        },{
            label: '26ºC',
            value: '26ºC',
        },{
            label: '29ºC',
            value: '29ºC',
        }],
    },{
        label: '低于',
        value: '低于',
        children:[{
            label: '24ºC',
            value: '24ºC',
        },{
            label: '20ºC',
            value: '20ºC',
        },{
            label: '16ºC',
            value: '16ºC',
        },]
    }  
];
export default class ConditionInfo extends Component {
  constructor(props) {
    super(props);
    this.temperatureData = {};
    this.state = {
        temperature:'',
    }
  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
        headerRight: (
            <View style={[commonStyles.flexBox, { height: '100%', width: 88 }]}>
            <Touch
                style={[commonStyles.flexBox, { flex: 1, height: '100%' }]}
                activeOpacity={0.5}
                onPress={() => params.nextStep()}
            >
            <Text style={{fontSize:17, color:'#2C2D30'}}>下一步</Text>
            </Touch>
            </View>
        ),
    }
  };

    componentWillMount() {
        this.props.navigation.setParams({ nextStep: this.nextStep });
    }

    nextStep = () => {
        this.temperatureData["condition_type"] = 'Temperature';
        if(this.state.temperature == ''){
        this.temperatureData["condition_value"] = '-2';
        } else {
            let resultText = '';
            let str = this.state.temperature.toString();
            str = str.replace(",","");
            str = str.replace("ºC", "");
            console.log(str)
            let strCut = str.substr(0,2);
            if(strCut == "高于"){
                resultText = str.slice(2);
            } else{
                resultText = '-'+str.slice(2);
            }
         this.temperatureData["condition_value"] = resultText;
        }
        console.log(this.temperatureData.condition_value)
        if(this.props.navigation.state.params.operationType == "editUpdateCondition"){
            let dataValue = this.props.navigation.state.params.num;
            if(dataValue == this.temperatureData.condition_value){
                this.props.navigation.pop();
            } else {
                EventRegister.emit('updateConditionItem', this.temperatureData); 
                this.props.navigation.pop();
            }
        } else if(this.props.navigation.state.params.operationType == "editAddCondition"){
            EventRegister.emit('addConditionItem', this.temperatureData); 
            this.props.navigation.pop(2);    
        } else{

            EventRegister.emit('setUpTemperature', this.temperatureData); 
            this.props.navigation.pop(2);
        }
    }

  render() {
    console.log(this.props.navigation.state.params.operationType)
    return (
        <SafeAreaView style={commonStyles.containGrayWrap}>
            <ScrollView>
                <CurrentLocation/>
                <Picker
                    title="选择温度"
                    data={seasons}
                    cols={2}
                    extra="小于2ºC"
                    itemStyle={{ color:'#2C2D30', fontSize: 15}}
                    indicatorStyle={{backgroundColor:'red'}}
                    value={this.state.temperature}
                    onChange={(v) => this.setState({ temperature: v })}
                    onOk={(v) => this.setState({ temperature: v })}
                    
                >
                    <CustomChildren>温度</CustomChildren>
                </Picker>
            </ScrollView>
       </SafeAreaView>
    );
  }
}
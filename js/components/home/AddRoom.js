import React, { Component } from 'react';
import { Text, ScrollView, SafeAreaView, StyleSheet, View, TextInput } from 'react-native';
import { Toast } from 'antd-mobile-rn';
import { commonStyles } from '../../tools/layout';
import Touch from 'react-native-touch-once';
import { postAddRoom } from '../../network_request/fetch_api';
import { EventRegister } from 'react-native-event-listeners';

export default class AddRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newFamilyName: "",   
    };
    this.recommendData = [{
      id: 1,
      text: 'Living room',
      },{
          id: 2,
          text: 'Bedroom',
      },{
          id: 3,
          text: 'Library',
      },{
          id: 4,
          text: 'Second bedroom',
      },{
        id: 5,
        text: 'Kitchen',
      },{
        id: 6,
        text: 'Bathroom',
      },{
        id: 7,
        text: 'Kids’room',
      }];
  }

  componentDidMount() {
    this.props.navigation.setParams({
      addRoomName: this.state.newFamilyName,
    });
    this.props.navigation.setParams({ _tipToast: this._tipToast });
    this.listener = EventRegister.addEventListener('addRommsSucc', msg => {
      Toast.info(msg,  2, undefined, false); 
      this.props.navigation.pop();
    });
  }


  componentWillUnmount() {
    EventRegister.removeEventListener(this.listener);
  }



  _tipToast = () => {
    Toast.info('Room name cannot be empty!',  2, undefined, false);
  }
  

  static navigationOptions = ({ navigation }) => {
    console.log(navigation.state)
    const { params = {} } = navigation.state;
    return {
      headerTitle: 'Add a new room',
      headerRight: (
        <View style={[commonStyles.flexBox, { height: '100%', width: 88 }]}>
          <Touch
            style={[commonStyles.flexBox, { flex: 1, height: '100%' }]}
            activeOpacity={0.5}
            onPress={() => {
              console.log(params.addRoomName+"--添加的名字 ");
              if(params.addRoomName == ''){
                params._tipToast();
              } else {
                console.log(params.addRoomName)
                postAddRoom(
                  {
                    room_name: params.addRoomName,
                  },
                  params.token,
                  params.homeId
                );
                Toast.loading('Loading', 0);
              }
            }}
          >
           <Text style={{fontSize:17, color:'#2C2D30'}}>OK</Text>
          </Touch>
        </View>
      ),
    };
  };

  render() {
    return (
      <SafeAreaView style={[commonStyles.containWrap, { backgroundColor:'#F8F8F8'}]}>
        <ScrollView>
          <View style={{paddingTop:5, backgroundColor:'#fff'}}>
            <Touch style={[commonStyles.flexBox, commonStyles.noneLineList, {marginTop:0}]}  activeOpacity={1} >
              <Text style={[commonStyles.deviceName, {marginRight:20, flex:0}]}>Room name</Text>
              <TextInput
                style={commonStyles.writeCon}
                numberOfLines={1}
                placeholderTextColor={'#9B9B9B'}
                selectionColor="#FCBF00"
                placeholder="Enter a room name"
                value = {this.state.newFamilyName}
                onChangeText={familyName => {
                  familyName = familyName.replace(/\s+/g,"");
                  this.setState({
                    newFamilyName: familyName
                  });
                  this.props.navigation.state.params.addRoomName = familyName;
                  console.log(this.props.navigation.state.params.addRoomName)
                }}
            />
            </Touch>
          </View>
          <View style={commonStyles.addDevicesBox}>
            <Text style={commonStyles.noHere}>Recommend</Text>
            <View style={styles.recommendBox}>
              {this.recommendData.map((item, index) => {
                return (
                  <Touch
                    style={commonStyles.flexBox}
                    key={index}
                    activeOpacity={0.5}
                    onPress={() => {
                      this.props.navigation.state.params.addRoomName = item.text;
                      this.setState({
                        newFamilyName: item.text,
                      });
                    }}
                  >
                    <Text style={styles.recommendText}>{item.text}</Text>
                  </Touch>
                 );
              })} 
            </View>
          </View>
        </ScrollView>
       </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  recommendBox: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal:20,
    backgroundColor:'#F8F8F8'
  },
  recommendText: {
    fontSize: 17,
    color: 'rgba(0,0,0,0.87)',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 4,
    marginRight: 20,
    marginBottom: 20,
    backgroundColor:'#fff'
  },
});
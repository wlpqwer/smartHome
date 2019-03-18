import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import { commonStyles } from '../../tools/layout';
import HomeViewContainer from '../../containers/home/HomeViewContainer';
import ChooseDevice from './ChooseDevice';
// import AddDevice from './AddDevice';
import AddDeviceContainer from '../../containers/home/AddDeviceContainer';
import ConnectGuide from './ConnectGuide';
import FamilyManageContainer from '../../containers/home/FamilyManageContainer';
import AddFamily from './AddFamily';
import FamilySetUpContainer from '../../containers/home/FamilySetUpContainer';
import RoomManageContainer from '../../containers/home/RoomManageContainer';
import FamilyMemberContainer from '../../containers/home/FamilyMemberContainer';
import RoomSetUpContainer from '../../containers/home/RoomSetUpContainer';
import AddRoom from './AddRoom';
import AddShare from '../mine/AddShare';
import AddMember from './AddMember';
import AdminSetUp from './AdminSetUp';
import Device_Lamp from './Device_Lamp';
import Device_FengSContainer from '../../containers/home/Device_FengSContainer';
import DeviceLocationManageContainer from '../../containers/home/DeviceLocationManageContainer';
import Device_ChaPai from './Device_ChaPai';
import DevicePopInfo from '../common/DevicePopInfo';
import DeviceTiming from './DeviceTiming';
import SetUpDeviceTiming from './SetUpDeviceTiming';
import DeviceSetUp from './DeviceSetUp';
import Touch from 'react-native-touch-once';
import { Header } from 'react-navigation';
import { EventRegister } from 'react-native-event-listeners';
import { StyleSheet, Text, View, Image, StatusBar, SafeAreaView, Platform, Switch, ScrollView, Dimensions, ImageBackground } from 'react-native';
import { WingBlank, Tabs, Toast } from 'antd-mobile-rn';
import ChangeFamily from '../../containers/home/ChangeFamilyContainer';
import { I18n } from '../../language/I18n';
import { postHomeControlDev } from '../../network_request/fetch_api';
import ModalDialog from '../common/ModalDialog';


export class HomeView extends Component {
  constructor(props) {  
    super(props);
    I18n.locale = this.props.container.languageType;
    this.state = {
      changeTxt:'',
      isShowMsg: false,
      msg: '',
      isHasError: false
    };
    props.container.navigation.setParams({
      onTabFocus: this.handleTabFocus
    });
  }


  handleTabFocus = () => {
    if (this.props.container.netInfoStatus) {
      this.props.container.fetchData(this.props.container.userInfoData.globalHomeId);
    }
  };

  componentWillMount() {
    // this._navListener = this.props.container.navigation.addListener('willFocus', () => {
    //   this._init();
    // });

    // this.listener = EventRegister.addEventListener('devicesStatus', data => {
    //   // Toast.info(data.msg,  2, undefined, false);
    //   // this.setState({msg: data.msg})
    // });

    this.merberSwitchFamilyListener = EventRegister.addEventListener('merberSwitchFamily', info => {
      console.log(info)
      this.props.container.navigation.setParams({ 
        currentSwitchHomeMaster: info
      });
    });

    this.resetLoginListener = EventRegister.addEventListener('changeBaseInfo', () => {
      this.props.container.navigation.setParams({ 
        currentSwitchHomeMaster: this.props.container.userInfoData.currentFamilyAdmin,
        identityStatus: this.props.container.userInfoData.phone_number
      });
    })
    

    this.props.container.navigation.setParams({ 
      currentSwitchHomeMaster: this.props.container.userInfoData.currentFamilyAdmin,
      identityStatus: this.props.container.userInfoData.phone_number
     });


    this.tokenListener = EventRegister.addEventListener('notToken', () => {
      this._resetLogin();
    });

    this.zhuCeDevListener = EventRegister.addEventListener('zhuCeDev', data => {
      if(data.status == '200'){
        this.props.container.fetchData(this.props.container.userInfoData.globalHomeId);
      }
    }); 
        
  }

  componentWillUnmount() {
    this._navListener.remove();
    // EventRegister.removeEventListener(this.listener);
    EventRegister.removeEventListener(this.merberSwitchFamilyListener);
    EventRegister.removeEventListener(this.resetLoginListener);
    EventRegister.removeEventListener(this.tokenListener);
    EventRegister.removeEventListener(this.zhuCeDevListener);
  }
  
  // _init() {
  //   if (this.props.container.netInfoStatus) {
  //     this.props.container.fetchData(this.props.container.userInfoData.globalHomeId);
  //   }
  // }

  _resetLogin() {
    if (this.props.container.netInfoStatus) {
      this.props.container.postLogOut();
      this.props.container.navigation.navigate('Auth');
    }
  }


  render() {
    const tabs = [{ title: 'Devices'}];
    const allDeviceData = []; //我的家，所有设备集合
    if(!this.props.container.isLoading && Object.keys(this.props.container.data).length != 0){
        const tabList = ['Devices']; //切换的tab名字
        const tabData = Object.keys(this.props.container.data.room_equipments); 
        for(var index in tabData){
          if(tabData[index].length > 4){
            tabData[index] = tabData[index].slice(0,4);
          }
          tabs.push({title: tabData[index]});
          tabList.push(tabData[index])
        }
        
        allDeviceData.push(this.props.container.data.devices);
        const newArr = this.props.container.data.room_equipments;

        for(index in newArr) {
          allDeviceData.push(newArr[index]);
          // console.log(index + newArr[index]);
        }
    }

    const renderContent = (tab, index) => {     
       const content = allDeviceData[index].map ((item, index) => {
            return (
              <WingBlank key={`${index}_${index}`}>
                <View style={[commonStyles.flexBox, commonStyles.sceneModule]}>
                    <Touch style={[commonStyles.flexBox, { flex:1}]}
                      onPress={() => {
                        this.props.container.navigation.navigate('Device_FengS', {id: item.id, deviceName: item.name});
                        // this.props.container.navigation.navigate('ConnectGuide');
                        
                      }}
                    >
                      <Image
                        style={styles.equipmentImg}
                        source={require('../../img/pic_fs.png')}
                      />
                      <View style={[commonStyles.flexBoxColumn, {flex:1, alignItems:'flex-start'}]}>
                        <Text style={commonStyles.sceneName}> {item.name}</Text>
                        {/* <Text style={commonStyles.sceneDeviceNum}>在线</Text> */}
                      </View>
                    </Touch>

                    <Switch value={item.status} 
                      style={commonStyles.switchStyle}
                      onTintColor={'#FCBF00'}
                      tintColor={'#E5E5E5'} 
                      thumbTintColor={Platform.OS === 'android' ? '#E5E5E5' : ''}
                      onValueChange={(value)=> {
                        this.setState({
                          changeTxt: value,
                        });
                        item.status = value;
                         postHomeControlDev(
                          {
                            device_id: item.id,
                            switch_to: item.status,
                            device_type: item.name
                          },
                          this.props.container.userInfoData.token,
                         );
                      }}
                    />
                </View>
              </WingBlank>
            );
        });
      if(allDeviceData[index].length == 0){
        if(this.props.container.data.created_by == this.props.container.userInfoData.phone_number){          
          return(
            <SafeAreaView style={[commonStyles.containGrayWrap, commonStyles.flexBoxColumn, {backgroundColor:'#FCF6E7'}]}>
              <ScrollView>
                <View style={[commonStyles.flexBoxColumn, {width: Dimensions.get('window').width, height: Dimensions.get('window').height - Header.HEIGHT -148}]}>
                  {/* <View style={{flex: 1}}></View> */}
                  <Touch style={[ commonStyles.flexBoxColumn, ]} onPress = {() => this.props.container.navigation.navigate('ChooseDevice')}>
                    <Image
                      style={{ width:250, height:137, marginBottom:80}}
                      resizeMode = "contain"
                      source={require('../../img/pic_kzt1.png')}
                    />
                    <Image
                      style={commonStyles.deviceImg}
                      source={require('../../img/icon_tjsb1.png')}
                    />
                    <Text style={{ marginTop: 20, fontSize: 15, color:'#8E8D94'}}>Add devices to start smart life</Text>
                  </Touch>
                </View>
              </ScrollView>
            </SafeAreaView>
          )
        } else {
          return(
            <SafeAreaView style={[commonStyles.containGrayWrap, commonStyles.flexBoxColumn, {backgroundColor:'#FCF6E7'}]}>
              <ScrollView>
                <View style={[commonStyles.flexBoxColumn, {width: Dimensions.get('window').width, height: Dimensions.get('window').height - Header.HEIGHT -148}]}>
                  {/* <View style={{flex: 1}}></View> */}
                  {/* <View style={[commonStyles.noDevices, commonStyles.flexBoxColumn]}> */}
                    <Image
                      style={{ width:250, height:137, marginBottom:80}}
                      resizeMode = "contain"
                      source={require('../../img/pic_kzt1.png')}
                    />
                    {/* <Text style={{ marginTop: 20, fontSize: 15, color:'#8E8D94'}}>There are no devices under this family</Text> */}
                  {/* </View> */}
                </View>
              </ScrollView>
            </SafeAreaView>
          )
        }
      } else{
        return (
          <ImageBackground source={require('../../img/homeBjImg.png')} style={{width: '100%', height: '100%'}}>
            {/* <ScrollView style={[commonStyles.containGrayWrap]}> */}
            <ScrollView>{content}</ScrollView>
          </ImageBackground>
          )
      } 
    };
 
    if(this.props.container.netInfoStatus){
      if(!this.props.container.isLoading && Object.keys(this.props.container.data).length != 0){
        if(this.props.container.data.devices.length != 0 || Object.keys(this.props.container.data.room_equipments).length != 0){
        return (
          <SafeAreaView style={commonStyles.containGrayWrap}>
              {Platform.OS === 'android' ? (
                <StatusBar
                    hidden={false}
                    barStyle="dark-content"
                    backgroundColor={'white'}
                    translucent
                />
              ) : null }
              <View>
              {/* <ImageBackground source={require('../../img/contentBj.png')} style={{width: '100%', height: 56}}> */}
                <Text style={[commonStyles.tabSortTitle,commonStyles.padLR20, {paddingBottom: 0}]}>My home</Text>
              {/* </ImageBackground> */}
            </View>
            <View style={{ flex: 2 }}>
              <Tabs tabs={tabs} initialPage={0} tabBarPosition="top"
                tabBarUnderlineStyle={{ borderBottomWidth: 2, borderBottomColor:'#FFBB00'}}
                tabBarActiveTextColor="#FFBB00"
                tabBarInactiveTextColor="#9B9B9B"
                tabBarTextStyle={{fontSize: 16}}
              >
                {renderContent}
              </Tabs>
            </View>
            {/* <ModalDialog
              _dialogVisible={this.state.isShowMsg}
              _dialogTitle={""}
              _dialogContent={"设备当前离线，请检查当前连线状态"}
              // _dialogLeftBtnAction={() => {
              //   this.hideDialog();
              // }}
              _dialogRightBtnAction={() => {
                this.hideDialog();
                console.log("dddffd")
              }}
            /> */}
        </SafeAreaView>
        )
      } else{
        if(this.props.container.data.created_by == this.props.container.userInfoData.phone_number){
          return(
            <SafeAreaView style={[commonStyles.containGrayWrap, commonStyles.flexBoxColumn, {backgroundColor:'#FCF6E7'}]}>
              {Platform.OS === 'android' ? (
                <StatusBar
                    hidden={false}
                    barStyle="dark-content"
                    backgroundColor={'white'}
                    translucent
                />
              ) : null }
              <ScrollView>
                <View style={[commonStyles.flexBoxColumn, {width: Dimensions.get('window').width, height: Dimensions.get('window').height - Header.HEIGHT -148}]}>
                  {/* <View style={{flex: 1}}></View> */}
                  <Touch style={[ commonStyles.flexBoxColumn, ]} onPress = {() => this.props.container.navigation.navigate('ChooseDevice')}>
                    <Image
                      style={{ width:250, height:137, marginBottom:80}}
                      resizeMode = "contain"
                      source={require('../../img/pic_kzt1.png')}
                    />
                    <Image
                      style={commonStyles.deviceImg}
                      source={require('../../img/icon_tjsb1.png')}
                    />
                    <Text style={{ marginTop: 20, fontSize: 15, color:'#8E8D94'}}>Add devices to start smart life</Text>
                  </Touch>
                </View>
              </ScrollView>
            </SafeAreaView>
          )
        }else {
          return(
            <SafeAreaView style={[commonStyles.containGrayWrap, commonStyles.flexBoxColumn, {backgroundColor:'#FCF6E7'}]}>
              {Platform.OS === 'android' ? (
                <StatusBar
                    hidden={false}
                    barStyle="dark-content"
                    backgroundColor={'white'}
                    translucent
                />
              ) : null }
              <ScrollView>
                <View style={[commonStyles.flexBoxColumn, {width: Dimensions.get('window').width, height: Dimensions.get('window').height - Header.HEIGHT -148}]}>
                  {/* <View style={{flex: 1}}></View> */}
                  {/* <View style={[commonStyles.noDevices, commonStyles.flexBoxColumn]}> */}
                    <Image
                      style={{ width:250, height:137, marginBottom:80}}
                      resizeMode = "contain"
                      source={require('../../img/pic_kzt1.png')}
                    />
                    {/* <Text style={{ marginTop: 20, fontSize: 15, color:'#8E8D94'}}>There are no devices under this family</Text> */}
                  {/* </View> */}
                </View>
              </ScrollView>
            </SafeAreaView>
          )
        }
      }
      } else {
        return(
          <View style={[commonStyles.flexBoxColumn, commonStyles.containWrap]}>
            {Platform.OS === 'android' ? (
                <StatusBar
                    hidden={false}
                    barStyle="dark-content"
                    backgroundColor={'white'}
                    translucent
                />
            ) : null }
            {/* {!this.state.isHasError ? ( */}
            {!this.props.container.isHasError ? (
              <Image
                style={commonStyles.loadingText}
                source={require('../../img/loading.gif')}
              />
            ): null}
            <Text style={{ marginTop: 20, fontSize: 15, color:'#8E8D94'}}>{this.props.container.isHasError ? 'Network request failed' : 'Loading...'}</Text>
            
          </View>
        )
        
      }
    } else {
      return (
        <SafeAreaView style={[commonStyles.containGrayWrap, commonStyles.flexBoxColumn]}>
            {Platform.OS === 'android' ? (
              <StatusBar
                  hidden={false}
                  barStyle="dark-content"
                  backgroundColor={'white'}
                  translucent
              />
            ) : null }
            <Image
              style={{width:251, height:137}}
              source={require('../../img/pic_wwl.png')}
            />
            <Text style={{ marginTop: 22, fontSize: 15, color:'#8E8D94'}}>Network error, please try again later</Text>
        </SafeAreaView>
      )
    }
  }





  
}
export default (NavigatorTabOne = createStackNavigator(
  {
    HomeView: {
      screen: HomeViewContainer,
      navigationOptions: props => ({
        headerLeft: (
          <ChangeFamily container={props} />
        )
      })
      
    },
    ChooseDevice: {
      screen: ChooseDevice,
      navigationOptions: props => ({
        headerTitle: 'Select device',
      }),
    },
    AddDevice: {
      screen: AddDeviceContainer,
    },
    ConnectGuide: {
      screen: ConnectGuide,
      navigationOptions: props => ({
        headerTitle: 'Connection guide',
      }),
    },
    FamilyManage: {
      screen: FamilyManageContainer,
      navigationOptions: props => ({
        headerTitle: 'Manage home',
        headerRight: <View />
      }),
    },
    AddFamily: {
      screen: AddFamily,
    },
    FamilySetUp: {
      screen: FamilySetUpContainer,
      navigationOptions: props => ({
        headerTitle: 'Family setting',
        headerRight: <View />
      }),
    },
    RoomManage: {
      screen: RoomManageContainer,
    },
    FamilyMember: {
      screen: FamilyMemberContainer,
      navigationOptions: props => ({
        headerTitle: 'Manage member',
        headerRight: <View />
      }),
    },
    AdminSetUp: {
      screen: AdminSetUp,
      navigationOptions: props => ({
        headerTitle: 'Manage member',
        headerRight: <View />
      }),
    },
    Device_Lamp: {
      screen: Device_Lamp,
      navigationOptions: props => ({
        headerTitle: '灯',
        headerRight: (
          <DevicePopInfo container={props} />
        ),
      }),
    },
    Device_FengS: {
      screen: Device_FengSContainer,
      navigationOptions: props => ({
        headerTitle: 'Fan',
        headerRight: (
          <DevicePopInfo container={props} />
        ),
      }),
    },
    Device_ChaPai: {
      screen: Device_ChaPai,
      navigationOptions: props => ({
        headerTitle: '开关插座',
        headerRight: (
          <DevicePopInfo container={props} />
        ),
      }),
    },
    DeviceTiming: {
      screen: DeviceTiming,
      navigationOptions: props => ({
        headerTitle: '定时开关',
      }),
    },
    SetUpDeviceTiming: {
      screen: SetUpDeviceTiming,
      navigationOptions: props => ({
        headerTitle: '设置定时',
      }),
    },
    DeviceSetUp: {
      screen: DeviceSetUp,
      navigationOptions: props => ({
        headerTitle: 'General settings',
      }),
    },
    RoomSetUp:{
      screen: RoomSetUpContainer,
    },
    DeviceAddShare:{
      screen: AddShare,
    },
    DeviceLocationManage: {
      screen: DeviceLocationManageContainer,
    },
    AddRoom:{
      screen: AddRoom,
    },
    AddMember:{
      screen: AddMember,
    }
  },
  {
    cardStyle: {
      paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
    },
    navigationOptions: {
      gesturesEnabled: false,
       headerTintColor: '#000',
       headerBackTitle: null,
        // headerTruncatedBackTitle: 'Back',
        headerTitleStyle: {
          fontWeight: 'normal',
          fontSize: 16,
          flex: 1,
          alignSelf:'center',
          textAlign: 'center'
        },
        headerStyle: {
          backgroundColor: '#fff', 
          shadowColor: 'transparent',
          elevation: 0,
          shadowOpacity: 0,
        },
    },
  },
));

NavigatorTabOne.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
    tabBarOnPress({ navigation, defaultHandler }) {
      console.log('onPress:', navigation);
      // tab.navigation.navigate("TabItem1")
      if(navigation.state.routes[0].hasOwnProperty("params")){
        navigation.state.routes[0].params.onTabFocus();
      }
      defaultHandler();
    },
  };
};

const styles = StyleSheet.create({
  equipmentImg: {
    width:60, 
    height:60,
    marginHorizontal:12
  }
});

import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import { commonStyles } from '../../tools/layout';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  StatusBar,
  Platform,
  SafeAreaView,
  AsyncStorage
} from 'react-native';
import Touch from 'react-native-touch-once';
import MessageCenterContainer from '../../containers/mine/MessageCenterContainer';
import MineViewContainer from '../../containers/mine/MineViewContainer';
import Feedback from './Feedback';
import EditAccountContainer from '../../containers/mine/EditAccountContainer';
import SetUp from './SetUp';
import DeviceShareContainer from '../../containers/mine/DeviceShareContainer';
import DeviceShareManageContainer from '../../containers/mine/DeviceShareManageContainer';
import AddShare from './AddShare';
import UpdatePassword from './UpdatePassword';
import {I18n} from '../../language/I18n';
import MySetUp from '../common/SetUpPwd';
import { EventRegister } from 'react-native-event-listeners';
// import LoginAgain from '../../containers/mine/LoginContainer';
// import Register from '../common/Register';
// import SetUpPwd from '../common/SetUpPwd';
import FamilyManageContainer from '../../containers/home/FamilyManageContainer';
import AddFamily from '../home/AddFamily';
import FamilySetUpContainer from '../../containers/home/FamilySetUpContainer';
import RoomManageContainer from '../../containers/home/RoomManageContainer';
import RoomSetUpContainer from '../../containers/home/RoomSetUpContainer';
import FamilyMemberContainer from '../../containers/home/FamilyMemberContainer';
import AdminSetUp from '../home/AdminSetUp';
import AddRoom from '../home/AddRoom';
import AddMember from '../home/AddMember';
import AboutUs from './AboutUs';
import MessageInfo from './MessageInfo';
export class MineView extends Component {
  constructor(props) {
    super(props);
    this.state ={
      localeLanguage: null,
    }
  }

  componentWillMount() {
    this.UpdateUserInfolistener = EventRegister.addEventListener('UpdateUserInfoSucc', () => {
      this.props.container.myBaseInfoFetchData(this.props.container.userInfoData.phone_number)
    })

    this.changeBaseInfolistener = EventRegister.addEventListener('changeBaseInfo', () => {
      this.props.container.myBaseInfoFetchData(this.props.container.userInfoData.phone_number);
      this.props.container.familyListFetchData(this.props.container.userInfoData.globalHomeId)
    })

    this.UpdateUserHearImgListener = EventRegister.addEventListener('UpdateUserHearImgSucc', data => {
      if(data.code == '200'){
        this.props.container.localStoreHeaderImgData(data.avatar);
      }
    });


  }

  componentWillUnmount() {
    EventRegister.removeEventListener(this.UpdateUserInfolistener);
    EventRegister.removeEventListener(this.changeBaseInfolistener);
  }

  render() {
    if(this.props.container.netInfoStatus){
      return (
        <SafeAreaView style={commonStyles.containGrayWrap}>
          <ScrollView>
            <Touch style={[styles.userInfoBox, commonStyles.flexBoxColumn]}
              onPress={() => this.props.container.navigation.navigate('EditAccount', {data: this.props.container.data, userinfoData: this.props.container.userInfoData})}
            >
              <Image
                style={styles.headerIcon}
                defaultSource ={require('../../img/pic_mrtx.png')}
                source={ 
                  this.props.container.userInfoData.localHeaderImg == ''
                  ? require('../../img/pic_mrtx.png')
                  : {uri: this.props.container.userInfoData.localHeaderImg}
                }
              />
              <Text style={styles.userName}>{this.props.container.data.length == 0 ? 'Click here to set the nickname' : this.props.container.data.name == '' ? 'Click here to set the nickname' : this.props.container.data.name}</Text>
              <Text style={styles.userTel}>{this.props.container.userInfoData.phone_number}</Text>
            </Touch>
            <View style={commonStyles.setionListBox}>
              <Touch style={[commonStyles.setionItems, commonStyles.flexBox]}
                onPress={() => this.props.container.navigation.navigate('Messagecenter')}
              >
                <Image style={[commonStyles.moreIconSty, {marginRight: 10}]} source={require('../../img/myIcon1.png')} />
                <Text style={commonStyles.setionItemText}>Messaging</Text>
                <Image style={commonStyles.moreIconSty} source={require('../../img/icon_gd.png')} />
              </Touch>
              <Touch style={[commonStyles.setionItems, commonStyles.flexBox]}
                onPress={() => this.props.container.navigation.navigate('FamilyManage')}
              >
                <Image style={[commonStyles.moreIconSty, {marginRight: 10}]} source={require('../../img/myIcon2.png')} />
                <Text style={commonStyles.setionItemText}>Family management</Text>
                <Image style={commonStyles.moreIconSty} source={require('../../img/icon_gd.png')} />
              </Touch>
              <Touch style={[commonStyles.setionItems, commonStyles.flexBox]}
                onPress={() => this.props.container.navigation.navigate('DeviceShare')}
              >
                <Image style={[commonStyles.moreIconSty, {marginRight: 10}]} source={require('../../img/myIcon3.png')} />
                <Text style={commonStyles.setionItemText}>Shared devices</Text>
                <Image style={commonStyles.moreIconSty} source={require('../../img/icon_gd.png')} />
              </Touch>
            </View>
            <View style={commonStyles.setionListBox}>
              <Touch style={[commonStyles.setionItems, commonStyles.flexBox]}
                onPress={() => this.props.container.navigation.navigate('EditAccount', {data: this.props.container.data, userinfoData: this.props.container.userInfoData})}
              >
                <Image style={[commonStyles.moreIconSty, {marginRight: 10}]} source={require('../../img/myIcon4.png')} />
                <Text style={commonStyles.setionItemText}>Personal center</Text>
                <Image style={commonStyles.moreIconSty} source={require('../../img/icon_gd.png')} />
              </Touch>
              <Touch style={[commonStyles.setionItems, commonStyles.flexBox]}
                onPress={() => this.props.container.navigation.navigate('Feedback', { token: this.props.container.userInfoData.token})}
              >
                <Image style={[commonStyles.moreIconSty, {marginRight: 10}]} source={require('../../img/myIcon5.png')} />
                <Text style={commonStyles.setionItemText}>Feedback</Text>
                <Image style={commonStyles.moreIconSty} source={require('../../img/icon_gd.png')} />
              </Touch>
            </View>
            <View style={commonStyles.setionListBox}>
              <Touch style={[commonStyles.setionItems, commonStyles.flexBox]}
                onPress={() => this.props.container.navigation.navigate('SetUp', {token: this.props.container.userInfoData.token})}
              >
                <Image style={[commonStyles.moreIconSty, {marginRight: 10}]} source={require('../../img/myIcon6.png')} />
                <Text style={commonStyles.setionItemText}>Setting</Text>
                <Image style={commonStyles.moreIconSty} source={require('../../img/icon_gd.png')} />
              </Touch>
            </View>
          </ScrollView>
        </SafeAreaView>
      )
    } else{
      return (
        <SafeAreaView style={[commonStyles.containGrayWrap, commonStyles.flexBoxColumn]}>
            <StatusBar
                hidden={false}
                barStyle="dark-content"
                backgroundColor={'white'}
                translucent
            />
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

export default (NavigatorTabFive = createStackNavigator(
  {
    MineView: {
      screen: MineViewContainer,
      navigationOptions: ({ navigation }) => ({
        header: null,
      }),
    },
    Messagecenter:{
      screen: MessageCenterContainer,
      navigationOptions: props => ({
        headerTitle: 'Messaging',
        headerRight: <View /> 
      }),
    },
    EditAccount:{
      screen: EditAccountContainer,
      navigationOptions: props => ({
        headerTitle: 'personal info',
      }),
    },
    Feedback:{
      screen: Feedback,
      navigationOptions: props => ({
        headerTitle: 'Feedback',
        headerRight: <View /> 
      }),
    },
    AboutUs: {
      screen: AboutUs,
      navigationOptions: props => ({
        headerTitle: 'AboutUs',
        headerRight: <View /> 
      }),
    },
    MessageInfo: {
      screen: MessageInfo,
      navigationOptions: props => ({
        headerTitle: '',
      }),
    },
    SetUp:{
      screen: SetUp,
      navigationOptions: props => ({
        headerTitle: 'Setting',
        headerRight: <View /> 
      }),
    },
    DeviceShare:{
      screen: DeviceShareContainer,
      navigationOptions: props => ({
        headerTitle: 'Shared devices',
        headerRight: <View /> 
      }),
    },
    DeviceShareManage:{
      screen: DeviceShareManageContainer,
    },
    AddShare:{
      screen: AddShare,
    },
    UpdatePassword:{
      screen: UpdatePassword,
      navigationOptions: props => ({
        headerTitle: 'Set password',
        headerRight: <View /> 
      }),
    },
    MySetUp: {
      screen: MySetUp,
      navigationOptions: props => ({
        headerTitle: 'Set password',
        headerRight: <View /> 
      }),
    },
    // Register: {
    //   screen: Register
    // },
    // SetUpPwd: {
    //   screen: SetUpPwd
    // },
    // LoginAgain: {
    //   screen: LoginAgain,
    //   navigationOptions: props => ({
    //     header: null,
    //   }),
    // },
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
    RoomSetUp:{
      screen: RoomSetUpContainer,
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
        headerStyle: {
        backgroundColor: '#fff',
        shadowColor: 'transparent',
        elevation: 0,
        shadowOpacity: 0,
      },
      headerTitleStyle: {
        fontWeight: 'normal',
        fontSize: 16,
        flex: 1,
        alignSelf:'center',
        textAlign: 'center'
      },
      headerBackTitle: null,
      // tabBarVisible: false,
    },
  },
));

NavigatorTabFive.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
  };
};

const styles = StyleSheet.create({
  userInfoBox:{
    paddingTop:62,
    paddingBottom:20,
    backgroundColor:'#fff'
  },
  headerIcon:{
    width:54,
    height:54,
    borderRadius: 27
  },
  userName:{
    color:'#2C2D30',
    fontSize:17,
    flex:1,
    marginVertical: 12
  },
  userTel:{
    fontSize:15,
    color:'#8E8E93'
  },
});

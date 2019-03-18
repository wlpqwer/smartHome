import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import { ScrollView, Text, View, SafeAreaView, Switch, StatusBar, Platform, Modal, Dimensions, Image, FlatList, ImageBackground} from 'react-native';
import { WingBlank, Toast} from 'antd-mobile-rn';
import { StyleSheet } from 'react-native';
import { commonStyles } from '../../tools/layout';
import SmartTabs from './SmartTabs';
import SmartViewContainer from '../../containers/smart/SmartViewContainer';
import { EventRegister } from 'react-native-event-listeners';
import Touch from 'react-native-touch-once';
import { Header } from 'react-navigation';
import AddSmart from './AddSmart';
import SceneSetUpContainer from '../../containers/smart/SceneSetUpContainer';
import AutoMationSetUpContainer from '../../containers/smart/AutoMationSetUpContainer';
import ChooseAction from './ChooseAction';
import ChooseSceneContainer from '../../containers/smart/ChooseSceneContainer';
import ChooseEquipmentContainer from '../../containers/smart/ChooseEquipmentContainer';
import EquipmentOperation from './EquipmentOperation';
import ChooseCondition from './ChooseCondition';
import ConditionInfo from './ConditionInfo';
import ChangeFamily from '../../containers/home/ChangeFamilyContainer';
import Weather from "./Weather";
import Timing from './Timing';
import SceneIcon from './SceneIcon';
import FengInfo from './FengInfo';
import FengInfoAtuoMation from './FengInfoAtuoMation';
import CreateNewSceneContainer from '../../containers/smart/CreateNewSceneContainer';
import CreateNewAutomationContainer from '../../containers/smart/CreateNewAutomationContainer';
import {iconCollect} from '../../tools/mockData';
import ScrollableTabView, {
  DefaultTabBar,
} from 'react-native-scrollable-tab-view';
import Loading from '../common/Loading';
import getObjValue from '../../tools/getObjValue';
import { performSceneContent, performAutoMation } from '../../network_request/fetch_api';
import ModalToast from '../common/ModalToast';

export class SmartView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabIndex: 0,
      isShowContent: false,
      autoMationStatus: false,
      isShowToast: false,  //是否是客人操作
    };
    props.container.navigation.setParams({
      onTabFocus: this.handleTabFocus
    });
}
// 493671066
  componentWillMount() {
    this.props.container.navigation.setParams({ 
      currentSwitchHomeMaster: this.props.container.userInfoData.currentFamilyAdmin,
      identityStatus: this.props.container.userInfoData.phone_number
     });

    this.merberSwitchFamilyListener = EventRegister.addEventListener('merberSwitchFamily', info => {
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

    this._navListener = this.props.container.navigation.addListener('willFocus', () => {
      this._init();
    });

    this.addSceneListener = EventRegister.addEventListener('addSceneSucc', data => {
      if(data.status == "200150"){
        this.props.container.fetchData(this.props.container.userInfoData.globalHomeId); 
      }
    });

    this.delSceneListener = EventRegister.addEventListener('delScene', msg => {
         this.props.container.fetchData(this.props.container.userInfoData.globalHomeId); 
    });

    this.updateSceneNameSuccListener = EventRegister.addEventListener('updateSceneNameSucc', () => {
      this.props.container.fetchData(this.props.container.userInfoData.globalHomeId); 
    });

    this.updateAutoNameSuccListener = EventRegister.addEventListener('updateAutoNameSucc', () => {
      this.props.container.fetchAutomationListData(this.props.container.userInfoData.globalHomeId); 
    });

    this.addAutoMationSuccListener = EventRegister.addEventListener('addAutoMationSucc', msg => {
      this.props.container.fetchAutomationListData(this.props.container.userInfoData.globalHomeId); 
      Toast.info(msg,  2, undefined, false);
    });

    this.delAutoMationSuccListener = EventRegister.addEventListener('delAutoMationSucc', data => {
      if(data.status == '200320'){
        this.props.container.fetchAutomationListData(this.props.container.userInfoData.globalHomeId); 
      }
    });

    this.performAutoMationSuccListener = EventRegister.addEventListener('performAutoMationSuccess', status => {
      if(status == '200300'){ 
        Toast.info("Automated operation is successful!",  2, undefined, false);
      } else {
        Toast.info("The automation operation failed. Please try again later!",  2, undefined, false);
      }
    });

    this.performSceneSuccListener = EventRegister.addEventListener('performSceneSuccess', status => {
      if(status == '201'){ 
        Toast.info("The scene is executed successfully!",  2, undefined, false);
      }
    });

    
    

    
  }
  
  componentWillUnmount() {
    this._navListener.remove();
    EventRegister.removeEventListener(this.delSceneListener);
    EventRegister.removeEventListener(this.updateSceneNameSuccListener);
    EventRegister.removeEventListener(this.updateAutoNameSuccListener);
    EventRegister.removeEventListener(this.addSceneListener);
    EventRegister.removeEventListener(this.addAutoMationSuccListener);
    EventRegister.removeEventListener(this.delAutoMationSuccListener);
    EventRegister.removeEventListener(this.performAutoMationSuccListener);  //自动化执行成功
    EventRegister.removeEventListener(this.performSceneSuccListener);  //场景执行成功
    EventRegister.removeEventListener(this.merberSwitchFamilyListener);
    EventRegister.removeEventListener(this.resetLoginListener); 
  }


  handleTabFocus = () => {
    if (this.props.container.netInfoStatus) {
      this.props.container.fetchData(this.props.container.userInfoData.globalHomeId);
      this.props.container.fetchAutomationListData(this.props.container.userInfoData.globalHomeId);
    }
  };


  _init() {
    if (this.props.container.netInfoStatus) {
      // this.props.container.fetchData(this.props.container.userInfoData.globalHomeId);
      // this.props.container.fetchAutomationListData(this.props.container.userInfoData.globalHomeId);
      this.setState({tabIndex: 0})
    }
  }

  _performContent = () => {
    this.setState({ isShowContent: true})
  }

  _renderItem = ({ item, index }) => {
    return (
      <WingBlank>
          <Touch style={[commonStyles.flexBox, commonStyles.sceneModule]}
            onPress = {() => {
              if(item.created_by == this.props.container.userInfoData.phone_number){
                this.props.container.navigation.navigate("SceneSetUp", {
                  page: 'smartView', 
                  sceneId: item.id, sceneName: item.name
                })
              } else {
                this.setState({isShowToast: true})
              }
            }}
          >
            <Image
              style={styles.equipmentImg}
              defaultSource={require('../../img/icon_mrcj.png')}
              source={{uri: getObjValue(iconCollect, item.icon)}}
            />
            <View style={[commonStyles.flexBoxColumn, {flex:1, alignItems:'flex-start'}]}>
              <Text style={commonStyles.sceneName}>{item.name}</Text>
            </View>
            <Touch style={[styles.runBtn, commonStyles.flexBox]}
              onPress = {() => {
                this._performContent();
                this.props.container.fetchSceneConData(item.id);
              }}
            >
              <Text style={styles.runText}>OK</Text>
            </Touch>
          </Touch>
      </WingBlank>
    );
  };

  _renderItem2 = ({ item, index }) => {
    return (
      <WingBlank>
          <View style={[commonStyles.flexBox, commonStyles.sceneModule]}>
            <Image
              style={styles.equipmentImg}
              defaultSource={require('../../img/icon_mrcj.png')}
              source={{uri: getObjValue(iconCollect, item.icon)}}
            />
            <Touch style={[commonStyles.flexBoxColumn, {flex:1, alignItems:'flex-start'}]}
              onPress = {() => {
                if(item.created_by == this.props.container.userInfoData.phone_number){
                  this.props.container.navigation.navigate('AutoMationSetUp', {autoMationId: item.id, autoMationName: item.name});
                } else {
                  this.setState({isShowToast: true})
                }
              }}
            >
              <Text style={commonStyles.sceneName}>{item.name}</Text>
            </Touch>
            <Switch value={item.status} 
              onTintColor={'#FCBF00'}
              tintColor={'#E5E5E5'} 
              thumbTintColor={Platform.OS === 'android' ? '#E5E5E5' : ''}
              style={commonStyles.switchStyle}
              onValueChange={(value)=> {
                this.setState({
                  autoMationStatus: value,
                });
                item.status = value;
                performAutoMation(
                  this.props.container.userInfoData.token,
                  item.id
                );
              }}
            />
          </View>
      </WingBlank>
    );
  };


  _createMyExamEmptyView() {
    return (
      <View style={[commonStyles.flexBoxColumn, {height: Dimensions.get('window').height - 156 - Header.HEIGHT, backgroundColor:'#FCF6E7'}]}>
        <Image
          style={{ width: 250, height: 137}}
          resizeMode = "contain"
          source={require('../../img/pic_kzt1.png')}
        />
        {this.props.container.userInfoData.currentFamilyAdmin == this.props.container.userInfoData.phone_number ? (
          <Touch style={[commonStyles.flexBoxColumn, {marginTop: 62}]} 
            onPress = {() => this.props.container.navigation.navigate(this.state.tabIndex == 0 ? 'CreateNewScene' : 'CreateNewAutomation', {page: 'smartHomeTab'})}>
              <Image
                style={commonStyles.deviceImg}
                source={require('../../img/icon_tjsb1.png')}
              /> 
              <Text style={{ marginTop: 20, fontSize: 15, color:'#8E8D94'}}>Add{this.state.tabIndex == 0 ? ' Scene ' : ' Automation '}to start smart life</Text>
            </Touch>
        ) : null} 
      </View>
    );
  }


  render() {
    console.log(this.props.container)
    let sceneContentArr = [];
      for(key in this.props.container.sceneContentData) {
        if(key != "scene"){
          let length = this.props.container.sceneContentData[key].length;
          for (let i=0; i < length; i++) {
              sceneContentArr.push(this.props.container.sceneContentData[key][i]);
          } 
        }
      }
    console.log(sceneContentArr)
    if(this.props.container.netInfoStatus){
      if(!this.props.container.isLoadingSceneListData && !this.props.container.isLoadingAutoMationListData){
        return (
            <SafeAreaView style={commonStyles.containGrayWrap}>
               <StatusBar
                  hidden={false}
                  barStyle="dark-content"
                  backgroundColor={'white'}
                  translucent
                />
              <View>
                <Text style={[commonStyles.tabSortTitle, commonStyles.padLR20, {paddingBottom: 0}]}>Automation</Text>
              </View>
              <ScrollableTabView
                style={{ flex: 1, position:'relative', zIndex:9 }}
                initialPage={0}
                onChangeTab={
                  (obj) => {
                      this.setState({tabIndex: obj.i});
                    }
                }
                renderTabBar={() => (
                  <SmartTabs
                    backgroundColor={'#fff'}
                    tabUnderlineDefaultWidth={36} // default containerWidth / (numberOfTabs * 4)
                    tabUnderlineScaleX={3} // default 3
                    activeColor={'#FFBB00'}
                    inactiveColor={'#9B9B9B'}
                    textStyle={{ fontSize: 16 }}
                  />
                )}
              >
                <View
                  tabLabel="Scenes"
                  style={[styles.contentWrap, { flex: 1,}]}
                >
                <ImageBackground source={require('../../img/homeBjImg.png')} style={{width: '100%', height: '100%'}}>
                  <FlatList
                    data={this.props.container.data}
                    renderItem={this._renderItem}
                    ListEmptyComponent={this._createMyExamEmptyView()}
                    keyExtractor={item => item.id.toString()}
                  />
                </ImageBackground>
                </View>
                <View tabLabel="Automation" style={[styles.contentWrap, { flex: 1 }]}>
                  <ImageBackground source={require('../../img/homeBjImg.png')} style={{width: '100%', height: '100%'}}>
                    <FlatList
                      data={this.props.container.autoMationListData}
                      renderItem={this._renderItem2}
                      ListEmptyComponent={this._createMyExamEmptyView()}
                      keyExtractor={item => item.id.toString()}
                    />
                  </ImageBackground>
                </View>
              </ScrollableTabView>
              {this.props.container.data.length != 0 && this.state.isShowContent ? (
                <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.isShowContent}
                onRequestClose={() => {
                  this.setState({isShowContent: false})
                }}
                >
                  <View style={styles.scenceModal}>
                    <View style={[commonStyles.addDevicesBox, commonStyles.flexBoxColumn, styles.modalWrap]}>
                    
                      {this.props.container.isLoadingSceneCon ? (
                        <View>
                          <Image
                            style={{width: 30, height: 30}}
                            source={require('../../img/smartSceneLoading.gif')}
                          />
                        </View>
                      ) : (
                      <View style={[commonStyles.flexBoxColumn, {width: '100%', flex: 1}]}>
                        <Text style={styles.scenceName}>{Object.keys(this.props.container.sceneContentData).length == 0 ? '' : this.props.container.sceneContentData.scene[0].name}</Text>
                        <View style={styles.scenceContent}>
                          <ScrollView>
                            {sceneContentArr.map((item, index) => {
                              let childrenData = Object.keys(item.operation_order).map((info, idx) => {
                                  return(
                                    <View style={[commonStyles.flexBox, {marginBottom: 12, paddingLeft: 12, paddingRight: 20}]} key={`${index}_${idx}`}>
                                      <Image
                                        style={styles.smartDeviceImg}
                                        source={require('../../img/pic_fs.png')}
                                      />
                                      <View style={styles.deviceItem}>
                                        <Text style={styles.scenceDeviceName}>{item.operation_equipment__name}</Text>
                                        <Text style={styles.scenceDeviceStatus} numberOfLines={1}>{`${info}：${item.operation_order[info]}`}</Text>
                                      </View>
                                      <Image
                                        style={styles.checkedImg}
                                        source={require('../../img/icon_xz.png')}
                                      />
                                    </View>
                                  )
                              })
                              return( <View key={index}>{childrenData}</View>)
                            })}
                          </ScrollView>
                        </View>
                        <Touch style={[commonStyles.flexBox, {height: 44, width: '100%'}]}
                          onPress={() => {
                            performSceneContent(
                                {
                                  scene_id: this.props.container.sceneContentData.scene[0].id,
                                },
                                this.props.container.userInfoData.token,
                                this.props.container.userInfoData.globalHomeId,
                            );
                            this.setState({isShowContent: false})
                          }}
                        >
                          <Text style={styles.scenceName}>OK</Text>
                        </Touch>
                      </View>
                      )}
                    </View>
                  </View>
                </Modal> 
              ) : null} 
  
            <ModalToast
              _dialogVisible={this.state.isShowToast}
              _dialogContent={"Ordinary members can only perform scenarios and automation, without permission to modify"}
              _dialogLeftBtnAction={() => {
                this.setState({isShowToast: false})
              }}
            />
          </SafeAreaView>
        );
      } else {
        return <Loading />
      }
    } else {
      return (
        <SafeAreaView style={[commonStyles.containGrayWrap, commonStyles.flexBoxColumn]}>
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

export default (NavigatorTabTwo = createStackNavigator(
  {
    SmartView: {
      screen: SmartViewContainer,
      navigationOptions: props => ({
        headerLeft: (
          <ChangeFamily container={props} />
        )
      })
    },
    AddSmart: {
      screen: AddSmart,
      navigationOptions: props => ({
        // headerTitle: '添加设备',
      }),
    },
    SceneSetUp: {
      screen: SceneSetUpContainer,
    },
    AutoMationSetUp: {
      screen: AutoMationSetUpContainer,
    },
    ChooseAction: {
      screen: ChooseAction,
      navigationOptions: props => ({
        headerTitle: 'Select action',
        headerRight: <View /> 
      }),
    },
    // ChooseAutoMation: {
    //   screen: ChooseAutoMation,
    //   navigationOptions: props => ({
    //     headerTitle: '选择要触发的自动化',
    //   }),
    // },
    ChooseEquipment: {
      screen: ChooseEquipmentContainer,
      navigationOptions: props => ({
        headerTitle: 'Select devices',
        headerRight: <View />   
      }),
    },
    EquipmentOperation: {
      screen: EquipmentOperation,
    },
    ChooseCondition: {
      screen: ChooseCondition,
      navigationOptions: props => ({
        headerTitle: 'Select conditions',
        headerRight: <View />
      }),
    },
    ConditionInfo: {
      screen: ConditionInfo,
      navigationOptions: props => ({
        headerTitle: '温度',
      }),
    },
    Weather: {
      screen: Weather,
      navigationOptions: props => ({
        headerTitle: '天气',
      }),
    },
    Timing: {
      screen: Timing,
      navigationOptions: props => ({
        headerTitle: 'Time settings',
      }),
    },
    SceneIcon: {
      screen: SceneIcon,
    },
    FengInfo:{
      screen: FengInfo,
      navigationOptions: props => ({
        headerTitle: 'Fan',
      }),
    },
    FengInfoAtuoMation: {
      screen: FengInfoAtuoMation,
      navigationOptions: props => ({
        headerTitle: 'fan',
      }),
    },
    CreateNewScene:{
      screen: CreateNewSceneContainer,
    },
    CreateNewAutomation: {
      screen: CreateNewAutomationContainer,
    },
    ChooseScene: {
      screen: ChooseSceneContainer
    }
    
  },
  {
    cardStyle: {
      paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
    },
    navigationOptions: {
      gesturesEnabled: false,
       headerTintColor: '#000',
        // headerTruncatedBackTitle: '返回',
        headerBackTitle: null,
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

NavigatorTabTwo.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
    tabBarOnPress({ navigation, defaultHandler }) {
      console.log('onPress:', navigation);
      if(navigation.state.routes[0].hasOwnProperty("params")){
        navigation.state.routes[0].params.onTabFocus();
      }
      defaultHandler();
    },
  };
};

const styles = StyleSheet.create({
  runBtn:{
    width: 80,
    height:34,
    borderWidth:1,
    borderColor:'#FCBF00',
    borderRadius:4
  },
  runText:{
    color:'#FCBF00',
    fontSize:15
  },
  equipmentImg: {
    width:60, 
    height:60,
    marginHorizontal:12
  },
  modalWrap:{
    width: '72%', 
    height: Dimensions.get('window').height /2,
    overflow: 'hidden', 
    borderRadius: 6
  },
  scenceModal:{
    backgroundColor:'rgba(0,0,0,.4)',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scenceName:{
    paddingVertical: 18,
    fontSize: 16,
    color:'#2C2D30',
  },
  scenceContent:{
    paddingVertical: 12,
    borderTopColor: '#f2f2f2',
    borderTopWidth: 1,
    borderBottomColor: '#f2f2f2',
    borderBottomWidth: 1,
    width: '100%',
    flex: 1
  },
  smartDeviceImg:{
    width: 40,
    height: 40,
    marginRight: 12
  },
  deviceItem: {
    flex: 1
  },
  checkedImg: {
    width: 20,
    height: 20
  },
  scenceDeviceName:{
    fontSize: 15,
    color: '#2C2D30',
    lineHeight: 20
  },
  scenceDeviceStatus:{
    fontSize: 12,
    color: '#8E8D94',
    lineHeight: 20,
    marginRight: 8
  }
});



import React, { Component } from 'react';
import { commonStyles } from '../../tools/layout';
import Touch from 'react-native-touch-once';
import Smartconfig from 'react-native-smartconfig';
import px2dp from '../../tools/px2dp';
import sha256 from 'crypto-js/sha256';
import { EventRegister } from 'react-native-event-listeners';
import { bindEquipmentGetResu } from '../../network_request/fetch_api';
import { Header } from 'react-navigation';
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  Dimensions,
  Modal,
  TextInput,
  Keyboard, ScrollView, Platform
} from 'react-native';
import { WhiteSpace, WingBlank, Toast } from 'antd-mobile-rn';
import { NetworkInfo } from 'react-native-network-info';
import * as Progress from 'react-native-progress';
let net = require('net');
let deviceID = "";
let PID = "";
let getSharedAccessKey = "";
let currentIp = '';

function isJSON(str) {
  try {
      let obj = JSON.parse(str);
      return !!obj && typeof obj === 'object';
  } catch (e) {}
  return false;
}

export default class AddDevice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pwdModalVisible: false,
      isShowProgress: false,
      progress: 0,
      indeterminate: true,
      isConnectError: false,
      isShowMsg: false,
      alertText: '',
      // chatter: [],  //tcp connect 得到的数据数组
      chatter: '',
    };
    this.wifiPwd = "";
    this.wifiName = "";
    this.getNetWorkLen = 0;
    this.roundProgress = 0;
    this.fun = {};
    this.phoneIp = "";
    this.updateChatter = this.updateChatter.bind(this);
    this.server = null; //tcp server 用于关闭连接
  }

  componentWillMount() {
    NetworkInfo.getSSID(ssid => {
      console.log(ssid);
      this.wifiName = ssid;
    });


    NetworkInfo.getIPV4Address(ipv4 => {
      this.phoneIp = ipv4;
      currentIp = ipv4;
      // alert(`本机的IP：${this.phoneIp}`)
      console.log(ipv4); 
    });

    this.zhuCeDevListener = EventRegister.addEventListener('zhuCeDev', data => {
      clearInterval(this.fun);
      this.props.container.navigation.pop(3);
      Toast.info(data.msg,  2, undefined, false);
    }); 
    

  }

  componentWillUnmount() {
    EventRegister.removeEventListener(this.zhuCeDevListener);
    if(this.getNetWorkLen >= 1){
      this.server.close();
      this.server = null;
    }
  }

  updateChatter(msg) {
    this.setState({
      chatter: msg
    });
  }

  successToast = () => {
    Toast.info("dsfdsgsdfhsfdhf",  2, undefined, false);
    // Toast.info(`设备联网成功，deviceID：${deviceID}, PID: ${PID}, getSharedAccessKey: ${getSharedAccessKey}`, 7);
  }

  animate = () => {
    this.setState({ progress:0 });
    setTimeout(() => {
      this.setState({ indeterminate: false });
      this.fun = setInterval(() => {
          this.roundProgress += 0.01;
          if (this.roundProgress > 1) {
            this.roundProgress = 1;
                this.setState({isConnectError: true});
                Smartconfig.stop();
          }
          this.setState({ progress:this.roundProgress });  
        }, 1000);
      }, 1500);  //外围圈圈的动画时间
  }

  setPwdVisible = (visible) => {
    this.setState({ pwdModalVisible: visible });
  }

  render() {

    return (
      <SafeAreaView style={[commonStyles.containWrap, commonStyles.flexBoxColumn, {width: Dimensions.get('window').width}]}>
        <ScrollView>
          <View style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height - Header.HEIGHT}}>
            <View style={[commonStyles.flexBox, commonStyles.padLR20, {paddingVertical:27, width:'100%', backgroundColor:'#F2F2F2'}]}>
              <Image style={styles.deviceStatusImg} source={require('../../img/pic_sd.png')} />
            </View>
            <Text style={styles.tips}>Turn on the power and confirm that the light is blinking</Text>
            <View style={styles.operateBox}>
              <Text style={styles.howToSet}>How to set the indicator to blink</Text>
              <Touch style={[commonStyles.buttonBox,{width:'100%'}]}  onPress={() => {this.setPwdVisible(true)}}>
                <Text style={commonStyles.buttonText}>Confirmation indicator flashes</Text>
              </Touch>
            </View>
          </View>
        </ScrollView>
        <Modal
          animationType="fade"
          visible={this.state.pwdModalVisible}
          onRequestClose={() => {
            console.log("Modal has been closed.");
          }}
        >
          <View style={styles.modelBox}>
          {!this.state.isShowProgress ? (
            <View style={styles.dialog}>
              <WingBlank>
                <WhiteSpace size="xl" />
                <Text style={styles.message}>Please enter your home Wi-Fi password</Text>
                <WhiteSpace size="lg" />
                <View style={styles.writeItems}>
                  <TextInput
                    style={styles.writeCon}
                    numberOfLines={1}
                    onChangeText={pwd => (this.wifiPwd = pwd)}
                    underlineColorAndroid="transparent"
                  />
                </View>
                <WhiteSpace size="lg" />
                <View style={commonStyles.flexBox}>
                  <Text style={{ color:'#9B9B9B', fontSize:13, flex:1}}>Wi-Fi：{this.wifiName}</Text>
                  {/* <Touch style={{}}  onPress={() => {}}>
                    <Text style={styles.buttonText}>更换网络</Text>
                  </Touch> */}
                </View>
                <WhiteSpace size="lg" />
                <View style={[commonStyles.flexBox, {borderTopWidth:1, borderTopColor:'#F2F2F2'}]}>
                  <Touch style={styles.btnGroupSty}  onPress={() => {this.setPwdVisible(false);}}>
                    <Text style={styles.btnContent}>CANCEL</Text>
                  </Touch>
                  <Touch style={styles.btnGroupSty}  onPress={() => {                        
                    this.setState({isShowProgress: true});     
                    Keyboard.dismiss();
                    this.animate();
                    Smartconfig.start({
                      type: 'esptouch', 
                      ssid: `${this.wifiName}`,
                      // bssid: 'filter-device', //"" if not need to filter (don't use null)
                      password: `${this.wifiPwd}`,
                      timeout: 200000
                    }).then(results => {
                      console.log(results);
                      // getCurrentIP = results[0].ipv4;
                      if (results[0].hasOwnProperty("deviceID") && results[0].hasOwnProperty("SharedAccessKey") && results[0].hasOwnProperty("PID")) {
                         deviceID = results[0].deviceID;
                         PID = results[0].PID;
                         getSharedAccessKey = results[0].SharedAccessKey;
                      } 
                      this.getNetWorkLen = results.length;
                      if(this.getNetWorkLen >= 1){
                        // clearInterval(this.fun);
                        // Toast.info(`设备联网成功，deviceID：${deviceID}, PID: ${PID}, getSharedAccessKey: ${getSharedAccessKey}`, 10);
                        
                      // }

                      // tcp connect start ----->
                      let server = net.createServer((socket) => {
                        console.log('server connected on ' + JSON.stringify(socket.address()));
                  
                        socket.on('data', (data) => {
                          // Toast.info(`Tcp connection returns data: ${data}`, 10);
                          // this.updateChatter('Server Received: ' + data);
                          // clearInterval(this.fun);
                          let testdata = `${data}`;
                          socket.write('success');
                          console.log(testdata)

                          if(isJSON(testdata)){
                            bindEquipmentGetResu(
                                {
                                name: testdata.PID,
                                primary_key:  testdata.SharedAccessKey,
                                sn_code:  testdata.DeviceID
                              },
                              this.props.container.userInfoData.token,
                            );
                          } else {
                            let returnTcpData = eval("(" + testdata + ")");
                            bindEquipmentGetResu(
                              {
                                name: returnTcpData.PID,
                                primary_key:  returnTcpData.SharedAccessKey,
                                sn_code:  returnTcpData.DeviceID
                              },
                              this.props.container.userInfoData.token,
                            );
                          }
                          // let returnTcpData = JSON.parse(testdata);                

                          
                          
                          Toast.loading('Waiting...', 0);
                          // this.props.container.navigation.pop(3);
                          // this.props.container.navigation.pop(3);
                        });
                  
                  
                        socket.on('error', (error) => {
                          console.log('error ' + error);
                        });
                  
                  
                        socket.on('close', (error) => {
                          console.log('server client closed ' + (error ? error : ''));
                        });
                      })
                      // }).listen(3389); 
                      if(Platform.OS === 'android') {
                        server.listen(3389);
                      } else {
                        server.listen({port: 3389, host: currentIp}, () => {
                          this.updateChatter('opened server on ' + JSON.stringify(server.address()));
                        });
                      }
                      
                      server.on('error', (error) => {
                        console.log('error ' + error);
                      });
                  
                      server.on('close', () => {
                        console.log('server close');
                      });

                      this.server = server;

                      // tcp connect end ------>
                    }

                    }).catch(err => {
                      console.log(err);
                      // this.setState({isConnectError: true});
                      // Smartconfig.stop();
                    });
                    // this.setState({isShowProgress: true});
                  }}>
                    <Text style={[styles.btnContent, {color:'#108EE9'}]}>OK</Text>
                  </Touch>
                </View>
              </WingBlank>
            </View>
          ) : (
            <View style={[styles.dialog, {display: this.state.isConnectError ? "none" : 'flex'}]}>
              <WingBlank>
                <WhiteSpace size="xl" />
                <Text style={styles.message}>Connecting</Text>
                <WhiteSpace size="lg" />
                <View style={commonStyles.flexBox}>
                  <Progress.Circle
                    size = {80}
                    style={styles.progress}
                    progress={this.state.progress}
                    indeterminate={this.state.indeterminate}
                    showsText={true}
                    borderWidth={1}
                    thickness={5}
                  />
                </View>
                <WhiteSpace size="lg" />
                <Text style={{fontSize:13, color:'#2C2D30', textAlign:'center'}}>Routers, phones and devices as close as possible</Text>
                <WhiteSpace size="lg" />
                <View style={commonStyles.flexBox}>
                  <View style={{ paddingVertical:18, position:'relative'}}>
                    <View style={[commonStyles.flexBox, {marginBottom:4, justifyContent: 'flex-start'}]}>
                      <View style={styles.tipIcon}></View>
                      <Text style={styles.tipText}>Find device</Text>
                    </View>
                    <View style={[commonStyles.flexBox, {marginBottom:4, justifyContent: 'flex-start'}]}>
                      <View style={styles.tipIcon}></View>
                      <Text style={styles.tipText}>Register your device with Fine Cloud</Text>
                    </View>
                    <View style={[commonStyles.flexBox, {marginBottom:4, justifyContent: 'flex-start'}]}>
                      <View style={styles.tipIcon}></View>
                      <Text style={styles.tipText}>Device initialization</Text>
                    </View>
                    
                  </View>
                </View>
              </WingBlank>
            </View>
           )} 

          {
            this.state.isConnectError ? (
              <View style={[styles.dialog, commonStyles.flexBoxColumn]}>
                  <WhiteSpace size="xl" />
                  <View style={[styles.connectStatus, commonStyles.flexBox]}>
                    <Text style={styles.connectText}>Failed</Text>
                  </View>
                  <WhiteSpace size="lg" />
                  <Text style={{fontSize:17, color:'#2C2D30', textAlign:'center'}}>Please try again later</Text>
                  <WhiteSpace size="lg" />
                  <View style={[commonStyles.flexBox, {borderTopWidth:1, borderTopColor:'#F2F2F2', width:'100%'}]}>
                    <Touch style={styles.btnGroupSty}  onPress={() => {
                      clearInterval(this.fun);
                      setTimeout(() => {
                        this.setState({
                          isShowProgress: false,
                          isConnectError: false,
                          progress: 0,
                          pwdModalVisible: false,
                          // indeterminate: true 
                        });
                        this.roundProgress = 0;
                      },1000)
                    }}>
                      <Text style={[styles.btnContent, {color:'#108EE9'}]}>OK</Text>
                    </Touch>
                </View>
              </View>
            ) : null
          }

          </View>
        </Modal>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  deviceStatusImg: {
    width: 156,
    height:156,
    borderRadius: 78,
    borderWidth:1,
    borderColor:'#D8D8D8',
  },
  tips:{
    marginTop:30,
    color:'#2C2D30',
    fontSize:17,
    textAlign:'center',
  },
  operateBox:{
    flex:1,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom:60,
    marginHorizontal: 20,
    width:Dimensions.get('window').width -40
  },
  howToSet:{
    fontSize:14,
    color:'#4A90E2',
    paddingBottom:30,
    textAlign:'center',
    width:'100%',
    textDecorationLine:'underline',
  },
  modelBox:{
    backgroundColor:'rgba(0,0,0,.4)',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialog:{
    backgroundColor:'#fff',
    borderRadius:14,
    width: Dimensions.get('window').width * 0.72
  },
  message:{
    fontSize:17,
    textAlign:'center'
  },
  writeItems: {
    paddingHorizontal: 20,
    height: 36,
    borderColor: '#D8D8D8',
    borderWidth: 1,
    borderRadius:8
  },
  writeCon: {
    flex: 1,
    fontSize: 15,
    color: '#2C2D30',
    lineHeight: 20,
    paddingVertical: 8,
    paddingRight: 20,
  },
  buttonText:{
    color:'#108EE9',
    fontSize:13
  },
  btnGroupSty:{
    paddingVertical:12,
    flex: 1
  },
  btnContent:{
    fontSize:17,
    color:'#2C2D30',
    textAlign:'center'
  },
  tipIcon:{
    borderColor:'#CCCCCC',
    borderWidth:1,
    width:4,
    height:4,
    borderRadius:2,
    marginRight:6
  },
  tipText:{
    fontSize:12,
    color:'#9B9B9B'
  },
  connectStatus:{
    width:74,
    height:74,
    borderRadius:37,
    backgroundColor:'#108EE9'
  },
  connectText:{
    color:'#fff',
    fontSize:12
  },
  circles: {
    flexDirection: 'row',
    alignItems: 'center',  
  },
  progress: {
    margin: 10,
  },
});







                    // bindEquipmentGetResu(
                    //             {
                    //             name: PID,
                    //             primary_key: SharedAccessKey,
                    //             sn_code: deviceID
                    //           },
                    //           this.props.container.userInfoData.token,
                    // );
                    // console.log(this.props.container.userInfoData.token)
                    // bindEquipmentGetResu(
                    //             {
                    //             name: 'LG0003',
                    //             primary_key: '6c7d2a8e33761add42d5530590a575e6c4c0662e789a1db98dc723da0b141e53',
                    //             sn_code: '76b323d95fc3373dbbbf9d13f4e9172d'
                    //           },
                    //           this.props.container.userInfoData.token,
                    // );
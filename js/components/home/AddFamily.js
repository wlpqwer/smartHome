import React, { Component } from 'react';
import { Text, ScrollView, SafeAreaView, Image, StyleSheet, View } from 'react-native';
import { Modal, Toast } from 'antd-mobile-rn';
import { commonStyles } from '../../tools/layout';
import Touch from 'react-native-touch-once';
import { postAddFamily } from '../../network_request/fetch_api';
import { EventRegister } from 'react-native-event-listeners';
import ModalInput from '../common/ModalInput';

export default class AddFamily extends Component {
  constructor(props) {
    super(props);
    this.writeFamilyName = "Entre your home name";
    this.writeFamilyLocal = "Select home location";
    this.state = {
      isShowNamePop: false,
      isShowLocalPop: false
    }
  }

  componentDidMount() {
    this.props.navigation.setParams({ newAddFamily: this.newAddFamily });
    this.listener = EventRegister.addEventListener('addFamilySucc', data => {
      this.props.navigation.pop();
      Toast.info(data.msg);
    });
  }



  componentWillUnmount() {
    EventRegister.removeEventListener(this.listener);
  }

  newAddFamily = () => {
    if(this.writeFamilyName == "Entre your home name" || this.writeFamilyLocal == "Select home location") {
      Toast.info("All items cannot be empty",  2, undefined, false);
    } else {
      postAddFamily(
        {
          name: this.writeFamilyName,
          local: this.writeFamilyLocal,
          memeber: this.props.navigation.state.params.data.phone_number,
          created_by: this.props.navigation.state.params.data.phone_number
        },
        this.props.navigation.state.params.data.phone_number,
        this.props.navigation.state.params.data.token,
      );
      Toast.loading('Loading', 0);
    }
  };

  static navigationOptions = ({ navigation }) => {
    console.log(navigation.state)
    const { params = {} } = navigation.state;
    return {
      headerTitle: 'Create a new home',
      headerRight: (
        <View style={[commonStyles.flexBox, { height: '100%', width: 88 }]}>
          <Touch
            style={[commonStyles.flexBox, { flex: 1, height: '100%' }]}
            activeOpacity={0.5}
            onPress={() => { params.newAddFamily()}}
          >
           <Text style={{fontSize:17, color:'#2C2D30'}}>OK</Text>
          </Touch>
        </View>
      ),
    };
  };


  // _tipToast = () => {
  //   Toast.info("家庭名称不能为空",  2, undefined, false);
  // }

  // writeFamilyName = () => {
  //   Modal.prompt(
  //     '请输入家庭名称',
  //     null,
  //     (familyName) => {
  //       // console.log(`password: ${familyName}`)
  //       if(familyName == null ){
  //         this._tipToast();
  //       } else {
  //         this.setState({
  //           writeFamilyName: familyName
  //         });
  //       }
        
  //     },
  //     'default',
  //     null,
  //     [this.state.writeFamilyName],
  //   );
  // }

  // writeFamilyLocal = () => {
  //   Modal.prompt(
  //     '请输入家庭位置',
  //     null,
  //     (familyLocal) => {
  //       if(familyLocal == null ){
  //         Toast.info("家庭位置不能为空",  2, undefined, false);
  //       } else {
  //         this.setState({
  //           writeFamilyLocal: familyLocal
  //         });
  //       }
        
  //     },
  //     'default',
  //     null,
  //     [this.state.writeFamilyLocal],
  //   );
  // }

  render() {
    return (
      <SafeAreaView style={commonStyles.containGrayWrap}>
        <ScrollView>
          <View style={commonStyles.homeContainerBox}>
            <Touch style={[commonStyles.flexBox, commonStyles.noneLineList]} onPress={() => this.setState({isShowNamePop: true})}>
              <Text style={commonStyles.deviceName}>Home name</Text>
              <Text style={styles.familyName}>{this.writeFamilyName}</Text>
              <Image style={commonStyles.moreIconSty} source={require('../../img/icon_gd.png')} />
            </Touch>
            <Touch style={[commonStyles.flexBox, commonStyles.noneLineList]}  onPress={() => this.setState({isShowLocalPop: true})}>
              <Text style={commonStyles.deviceName} numberOfLines={1}>Home location</Text>
              <Text style={styles.familyName}>{this.writeFamilyLocal}</Text>
              <Image style={commonStyles.moreIconSty} source={require('../../img/icon_gd.png')} />
            </Touch>
          </View>
        </ScrollView>
        <ModalInput
            ref='writeFamilyNameNode'
            _popupInputBoxVisible={this.state.isShowNamePop}
            _popupInputBoxTitle = {"Please enter a family name"}
            _popupInputBoxDefaultText = {this.writeFamilyName}
            _popupInputBoxLeftBtnAction ={() => {this.setState({isShowNamePop: false})}}
            _popupInputBoxRightBtnAction ={() => {
              if(this.refs.writeFamilyNameNode.state.value != '' && this.refs.writeFamilyNameNode.state.value.length < 32){
                this.writeFamilyName = this.refs.writeFamilyNameNode.state.value;
                console.log(this.refs.writeFamilyNameNode.state.value)
              } else {
                Toast.info("Length cannot be greater than 32",  2, undefined, false);
              }
              this.setState({isShowNamePop: false})
            }}
        />
        <ModalInput
          ref='writeFamilyLocalNode'
          _popupInputBoxVisible={this.state.isShowLocalPop}
          _popupInputBoxTitle = {"Please enter a home location"}
          _popupInputBoxDefaultText = {this.writeFamilyLocal}
          _popupInputBoxLeftBtnAction ={() => {this.setState({isShowLocalPop: false})}}
          _popupInputBoxRightBtnAction ={() => {
            console.log(this.refs.writeFamilyLocalNode.state.value.length)
            if(this.refs.writeFamilyLocalNode.state.value != '' && this.refs.writeFamilyLocalNode.state.value.length < 64){
              this.writeFamilyLocal = this.refs.writeFamilyLocalNode.state.value;
              console.log(this.refs.writeFamilyLocalNode.state.value)
            } else{
              Toast.info("Length cannot be greater than 64",  2, undefined, false);
            }
            this.setState({isShowLocalPop: false})
          }}
        />
       </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  familyName:{
    color:'#9B9B9B',
    fontSize:15,
    flex:2,
    textAlign:'right',
  }
});
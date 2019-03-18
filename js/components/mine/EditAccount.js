import React, { Component } from 'react';
import { Text, ScrollView, SafeAreaView, Image, View } from 'react-native';
import { Modal, Toast } from 'antd-mobile-rn';
import { commonStyles } from '../../tools/layout';
import Touch from 'react-native-touch-once';
import { putUpdateUserInfo, putUpdateUserHeaderImg } from '../../network_request/fetch_api';
import ModalInput from '../common/ModalInput';
import ImagePicker from 'react-native-image-crop-picker';
import ModalDialog from '../common/ModalDialog';

export default class EditAccount extends Component {
  constructor(props) {
    super(props);
    this.isShowUri= false;
    this.writeNickName = this.props.container.navigation.state.params.data.name == '' ? "Click here to set the nickname" : this.props.container.navigation.state.params.data.name,
    this.state = {
        imgSource: this.props.container.userInfoData.localHeaderImg == '' ? require('../../img/pic_mrtx.png') : { uri: this.props.container.userInfoData.localHeaderImg},
        isShowSetUpNickNamePop: false,
        isShowMsg: false
    }
  }

  componentDidMount() {
    this.props.container.navigation.setParams({ updateImg: this.updateImg });    
  }

  componentWillUnmount() {}



  updateImg= () => {
      if(this.isShowUri){
            putUpdateUserHeaderImg(
                {
                    avatar: this.state.imgSource,
                },
                this.props.container.navigation.state.params.userinfoData.token,
            );
            console.log(this.state.imgSource)
            this.props.container.localStoreHeaderImgData(this.state.imgSource);
            this.props.container.navigation.pop();
      } else {
        this.props.container.navigation.pop();
      }
  }

choosePic = () => {
    ImagePicker.openPicker({
        width: 300, 
        height: 400, 
        cropping: true,
        compressImageQuality: 0.3
     }).then(image => { 
        this.isShowUri = true;
        console.log(image);
        this.setState({
            imgSource: image.path
        })
     }).catch(e => {
         console.log(e);
         Toast.info(e.toString().split(":")[1],  2, undefined, false);
        });
}



//   _setUpNickName = () => {
//     Modal.prompt(
//       '请输入昵称',
//       null,
//       (nickName) => {
//         if(nickName == null ){
//             Toast.info("昵称名字不能为空",  1, undefined, false);
//         } else {
//             this.setState({
//                 writeNickName: nickName
//             });
//             putUpdateUserInfo(
//                 {
//                     name: nickName,
//                 },
//                 this.props.container.navigation.state.params.userinfoData.token,
//                 this.props.container.navigation.state.params.userinfoData.phone_number,
//             );
//         }
//       },
//       'default',
//       null,
//       [this.state.writeNickName],
//     );
//   }

  render() {
    return (
      <SafeAreaView style={commonStyles.containGrayWrap}>
        <ScrollView>
            <View style={[commonStyles.setionListBox, {paddingHorizontal:0, marginTop:0}]}>
                <Touch style={[commonStyles.setionItems, commonStyles.flexBox, commonStyles.lineSty,{ paddingHorizontal:20}]}
                    onPress={() => this.choosePic()}
                >
                    <Text style={commonStyles.setionItemText}>Profile photo</Text>
                    <Image style={{ width:40, height:40, borderRadius:20}} 
                        defaultSource ={require('../../img/pic_mrtx.png')}
                        source={this.isShowUri ? {uri: this.state.imgSource} : this.state.imgSource}
                    />
                    
                    <Image style={commonStyles.moreIconSty} source={require('../../img/icon_gd.png')} />
                </Touch>
                <Touch style={[commonStyles.setionItems, commonStyles.flexBox, commonStyles.lineSty,{ paddingHorizontal:20}]}
                    onPress={() => this.setState({isShowSetUpNickNamePop: true})}
                >
                    <Text style={[commonStyles.setionItemText, {flex: 0}]}>Name</Text>
                    <Text style={commonStyles.familyName} numberOfLines={1}>{this.writeNickName}</Text>
                    <Image style={commonStyles.moreIconSty} source={require('../../img/icon_gd.png')} />
                </Touch>
                <View style={[commonStyles.setionItems, commonStyles.flexBox,{ paddingHorizontal:20}]}>
                    <Text style={commonStyles.setionItemText}>Account ID</Text>
                    <Text style={[commonStyles.familyName, {flex:1}]}>{this.props.container.navigation.state.params.data.phone_number}</Text>
                </View>
            </View>
            <View style={[commonStyles.setionListBox, {paddingHorizontal:0}]}>
                <View style={[commonStyles.setionItems, commonStyles.flexBox, commonStyles.lineSty,{ paddingHorizontal:20}]}>
                    <Text style={commonStyles.setionItemText}>Phone number</Text>
                    <Text style={[commonStyles.familyName, {flex:1}]}>{this.props.container.navigation.state.params.data.phone_number}</Text>
                </View>
                <Touch style={[commonStyles.setionItems, commonStyles.flexBox, { paddingHorizontal:20}]}
                    onPress={() => this.props.container.navigation.navigate('MySetUp')}
                >
                    <Text style={commonStyles.setionItemText}>Reset password</Text>
                    <Image style={commonStyles.moreIconSty} source={require('../../img/icon_gd.png')} />
                </Touch>
            </View>
            <Touch style={[commonStyles.addItemsBox, commonStyles.flexBox]}  
                activeOpacity={1}  
                onPress={() => this.setState({isShowMsg: true})}
            >
                <Text style={[commonStyles.addItemsText, { color:'#9B9B9B', textAlign:'center', fontWeight: 'normal'}]}>Sign out</Text>
            </Touch>
        </ScrollView>
        <ModalInput
              ref='setUpNickNameNode'
              _popupInputBoxVisible={this.state.isShowSetUpNickNamePop}
              _popupInputBoxTitle = {"Please enter a nickname"}
              _popupInputBoxDefaultText = {this.writeNickName}
              _popupInputBoxLeftBtnAction ={() => {this.setState({isShowSetUpNickNamePop: false})}}
              _popupInputBoxRightBtnAction ={() => {
                this.refs.setUpNickNameNode.state.value = this.refs.setUpNickNameNode.state.value.replace(/\s+/g,"");
                if(this.refs.setUpNickNameNode.state.value != this.writeNickName && this.refs.setUpNickNameNode.state.value != '' && 
                    this.refs.setUpNickNameNode.state.value.length < 32){
                        this.writeNickName = this.refs.setUpNickNameNode.state.value;
                        putUpdateUserInfo(
                                {
                                    name: this.writeNickName,
                                },
                                this.props.container.navigation.state.params.userinfoData.token,
                                this.props.container.navigation.state.params.userinfoData.phone_number,
                            );
                } else {
                    Toast.info("Length cannot be greater than 32",  2, undefined, false);
                }
                this.setState({isShowSetUpNickNamePop: false})
              }}
          />

        <ModalDialog
          _dialogVisible={this.state.isShowMsg}
          _dialogTitle={"Sign out"}
          _dialogContent={"After logging out, your data will not be deleted. You can log in directly with this account next time."}
          _dialogLeftBtnAction={() => {
            this.setState({isShowMsg: false})
          }}
          _dialogRightBtnAction={() => {
            this.setState({isShowMsg: false})
            this.props.container.postLogOut();
            // this.props.container.navigation.navigate('LoginAgain');
            this.props.container.navigation.navigate('Auth');
          }}
        />
       </SafeAreaView>
    );
  }
}
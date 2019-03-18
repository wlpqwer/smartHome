import React, { Component } from 'react';
import { Text, SafeAreaView, Image, StyleSheet, View, FlatList, Dimensions } from 'react-native';
import { commonStyles } from '../../tools/layout';
import { Header } from 'react-navigation';
import { Toast } from 'antd-mobile-rn';
import Touch from 'react-native-touch-once';
import getObjValue from '../../tools/getObjValue';
import { iconCollect } from '../../tools/mockData';
import Loading from '../common/Loading';
import { EventRegister } from 'react-native-event-listeners';
import { editorAutoMationActionUpdate } from '../../network_request/fetch_api';  

export default class ChooseScene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: this.props.container.navigation.state.params.actionType == 'editorActionUpdate' ? true : false,
      openStatus: false
    };
    this.selectIndexs = [];
    this.selectIndex = this.props.container.navigation.state.params.actionType == 'editorActionUpdate' ? this.checkBeforePageData() : null;    //修改自动化动作，默认选中的场景下标
    this.sceneCollect = [];
    this.sendSceneId =  null;   //修改自动化动作时，需要传递的场景id
    this.sceneObj = {};
    this.updateData = {};
    console.log(this.props.container.navigation.state.params)
  }

  componentDidMount() {
    this.props.container.navigation.setParams({ chooseSceneArr: this.chooseSceneArr });
    this.listener = EventRegister.addEventListener('serverBackAutoMationScene', (status) => {
      if(status == '200000'){
        Toast.hide();
        EventRegister.emit('editorActionUpdateScene', this.updateData);
        this.props.container.navigation.pop();
      } else {
        Toast.info("There are already selected scenes under this automation, and cannot be added repeatedly.",  2, undefined, false);
      }
    })
  }

  componentWillUnmount() {
    EventRegister.removeEventListener(this.listener);
}

  // 多选比较选中相同的场景
  checkBeforePageData = () => {
    let currentIdData = [];
    for(let index in this.props.container.data){
      currentIdData.push(this.props.container.data[index].id);
    }
    return currentIdData.indexOf(this.props.container.navigation.state.params.sceneId);
  }

  _click = (item, index) => {
    this.setState({
      checked: true
    })
    if(this.selectIndexs.indexOf(index) == -1){
      this.selectIndexs.push(index);
      this.sceneCollect.push(item);
    } else {     
      let resultIndex = this.selectIndexs.indexOf(index);
      this.selectIndexs.splice(resultIndex, 1);
      this.sceneCollect.splice(resultIndex, 1);
    }
    // console.log(this.selectIndexs)
    // console.log(this.sceneCollect)
  };

  onlyOneClick = (index) => {
    this.setState({ checked: true });
    this.selectIndex = index;
  }


  chooseSceneArr = () => {
    if(this.props.container.navigation.state.params.actionType == 'editorActionUpdate'){
      this.updateData['sceneId'] = this.props.container.data[this.selectIndex].id;
      this.updateData['contentid'] = this.props.container.navigation.state.params.contentId;
      this.updateData['action_type'] = "Scene";
      this.updateData['item'] = this.props.container.data[this.selectIndex];
      console.log(this.updateData);
      if(this.updateData['sceneId'] == this.props.container.navigation.state.params.sceneId){
        console.log("相同了");
        this.props.container.navigation.pop();
      } else{
        editorAutoMationActionUpdate(
            {
                content_type: 'Scene',
                content_id: this.props.container.navigation.state.params.contentId,
                new_scene_id: this.props.container.data[this.selectIndex].id
            },
            this.props.container.userInfoData.token,
            this.props.container.navigation.state.params.autoMationId
        );
        Toast.loading('Loading', 0);
      }
    } else {
      if(this.sceneCollect.length == 0){
          this.props.container.navigation.pop();
      } else {
        this.sceneObj['content'] = this.sceneCollect;
        this.sceneObj['action_type'] = 'Scene';
        console.log(this.sceneCollect)
        console.log(this.sceneObj)
        if(this.props.container.navigation.state.params.actionType == 'editorActionAdd'){
          EventRegister.emit('editorActionAddScene', this.sceneObj);
          this.props.container.navigation.pop(2);
        } else {
          EventRegister.emit('chooseSceneEvent', this.sceneObj);
          this.props.container.navigation.pop(2);
        }
      }
    }
  }


  _renderItem = ({ item, index }) => {
    return (
        <View style={[commonStyles.flexBox, commonStyles.padLR20, { marginTop: 20}]} 
                key={index}
              >
                <Touch 
                    activeOpacity={1}
                    onPress={() => this.props.container.navigation.state.params.actionType == 'editorActionUpdate' ? this.onlyOneClick(index) : this._click(item,index)}
                >
                  {this.props.container.navigation.state.params.actionType == 'editorActionUpdate' ? (
                    <Image style={styles.checkImg} 
                      source={
                        this.state.checked 
                        ? this.selectIndex == index 
                        ? require('../../img/icon_xz.png') 
                        : require('../../img/icon_wxz.png') 
                        : require('../../img/icon_wxz.png')
                      } 
                    />
                  ) : (
                    <Image style={styles.checkImg} 
                      source={
                        this.state.checked 
                        ? this.selectIndexs.indexOf(index) != -1 
                        ? require('../../img/icon_xz.png') 
                        : require('../../img/icon_wxz.png') 
                        : require('../../img/icon_wxz.png')
                      } 
                    />
                  )}
                </Touch>
                <View style={[commonStyles.flexBox, commonStyles.sceneModule, {flex: 1, marginTop: 0}]}>
                  <Image
                    style={styles.equipmentImg}
                    source={{uri: getObjValue(iconCollect, item.icon)}}
                  />
                  <View style={[commonStyles.flexBoxColumn, {flex:1, alignItems:'flex-start'}]}
                  >
                    <Text style={commonStyles.sceneName}>{item.name}</Text>
                  </View>
                </View>
              </View>
    );
  };

  _createSceneEmptyView() {
    return (
      <SafeAreaView style={[commonStyles.flexBoxColumn, {height: Dimensions.get('window').height - Header.HEIGHT}]}>
        <Image
          style={{ width: '67%', marginBottom: 20 }}
          resizeMode = "contain"
          source={require('../../img/pic_kzt1.png')}
        />
        <Text style={{ marginTop: 20, fontSize: 15, color:'#8E8D94'}}>还没有场景哦～</Text>
      </SafeAreaView>
    );
  }


  render() {
    if(this.props.container.isLoadingData){
      return <Loading />
    } else {
      return (
        <SafeAreaView style={commonStyles.containGrayWrap}>
          <FlatList
              data={this.props.container.data}
              renderItem={this._renderItem}
              ListEmptyComponent={this._createSceneEmptyView()}
              keyExtractor={item => item.id.toString()}
          />
         </SafeAreaView>
      );
    }
  }
}

const styles = StyleSheet.create({
  checkImg:{
    width:24,
    height: 24,
    marginRight: 16
  },
  equipmentImg: {
    width:60, 
    height:60,
    marginHorizontal:12
  },
});
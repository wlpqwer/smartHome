import React, { Component } from 'react';
import { Text, SafeAreaView, Image, View, FlatList, Dimensions } from 'react-native';
import { commonStyles } from '../../tools/layout';
import { Header } from 'react-navigation';
import Touch from 'react-native-touch-once';
import Loading from '../common/Loading';

export default class ChooseEquipment extends Component {
  constructor(props) {
    super(props);
    this.state = {}
    console.log(this.props.container.navigation.state.params);
  }

  _renderItem = ({ item, index }) => {
      if(this.props.container.navigation.state.params.where == 'creatNewScene'){
          return (
              <Touch style={[commonStyles.flexBox, commonStyles.lineSty, {height: 78, marginHorizontal: 20}]}
                  onPress={() => this.props.container.navigation.navigate('FengInfo', {item: item, page: this.props.container.navigation.state.params.page == 'editScene' ? 'editScene' : 'chooseEquipment'})}
              >
                  <Image style={commonStyles.deviceImg} source={require('../../img/pic_fs.png')} />
                  <View style={commonStyles.currentRoomDevTextBox}>
                      <Text style={commonStyles.deviceText}>{item.name}</Text>
                      <Text style={[commonStyles.deviceTextStatus, {color:'#8E8E93', fontSize: 16}]}>{item.room_name}</Text>
                  </View>
                  <Image style={commonStyles.moreIconSty} source={require('../../img/icon_gd.png')} />
              </Touch>
          );
      } else {
          return (
              <Touch style={[commonStyles.flexBox, commonStyles.lineSty, {height: 78, marginHorizontal: 20}]}
                  onPress={() => this.props.container.navigation.navigate('FengInfoAtuoMation', {item: item, actionType: this.props.container.navigation.state.params.actionType, info: 'none'})}
              >
                  <Image style={commonStyles.deviceImg} source={require('../../img/pic_fs.png')} />
                  <View style={commonStyles.currentRoomDevTextBox}>
                      <Text style={commonStyles.deviceText}>{item.name}</Text>
                      <Text style={[commonStyles.deviceTextStatus, {color:'#8E8E93', fontSize: 16}]}>{item.room_name}</Text>
                  </View>
                  <Image style={commonStyles.moreIconSty} source={require('../../img/icon_gd.png')} />
              </Touch>
          );
    }
  };

  _createEquipmentEmptyView() {
    return (
      <SafeAreaView style={[commonStyles.flexBoxColumn, {height: Dimensions.get('window').height - Header.HEIGHT}]}>
        <Image
          style={{ width: '67%', marginBottom: 20 }}
          resizeMode = "contain"
          source={require('../../img/pic_kzt1.png')}
        />
        <Text style={{ marginTop: 20, fontSize: 15, color:'#8E8D94'}}>还没有设备哦，快去添加设备，开启智能生活吧</Text>
      </SafeAreaView>
    );
  }

  render() {
    if(this.props.container.isLoading){
        return <Loading />
      } else {
          return (
            <SafeAreaView style={commonStyles.containWrap}>
              <FlatList
                  windowSize={50}
                  initialNumToRender={50}
                  maxToRenderPerBatch={50}
                  data={this.props.container.data}
                  renderItem={this._renderItem}
                  ListEmptyComponent={this._createEquipmentEmptyView()}
                  // onEndReached={this.onEndReached.bind(this)}
                  // onEndReachedThreshold={0}
                  // onMomentumScrollBegin={() => {
                  //   this.onEndReachedCalledDuringMomentum = false;
                  // }}
                  // ListFooterComponent={() => {
                  //   return (
                  //     this.props.container.isLoadingMore && (
                  //       <View style={{ flex: 1, padding: 10 }}>
                  //         <ActivityIndicator size="small" />
                  //       </View>
                  //     )
                  //   );
                  // }}
                  keyExtractor={item => item.id.toString()}
              />
             </SafeAreaView>
          );
      }
  }
}
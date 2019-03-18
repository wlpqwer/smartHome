import React, { Component } from 'react';
import { Text, SafeAreaView, Image, View, FlatList, Dimensions } from 'react-native';
import { commonStyles } from '../../tools/layout';
import Touch from 'react-native-touch-once';
import { Header } from 'react-navigation';
import Loading from '../common/Loading';
import SmartTabs from '../smart/SmartTabs';
import ScrollableTabView, {
    DefaultTabBar,
  } from 'react-native-scrollable-tab-view';

export default class DeviceShare extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectIndex: 0,
    }
  }


  _createEmptyView() {
    return (
      <SafeAreaView style={[commonStyles.flexBoxColumn, {height: Dimensions.get('window').height - Header.HEIGHT -50}]}>
        <Image
          style={{ width: '67%', marginBottom: 20 }}
          resizeMode = "contain"
          source={require('../../img/pic_kzt1.png')}
        />
        <Text style={{ marginTop: 20, fontSize: 15, color:'#8E8D94'}}>No equipment yet～</Text>
      </SafeAreaView>
    );
  }

  _renderItem = ({ item, index }) => {
    return (
        <Touch style={[commonStyles.flexBox, commonStyles.padLR20, commonStyles.lineSty, commonStyles.addDevicesBox, {height: 74}]}
            onPress={() => this.props.container.navigation.navigate('DeviceShareManage', {deviceName: item.equipment__name, deviceId: item.equipment_id})}
        >
            <Image style={commonStyles.deviceImg} source={require('../../img/pic_fs.png')} />
            <View style={commonStyles.currentRoomDevTextBox}>
                <Text style={commonStyles.deviceText}>{item.equipment__name}</Text>
                <Text style={[commonStyles.deviceTextStatus, {color:'#8E8E93', fontSize: 12}]}>{`Share to ${item.shared_count} people`}</Text>
            </View>
            <Image style={commonStyles.moreIconSty} source={require('../../img/icon_gd.png')} />
        </Touch>
    );
  };

  _renderAcceptItem = ({ item, index }) => {
    return (
        <Touch style={[commonStyles.flexBox, commonStyles.padLR20, commonStyles.lineSty, commonStyles.addDevicesBox, {height: 74}]}
            // onPress={() => this.props.container.navigation.navigate('DeviceShareManage', {deviceName: item.equipment__name, deviceId: item.equipment_id})}
        >
            <Image style={commonStyles.deviceImg} source={require('../../img/pic_fs.png')} />
            <View style={commonStyles.currentRoomDevTextBox}>
                <Text style={commonStyles.deviceText}>{item.equipment__name}</Text>
                <Text style={[commonStyles.deviceTextStatus, {color:'#8E8E93', fontSize: 12}]}>{`From ${item.equipment__shareequipmentmodel__owner}`}</Text>
            </View>
            {/* <Image style={commonStyles.moreIconSty} source={require('../../img/icon_gd.png')} /> */}
        </Touch>
    );
  };

  render() {
    //   console.log(this.props.container.data)
    if(this.props.container.isShareDataLoading && this.props.container.isAcceptDataLoading){
      return <Loading />
    } else {
      return (
        <SafeAreaView style={commonStyles.containGrayWrap}>
          <ScrollableTabView
              style={{ flex: 1, position:'relative', zIndex:9 }}
              initialPage={0}
              onChangeTab={
                (obj) => {
                  this.setState({selectIndex: obj.i});
                  }
              }
              renderTabBar={() => (
                <SmartTabs
                  backgroundColor={'#fff'}
                  tabUnderlineDefaultWidth={36} 
                  tabUnderlineScaleX={3}
                  activeColor={'#2C2D30'}
                  inactiveColor={'#9B9B9B'}
                  textStyle={{ fontSize: 16 }}
                />
              )}
            >
              <View
                tabLabel="My device"
                style={ { flex: 1, marginTop: 16}}
              >
              
                <FlatList
                  data={this.props.container.shareData}
                  renderItem={this._renderItem}
                  keyExtractor={item => item.equipment_id.toString()}
                  ListEmptyComponent={this._createEmptyView()}
                />
              </View>
              <View tabLabel="Shared with me" style={ { flex: 1, marginTop: 16  }}>
                <FlatList
                  data={this.props.container.acceptData}
                  renderItem={this._renderAcceptItem}
                  keyExtractor={item => item.equipment.toString()}
                  ListEmptyComponent={this._createEmptyView()}
                />
              </View>
            </ScrollableTabView> 
         </SafeAreaView>
      );
    }
  }
}
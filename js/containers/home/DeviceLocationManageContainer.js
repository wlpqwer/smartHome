import React, { Component } from 'react';
import {commonStyles } from '../../tools/layout';
import { connect } from 'react-redux';
import * as Actions from '../../actions/action'
import * as Selectors from '../../selectors/selector';
import DeviceLocationManageView from '../../components/home/DeviceLocationManage';
import { View, Text } from 'react-native';
import Touch from 'react-native-touch-once';
import { EventRegister } from 'react-native-event-listeners';


class DeviceLocationManageContainer extends Component {
  componentDidMount() {
    // console.log(this.props.navigation.state.params.id)
    this.props.fetchData(this.props.userInfoData.globalHomeId, this.props.navigation.state.params.id);
  }



  static navigationOptions = ({ navigation }) => {
    console.log(navigation.state)
    const { params = {} } = navigation.state;
    return {
      headerTitle: '位置管理',
      headerLeft: (
        <View style={[commonStyles.flexBox, { height: '100%', width: 88 }]}>
          <Touch
            style={[commonStyles.flexBox, { flex: 1, height: '100%' }]}
            activeOpacity={0.5}
            onPress={() => {navigation.goBack()}}
          >
           <Text style={{fontSize:17, color:'#2C2D30'}}>取消</Text>
          </Touch>
        </View>
      ),
      headerRight: (
        <View style={[commonStyles.flexBox, { height: '100%', width: 88 }]}>
          <Touch
            style={[commonStyles.flexBox, { flex: 1, height: '100%' }]}
            activeOpacity={0.5}
            onPress={() => { params.deviceChange()}}
          >
           <Text style={{fontSize:17, color:'#FCBF00'}}>完成</Text>
          </Touch>
        </View>
      ),
    };
  };

  render() {
    return <DeviceLocationManageView style={{ flex: 1 }} container={this.props} />;
  }
}

const mapStateToProps = state => {
  return {
    netInfoStatus: Selectors.getNetInfo(state),
    userInfoData: Selectors.getUserInfo(state),
    data: Selectors.getRoomsManageData(state),
    // isLoading:
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData: (homeId = 1, equipment_id) => dispatch(Actions.roomsManageListFetchData(homeId, equipment_id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  DeviceLocationManageContainer,
);

import React, { Component } from 'react';
import {commonStyles } from '../../tools/layout';
import { connect } from 'react-redux';
import { Toast } from 'antd-mobile-rn';
import * as Actions from '../../actions/action'
import * as Selectors from '../../selectors/selector';
import RoomManageView from '../../components/home/RoomManage';
import { View, Text } from 'react-native';
import Touch from 'react-native-touch-once';
import { EventRegister } from 'react-native-event-listeners';
import { postDeleteRoom } from '../../network_request/fetch_api';

class RoomManageContainer extends Component {
  componentDidMount() {
    this.props.navigation.setParams({ token: this.props.userInfoData.token});
    this.props.fetchData(this.props.navigation.state.params.homeId);
  }

  static navigationOptions = ({ navigation }) => {
console.log(navigation.state)
    const { params = {} } = navigation.state;
    return {
      headerTitle: 'Manage rooms',
      headerRight: (
        <View style={[commonStyles.flexBox, { height: '100%', width: 88 }]}>
          <Touch
            style={[commonStyles.flexBox, { flex: 1, height: '100%' }]}
            activeOpacity={0.5}
            onPress={() => { 
              if(!params.isEditorStatus){
                EventRegister.emit('showEditorItems');
                console.log("点击了编辑");
              } else {
                console.log(params.postDelRoom + "点击了保存");
                if(params.postDelRoom == undefined){
                  navigation.pop();
                } else {
                  postDeleteRoom(
                    {
                      room_id: params.postDelRoom,
                    },
                    params.token,
                    params.homeId
                  );
                  Toast.loading('Loading', 0);
                }
              }
            }}
          >
           <Text style={{fontSize:17, color:'#2C2D30'}}>{params.isEditorStatus ? 'SAVE' : 'EDIT' }</Text>
          </Touch>
        </View>
      ),
    };
  };

  render() {
    console.log()
    return <RoomManageView style={{ flex: 1 }} container={this.props} />;
  }
}

const mapStateToProps = state => {
  return {
    netInfoStatus: Selectors.getNetInfo(state),
    userInfoData: Selectors.getUserInfo(state),
    data: Selectors.getRoomsManageData(state),
    isLoading: Selectors.getRoomsManageIsLoading(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData: (homeId = 1) => dispatch(Actions.roomsManageListFetchData(homeId)),
    fetchHomeRoomAndDevData: (currentHomeId = 1) => dispatch(Actions.itemsFetchData(currentHomeId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  RoomManageContainer,
);

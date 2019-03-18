import React, { Component } from 'react';
import {commonStyles } from '../../tools/layout';
import { connect } from 'react-redux';
import * as Actions from '../../actions/action'
import * as Selectors from '../../selectors/selector';
import RoomSetUpView from '../../components/home/RoomSetUp';
import { View, Image, Text, StyleSheet, Platform, Modal, Dimensions  } from 'react-native';
import Touch from 'react-native-touch-once';
import { EventRegister } from 'react-native-event-listeners';

class RoomSetUpContainer extends Component {
  componentDidMount() {
    this.props.fetchData(this.props.navigation.state.params.id);
  }
  componentWillUnmount() {
    this.props.roomSetUpResetToInitial()
  }
  static navigationOptions = ({ navigation }) => {
    console.log(navigation.state)
    const { params = {} } = navigation.state;
    return {
      headerTitle: 'Edit room',
      headerRight: (
        <View style={[commonStyles.flexBox, { height: '100%', width: 88 }]}>
          <Touch
            style={[commonStyles.flexBox, { flex: 1, height: '100%' }]}
            activeOpacity={0.5}
            onPress={() => {params._changeRoomDev() }}
          >
           <Text style={{fontSize:17, color:'#2C2D30'}}>SAVE</Text>
          </Touch>
        </View>
      ),
    };
  };
  render() {
    return <RoomSetUpView style={{ flex: 1 }} container={this.props} />;
  }
}

const mapStateToProps = state => {
  return {
    netInfoStatus: Selectors.getNetInfo(state),
    userInfoData: Selectors.getUserInfo(state),
    data: Selectors.getRoomSetUpData(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData: (roomId = 1) => dispatch(Actions.roomSetUpFetchData(roomId)),
    roomSetUpResetToInitial: () => dispatch(Actions.roomSetUpResetToInitial())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  RoomSetUpContainer,
);

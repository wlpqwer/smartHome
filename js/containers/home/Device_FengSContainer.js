import React, { Component } from 'react';
import {commonStyles } from '../../tools/layout';
import { connect } from 'react-redux';
import * as Actions from '../../actions/action'
import * as Selectors from '../../selectors/selector';
import Device_FengSView from '../../components/home/Device_FengS';
import { View, Image, Text, StyleSheet, Platform, Modal, Dimensions  } from 'react-native';
import Touch from 'react-native-touch-once';
import { EventRegister } from 'react-native-event-listeners';

class Device_FengSContainer extends Component {
  componentDidMount() {
    this.props.fetchData(this.props.navigation.state.params.id);
  }
  // componentWillUnmount() {
  //   this.props.roomSetUpResetToInitial()
  // }



  render() {
    return <Device_FengSView style={{ flex: 1 }} container={this.props} />;
  }
}

const mapStateToProps = state => {
  return {
    netInfoStatus: Selectors.getNetInfo(state),
    userInfoData: Selectors.getUserInfo(state),
    data: Selectors.getDeviceStatusData(state),
    isLoading: Selectors.getDeviceStatusDataIsLoading(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData: (devicesId) => dispatch(Actions.devicesFetchData(devicesId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  Device_FengSContainer,
);

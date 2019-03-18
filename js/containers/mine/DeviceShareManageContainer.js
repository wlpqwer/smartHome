import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import * as Actions from '../../actions/action';
import * as Selectors from '../../selectors/selector';
import DeviceShareManageView from '../../components/mine/DeviceShareManage';

class DeviceShareManageContainer extends Component {

  static navigationOptions = ({ navigation }) => {
    console.log(navigation.state)
    const { params = {} } = navigation.state;
    return {
      headerTitle: `Manage ${params.deviceName}`,
      headerRight: <View /> 
    };
  };

  componentWillMount() {
    this.props.FetchData(this.props.navigation.state.params.deviceId);
  }

  render() {
    return <DeviceShareManageView style={{ flex: 1 }} container={this.props} />;
  }
}

const mapStateToProps = state => {
  return {
    netInfoStatus: Selectors.getNetInfo(state),
    userInfoData: Selectors.getUserInfo(state),
    data: Selectors.getDeviceShareManageData(state),
    isLoading: Selectors.getDeviceShareManageIsLoading(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    FetchData: (equipmentId) => dispatch(Actions.deviceShareUserFetchData(equipmentId)),
    FetchShareData: () => dispatch(Actions.deviceShareListFetchData()),
    // FetchShareMoreData: () => dispatch(Actions.deviceShareListFetchMoreData()),
    // ResetShareData: () => dispatch(Actions.deviceShareListResetToInitial()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeviceShareManageContainer);

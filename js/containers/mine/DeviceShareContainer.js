import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../../actions/action';
import * as Selectors from '../../selectors/selector';
import DeviceShareView from '../../components/mine/DeviceShare';

class DeviceShareContainer extends Component {
  componentWillMount() {
    this.props.FetchShareData();
    this.props.FetchAcceptData();
  }

  render() {
    return <DeviceShareView style={{ flex: 1 }} container={this.props} />;
  }
}

const mapStateToProps = state => {
  return {
    netInfoStatus: Selectors.getNetInfo(state),
    userInfoData: Selectors.getUserInfo(state),
    shareData: Selectors.getDeviceShareListData(state),
    isShareDataLoading: Selectors.getDeviceShareListIsLoading(state),
    isShareDataLoadingMore: Selectors.getDeviceShareListIsLoadingMore(state),
    acceptData: Selectors.getDeviceAcceptListData(state),
    isAcceptDataLoading: Selectors.getDeviceAcceptListIsLoading(state),
    isAcceptDataLoadingMore: Selectors.getDeviceAcceptListIsLoadingMore(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    FetchShareData: () => dispatch(Actions.deviceShareListFetchData()),
    FetchShareMoreData: () => dispatch(Actions.deviceShareListFetchMoreData()),
    ResetShareData: () => dispatch(Actions.deviceShareListResetToInitial()),
    FetchAcceptData: () => dispatch(Actions.deviceAcceptListFetchData()),
    FetchAcceptMoreData: () => dispatch(Actions.deviceAcceptListFetchMoreData()),
    ResetAcceptData: () => dispatch(Actions.deviceAcceptListResetToInitial()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeviceShareContainer);

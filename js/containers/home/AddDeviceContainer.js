import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import * as Actions from '../../actions/action'
import * as Selectors from '../../selectors/selector';
import AddDeviceView from '../../components/home/AddDevice';

class AddDeviceContainer extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Add device',
      headerRight: <View />
    };
  };
  render() {
    return <AddDeviceView style={{ flex: 1 }} container={this.props} />;
  }
}

const mapStateToProps = state => {
  return {
    netInfoStatus: Selectors.getNetInfo(state),
    userInfoData: Selectors.getUserInfo(state),
  };
};


export default connect(mapStateToProps, null)(
    AddDeviceContainer,
);

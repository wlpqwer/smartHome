import React, { Component } from 'react';
import {commonStyles } from '../../tools/layout';
import { connect } from 'react-redux';
import * as Actions from '../../actions/action'
import * as Selectors from '../../selectors/selector';
import FamilyManageView from '../../components/home/FamilyManage';
import { View, Image, Text, StyleSheet, Platform, Modal, Dimensions  } from 'react-native';
import Touch from 'react-native-touch-once';
import { EventRegister } from 'react-native-event-listeners';

class FamilyManageContainer extends Component {
  componentDidMount() {
    this.props.fetchData();
  }

  render() {
    return <FamilyManageView style={{ flex: 1 }} container={this.props} />;
  }
}

const mapStateToProps = state => {
  return {
    netInfoStatus: Selectors.getNetInfo(state),
    userInfoData: Selectors.getUserInfo(state),
    data: Selectors.getFamilyListData(state),
    isLoading: Selectors.getFamilyListIsLoading(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData: () => dispatch(Actions.familyListFetchData()), 
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  FamilyManageContainer,
);

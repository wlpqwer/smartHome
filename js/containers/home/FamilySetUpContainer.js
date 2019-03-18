import React, { Component } from 'react';
import {commonStyles } from '../../tools/layout';
import { connect } from 'react-redux';
import * as Actions from '../../actions/action'
import * as Selectors from '../../selectors/selector';
import FamilySetUpView from '../../components/home/FamilySetUp';
import { View, Image, Text, StyleSheet, Platform, Modal, Dimensions  } from 'react-native';
import Touch from 'react-native-touch-once';
import { EventRegister } from 'react-native-event-listeners';

class FamilySetUpContainer extends Component {
  componentDidMount() {
    this.props.fetchData(this.props.navigation.state.params.id);
  }

  render() {
    return <FamilySetUpView style={{ flex: 1 }} container={this.props} />;
  }
}

const mapStateToProps = state => {
  return {
    // netInfoStatus: Selectors.getNetInfo(state),
    userInfoData: Selectors.getUserInfo(state),
    data: Selectors.getFamilySetUpData(state),
    isLoading: Selectors.getFamilySetUpIsLoading(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData: (familyId = 1) => dispatch(Actions.familySetUpFetchData(familyId)), 
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  FamilySetUpContainer,
);

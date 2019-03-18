import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, Platform, Modal, Dimensions  } from 'react-native';
import {commonStyles } from '../../tools/layout';
import { connect } from 'react-redux';
import * as Actions from '../../actions/action'
import * as Selectors from '../../selectors/selector';
import Touch from 'react-native-touch-once';
import ChangeFamily from '../../components/home/ChangeFamily';
import { EventRegister } from 'react-native-event-listeners';


class ChangeFamilyContainer extends Component {
  componentWillMount() {
    // this.props.familyListFetchData();
  }

  render() {
    return <ChangeFamily  container={this.props} />;
  }
}


const mapStateToProps = state => {
  return {
    familyListData: Selectors.getFamilyListData(state),
    userInfoData: Selectors.getUserInfo(state),
  };
};


const mapDispatchToProps = dispatch => {
  return {
    familyListFetchData: () => dispatch(Actions.familyListFetchData()), 
    fetchData: (currentHomeId = 0) => dispatch(Actions.itemsFetchData(currentHomeId)),
    switchHomeIdData: (string) => dispatch(Actions.switchLocalHomeIdSuccess(string)),   //当前切换的家庭ID
    switchLocalHomeAdminData: (string) => dispatch(Actions.switchLocalHomeAdminSuccess(string)),   //当前切换的家庭的创建者
    fetchSmartSceneListData: (currentHomeId) => dispatch(Actions.smartSceneFetchData(currentHomeId)),
    fetchSmartAutomationListData: (currentHomeId) => dispatch(Actions.automationListFetchData(currentHomeId)),  
    itemsResetToInitial: () => dispatch(Actions.itemsResetToInitial())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangeFamilyContainer);

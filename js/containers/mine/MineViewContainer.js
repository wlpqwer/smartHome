import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../../actions/action'
import * as Selectors from '../../selectors/selector';
import { MineView } from '../../components/mine/MineView';

class MineViewContainer extends Component {
  componentWillMount() {
    this.props.myBaseInfoFetchData(this.props.userInfoData.phone_number)
  }

  render() {
    return <MineView style={{ flex: 1 }} container={this.props} />;
  }
}

const mapStateToProps = state => {
  return {
    netInfoStatus: Selectors.getNetInfo(state),
    userInfoData: Selectors.getUserInfo(state),
    languageType: Selectors.getLanguageType(state),
    data: Selectors.getMyBaseInfoItem(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    myBaseInfoFetchData: (userPhoneNum) => dispatch(Actions.myBaseInfoFetchData(userPhoneNum)),
    getLanguageType: string => dispatch(Actions.languageType(string)),
    localStoreHeaderImgData: (string) => dispatch(Actions.localStoreHeaderImg(string)), 
    familyListFetchData: () => dispatch(Actions.familyListFetchData()),     //header 中的家庭列表
    // authHasErrored: error => dispatch(Actions.authHasErrored(error)),
    
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MineViewContainer);

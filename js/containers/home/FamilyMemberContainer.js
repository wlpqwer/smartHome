import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../../actions/action'
import * as Selectors from '../../selectors/selector';
import FamilyMemberView from '../../components/home/FamilyMember';

class FamilyMemberContainer extends Component {
  componentDidMount() {
    this.props.fetchData(this.props.navigation.state.params.id);
  }

  render() {
    return <FamilyMemberView style={{ flex: 1 }} container={this.props} />;
  }
}

const mapStateToProps = state => {
  return {
    // netInfoStatus: Selectors.getNetInfo(state),
    userInfoData: Selectors.getUserInfo(state),
    data: Selectors.getFamilyMemberData(state),
    isLoading: Selectors.getFamilyMemberIsLoading(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData: ( familyID = 1) => dispatch(Actions.familyMemberFetchData(familyID)), 
    fetchFamilyInfoData: (familyId = 1) => dispatch(Actions.familySetUpFetchData(familyId)), 
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  FamilyMemberContainer,
);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../../actions/action'
import * as Selectors from '../../selectors/selector';
import ChooseEquipmentView from '../../components/smart/ChooseEquipment';

class ChooseEquipmentContainer extends Component {
  componentDidMount() {
    // this.props.navigation.state.params.sceneId
    this.props.fetchData();
  }

  render() {
    return <ChooseEquipmentView style={{ flex: 1 }} container={this.props} />;
  }
}

const mapStateToProps = state => {
  return {
    netInfoStatus: Selectors.getNetInfo(state),
    data: Selectors.getSceneChooseDevData(state),
    isLoading: Selectors.getSceneChooseDevIsLoading(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData: () => dispatch(Actions.sceneDeviceFetchData()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  ChooseEquipmentContainer,
);

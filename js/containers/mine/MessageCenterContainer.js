import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../../actions/action'
import * as Selectors from '../../selectors/selector';
import MessageCenterListView from '../../components/mine/Messagecenter';




class MessageCenterContainer extends Component {
  componentDidMount() {
    // this.props.fetchData();
  }

  componentWillUnmount() {
    // this.props.resetToInitialData();
  }

  render() {
    return <MessageCenterListView style={{ flex: 1 }} container={this.props} />;
  }
}

const mapStateToProps = state => {
  return {
    netInfoStatus: Selectors.getNetInfo(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // fetchData: () => dispatch(Actions.messageCenterFetchData()),
    // fetchMoreData: () => dispatch(Actions.messageCenterFetchMoreData()),
    // resetToInitialData: () => dispatch(Actions.messageCenterResetToInitial()),
  };
};

export default connect(mapStateToProps, null)(
  MessageCenterContainer,
);

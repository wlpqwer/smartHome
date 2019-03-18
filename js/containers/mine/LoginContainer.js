import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Selectors from '../../selectors/selector';
import * as Actions from '../../actions/mine/AuthUserInfoAction';
import LoginView from '../../components/common/Login';



class LoginContainer extends Component {

  static navigationOptions = ({ navigation }) => {
    return {header: null}
  }

  render() {
    return <LoginView style={{ flex: 1 }} container={this.props} />;
  }
}

const mapStateToProps = state => {
  return {
    userInfoData: Selectors.getUserInfo(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUserInfo: data => dispatch(Actions.getUserInfo(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
    LoginContainer,
);

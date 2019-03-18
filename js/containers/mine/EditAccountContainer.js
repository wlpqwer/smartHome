import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Selectors from '../../selectors/selector';
import { Text, View } from 'react-native';
import { commonStyles } from '../../tools/layout';
import Touch from 'react-native-touch-once';
import EditAccountView from '../../components/mine/EditAccount';
// import * as Actions from '../../actions/mine/AuthUserInfoAction';
import * as Actions from '../../actions/action'

class EditAccountContainer extends Component {

    static navigationOptions = ({ navigation }) => {
        console.log(navigation.state)
        const { params = {} } = navigation.state;
        return {
            headerRight: (
            <View style={[commonStyles.flexBox, { height: '100%', width: 88 }]}>
                <Touch
                style={[commonStyles.flexBox, { flex: 1, height: '100%' }]}
                activeOpacity={0.5}
                onPress={() => { params.updateImg()}}
                >
                <Text style={{fontSize:17, color:'#2C2D30'}}>SAVE</Text>
                </Touch>
            </View>
            ),
        };
    };

  render() {
    return <EditAccountView style={{ flex: 1 }} container={this.props} />;
  }
}

const mapStateToProps = state => {
  return {
    netInfoStatus: Selectors.getNetInfo(state),
    userInfoData: Selectors.getUserInfo(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    postLogOut: () => dispatch(Actions.postLogOut()),
    localStoreHeaderImgData: (string) => dispatch(Actions.localStoreHeaderImg(string)), 
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditAccountContainer);

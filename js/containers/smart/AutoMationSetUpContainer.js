import React, { Component } from 'react';
import {commonStyles } from '../../tools/layout';
import { connect } from 'react-redux';
import * as Actions from '../../actions/action'
import * as Selectors from '../../selectors/selector';
import AutoMationSetUpView from '../../components/smart/AutoMationSetUp';
import { View, Image, Text, StyleSheet, Platform, Modal, Dimensions  } from 'react-native';
import Touch from 'react-native-touch-once';
import { EventRegister } from 'react-native-event-listeners';

class AutoMationSetUpContainer extends Component {
  componentDidMount() {
    this.props.fetchData(this.props.navigation.state.params.autoMationId);
  }
  static navigationOptions = ({ navigation }) => {
    console.log(navigation.state)
    const { params = {} } = navigation.state;
    return {
      headerTitle: 'Edit',
      headerLeft: (
          <Touch
            style={[commonStyles.flexBox, { flex: 1, height: '100%' }]}
            activeOpacity={0.5}
            onPress={() => {params.backToBefore() }}
          >
             <Image style={{ width: 30, height: 30, marginLeft: 6 }}
                source={require('../../img/icon_fh.png')}
              />
          </Touch>
      ),
      headerRight: <View />
      // headerRight: (
      //   <View style={[commonStyles.flexBox, { height: '100%', width: 88 }]}>
      //     <Touch
      //       style={[commonStyles.flexBox, { flex: 1, height: '100%' }]}
      //       activeOpacity={0.5}
      //       onPress={() => { }}
      //     >
      //      <Text style={{fontSize:17, color:'#2C2D30'}}>保存</Text>
      //     </Touch>
      //   </View>
      // ),
    };
  };
  render() {
    return <AutoMationSetUpView style={{ flex: 1 }} container={this.props} />;
  }
}

const mapStateToProps = state => {
  return {
    netInfoStatus: Selectors.getNetInfo(state),
    userInfoData: Selectors.getUserInfo(state),
    isLoading: Selectors.getAutoMationContentIsLoading(state),
    data: Selectors.getAutoMationContentData(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData: (autoMationId) => dispatch(Actions.autoMationContentFetchData(autoMationId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  AutoMationSetUpContainer,
);

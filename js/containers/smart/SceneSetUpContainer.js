import React, { Component } from 'react';
import {commonStyles } from '../../tools/layout';
import { connect } from 'react-redux';
import * as Actions from '../../actions/action'
import * as Selectors from '../../selectors/selector';
import SceneSetUpView from '../../components/smart/SceneSetUp';
import { View, Image, Text, StyleSheet, Platform, Modal, Dimensions  } from 'react-native';
import Touch from 'react-native-touch-once';
import { EventRegister } from 'react-native-event-listeners';

class SceneSetUpContainer extends Component {
  componentDidMount() {
      this.props.fetchData(this.props.navigation.state.params.sceneId);
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
          onPress={() => {params.goBack() }}
        >
           <Image style={{ width: 30, height: 30, marginLeft: 6 }}
              source={require('../../img/icon_fh.png')}
            />
        </Touch>
      ),
      headerRight: (
        <View style={[commonStyles.flexBox, { height: '100%', width: 88 }]}>
          <Touch
            style={[commonStyles.flexBox, { flex: 1, height: '100%' }]}
            activeOpacity={0.5}
            onPress={() => { params.saveUpdateScene()}}
          >
           <Text style={{fontSize:17, color:'#2C2D30'}}>SAVE</Text>
          </Touch>
        </View>
      ),
    };
  };
  render() {
    return <SceneSetUpView style={{ flex: 1 }} container={this.props} />;
  }
}

const mapStateToProps = state => {
  return {
    netInfoStatus: Selectors.getNetInfo(state),
    userInfoData: Selectors.getUserInfo(state),
    isLoading: Selectors.getSceneContentIsLoading(state),
    data: Selectors.getSceneContentData(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData: (sceneId ) => dispatch(Actions.sceneContentFetchData(sceneId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  SceneSetUpContainer,
);

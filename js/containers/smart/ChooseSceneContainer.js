import React, { Component } from 'react';
import {commonStyles } from '../../tools/layout';
import { connect } from 'react-redux';
import * as Selectors from '../../selectors/selector';
import ChooseSceneView from '../../components/smart/ChooseScene';
import { View, Text } from 'react-native';
import Touch from 'react-native-touch-once';

class ChooseSceneContainer extends Component {

  static navigationOptions = ({ navigation }) => {
    // console.log(navigation.state)
    const { params = {} } = navigation.state;
    return {
      headerTitle: 'Select the automation to trigger',
      headerRight: (
        <View style={[commonStyles.flexBox, { height: '100%', width: 88 }]}>
          <Touch
            style={[commonStyles.flexBox, { flex: 1, height: '100%' }]}
            activeOpacity={0.5}
            onPress={() => {params.chooseSceneArr()}}
          >
           <Text style={{fontSize:17, color:'#2C2D30'}}>NEXT</Text>
          </Touch>
        </View>
      ),
    };
  };
  render() {
    return <ChooseSceneView style={{ flex: 1 }} container={this.props} />;
  }
}

const mapStateToProps = state => {
  return {
    netInfoStatus: Selectors.getNetInfo(state),
    userInfoData: Selectors.getUserInfo(state),
    data: Selectors.getSmartSceneData(state),
    isLoadingData: Selectors.getSmartSceneIsLoading(state),
  };
};



export default connect(mapStateToProps, null)(
    ChooseSceneContainer,
);

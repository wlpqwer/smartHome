import React, { Component } from 'react';
import { View, Image } from 'react-native';
import {commonStyles } from '../../tools/layout';
import { connect } from 'react-redux';
import * as Actions from '../../actions/action'
import * as Selectors from '../../selectors/selector';
import Touch from 'react-native-touch-once';
import {SmartView} from '../../components/smart/SmartView';
class SmartViewContainer extends Component {
  componentWillMount() {
    this.props.fetchData(this.props.userInfoData.globalHomeId);
    this.props.fetchAutomationListData(this.props.userInfoData.globalHomeId);
  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerTitleStyle: {
        color: 'black',
        opacity: !params ? 0 : params.animatedValue,
        fontWeight: 'normal',
        fontSize: 16,
        flex: 1,
        alignSelf:'center',
        textAlign: 'center'
      },
      headerStyle: {
        backgroundColor: '#fff',
        // borderBottomWidth: 0,
        // shadowColor: 'transparent',
        // elevation: 0,
        // shadowOpacity: 0,
      },
      // headerBackTitle: '返回',
      headerRight: (
        <View style={[commonStyles.flexBox, { height: '100%', width: 44 }]}>
          {/* <Touch
            style={[commonStyles.flexBox, { flex: 1, height: '100%' }]}
            activeOpacity={0.5}
          >
            <Image
              style={{
                width: 30,
                height: 30,
              }}
              source={require('../../img/icon_wdj_bj.png')}
            />
          </Touch> */}
          {params.currentSwitchHomeMaster == params.identityStatus ? (
            <Touch
              style={[commonStyles.flexBox, { height: '100%' }]}
              activeOpacity={0.5}
              onPress={() => navigation.navigate('AddSmart')}
            >
              <Image
                style={{
                  width: 30,
                  height: 30,
                  marginRight: 12,
                }}
                source={require('../../img/icon_wdj_tj.png')}
              />
            </Touch>
          ) : null}
        </View>
      ),
    };
  };

  render() {
    return <SmartView style={{ flex: 1 }} container={this.props} />;
  }
}

const mapStateToProps = state => {
  return {
    data: Selectors.getSmartSceneData(state),
    isLoadingSceneListData: Selectors.getSmartSceneIsLoading(state),
    netInfoStatus: Selectors.getNetInfo(state),
    userInfoData: Selectors.getUserInfo(state),
    isLoadingSceneCon: Selectors.getSceneContentIsLoading(state),
    sceneContentData: Selectors.getSceneContentData(state),
    autoMationListData: Selectors.getAutoMationListData(state),
    isLoadingAutoMationListData: Selectors.getAutoMationListIsLoading(state),
  };
};




const mapDispatchToProps = dispatch => {
  return {
    fetchData: (currentHomeId = 0) => dispatch(Actions.smartSceneFetchData(currentHomeId)),
    // fetchMoreData: () => dispatch(Actions.itemsFetchMoreData()),
    // getAppNetInfo: bool => dispatch(Actions.netInfoStatus(bool)),
    fetchSceneConData: (sceneId) => dispatch(Actions.sceneContentFetchData(sceneId)),
    fetchAutomationListData: (currentHomeId = 0) => dispatch(Actions.automationListFetchData(currentHomeId)),
    familyListFetchData: () => dispatch(Actions.familyListFetchData()),     //header 中的家庭列表
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SmartViewContainer);

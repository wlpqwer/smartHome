import React, { Component } from 'react';
import { View, Image, StyleSheet, AsyncStorage, Dimensions,Text } from 'react-native';
import {commonStyles } from '../../tools/layout';
import { connect } from 'react-redux';
import * as Actions from '../../actions/action'
import * as Selectors from '../../selectors/selector';
import Touch from 'react-native-touch-once';
import {HomeView} from '../../components/home/HomeView';


// 自定义header，header添加背景图
// const Header = props => (
//   <View style={commonStyles.flexBox}>
//     <Text>1222</Text>
//     <View style={{flex:1}}></View>
//     <Touch
//       style={[commonStyles.flexBox, { height: '100%' }]}
//       activeOpacity={0.5}
//       onPress={() => navigation.navigate('ChooseDevice')}
//     >
//       <Image
//         style={{
//           width: 30,
//           height: 30,
//           marginRight: 12,
//         }}
//         source={require('../../img/icon_wdj_tj.png')}
//         resizeMode="contain"
//       />
//     </Touch>
//   </View>
// );

// const ImageHeader = props => {
//   console.log('ImageHeader props', props);
//   return(
//     <View style={{height: 40, justifyContent: 'flex-end', padding: 5, backgroundColor: 'transparent'}}>
//       <Image
//         style={{width: Dimensions.get('window').width, height: 40, position: 'absolute', top: 0, left: 0}}
//         source={require('../../img/headerTop.png')}
//         resizeMode="contain"
//       />
//       <Header {...props} style={{ backgroundColor: 'transparent',  elevation: 0,
//         shadowOpacity: 0,shadowColor: 'transparent',
//         borderBottomWidth: 0,}}/>
//     </View>
//   );
// }



class HomeViewContainer extends Component {
  constructor(props) {
    super(props);
  }


  componentWillMount() {
    this.props.fetchData(this.props.userInfoData.globalHomeId);
    this.props.getLanguageType();
    this.props.familyListFetchData();
  }

  componentWillUnmount() {
    this.props.familyListResetToInitial();
  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    console.log(navigation.state);
    return {
      // header: (props) => <ImageHeader {...props} />,  //自定义header引用
      headerTitleStyle: {
        //标题的文字颜色
        color: 'black',
        // opacity: !params ? 0 : params.animatedValue,
        fontWeight: 'normal',
        fontSize: 16,
        flex: 1,
        alignSelf: 'center',
        textAlign: 'center',
      },
      headerStyle: {
        backgroundColor: '#fff',
      },
      // headerBackTitle: '返回',
      headerRight: (
        <View style={[commonStyles.flexBox, { height: '100%', width: 88, justifyContent:'flex-end' }]}>
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
                onPress={() => navigation.navigate('ChooseDevice')}
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
    return <HomeView style={{ flex: 1 }} container={this.props} />;
  }
}

const mapStateToProps = state => {
  return {
    isLoading: Selectors.getIsLoading(state),
    data: Selectors.getVisibleData(state),
    userInfoData: Selectors.getUserInfo(state),
    isLoadingMore: Selectors.getIsLoadingMore(state),
    netInfoStatus: Selectors.getNetInfo(state),
    languageType: Selectors.getLanguageType(state),
    familyListData: Selectors.getFamilyListData(state),
    isHasError: Selectors.getIsHasError(state),
  };
};


const mapDispatchToProps = dispatch => {
  return {
    fetchData: (currentHomeId = 0) => dispatch(Actions.itemsFetchData(currentHomeId)),
    fetchMoreData: () => dispatch(Actions.itemsFetchMoreData()),
    getAppNetInfo: bool => dispatch(Actions.netInfoStatus(bool)),
    getLanguageType: string => dispatch(Actions.languageType(string)),
    familyListFetchData: () => dispatch(Actions.familyListFetchData()),
    familyListResetToInitial: () => dispatch(Actions.familyListResetToInitial()),
    postLogOut: () => dispatch(Actions.postLogOut()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeViewContainer);

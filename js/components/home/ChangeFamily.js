import React, { Component } from 'react';
import { Text, View, Image,Modal, Dimensions, Platform } from 'react-native';
import Touch from 'react-native-touch-once';
import { commonStyles } from '../../tools/layout';
import { Header } from 'react-navigation';
import { EventRegister } from 'react-native-event-listeners';
import ExtraDimensions from 'react-native-extra-dimensions-android';
let that;
export default class ChangeFamily extends Component {
  constructor(props) {
    super(props);
    that = this;
    // this._getCurrentHomeIDAsync();
    this.homeId = 0;
    this.state = {
        isShowFamiy: false,  //是否显示家庭列表模块
    }
    this.navigation = props.container;
  }


componentWillMount() {
}

// componentWillUnmount() {
// }
componentWillUnmount() {
    this.setState = (state, callback) => {
        return;
    };
};

// _getCurrentHomeIDAsync = async () => {
//     try {
//         const value = await AsyncStorage.getItem('globalHomeId');
//         this.homeId = value;
//         console.log(value + "------");
//       if (value !== null) {
//         console.log(value +"-=======");
//         }
//     } catch (error) {
//         console.log(error);
//     }
// }


  render() {
    let familyObj = '';
    for(let key in this.props.container.familyListData){
        if(this.props.container.familyListData[key].id == this.props.container.userInfoData.globalHomeId){
            familyObj = this.props.container.familyListData[key].name
        }
    }
    return (
        <View >
            <View style={[commonStyles.flexBox, { height: '100%'}]}>
                <Touch
                    style={[commonStyles.flexBox, { height: '100%', width: Dimensions.get('window').width -120, justifyContent: 'flex-start', }]}
                    activeOpacity={0.5}
                    onPress={() => {
                         this.setState({isShowFamiy: true}) 
                    }}
                >
                    <Text style={{marginLeft:20, color:'#4A4A4A', fontSize: 16 }} numberOfLines={1}>{familyObj == '' ? 'default home' : familyObj}</Text>
                    <Image style={{ width: 24, height: 24, marginLeft: 6 }}
                        source={require('../../img/icon_wdj_qhzh.png')}
                    />
                </Touch>
            </View>
            <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.isShowFamiy}
                onRequestClose={() => {
                    this.setState({isShowFamiy: false})
                }}
            >
                <Touch style={{
                        backgroundColor:'rgba(0,0,0,.4)',
                        width: Dimensions.get('window').width,
                        height: Platform.OS === 'android' ? ExtraDimensions.get('REAL_WINDOW_HEIGHT') : Dimensions.get('window').height,
                    }}
                    onPress={() => {
                        this.setState({isShowFamiy: false})
                    }}
                >
                    <View style={{ top: Header.HEIGHT, left:20, borderRadius:6, width:'48%', backgroundColor:'#fff'}}>
                        {this.props.container.familyListData.map((item, index) => {
                            return(
                                <Touch
                                    key={index}
                                    style={[commonStyles.flexBox, {height:40, justifyContent:'flex-start'}]}
                                    activeOpacity={0.5}
                                    onPress={() => {
                                        this.setState({
                                            isShowFamiy: false
                                        });
                                        EventRegister.emit('merberSwitchFamily', item.created_by);
                                        this.props.container.fetchData(item.id);
                                        this.props.container.switchHomeIdData(item.id);
                                        this.props.container.switchLocalHomeAdminData(item.created_by);
                                        this.props.container.fetchSmartSceneListData(item.id);
                                        this.props.container.fetchSmartAutomationListData(item.id);
                                        // console.log(this.props.container.container.navigation);
                                        
                                    }}
                                >
                                {item.id == this.props.container.userInfoData.globalHomeId ? (
                                    <Image style={[commonStyles.moreIconSty, {marginLeft:5}]} source={require('../../img/icon_xzdx.png')} />
                                ) : null}
                                    <Text numberOfLines={1} style={{ marginLeft: item.id == this.props.container.userInfoData.globalHomeId ? 5 : 40, color:'#2C2D30', fontSize: 15, flex: 1 }}>{item.name}</Text>
                                </Touch>
                            )
                        })}
                        <Touch style={[commonStyles.flexBox, {height:40, justifyContent:'flex-start', backgroundColor:'#ddd', borderBottomLeftRadius: 6, borderBottomRightRadius:6}]}
                            activeOpacity={0.5}
                            onPress={() => {
                                this.props.container.container.navigation.navigate('FamilyManage');
                                this.setState({isShowFamiy: false});
                            }}
                        >
                            <Image style={[commonStyles.moreIconSty, {marginLeft:5}]} source={require('../../img/icon_jtsz.png')} />
                            <Text style={{color:'#2C2D30', fontSize: 15, flex: 1}}>Manage home</Text>
                            <Image style={{marginRight:5, width: 24, height: 24}} source={require('../../img/icon_gd.png')} />
                        </Touch>
                        <Image
                            style={{
                                width: 22,
                                height: 9,
                                position:'absolute',    
                                top:-8,
                                left:20,
                                zIndex:9999
                            }}
                            source={require('../../img/pic_j.png')}
                        />
                    </View>
                </Touch>
            </Modal>
        </View>
    );
  }
}
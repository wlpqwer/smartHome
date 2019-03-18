import React from 'react';
import { Text, ScrollView, SafeAreaView, Image, View } from 'react-native';
import { commonStyles } from '../../tools/layout';
import Touch from 'react-native-touch-once';
import { EventRegister } from 'react-native-event-listeners';
import Loading from '../common/Loading';
import ModalToast from '../common/ModalToast';

export default class FamilyManage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowToast: false,  //是否是客人操作
    }
  }

  componentDidMount() {
    this.listener = EventRegister.addEventListener('addFamilySucc', data => {
      if(data.status == '200201'){
        this.props.container.fetchData();
      }
    });

    this.delFamilyListener = EventRegister.addEventListener('deleteFamilySucc', data => {
      if(data.status == '200035'){
        this.props.container.fetchData();
      }
    });

    this.updateFamInfoListener = EventRegister.addEventListener('updateFamInfoSucc', msg => {
      this.props.container.fetchData();
    });

    
  }

  componentWillUnmount() {
    EventRegister.removeEventListener(this.listener);
    EventRegister.removeEventListener(this.delFamilyListener);
    EventRegister.removeEventListener(this.updateFamInfoListener);
  }

  render() {
    if(this.props.container.netInfoStatus){
      if(this.props.container.isLoading){
        return <Loading />
      } else {
        return (
          <SafeAreaView style={commonStyles.containGrayWrap}>
            <ScrollView>
              <View style={commonStyles.homeContainerBox}>
                {this.props.container.data.map((item, index) => {
                  return (
                    <Touch style={[commonStyles.flexBox, commonStyles.noneLineList]} 
                      activeOpacity={1}  
                      key={index}
                      onPress={() => {
                        if(item.created_by == this.props.container.userInfoData.phone_number){
                          this.props.container.navigation.navigate('FamilySetUp', {id: item.id})
                        } else {
                          this.setState({isShowToast: true})
                        }
                      }}
                    >
                      <Text style={commonStyles.deviceName} numberOfLines={1}>{item.name}</Text>
                      <Image style={commonStyles.moreIconSty} source={require('../../img/icon_gd.png')} />
                    </Touch>
                  );
                })} 
              </View>
              <Touch style={[commonStyles.addItemsBox, commonStyles.flexBox]}  activeOpacity={1}  onPress={() => this.props.container.navigation.navigate('AddFamily', {data: this.props.container.userInfoData})}>
                <Text style={commonStyles.addItemsText}>Create new home</Text>
              </Touch>
            </ScrollView>
            <ModalToast
              _dialogVisible={this.state.isShowToast}
              _dialogContent={"Members can only edit and modify the family they created"}
              _dialogLeftBtnAction={() => {
                this.setState({isShowToast: false})
              }}
            />
           </SafeAreaView>
        );
      }
    } else{
      return (
        <SafeAreaView style={[commonStyles.containGrayWrap, commonStyles.flexBoxColumn]}>
            <Image
              style={{width:251, height:137}}
              source={require('../../img/pic_wwl.png')}
            />
            <Text style={{ marginTop: 22, fontSize: 15, color:'#8E8D94'}}>Network error, please try again later</Text>
        </SafeAreaView>
      )
    }
  }
}
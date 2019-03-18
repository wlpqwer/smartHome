import React, { Component } from 'react';
import { Text, SafeAreaView, Image, StyleSheet, Dimensions, View, ActivityIndicator, FlatList } from 'react-native';
import { WingBlank, Modal } from 'antd-mobile-rn';
import { commonStyles } from '../../tools/layout';
import Touch from 'react-native-touch-once';
import { Header } from 'react-navigation';

export default class Messagecenter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [{
        id: 1,
        text: 'Shared devices',
        time: 'October 5, 10:29'
      },{
          id: 2,
          text: '18812568899 removed the family "hello" in Shang Hai',
          time: 'October 5, 10:00'
      }],
    }
  }

  _createMessageEmptyView() {
    return (
      <View style={[commonStyles.flexBoxColumn, {height: Dimensions.get('window').height - Header.HEIGHT}]}>
        <Image
          style={{ width: '67%'}}
          resizeMode = "contain"
          source={require('../../img/pic_kzt1.png')}
        />
        <Text style={{ marginTop: 20, fontSize: 15, color:'#8E8D94'}}>No news yet</Text>
      </View>
      );
    }


  _renderItem = ({ item, index }) => {
    return (
      <Touch style={[commonStyles.flexBox, commonStyles.padLR20, styles.messageBox]}
        onPress={() => this.props.container.navigation.navigate('MessageInfo', {data: item})}
      >
        <View style={styles.messageItems}>
          <Text style={styles.messageText} numberOfLines={1}>{item.text}</Text>
          <Text style={styles.messageTime}>{item.time}</Text>
        </View>
        <Image style={commonStyles.moreIconSty} source={require('../../img/icon_gd.png')} />
      </Touch>
    );
  };

  render() {
    return (
      <SafeAreaView style={commonStyles.containGrayWrap}>
        <FlatList
            windowSize={50}
            initialNumToRender={50}
            maxToRenderPerBatch={50}
            data={this.state.data}
            renderItem={this._renderItem}
            // onEndReached={this.onEndReached.bind(this)}
            // onEndReachedThreshold={0}
            // onMomentumScrollBegin={() => {
            //   this.onEndReachedCalledDuringMomentum = false;
            // }}
            ListEmptyComponent={this._createMessageEmptyView()}
            // ListFooterComponent={() => {
            //   return (
            //     this.props.container.isLoadingMore && (
            //       <View style={{ flex: 1, padding: 10 }}>
            //         <ActivityIndicator size="small" />
            //       </View>
            //     )
            //   );
            // }}
            keyExtractor={item => item.id.toString()}
          />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  messageBox:{
    backgroundColor:'#fff',
    height:71,
    borderBottomWidth:1,
    borderBottomColor:'#F2F2F2'
  },
  messageItems:{
    flex:1
  },
  messageText:{
    color:'#2C2D30',
    fontSize:16
  },
  messageTime:{
    color:'#8E8E93',
    fontSize:13,
    marginTop:5
  }
});

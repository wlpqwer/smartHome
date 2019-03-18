import React, { Component } from 'react';
import { commonStyles } from '../../tools/layout';
import Touch from 'react-native-touch-once';
import { StyleSheet, Text, View, Image, SafeAreaView, ScrollView } from 'react-native';

export default class AddSmart extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {}

  render() {
    return (
      <SafeAreaView style={commonStyles.containGrayWrap}>
        <ScrollView>
          <Text style={[commonStyles.tabSortTitle, commonStyles.padLR20, {paddingBottom: 0, paddingTop: 30,  backgroundColor:'#F8F8F8'}]}>
            Add automation
          </Text>
          <Touch style={[commonStyles.flexBox, styles.addScenceBox]}
            onPress={() => this.props.navigation.navigate('CreateNewScene')}
          >
            <Image style={styles.scenceImg}
                source={require('../../img/icon_cj.png')}
              />
            <View style={styles.scenceContent}>
              <Text style={styles.scenceTit}>Scenes</Text>
              <Text style={styles.scenceDesc}>Control multiple devices with one button, or trigger execution through "automation"</Text>
            </View>
            <Image style={commonStyles.moreIconSty} source={require('../../img/icon_gd.png')} />
          </Touch>
          <Touch style={[commonStyles.flexBox, styles.addScenceBox]}
            onPress={() => this.props.navigation.navigate('CreateNewAutomation')}
          >
            <Image style={styles.scenceImg}
                source={require('../../img/icon_zdh.png')}
              />
            <View style={styles.scenceContent}>
              <Text style={styles.scenceTit}>Automation</Text>
              <Text style={styles.scenceDesc}>Automatically executed according to weather, equipment, time, etc.</Text>
            </View>
            <Image style={commonStyles.moreIconSty} source={require('../../img/icon_gd.png')} />
          </Touch>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  addScenceBox:{
    height: 137,
    backgroundColor:'#fff',
    borderRadius:4,
    marginHorizontal: 20,
    marginTop:30,
    marginBottom: 2,
    paddingLeft:12,
    paddingRight: 17,
    elevation: 2,
    shadowOffset: {width: 0, height: 2},
    shadowColor: 'black',
    shadowOpacity: .1,
    shadowRadius: 5,
  },
  scenceImg:{
    width:42,
    height:42,
    marginRight: 10
  },
  scenceContent:{
    flex:1
  },
  scenceTit:{
    color:'#2C2D30',
    fontSize:20
  },
  scenceDesc:{
    fontSize: 14,
    color: '#9B9B9B',
    lineHeight: 20,
    marginTop:8
  }
});
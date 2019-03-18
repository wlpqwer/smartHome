import React, { Component } from 'react';
import {
  Modal,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  BackAndroid, Platform
} from 'react-native';
import ExtraDimensions from 'react-native-extra-dimensions-android';

let Dimensions = require('Dimensions');
let SCREEN_WIDTH = Dimensions.get('window').width;
let SCREEN_HEIGHT = Platform.OS === 'android' ? ExtraDimensions.get('REAL_WINDOW_HEIGHT') : Dimensions.get('window').height;


export default class ModalDialog extends Component {
  constructor(props) {
    super(props);
  }

  static defaultProps = {
    _dialogTitle: 'You sure you want to delete it?',
    _dialogContent: 'After deleting the home, all the set devices and information will be deleted and cannot be restored.',
    _dialogLeftBtnTitle: 'CANCEL',
    _dialogRightBtnTitle: 'OK',
    _dialogVisible: false,
  };

  render() {
    return (
      <Modal
        visible={this.props._dialogVisible}
        transparent={true}
        onRequestClose={() => {}} //如果是Android设备 必须有此方法
      >
        <View style={styles.bg}>
          <View style={styles.dialog}>
            <View style={styles.dialogTitleView}>
              <Text style={styles.dialogTitle}>{this.props._dialogTitle}</Text>
            </View>
            <View style={styles.dialogContentView}>
                <Text style={styles.dialogContent}>
                    {this.props._dialogContent}
                </Text>
            </View>

            <View style={styles.dialogBtnView}>
              <TouchableOpacity
                activeOpacity={1}
                style={styles.dialogBtnViewItem}
                onPress={this.props._dialogRightBtnAction}
              >
                <Text style={styles.rightButton}>
                  {this.props._dialogRightBtnTitle}
                </Text>
              </TouchableOpacity>
              <View style={styles.line} />
              <TouchableOpacity
                activeOpacity={1}
                style={styles.dialogBtnViewItem}
                onPress={this.props._dialogLeftBtnAction}
              >
                <Text style={styles.leftButton}>
                  {this.props._dialogLeftBtnTitle}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  bg: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialog: {
    width: SCREEN_WIDTH * 0.72,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  dialogTitleView: {
    width: SCREEN_WIDTH * 0.72,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,1)',
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    paddingTop:30,
    // borderBottomColor: '#cbcbcb',
    // borderBottomWidth: 1,
  },
  dialogTitle: {
    textAlign: 'center',
    fontSize: 17,
    color: '#000000',
  },
  dialogContentView: {
    padding: 20
  },
  dialogContent: {
    // textAlign: 'center',
    fontSize: 14,
    color: '#9B9B9B',
    lineHeight: 20
  },
  dialogBtnView: {
    height: 44,
    flexDirection: 'row',
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
    overflow: 'hidden',
  },
  dialogBtnViewItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopWidth:1,
    borderTopColor:'#f2f2f2'
  },
  leftButton: {
    fontSize: 17,
    color: '#2C2D30',
    borderBottomLeftRadius: 8,
  },
  rightButton: {
    fontSize: 17,
    color: 'rgba(0,0,0,0.87)',
    borderBottomRightRadius: 8,
  },
  line: {
    height: 44,
    width: 1,
    backgroundColor: '#f2f2f2',
  },
});

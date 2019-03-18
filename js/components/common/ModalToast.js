import React, { Component } from 'react';
import {
  Modal,
  Text,
  TouchableOpacity,
  View,
  StyleSheet, Platform
} from 'react-native';
import ExtraDimensions from 'react-native-extra-dimensions-android';

let Dimensions = require('Dimensions');
let SCREEN_WIDTH = Dimensions.get('window').width;
let SCREEN_HEIGHT = Platform.OS === 'android' ? ExtraDimensions.get('REAL_WINDOW_HEIGHT') : Dimensions.get('window').height;

export default class ModalToast extends Component {
  constructor(props) {
    super(props);
  }

  static defaultProps = {
    _dialogContent: 'The device is offline. Please check the current connection status.',
    _dialogLeftBtnTitle: 'OK',
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
            <View style={styles.dialogContentView}>
                <Text style={styles.dialogContent}>
                    {this.props._dialogContent}
                </Text>
            </View>

            <View style={styles.dialogBtnView}>
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
  dialogContentView: {
    paddingHorizontal: 20,
    paddingTop: 32,
    paddingBottom: 40
  },
  dialogContent: {
    textAlign: 'center',
    fontSize: 14,
    color: '#2C2D30',
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
    borderTopColor:'#F2F2F2'
  },
  leftButton: {
    fontSize: 17,
    color: '#2C2D30',
    borderBottomLeftRadius: 8,
  },
});

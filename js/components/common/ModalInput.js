import React, { Component } from 'react';
import { Modal, Text, TouchableOpacity, View, StyleSheet, Dimensions, TextInput, Keyboard, Animated, Easing, Platform } from 'react-native';
import ExtraDimensions from 'react-native-extra-dimensions-android';

let SCREEN_WIDTH = Dimensions.get('window').width;
let SCREEN_HEIGHT = Platform.OS === 'android' ? ExtraDimensions.get('REAL_WINDOW_HEIGHT') : Dimensions.get('window').height;;

export default class ModalInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
        value: '',
        compositeAnim: new Animated.Value(0)  //键盘高度
    }
  }

  static defaultProps = {
    _popupInputBoxTitle: 'Edit room name',
    _popupInputBoxLeftBtnText: 'CANCEL',
    _popupInputBoxRightBtnText: 'OK',
    _popupInputBoxDefaultText:'Enter a room name',
    _popupInputBoxValue:'',
    _popupInputBoxVisible: true,
  };

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow',
      this.keyboardDidShowHandler.bind(this));
    //监听键盘隐藏事件
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide',
      this.keyboardDidHideHandler.bind(this));
  }

    // 键盘显示事件响应
  keyboardDidShowHandler(event) {
    this.setState({value: ''});
    Animated.timing(this.state.compositeAnim, {
        toValue: 258,
        easing: Easing.linear,
        duration: 250
    }).start();
  }

  // onFocusEvent = () => {
  //   this.setState({value: ''});
  //   Animated.timing(this.state.compositeAnim, {
  //       toValue: 258,
  //       easing: Easing.linear,
  //       duration: 250
  //   }).start();
  // }
 
  //键盘隐藏事件响应
  keyboardDidHideHandler(event) {
    this.state.compositeAnim.setValue(0);
    console.log("oiooioioioio")
  }

  componentWillUnmount() {
    //卸载键盘弹出事件监听
    if(this.keyboardDidShowListener != null) {
      this.keyboardDidShowListener.remove();
    }
    //卸载键盘隐藏事件监听
    if(this.keyboardDidHideListener != null) {
      this.keyboardDidHideListener.remove();
    }
  }

  render() {
    return (
        <Modal
            visible={this.props._popupInputBoxVisible}
            transparent={true}
            onRequestClose={() => {}} //如果是Android设备 必须有此方法
        >
            <Animated.View style={[styles.bg, {paddingBottom: this.state.compositeAnim}]}>
                <View style={styles.dialog}>
                    <View style={styles.dialogTitleView}>
                        <Text style={styles.dialogTitle}>{this.props._popupInputBoxTitle}</Text>
                    </View>

                    <View style={styles.inputBox}>
                      {Platform.OS === 'ios' ? (
                          <TextInput
                              style={styles.writeCon}
                              numberOfLines={1}
                              placeholderTextColor={'#9B9B9B'}
                              selectionColor="#FFBB00"
                              placeholder= {this.props._popupInputBoxDefaultText}
                              value={this.props._popupInputBoxValue}
                              underlineColorAndroid="transparent"
                              onChangeText={value => {
                                  this.setState({value: value})
                              }}
                              // onFocus = {() => this.onFocusEvent()}
                          />
                      ) : (
                        // 区别：安卓去掉了Value，不能显示输入文字
                        <TextInput
                              style={styles.writeCon}
                              numberOfLines={1}
                              placeholderTextColor={'#9B9B9B'}
                              selectionColor="#FFBB00"
                              placeholder= {this.props._popupInputBoxDefaultText}
                              underlineColorAndroid="transparent"
                              onChangeText={value => {
                                  this.setState({value: value})
                              }}
                              // onFocus = {() => this.onFocusEvent()}
                          />
                      )}
                    </View>

                    <View style={styles.dialogBtnView}>
                        <TouchableOpacity
                            activeOpacity={1}
                            style={styles.dialogBtnViewItem}
                            onPress={this.props._popupInputBoxRightBtnAction}
                        >
                            <Text style={styles.rightButton}>{this.props._popupInputBoxRightBtnText}</Text>
                        </TouchableOpacity>
                        <View style={styles.line} />
                        <TouchableOpacity
                            activeOpacity={1}
                            style={styles.dialogBtnViewItem}
                            onPress={this.props._popupInputBoxLeftBtnAction}
                        >
                            <Text style={styles.leftButton}>{this.props._popupInputBoxLeftBtnText}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Animated.View>
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
    paddingTop:20,
    paddingBottom: 12,
  },
  dialogTitle: {
    textAlign: 'center',
    fontSize: 17,
    color: '#000000',
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
  inputBox:{
    height: 40,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#C7C6CD',
    marginHorizontal: 15,
    marginVertical: 10
  },
    writeCon:{
        paddingHorizontal: 10,
        fontSize: 15,
        flex: 1,
        height: '100%'
    },
});

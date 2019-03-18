// import React from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   Animated,
//   TouchableNativeFeedback,
//   TouchableOpacity,
//   Platform,
//   ViewPropTypes
// } from 'react-native';
// const PropTypes = require('prop-types');
// const createReactClass = require('create-react-class');
// const {
//   View,
//   Animated,
//   StyleSheet,
//   ScrollView,
//   Text,
//   Platform,
//   Dimensions,
// } = ReactNative;
// const Button = Platform.OS == 'ios' ? ButtonIos : ButtonAndroid;

// const WINDOW_WIDTH = Dimensions.get('window').width;

// const SmartTabs = createReactClass({
//   propTypes: {
//     goToPage: PropTypes.func,
//     activeTab: PropTypes.number,
//     tabs: PropTypes.array,
//     backgroundColor: PropTypes.string,
//     activeTextColor: PropTypes.string,
//     inactiveTextColor: PropTypes.string,
//     scrollOffset: PropTypes.number,
//     style: ViewPropTypes.style,
//     tabStyle: ViewPropTypes.style,
//     tabsContainerStyle: ViewPropTypes.style,
//     textStyle: Text.propTypes.style,
//     renderTab: PropTypes.func,
//     underlineStyle: ViewPropTypes.style,
//     onScroll: PropTypes.func,
//   },

//   getDefaultProps() {
//     return {
//       scrollOffset: 52,
//       activeTextColor: 'navy',
//       inactiveTextColor: 'black',
//       backgroundColor: null,
//       style: {},
//       tabStyle: {},
//       tabsContainerStyle: {},
//       underlineStyle: {},
//     };
//   },

//   getInitialState() {
//     this._tabsMeasurements = [];
//     return {
//       _leftTabUnderline: new Animated.Value(0),
//       _widthTabUnderline: new Animated.Value(0),
//       _containerWidth: null,
//     };
//   },

//   componentDidMount() {
//     this.props.scrollValue.addListener(this.updateView);
//   },

//   updateView(offset) {
//     const position = Math.floor(offset.value);
//     const pageOffset = offset.value % 1;
//     const tabCount = this.props.tabs.length;
//     const lastTabPosition = tabCount - 1;

//     if (tabCount === 0 || offset.value < 0 || offset.value > lastTabPosition) {
//       return;
//     }

//     if (this.necessarilyMeasurementsCompleted(position, position === lastTabPosition)) {
//       this.updateTabPanel(position, pageOffset);
//       this.updateTabUnderline(position, pageOffset, tabCount);
//     }
//   },

//   necessarilyMeasurementsCompleted(position, isLastTab) {
//     return this._tabsMeasurements[position] &&
//       (isLastTab || this._tabsMeasurements[position + 1]) &&
//       this._tabContainerMeasurements &&
//       this._containerMeasurements;
//   },

//   updateTabPanel(position, pageOffset) {
//     const containerWidth = this._containerMeasurements.width;
//     const tabWidth = this._tabsMeasurements[position].width;
//     const nextTabMeasurements = this._tabsMeasurements[position + 1];
//     const nextTabWidth = nextTabMeasurements && nextTabMeasurements.width || 0;
//     const tabOffset = this._tabsMeasurements[position].left;
//     const absolutePageOffset = pageOffset * tabWidth;
//     let newScrollX = tabOffset + absolutePageOffset;

//     // center tab and smooth tab change (for when tabWidth changes a lot between two tabs)
//     newScrollX -= (containerWidth - (1 - pageOffset) * tabWidth - pageOffset * nextTabWidth) / 2;
//     newScrollX = newScrollX >= 0 ? newScrollX : 0;

//     if (Platform.OS === 'android') {
//       this._scrollView.scrollTo({x: newScrollX, y: 0, animated: false, });
//     } else {
//       const rightBoundScroll = this._tabContainerMeasurements.width - (this._containerMeasurements.width);
//       newScrollX = newScrollX > rightBoundScroll ? rightBoundScroll : newScrollX;
//       this._scrollView.scrollTo({x: newScrollX, y: 0, animated: false, });
//     }

//   },

//   updateTabUnderline(position, pageOffset, tabCount) {
//     const tempWidth = 40;
//     const lineLeft = this._tabsMeasurements[position].left;
//     const lineRight = this._tabsMeasurements[position].right;
//     let tabWidth;

//     if (position < tabCount - 1) {
//       const nextTabLeft = this._tabsMeasurements[position + 1].left;
//       const nextTabRight = this._tabsMeasurements[position + 1].right;
//       const newLineLeft = (pageOffset * nextTabLeft + (1 - pageOffset) * lineLeft);
//       const newLineRight = (pageOffset * nextTabRight + (1 - pageOffset) * lineRight);
//       tabWidth = newLineRight - newLineLeft;
//       this.state._leftTabUnderline.setValue(newLineLeft+(tabWidth-40)/2);
//       this.state._widthTabUnderline.setValue(tempWidth);
//     } else {
//       tabWidth = lineRight - lineLeft;
//       this.state._leftTabUnderline.setValue(lineLeft + (tabWidth-40)/2);
//       this.state._widthTabUnderline.setValue(tempWidth);
//     }
//   },

//   renderTab(name, page, isTabActive, onPressHandler, onLayoutHandler) {
//     const { activeTextColor, inactiveTextColor, textStyle, } = this.props;
//     const textColor = isTabActive ? activeTextColor : inactiveTextColor;
//     const fontWeight = isTabActive ? 'bold' : 'normal';

//     return <Button
//       key={`${name}_${page}`}
//       accessible={true}
//       accessibilityLabel={name}
//       accessibilityTraits='button'
//       onPress={() => onPressHandler(page)}
//       onLayout={onLayoutHandler}
//     >
//       <View style={[styles.tab, this.props.tabStyle, ]}>
//         <Text style={[{color: textColor, fontWeight, }, textStyle, ]}>
//           {name}
//         </Text>
//       </View>
//     </Button>;
//   },

//   measureTab(page, event) {
//     const { x, width, height, } = event.nativeEvent.layout;
//     this._tabsMeasurements[page] = {left: x, right: x + width, width, height, };
//     this.updateView({value: this.props.scrollValue._value, });
//   },

//   render() {
//     const tabUnderlineStyle = {
//       position: 'absolute',
//       height: 4,
//       backgroundColor: 'navy',
//       bottom: 0,
//     };

//     const dynamicTabUnderline = {
//       left: this.state._leftTabUnderline,
//       width: this.state._widthTabUnderline,
//     };

//     return <View
//       style={[styles.container, {backgroundColor: this.props.backgroundColor, }, this.props.style, ]}
//       onLayout={this.onContainerLayout}
//     >
//       <ScrollView
//         ref={(scrollView) => { this._scrollView = scrollView; }}
//         horizontal={true}
//         showsHorizontalScrollIndicator={false}
//         showsVerticalScrollIndicator={false}
//         directionalLockEnabled={true}
//         bounces={false}
//         scrollsToTop={false}
//       >
//         <View
//           style={[styles.tabs, {width: this.state._containerWidth, }, this.props.tabsContainerStyle, ]}
//           ref={'tabContainer'}
//           onLayout={this.onTabContainerLayout}
//         >
//           {this.props.tabs.map((name, page) => {
//             const isTabActive = this.props.activeTab === page;
//             const renderTab = this.props.renderTab || this.renderTab;
//             return renderTab(name, page, isTabActive, this.props.goToPage, this.measureTab.bind(this, page));
//           })}
//           <Animated.View style={[tabUnderlineStyle, dynamicTabUnderline, this.props.underlineStyle, ]} />
//         </View>
//       </ScrollView>
//     </View>;
//   },

//   componentWillReceiveProps(nextProps) {
//     // If the tabs change, force the width of the tabs container to be recalculated
//     if (JSON.stringify(this.props.tabs) !== JSON.stringify(nextProps.tabs) && this.state._containerWidth) {
//       this.setState({ _containerWidth: null, });
//     }
//   },

//   onTabContainerLayout(e) {
//     this._tabContainerMeasurements = e.nativeEvent.layout;
//     let width = this._tabContainerMeasurements.width;
//     if (width < WINDOW_WIDTH) {
//       width = WINDOW_WIDTH;
//     }
//     this.setState({ _containerWidth: width, });
//     this.updateView({value: this.props.scrollValue._value, });
//   },

//   onContainerLayout(e) {
//     this._containerMeasurements = e.nativeEvent.layout;
//     this.updateView({value: this.props.scrollValue._value, });
//   },
// });

// const ButtonAndroid = props => (
//   <TouchableNativeFeedback
//     delayPressIn={0}
//     background={TouchableNativeFeedback.SelectableBackground()}
//     {...props}
//   >
//     {props.children}
//   </TouchableNativeFeedback>
// );

// const ButtonIos = props => (
//   <TouchableOpacity {...props}>{props.children}</TouchableOpacity>
// );

// module.exports = SmartTabs;

// const styles = StyleSheet.create({
//   tab: {
//     height: 49,
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingLeft: 20,
//     paddingRight: 20,
//   },
//   container: {
//     height: 50,
//     borderWidth: 1,
//     borderTopWidth: 0,
//     borderLeftWidth: 0,
//     borderRightWidth: 0,
//     borderColor: '#ccc',
//   },
//   tabs: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//   },
// });




import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform,
} from 'react-native';
const PropTypes = require('prop-types');
// import px2dp from '../common/px2dp';

export default class MyHomeTabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeDefaultColor: '#8E743D',
      inactiveDefaultColor: '#2C2D30',
    };
  }

  _renderTab(name, page, isTabActive, onPressHandler) {
    const { textStyle } = this.props;
    const textColor = isTabActive
      ? this.props.activeColor
      : this.props.inactiveColor;

    const fontWeight = isTabActive ? 'bold' : 'normal';

    const Button = Platform.OS == 'ios' ? ButtonIos : ButtonAndroid;

    return (
      <Button
        style={{ flex: 1 }}
        key={name}
        accessible={true}
        accessibilityLabel={name}
        accessibilityTraits="button"
        onPress={() => onPressHandler(page)}
      >
        <View style={styles.tab}>
          <Text style={[{ color: textColor, fontSize: 16 }]}>
            {name}
          </Text>
        </View>
      </Button>
    );
  }

  _renderUnderline() {
    const containerWidth = this.props.containerWidth;
    const numberOfTabs = this.props.tabs.length;
    const underlineWidth = this.props.tabUnderlineDefaultWidth
      ? this.props.tabUnderlineDefaultWidth
      : containerWidth / (numberOfTabs * 2);
    const scale = this.props.tabUnderlineScaleX
      ? this.props.tabUnderlineScaleX
      : 3;
    const deLen = (containerWidth / numberOfTabs - underlineWidth) / 2;
    const tabUnderlineStyle = {
      position: 'absolute',
      width: underlineWidth,
      height: 2,
      borderRadius: 2,
      backgroundColor: this.props.activeColor,
      bottom: 0,
      left: deLen,
    };

    const translateX = this.props.scrollValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, containerWidth / numberOfTabs],
    });

    const scaleValue = defaultScale => {
      let number = 4;
      let arr = new Array(number * 2);
      return arr.fill(0).reduce(
        function(pre, cur, idx) {
          idx == 0
            ? pre.inputRange.push(cur)
            : pre.inputRange.push(pre.inputRange[idx - 1] + 0.5);
          idx % 2
            ? pre.outputRange.push(defaultScale)
            : pre.outputRange.push(1);
          return pre;
        },
        { inputRange: [], outputRange: [] },
      );
    };

    const scaleX = this.props.scrollValue.interpolate(scaleValue(scale));

    return (
      <Animated.View
        style={[
          tabUnderlineStyle,
          {
            transform: [{ translateX }, { scaleX }],
          },
          this.props.underlineStyle,
        ]}
      />
    );
  }

  render() {
    return (
      <View
        style={[
          styles.tabs,
          { backgroundColor: this.props.backgroundColor },
          this.props.style,
        ]}
      >
        {this.props.tabs.map((name, page) => {
          const isTabActive = this.props.activeTab === page;
          return this._renderTab(name, page, isTabActive, this.props.goToPage);
        })}
        {this._renderUnderline()}
      </View>
    );
  }
}

const ButtonAndroid = props => (
  <TouchableNativeFeedback
    delayPressIn={0}
    background={TouchableNativeFeedback.SelectableBackground()}
    {...props}
  >
    {props.children}
  </TouchableNativeFeedback>
);

const ButtonIos = props => (
  <TouchableOpacity {...props}>{props.children}</TouchableOpacity>
);

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabs: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: '#f4f4f4',
  },
});

// import React from 'react';
// import { Text, View, ScrollView } from 'react-native';
// import { Button, Modal, WhiteSpace, WingBlank } from 'antd-mobile-rn';

// export default class BasicModalExample extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       visible: false,
//       visible1: false,
//       visible2: false,
//     };
//   }

//   onClose = () => {
//     this.setState({
//       visible: false,
//     });
//   }

//   onClose1 = () => {
//     this.setState({
//       visible1: false,
//     });
//   }

//   onClose2 = () => {
//     this.setState({
//       visible2: false,
//     });
//   }

//   onButtonClick = () => {
//     Modal.alert('Title', 'alert content', [
//       { text: 'Cancel', onPress: () => console.log('cancel'), style: 'cancel' },
//       { text: 'OK', onPress: () => console.log('ok') },
//     ]);
//   }

//   onButtonClick2 = () => {
//     Modal.operation([
//       { text: '标为未读', onPress: () => console.log('标为未读被点击了') },
//       { text: '置顶聊天', onPress: () => console.log('置顶聊天被点击了') },
//     ]);
//   }

//   onButtonClick3 = () => {
//     Modal.prompt(
//       'Login',
//       'Pleas input login information',
//       (login, password) =>
//         console.log(`login: ${login}, password: ${password}`),
//       'login-password',
//       null,
//       ['Please input name', 'Please input password'],
//     );
//   }

//   onButtonClick4 = () => {
//     Modal.prompt(
//       'Input password',
//       'password message',
//       (password) => console.log(`password: ${password}`),
//       'secure-text',
//       'defaultValue',
//     );
//   }

//   onButtonClick5 = () => {
//     Modal.prompt(
//       'Name',
//       'name message',
//       (password) => console.log(`password: ${password}`),
//       'default',
//       null,
//       ['please input name'],
//     );
//   }
//   render() {
//     const footerButtons = [
//       { text: 'Cancel', onPress: () => console.log('cancel') },
//       { text: 'Ok', onPress: () => console.log('ok') },
//     ];
//     return (
//       <ScrollView style={{ marginTop: 20 }}>
//         <WingBlank>
//           {/* <Button onClick={() => this.setState({ visible: true })}>
//             showModal
//           </Button>
//           <WhiteSpace />
//           <Button onClick={() => this.setState({ visible1: true })}>
//             transparent:false
//           </Button>
//           <WhiteSpace /> */}
//           {/* <Button onClick={() => this.setState({ visible2: true })}>
//             popup
//           </Button> */}
//           {/* <WhiteSpace /> */}
//           {/* <Button onClick={this.onButtonClick}>Modal.alert</Button>
//           <WhiteSpace /> */}
//           {/* <Button onClick={this.onButtonClick2}>Modal.opertation</Button>
//           <WhiteSpace /> */}
//           <Button onClick={this.onButtonClick5}>Modal.prompt (default)</Button>
//           <WhiteSpace />
//           {/* <Button onClick={this.onButtonClick3}>
//             Modal.prompt (login-password)
//           </Button>
//           <WhiteSpace />
//           <Button onClick={this.onButtonClick4}>
//             Modal.prompt (secure-text)
//           </Button> */}
//         </WingBlank>
//         {/* <Modal
//           title="Title"
//           transparent
//           onClose={this.onClose}
//           maskClosable
//           visible={this.state.visible}
//           closable
//           footer={footerButtons}
//         >
//           <View style={{ paddingVertical: 20 }}>
//             <Text style={{ textAlign: 'center' }}>Content...</Text>
//             <Text style={{ textAlign: 'center' }}>Content...</Text>
//           </View>
//           <Button type="primary" inline onClick={this.onClose}>
//             close modal
//           </Button>
//         </Modal>
//         <Modal
//           transparent={false}
//           visible={this.state.visible1}
//           animationType="slide-up"
//           onClose={this.onClose1}
//         >
//           <View style={{ paddingVertical: 220 }}>
//             <Text style={{ textAlign: 'center' }}>Content...</Text>
//             <Text style={{ textAlign: 'center' }}>Content...</Text>
//           </View>
//           <Button type="primary" inline onClick={this.onClose1}>
//             close modal
//           </Button>
//         </Modal>
//         <Modal
//           popup
//           visible={this.state.visible2}
//           animationType="slide-up"
//           onClose={this.onClose2}
//         >
//           <View style={{ paddingVertical: 20, paddingHorizontal: 20 }}>
//             <Text style={{ textAlign: 'center' }}>Content...</Text>
//             <Text style={{ textAlign: 'center' }}>Content...</Text>
//           </View>
//           <Button type="primary" inline onClick={this.onClose2}>
//             close modal
//           </Button>
//         </Modal> */}
//       </ScrollView>
//     );
//   }
// }






// let SortableListView = require('./index')
// let React = require('react')
// let { View, Text, TouchableHighlight } = require('react-native')

// let data = {
//   0: { text: '1' },
//   1: { text: '2' },
//   2: { text: '3' },
//   3: { text: '4' },
//   4: { text: '5' },
//   5: { text: '6' },
//   6: { text: '7' },
//   7: { text: '8' },
//   8: { text: '9' },
//   9: { text: '10' },
//   10: { text: '11' },
//   11: { text: '12' },
//   12: { text: '13' },
//   13: { text: '14' },
//   14: { text: '15' },
//   15: { text: '16' },
//   16: { text: '17' },
// }

// let order = Object.keys(data) //Array of keys

// class RowComponent extends React.Component {
//   render() {
//     console.log(order);
//     return (
//       <TouchableHighlight
//         underlayColor={'#eee'}
//         style={{
//           padding: 25,
//           backgroundColor: '#F8F8F8',
//           borderBottomWidth: 1,
//           borderColor: '#eee',
//         }}
//         {...this.props.sortHandlers}
//       >
//         <Text>{this.props.data.text}</Text>
//       </TouchableHighlight>
//     )
//   }
// }

// class MyComponent extends React.Component {
//   render() {
//     return (
//       <SortableListView
//         style={{ flex: 1 }}
//         data={data}
//         order={order}
//         onRowMoved={e => {
//           order.splice(e.to, 0, order.splice(e.from, 1)[0])
//           this.forceUpdate()
//         }}
//         renderRow={row => <RowComponent data={row} />}
//       />
//     )
//   }
// }

// export default MyComponent



/**
 * Bootstrap of PickerTest
 */

// import React, {Component} from 'react';
// import {
//     View,
//     Text,
//     TextInput,
//     TouchableOpacity,
//     Dimensions
// } from 'react-native';

// import Picker from 'react-native-picker';
// import area from './area.json';

// export default class PickerTest extends Component {

//     constructor(props, context) {
//         super(props, context);
//     }

//     _createDateData() {
//         let date = [];
//         for(let i=1970;i<2020;i++){
//             let month = [];
//             for(let j = 1;j<13;j++){
//                 let day = [];
//                 if(j === 2){
//                     for(let k=1;k<29;k++){
//                         day.push(k+'日');
//                     }
//                     //Leap day for years that are divisible by 4, such as 2000, 2004
//                     if(i%4 === 0){
//                         day.push(29+'日');
//                     }
//                 }
//                 else if(j in {1:1, 3:1, 5:1, 7:1, 8:1, 10:1, 12:1}){
//                     for(let k=1;k<32;k++){
//                         day.push(k+'日');
//                     }
//                 }
//                 else{
//                     for(let k=1;k<31;k++){
//                         day.push(k+'日');
//                     }
//                 }
//                 let _month = {};
//                 _month[j+'月'] = day;
//                 month.push(_month);
//             }
//             let _date = {};
//             _date[i+'年'] = month;
//             date.push(_date);
//         }
//         return date;
//     }

//     _createAreaData() {
//         let data = [];
//         let len = area.length;
//         for(let i=0;i<len;i++){
//             let city = [];
//             for(let j=0,cityLen=area[i]['city'].length;j<cityLen;j++){
//                 let _city = {};
//                 _city[area[i]['city'][j]['name']] = area[i]['city'][j]['area'];
//                 city.push(_city);
//             }

//             let _data = {};
//             _data[area[i]['name']] = city;
//             data.push(_data);
//         }
//         return data;
//     }

//     _showDatePicker() {
//         Picker.init({
//             pickerData: this._createDateData(),
//             pickerFontColor: [255, 0 ,0, 1],
//             onPickerConfirm: (pickedValue, pickedIndex) => {
//                 console.log('date', pickedValue, pickedIndex);
//             },
//             onPickerCancel: (pickedValue, pickedIndex) => {
//                 console.log('date', pickedValue, pickedIndex);
//             },
//             onPickerSelect: (pickedValue, pickedIndex) => {
//                 console.log('date', pickedValue, pickedIndex);
//             }
//         });
//         Picker.show();
//     }

//     _showAreaPicker() {
//         Picker.init({
//             pickerData: this._createAreaData(),
//             selectedValue: ['河北', '唐山', '古冶区'],
//             onPickerConfirm: pickedValue => {
//                 console.log('area', pickedValue);
//             },
//             onPickerCancel: pickedValue => {
//                 console.log('area', pickedValue);
//             },
//             onPickerSelect: pickedValue => {
//                 //Picker.select(['山东', '青岛', '黄岛区'])
//                 console.log('area', pickedValue);
//             }
//         });
//         Picker.show();
//     }

//     _showTimePicker() {
//         let years = [],
//             months = [],
//             days = [],
//             hours = [],
//             minutes = [];

//         for(let i=1;i<51;i++){
//             years.push(i+1980);
//         }
//         for(let i=1;i<13;i++){
//             months.push(i);
//             hours.push(i);
//         }
//         for(let i=1;i<32;i++){
//             days.push(i);
//         }
//         for(let i=1;i<61;i++){
//             minutes.push(i);
//         }
//         let pickerData = [years, months, days, ['am', 'pm'], hours, minutes];
//         let date = new Date();
//         let selectedValue = [
//             date.getFullYear(),
//             date.getMonth()+1,
//             date.getDate(),
//             date.getHours() > 11 ? 'pm' : 'am',
//             date.getHours() === 12 ? 12 : date.getHours()%12,
//             date.getMinutes()
//         ];
//         Picker.init({
//             pickerData,
//             selectedValue,
//             pickerTitleText: 'Select Date and Time',
//             wheelFlex: [2, 1, 1, 2, 1, 1],
//             onPickerConfirm: pickedValue => {
//                 console.log('area', pickedValue);
//             },
//             onPickerCancel: pickedValue => {
//                 console.log('area', pickedValue);
//             },
//             onPickerSelect: pickedValue => {
//                 let targetValue = [...pickedValue];
//                 if(parseInt(targetValue[1]) === 2){
//                     if(targetValue[0]%4 === 0 && targetValue[2] > 29){
//                         targetValue[2] = 29;
//                     }
//                     else if(targetValue[0]%4 !== 0 && targetValue[2] > 28){
//                         targetValue[2] = 28;
//                     }
//                 }
//                 else if(targetValue[1] in {4:1, 6:1, 9:1, 11:1} && targetValue[2] > 30){
//                     targetValue[2] = 30;
                    
//                 }
//                 // forbidden some value such as some 2.29, 4.31, 6.31...
//                 if(JSON.stringify(targetValue) !== JSON.stringify(pickedValue)){
//                     // android will return String all the time，but we put Number into picker at first
//                     // so we need to convert them to Number again
//                     targetValue.map((v, k) => {
//                         if(k !== 3){
//                             targetValue[k] = parseInt(v);
//                         }
//                     });
//                     Picker.select(targetValue);
//                     pickedValue = targetValue;
//                 }
//             }
//         });
//         Picker.show();
//     }

//     _toggle() {
//         Picker.toggle();
//     }

//     _isPickerShow(){
//         Picker.isPickerShow(status => {
//             alert(status);
//         });
//     }

//     render() {
//         return (
//             <View style={{height: Dimensions.get('window').height}}>
//                 <TouchableOpacity style={{marginTop: 40, marginLeft: 20}} onPress={this._showDatePicker.bind(this)}>
//                     <Text>DatePicker</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity style={{marginTop: 10, marginLeft: 20}} onPress={this._showTimePicker.bind(this)}>
//                     <Text>TimePicker</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity style={{marginTop: 10, marginLeft: 20}} onPress={this._showAreaPicker.bind(this)}>
//                     <Text>AreaPicker</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity style={{marginTop: 10, marginLeft: 20}} onPress={this._toggle.bind(this)}>
//                     <Text>toggle</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity style={{marginTop: 10, marginLeft: 20}} onPress={this._isPickerShow.bind(this)}>
//                     <Text>isPickerShow</Text>
//                 </TouchableOpacity>
//                 <TextInput 
//                     placeholder="test picker with input"
//                     style={{
//                         height: 40,
//                         borderColor: 'gray',
//                         borderWidth: 1,
//                         marginLeft: 20,
//                         marginRight: 20,
//                         marginTop: 10,
//                         padding: 5
//                     }}
//                 />
//             </View>
//         );
//     }
// };





// import React from 'react';
// import { View, Text, TouchableOpacity } from 'react-native';
// import { List, Picker } from 'antd-mobile-rn';

// import { district } from '../../components/home/area';

// const CustomChildren = (props) => (
//   <TouchableOpacity onPress={props.onClick}>
//     <View
//       style={{ height: 36, paddingLeft: 15, flexDirection: 'row', alignItems: 'center' }}
//     >
//       <Text style={{ flex: 1 }}>{props.children}</Text>
//       <Text style={{ textAlign: 'right', color: '#888', marginRight: 15 }}>{props.extra}</Text>
//     </View>
//   </TouchableOpacity>
// );
// const seasons = [
//     {

//         label: '2013',
//         value: '2013',
//         children:[{
//             label: '我',
//             value: '我',
//         },{
//             label: '不',
//             value: '不',
//         }]
//     },{
//         label: '2014',
//         value: '2014',
//         children:[{
//             label: '知1',
//             value: '知1',
//         },{
//             label: '道1',
//             value: '道1',
//         },]
//     },
//     // [{   //不联动 
//     //     label: '春',
//     //     value: '春',
//     // },{
//     //     label: '夏',
//     //     value: '春',
//     // }],   
// ];
// export default class PopupExample extends React.Component {
//   constructor(props) {
//     super(props);
    
    
//     this.state = {
//       data: [],
//       value: [],
//       pickerValue: [],
//     };
//   }
//   onClick = () => {
//     // console.log('start loading data');
//     setTimeout(() => {
//       this.setState({
//         data: this.a,
//       });
//     }, 500);
//   }
//   onChange = (value) => {
//     // console.log(value);
//     this.setState({ value });
//   }
//   render() {
//     return (
//       <View style={{ marginTop: 30 }}>
//         <View>
//           <Picker
//             title="选择地区"
//             data={seasons}
//             cols={2}
//             cascade={true}
//             itemStyle={{ color:'red', fontSize: 15}}
//             indicatorStyle={{backgroundColor:'red'}}
//             // extra="请选择(可选)"
//             value={this.state.pickerValue}
//             onChange={(v) => this.setState({ pickerValue: v })}
//             onOk={(v) => this.setState({ pickerValue: v })}
//           >
//             <CustomChildren>Customized children</CustomChildren>
//           </Picker>
//         </View>
//       </View>
//     );
//   }
// }




// import React from 'react';
// import { ScrollView, Text, View } from 'react-native';
// import { Tabs } from 'antd-mobile-rn';

// const renderContent = (tab, index) => {
//   const style = {
//     paddingVertical: 40,
//     justifyContent: 'center',
//     alignItems: 'center',
//     margin: 10,
//     backgroundColor: '#ddd',
//   };
//   const content = [1, 2, 3, 4, 5, 6, 7, 8].map(i => {
//     return (
//       <View key={`${index}_${i}`} style={style}>
//         <Text>
//           {tab.title} - {i}
//         </Text>
//       </View>
//     );
//   });
//   return <ScrollView style={{ backgroundColor: '#fff' }}>{content}</ScrollView>;
// };
// export default class BasicTabsExample extends React.Component {
//   render() {
//     const tabs = [
//       { title: 'First Tab' },
//       { title: 'Second Tab' },
//       { title: 'Third Tab' },
//     ];
//     const tabs2 = [
//       { title: '1st Tab' },
//       { title: '2nd Tab' },
//       { title: '3rd Tab' },
//       { title: '4th Tab' },
//       { title: '5th Tab' },
//       { title: '6th Tab' },
//       { title: '7th Tab' },
//       { title: '8th Tab' },
//       { title: '9th Tab' },
//     ];
//     const style = {
//       alignItems: 'center',
//       justifyContent: 'center',
//       height: 150,
//       backgroundColor: '#fff',
//     };
//     return (
//       <View style={{ flex: 1 }}>
//         {/* <Tabs tabs={tabs} initialPage={1}>
//           <View style={style}>
//             <Text>Content of First Tab</Text>
//           </View>
//           <View style={style}>
//             <Text>Content of Second Tab</Text>
//           </View>
//           <View style={style}>
//             <Text>Content of Third Tab</Text>
//           </View>
//         </Tabs> */}
//         <View style={{ flex: 2 }}>
//           <Tabs tabs={tabs2} initialPage={1} tabBarPosition="top">
//             {renderContent}
//           </Tabs>
//         </View>
//       </View>
//     );
//   }
// }
// export const title = 'Tabs';
// export const description = 'Tabs example';


// import React, {Component} from 'react';
// import {View, SectionList, Text, ActivityIndicator, StyleSheet} from 'react-native';
// import {queryMovies, comingMovies} from '../common/aa';
// import MovieItemCell from "./MovieItemCell";

// export default class MovieListScreen extends Component {
  
//   static navigationOptions = {
//     headerTitle: '豆瓣电影'
//   };
  
//   constructor(props) {
//     super(props);
//     this.state = {
//       displayingMovies: [],  // 正在上映的电影数据
//       incomingMovies: [],    // 即将上映的电影数据
//       sectionData: [],      // SectionList数据源
//       loaded: false,  // 用来控制loading视图的显示，当数据加载完成，loading视图不再显示
//     };
//   }
  
//   componentDidMount() {
//     this.loadDisplayingMovies();
//   }
  
//   render() {
//     if (!this.state.loaded) {
//       return (
//         <View style={styles.loadingView}>
//           <ActivityIndicator animating={true} size="small"/>
//           <Text style={{color: '#666666', paddingLeft: 10}}>努力加载中</Text>
//         </View>
//       )
//     }
//     return (
//       <SectionList
//         keyExtractor={this._keyExtractor}
//         renderSectionHeader={this._renderSectionHeader}
//         renderItem={this._renderItem}
//         sections={this.state.sectionData}
//       />
//     )
//   }
  
//   _keyExtractor = (item) => item.id;
  
//   _renderSectionHeader = (item) => {
//     let sectionObj = item.section;
//     let sectionIndex = sectionObj.index;
//     let title = (sectionIndex === 0) ? "正在上映" : "即将上映";
//     return (
//       <View style={styles.sectionHeader}>
//         <Text style={styles.sectionTitle}>{title}</Text>
//       </View>
//     )
//   };
  
//   _renderItem = (item) => {
//     return (
//       <MovieItemCell movie={item.item} onPress={() => {
//         console.log('点击了电影----' + item.item.title);
//       }}/>
//     )
//   };
  
//   /**
//    * 先加载正在上映的电影列表，如果加载成功，接着获取即将上映的电影数据
//    */
//   loadDisplayingMovies() {
//     let that = this;
//     fetch(queryMovies('北京', 0, 20)).then((response) => response.json()).then((json) => {
//       console.log(json);
//       let movies = [];
//       for (let idx in json.subjects) {
//         let movieItem = json.subjects[idx];
//         let directors = ""; // 导演
//         for (let index in movieItem.directors) {
//           // 得到每一条电影的数据
//           let director = movieItem.directors[index];
//           // 将多个导演的名字用空格分隔开显示
//           if (directors === "") {
//             directors = directors + director.name
//           } else {
//             directors = directors + " " + director.name
//           }
//         }
//         movieItem["directorNames"] = directors;
        
//         // 拼装主演的演员名字，多个名字用空格分隔显示
//         let actors = "";
//         for (let index in movieItem.casts) {
//           let actor = movieItem.casts[index];
//           if (actors === "") {
//             actors = actors + actor.name
//           } else {
//             actors = actors + " " + actor.name
//           }
//         }
//         movieItem["actorNames"] = actors;
//         movies.push(movieItem)
//       }
//       that.setState(
//         {
//           displayingMovies: movies,
//         },
//         () => {
//           // 加载完正在上映的电影后再接着加载即将上映的电影数据
//           that.loadComingMovies();
//         }
//       )
//     }).catch((e) => {
//       console.log("加载失败");
//       that.setState({
//         loaded: true
//       })
//     }).done();
//   }
  
//   /**
//    * 加载即将上映的电影列表，并更新sectionData刷新列表
//    */
//   loadComingMovies() {
//     let that = this;
//     fetch(comingMovies('北京', 0, 20)).then((response) => response.json()).then((json) => {
//       console.log(json);
//       if (json == null) {
//         that.setState({
//           loaded: true,
//         });
//         return
//       }
//       let movies = [];
//       for (let idx in json.subjects) {
//         let movieItem = json.subjects[idx];
//         let directors = "";
//         for (let index in movieItem.directors) {
//           let director = movieItem.directors[index];
//           if (directors === "") {
//             directors = directors + director.name
//           } else {
//             directors = directors + " " + director.name
//           }
//         }
//         movieItem["directorNames"] = directors;
        
//         let actors = "";
//         for (let index in movieItem.casts) {
//           let actor = movieItem.casts[index];
//           if (actors === "") {
//             actors = actors + actor.name
//           } else {
//             actors = actors + " " + actor.name
//           }
//         }
//         movieItem["actorNames"] = actors;
//         movies.push(movieItem)
//       }
//       // 两个电影数据都加载完成后需要更新sectionData，将数据在界面上显示出来
//       let sectionList = [
//         {data: that.state.displayingMovies, index: 0},
//         {data: movies, index: 1},
//       ];
//       that.setState({
//         loaded: true,
//         incomingMovies: movies,
//         sectionData: sectionList
//       });
//     }).catch((error) => {
//       console.log("加载失败");
//       that.setState({
//         loaded: true
//       })
//     }).done();
//   }
// }

// const styles = StyleSheet.create({
//   loadingView: {
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 10
//   },
//   sectionHeader: {
//     padding: 10,
//     backgroundColor: '#f3c2a1'
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight:'bold'
//   }
// });







// import React, { Component } from 'react';
// import {
//   AppRegistry,
//   View,
//   Text,
//   SectionList,
// } from 'react-native';



// export default class ConnectGuide extends React.Component {

//   constructor(props) {
//     super(props);
//   }

//   _renderItem = (info) => {
//     var txt = '  ' + info.item.title;
//     return <Text
//       style={{ height: 60, textAlignVertical: 'center', backgroundColor: "#ffffff", color: '#5C5C5C', fontSize: 15 }}>{txt}</Text>
//   }

//   _sectionComp = (info) => {
//     var txt = info.section.key;
//     return <Text
//       style={{ height: 50, textAlign: 'center', textAlignVertical: 'center', backgroundColor: '#9CEBBC', color: 'white', fontSize: 30 }}>{txt}</Text>
//   }

//   render() {
//     var sections = [
//       { key: "A", data: [{ title: "阿童木" }, { title: "阿玛尼" }, { title: "爱多多" }] },
//       { key: "B", data: [{ title: "表哥" }, { title: "贝贝" }, { title: "表弟" }, { title: "表姐" }, { title: "表叔" }] },
//       { key: "C", data: [{ title: "成吉思汗" }, { title: "超市快递" }] },
//       { key: "W", data: [{ title: "王磊c" }, { title: "王者荣耀" }, { title: "往事不能回味" },{ title: "王小磊" }, { title: "王中磊" }, { title: "王大磊" }] },
//     ];

//     return (
//       <View style={{ flex: 1 }}>
//         <SectionList
//           renderSectionHeader={this._sectionComp}
//           renderItem={this._renderItem}
//           sections={sections}
//           ItemSeparatorComponent={() => <View><Text></Text></View>}
//           ListHeaderComponent={() => <View style={{ backgroundColor: '#25B960', alignItems: 'center', height: 30 }}><Text style={{ fontSize: 18, color: '#ffffff' }}>通讯录</Text></View>}
//           ListFooterComponent={() => <View style={{ backgroundColor: '#25B960', alignItems: 'center', height: 30 }}><Text style={{ fontSize: 18, color: '#ffffff' }}>通讯录尾部</Text></View>}
//         />
//       </View>
//     );
//   }

// }




// import Swipeout from 'react-native-swipeout';
// //  example row data (see for json structure)
// import rows from './data';
// //  example styles
// import styles from './styles';

// import React, {Component} from 'react';
// import {AppRegistry, StyleSheet, ListView, Text, View, TouchableWithoutFeedback} from 'react-native';

// //  example swipout app
// class SwipeoutExample extends Component {

//   constructor() {
//     super();

//     //  datasource rerendered when change is made (used to set swipeout to active)
//     var ds = new ListView.DataSource({rowHasChanged: (row1, row2) => true});

//     this.state = {
//       dataSource: ds.cloneWithRows(rows),
//       sectionID: null,
//       rowID: null,
//     };
//   }

//   _renderRow(rowData, sectionID, rowID) {
//     return (
//       <Swipeout
//         close={!(this.state.sectionID === sectionID && this.state.rowID === rowID)}
//         left={rowData.left}
//         right={rowData.right}
//         rowID={rowID}
//         sectionID={sectionID}
//         autoClose={rowData.autoClose}
//         backgroundColor={rowData.backgroundColor}
//         onOpen={(sectionID, rowID) => {
//           this.setState({
//             sectionID,
//             rowID,
//           })
//         }}
//         onClose={() => console.log('===close') }
//         scroll={event => console.log('scroll event') }
//       >
//         <TouchableWithoutFeedback onPress={() => console.log('press children')}>
//           <View style={styles.li} >
//             <Text style={styles.liText}>{rowData.text}</Text>
//           </View>
//         </TouchableWithoutFeedback>
//       </Swipeout>
//     );
//   }

//   render() {
//     return (
//       <View style={styles.container}>
//         <View style={styles.statusbar}/>
//         <View style={styles.navbar}><Text style={styles.navbarTitle}>Swipeout</Text></View>
//         <ListView
//           scrollEnabled
//           dataSource={this.state.dataSource}
//           renderRow={this._renderRow.bind(this)}
//           style={styles.listview}
//         />
//       </View>
//     );
//   }

// }





// import React from 'react';
// import { ScrollView, Text, View } from 'react-native';
// import Touch from 'react-native-touch-once';
// import {
//   Button,
//   Modal,
//   WhiteSpace,
//   WingBlank,
//   Toast,
//   Provider,
// } from 'antd-mobile-rn';
// // import { Modal, Toast } from 'antd-mobile-rn';
// export default class ConnectGuide extends React.Component {
//   constructor(props) {
//     super(props);
//     this.onClose = () => {
//       this.setState({
//         visible: false,
//       });
//     };
//     this.onClose1 = () => {
//       this.setState({
//         visible1: false,
//       });
//     };
//     this.onClose2 = () => {
//       this.setState({
//         visible2: false,
//       });
//     };
//     this.onButtonClick = () => {
//       Modal.alert('Title', 'alert content', [
//         {
//           text: 'Cancel',
//           onPress: () => console.log('cancel'),
//           style: 'cancel',
//         },
//         { text: 'OK', onPress: () => console.log('ok') },
//       ]);
//     };
//     this.onButtonClick2 = () => {
//       Modal.operation([
//         { text: '标为未读', onPress: () => console.log('标为未读被点击了') },
//         { text: '置顶聊天', onPress: () => console.log('置顶聊天被点击了') },
//       ]);
//     };
//     this.onButtonClick3 = () => {
//       Modal.prompt(
//         'Login',
//         'Pleas input login information',
//         (login, password) =>
//           console.log(`login: ${login}, password: ${password}`),
//         'login-password',
//         null,
//         ['Please input name', 'Please input password']
//       );
//     };
//     this.onButtonClick4 = () => {
//       Modal.prompt(
//         'Input password',
//         'password message',
//         password => console.log(`password: ${password}`),
//         'secure-text',
//         'defaultValue'
//       );
//     };
//     this.onButtonClick5 = () => {
//       Modal.prompt(
//         'Name',
//         'name message',
//         password => console.log(`password: ${password}`),
//         'default',
//         null,
//         ['please input name']
//       );
//     };
//     this.state = {
//       visible: false,
//       visible1: false,
//       visible2: false,
//     };
//   }
//   render() {
//     const footerButtons = [
//       { text: 'Cancel', onPress: () => console.log('cancel') },
//       { text: 'Ok', onPress: () => console.log('ok') },
//     ];
//     return (
//       <ScrollView style={{ marginTop: 20 }}>
//         <WingBlank>
//           <Touch onPress={() => {
//             this.setState({ visible: true })
//             }}>
//             <Text>showModal</Text>
//           </Touch>
//           <WhiteSpace />
//           <Button onPress={() => this.setState({ visible1: true })}>
//             transparent:false
//           </Button>
//           <WhiteSpace />
//           <Button onPress={() => this.setState({ visible2: true })}>
//             popup
//           </Button>
//           <WhiteSpace />
//           <Button onPress={this.onButtonClick}>Modal.alert</Button>
//           <WhiteSpace />
//           <Button onPress={this.onButtonClick2}>Modal.opertation</Button>
//           <WhiteSpace />
//           <Touch onPress={this.onButtonClick5}>
//             <Text>Modal.prompt (default)</Text>
//           </Touch>
//           <WhiteSpace />
//           <Button onPress={this.onButtonClick3}>
//             Modal.prompt (login-password)
//           </Button>
//           <WhiteSpace />
//           <Button onPress={this.onButtonClick4}>
//             Modal.prompt (secure-text)
//           </Button>
//         </WingBlank>
//         <Modal
//           title="Title"
//           transparent
//           onClose={this.onClose}
//           maskClosable
//           visible={this.state.visible}
//           closable
//           footer={footerButtons}
//         >
//           <View style={{ paddingVertical: 20 }}>
//             <Text style={{ textAlign: 'center' }}>Content...</Text>
//             <Text style={{ textAlign: 'center' }}>Content...</Text>
//           </View>
//           <Button type="primary" onPress={this.onClose}>
//             close modal
//           </Button>
//         </Modal>
//         <Modal
//           transparent={false}
//           visible={this.state.visible1}
//           animationType="slide-up"
//           onClose={this.onClose1}
//         >
//           <View style={{ paddingVertical: 220 }}>
//             <Text style={{ textAlign: 'center' }}>Content...</Text>
//             <Text style={{ textAlign: 'center' }}>Content...</Text>
//           </View>
//           <Button
//             type="primary"
//             onPress={() => Toast.info('Hello Toast in Modal now works')}
//           >
//             Hello Toast in Modal now works
//           </Button>
//           <Button type="primary" onPress={this.onClose1}>
//             close modal
//           </Button>
//         </Modal>
//         <Modal
//           popup
//           visible={this.state.visible2}
//           animationType="slide-up"
//           onClose={this.onClose2}
//         >
//           <View style={{ paddingVertical: 20, paddingHorizontal: 20 }}>
//             <Text style={{ textAlign: 'center' }}>Content...</Text>
//             <Text style={{ textAlign: 'center' }}>Content...</Text>
//           </View>
//           <Button type="primary" onPress={this.onClose2}>
//             close modal
//           </Button>
//         </Modal>
//       </ScrollView>
//     );
//   }
// }
// export default () => (
//   <Provider>
//     <BasicModalExample />
//   </Provider>
// );





// import React from 'react';
// import { View, StyleSheet } from 'react-native';
// import { DatePicker, List, LocaleProvider } from 'antd-mobile-rn';
// import enUS from 'antd-mobile-rn/lib/locale-provider/en_US';
// import date_picker_locale from 'antd-mobile-rn/lib/date-picker/locale/en_US';
// export default class ConnectGuide extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       value: undefined,
//     };
//   }

//   onChange = (value) => {
//     this.setState({ value });
//     console.log(value)
//   }

//   render() {
//     return (
//       <View>
//         {/* <LocaleProvider locale={enUS}> */}
//           <List>
//             <DatePicker
//               value={this.state.value}
//               mode="time"
//               // minDate={new Date(2015, 7, 6)}
//               // maxDate={new Date(2026, 11, 3)}
//               onChange={this.onChange}
//               // format="YYYY-MM-DD"
//               // extra="choose"
//               // okText='OK'
//               // dismissText = 'CANCEL'
//               format="HH:mm"
//               locale={date_picker_locale}
//               // itemStyle={styles.avc}
//               itemStyle={{ color:'red', fontSize: 15}}
//             >
//               <List.Item arrow="horizontal">Select Date</List.Item>
//             </DatePicker>
//           </List>
//         {/* </LocaleProvider> */}
//       </View>
//     );
//   }
// }



// const styles = StyleSheet.create({
//   styles:{
//       color:'red',
//       fontSize:12
//   },
  
// });










// import React, { Component } from 'react';
// import { Text, SafeAreaView,View,  } from 'react-native';
// import { NetworkInfo } from 'react-native-network-info';
// var net = require('net');

// export default class ConnectGuide extends Component {
//   constructor(props) {
//     super(props);
//     this.ip = "";
//     this.state = {
//       tuningSocket:'',
//     };
//   }


  // componentWillMount() {
  //   let socketURL= "";
  //   NetworkInfo.getIPV4Address(ipv4 => {
  //     console.log(ipv4); 
     
  //     // console.log(net)

  //       // var server = net.createServer(function(socket) {
  //       //     socket.write('excellent!');
  //       //     console.log(socket)
  //       // }).listen(1234);
  //       // console.log(server)

  //       // var client = net.createConnection(1234);

  //       // client.on('error', function(error) {
  //       //   console.log(error)
  //       // });
        
  //       // client.on('data', function(data) {
  //       //   console.log('message was received', data)
  //       // });
  //       // socketURL = ipv4;
  //   });




  //   var server = net.createServer(function(socket) {
  //     socket.write('excellent!');
  //     console.log(socket)
  // }).listen(1234);

  // socket.on('data', (data) => {
  //   console.log(data)
  // });


  // const client = new net.Socket();
  
  // client.connect("12344", socketURL, () => {
  //   client.write('get_data');
  // });
  
  // client.on('data', (data) => { 
  //   console.log(data);
  // })





  // var client = net.createConnection(1234);

  // client.on('error', function(error) {
  //   console.log(error)
  // });
  
  // client.on('data', function(data) {
  //   console.log('message was received', data)
  // });



  //   let socket = new net.Socket();
  //   socket.connect(8081, socketURL, () => {
  //   });

  // socket.on('error', (error) => {
  //     console.log(error);
  //     socket.destroy();
  // });

  // socket.on('timeout', () => {
  //     socket.end();
  // });

  // socket.on('close', function() {
  //     socket.destroy();
  // });
  // let socketClient = new net.Socket();

  //   socketClient.connect(8081, socketURL, function() {
  //       console.log('Connected');
  //       console.log(socketURL+"---------")
  //       //client.write('Hello, server! Love, Client.');
  //   });

  //   socketClient.on('data', function(data) {
  //       console.log('Received: ' + data);
  //       socketClient.destroy(); // kill client after server's response
  //   });
  //   socketClient.on('close', function() {
  //       console.log('Connection closed');
  //   });

  //   this.setState({tuningSocket: socketClient})


//   }


//   render() {
//     return (
//       <SafeAreaView >
//         <View>
//           <Text>jiushishihgfgisanm</Text>
//         </View>
       
//       </SafeAreaView>
//     );
//   }
// }










// import React, { Component } from 'react';
// import {
//   ScrollView,
//   StyleSheet,
//   Text,
//   View
// } from 'react-native';
// import { NetworkInfo } from 'react-native-network-info';


// var net = require('net');

// function randomPort() {
//   return Math.random() * 60536 | 0 + 5000; // 60536-65536
// }

// var serverPort = randomPort();

// export default class ConnectGuide extends Component {
//   constructor(props) {
//     super(props);

//     this.updateChatter = this.updateChatter.bind(this);
//     this.state = { chatter: [] };
//   }

//   updateChatter(msg) {
//     this.setState({
//         chatter: this.state.chatter.concat([msg])
//     });
//   }

//   componentDidMount() {

//       NetworkInfo.getIPV4Address(ipv4 => {
//       alert(ipv4); 
//     });


//     let server = net.createServer((socket) => {
//       this.updateChatter('server connected on ' + JSON.stringify(socket.address()));
//       console.log(JSON.stringify(socket.address())+"------socket.address")
//       alert(JSON.stringify(socket.address()))

//       socket.on('data', (data) => {
//         this.updateChatter('Server Received: ' + data);
//         console.log(data)
//         alert(data)
//         socket.write('Echo server\r\n');
//       });


//       socket.on('error', (error) => {
//         alert('error ' + error)
//         this.updateChatter('error ' + error);
//       });


//       socket.on('close', (error) => {
//         alert('server client closed ' + (error ? error : ''))
//         this.updateChatter('server client closed ' + (error ? error : ''));
//       });

//     // }).listen(serverPort, () => {
//     //   console.log(serverPort)
//     //     this.updateChatter('opened server on ' + JSON.stringify(server.address()));
//     //     console.log(JSON.stringify(server.address()) + "------server.address")
//     //   });
//     }).listen(3389);     // 端口号，现在随便写

//     server.on('error', (error) => {
//       this.updateChatter('error ' + error);
//     });

//     server.on('close', () => {
//       this.updateChatter('server close');
//     });

//     // let client = net.createConnection(serverPort, () => {
//     //   this.updateChatter('opened client on ' + JSON.stringify(client.address()));
//     //   client.write('Hello, server! Love, Client.');
//     // });

//     // client.on('data', (data) => {
//     //   this.updateChatter('Client Received: ' + data);

//     //   this.client.destroy(); // kill client after server's response
//     //   this.server.close();
//     // });

//     // client.on('error', (error) => {
//     //   this.updateChatter('client error ' + error);
//     // });

//     // client.on('close', () => {
//     //   this.updateChatter('client close');
//     // });

//     this.server = server;
//     // this.client = client;
//   }

//   componentWillUnmount() {
//     this.server.on('close', () => {
//       this.updateChatter('server close');
//     });
//     this.server = null;
//     // this.client = null;
//   }

//   render() {
//     return (
//       <View style={styles.container}>
//         <ScrollView>
//           {this.state.chatter.map((msg, index) => {
//             return (
//               <Text key={index} style={styles.welcome}>
//                 {msg}
//               </Text>
//             );
//           })}
//         </ScrollView>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });















import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import  "../../../shim";
import { NetworkInfo } from 'react-native-network-info';
import Touch from 'react-native-touch-once';

var net = require('net');

function randomPort() {
  return Math.random() * 60536 | 0 + 5000; // 60536-65536
}

var serverPort = randomPort();
let currentIp = '';
export default class ConnectGuide extends Component {
  constructor(props) {
    super(props);

    this.updateChatter = this.updateChatter.bind(this);
    this.state = { chatter: [] };
    NetworkInfo.getIPV4Address(ipv4 => {
      // currentIp = ipv4; 
      currentIp = String(ipv4)  ;
    });
  this.server = null;
  }

  updateChatter(msg) {
    this.setState({
        chatter: this.state.chatter.concat([msg])
    });
  }

  componentDidMount() {

    

    // let server = net.createServer((socket) => {
    //   this.updateChatter('server connected on: ' + JSON.stringify(socket.address()));

    //   this.updateChatter('socket  : ' + socket);

    //   socket.on('data', (data) => {
    //     this.updateChatter('Server Received: ' + data);
    //     socket.write('Test');
    //   });

    //   socket.on('error', (error) => {
    //     this.updateChatter('error ' + error);
    //   });

    //   socket.on('close', (error) => {
    //     this.updateChatter('server client closed ' + (error ? error : ''));
    //   });
    // }).listen(3389, currentIp);
    // }).listen({port: 3389, host: currentIp}, () => {
    //   alert(currentIp)
    //   this.updateChatter('opened server on ' + JSON.stringify(server.address()));
    // });

    // server.on('error', (error) => {
    //   this.updateChatter('error ' + error);
    // });

    // server.on('close', () => {
    //   this.updateChatter('server close');
    // });

    // let client = net.createConnection(serverPort, () => {
    //   this.updateChatter('opened client on ' + JSON.stringify(client.address()));
    //   client.write('Hello, server! Love, Client.');
    // });

    // client.on('data', (data) => {
    //   this.updateChatter('Client Received: ' + data);

    //   this.client.destroy(); // kill client after server's response
    //   this.server.close();
    // });

    // client.on('error', (error) => {
    //   this.updateChatter('client error ' + error);
    // });

    // client.on('close', () => {
    //   this.updateChatter('client close');
    // });

    // this.server = server;
    // this.client = client;
  }

  componentWillUnmount() {
    this.server.close();
    this.server = null;
    // this.client = null;
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
        <Touch
                      onPress={() => {
                        let server = net.createServer((socket) => {
                          this.updateChatter('server connected on: ' + JSON.stringify(socket.address()));
                    
                          this.updateChatter('socket  : ' + socket);
                    
                          socket.on('data', (data) => {
                            this.updateChatter('Server Received: ' + data);
                            socket.write('Test');
                          });
                    
                          socket.on('error', (error) => {
                            this.updateChatter('error ' + error);
                          });
                    
                          socket.on('close', (error) => {
                            this.updateChatter('server client closed ' + (error ? error : ''));
                          });
                        })
                        server.listen({port: 3389, host: currentIp}, () => {
                          this.updateChatter('opened server on ' + JSON.stringify(server.address()));
                        });

                        server.on('error', (error) => {
                          this.updateChatter('error ' + error);
                        });

                        server.on('close', () => {
                          this.updateChatter('server close');
                        });

                        this.server = server;
                      }}
                    >
            <Text>点击</Text>
          </Touch>
          {this.state.chatter.map((msg, index) => {
            return (
              <Text key={index} style={styles.welcome}>
                {msg}
              </Text>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

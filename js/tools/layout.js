import { StyleSheet, Dimensions, Platform } from 'react-native';
import px2dp from './px2dp';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export let commonStyles = StyleSheet.create({
  flexBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  flexBoxColumn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containWrap: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  containGrayWrap: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  padLR20:{
    paddingHorizontal:20
  },
  paddingTB20:{
    paddingVertical:20
  },
  buttonBox:{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor:'#EF5325',
    borderRadius:4,
    height:46
  },
  buttonText:{
    fontSize:17,
    color:'#fff',
    textAlign:'center'
  },
  // tab 大标题
  tabSortTitle: {
    paddingTop: 8,
    paddingBottom: 18,
    color: '#000',
    fontSize: 34,
    lineHeight: 48,
    backgroundColor:'#fff'
  },
  deviceList:{
    paddingVertical: 14, 
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F2'
  },
  deviceImg:{
    width:50,
    height: 50
  },
  deviceName:{
    fontSize: 17,
    flex:1,
    // paddingHorizontal: 20
  },
  moreIconSty:{
    width:30,
    height:30
  },
  sceneModule:{
    marginTop:20,
    marginBottom: 4,
    paddingTop:12,
    paddingBottom:17,
    backgroundColor: '#fff',
    elevation: 2,
    shadowOffset: {width: 0, height: 2},
    shadowColor: 'black',
    shadowOpacity: .1,
    shadowRadius: 5,
    borderRadius:4,
    paddingRight:16
  },
  sceneName:{
    color:'#2C2D30',
    fontSize:16,
    // fontFamily: 'SF-Pro-Display-Regular',
  },
  sceneDeviceNum:{
    fontSize:12,
    color:'#8E8E93',
    marginTop:13
  },
  noneLineList:{
    height:46,
    marginTop:22,
    paddingHorizontal:20,
    // backgroundColor: 'red'
  },
  memberList:{
    marginBottom:30,
    paddingHorizontal:20
  },
  memberImg:{
    width:46,
    height:46,
    borderRadius: 23,
    marginRight:12
  },
  memberInfo:{
    flex:1,
    display: 'flex',
    height:46
  },
  memberName:{
    fontSize:17,
    color:'#2C2D30',
    height:23,
    lineHeight:23
  },
  memberTel:{
    fontSize:14,
    color:'#595959',
    height:23,
    lineHeight:23
  },
  addItemsBox:{
    height:64,
    marginTop:16,
    backgroundColor:'#fff',
    paddingHorizontal:20
  },
  // 新增的btn图片样式
  addItemsImg:{
    width:24,
    height:24,
    marginRight:10
  },
  addItemsText:{
    color:'#FCBF00',
    fontSize:17,
    flex:1,
    fontWeight:'bold'
  },
  editorDelImg:{
    width:24,
    height:24,
    marginRight:20
  },
  currentRoomDevices:{
    marginTop: 16,
    backgroundColor:'#fff',
  },
  currentRoomDevTextBox:{
    flex:1,
    marginLeft: 20
  },
  deviceText:{
    fontSize:17,
    color:'#2C2D30'
  },
  deviceTextStatus:{
    fontSize: 16,
    color:'#E4002B',
    marginTop:10
  },
  addDevicesBox:{
    backgroundColor:'#fff'
  },
  noHere:{
    fontSize:15,
    color:'#8E8D94',
    padding:20,
    backgroundColor:'#F8F8F8'
  },
  writeCon:{
    flex:2,
    color:'#595959',
    fontSize:16,
  },
  homeContainerBox:{
    paddingTop:5, 
    paddingBottom:27, 
    backgroundColor:'#fff'
  },
  setionListBox:{
    paddingHorizontal: 20,
    backgroundColor:'#fff',
    marginTop: 16
  },
  setionItems:{
    height:62
  },
  setionItemText:{
    fontSize:17,
    color:'#2C2D30',
    flex:1
  },
  familyName:{
    color:'#9B9B9B',
    fontSize:15,
    flex:2,
    textAlign:'right',
  },
  lineSty:{
    borderBottomColor:'#F2F2F2',
    borderBottomWidth: 1
  },
  addPerformBox:{
    paddingBottom: 40,
  },
  performTit:{
    fontSize: 17,
    color:'#2C2D30',
    paddingVertical: 20
  },
  performWrap:{
    height: 60,
    borderRadius: 4,
    borderColor: '#D5D5D5',
    borderWidth: 1,
    borderStyle: 'dashed'
  },
  performText:{
    fontSize: 16,
    color:'#9B9B9B'
  },
  noDevices:{
    position: 'absolute',
    bottom: 60,
    left: 0,
    width: '100%'
  },
  popMask: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: 'rgba(0,0,0,0.4)',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  switchStyle: {
    transform: [{ scaleX: Platform.OS === 'android' ? .8 : .7 }, { scaleY: Platform.OS === 'android' ? .8 : .7 }]
  },
  delBtn: { 
    borderColor:'#FCBF00',
    borderWidth:1,
    height:30,
    borderRadius:3
 },
 delText:{
     color:'#FCBF00',
     fontSize:13,
     paddingHorizontal: 15
 },
 loadingText:{
   width: 68,
   height: 68
 }
});

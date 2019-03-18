// API服务器域名
// const apiUrl = 'http://52.162.235.249:8080/api/v1';
const apiUrl = 'http://52.162.235.249/api/v1';
// const apiUrl = 'http://192.168.31.116:8000/api/v1';
const MEMBER = '/members/';

// 注册=========
const REGISTER_URL = '/iotservice/users/';

// 登录=========
const SIGNIN_URL = '/iotservice/login/';

// 验证码
const SMS_CODE_URL = '/iotservice/sms/';

// 忘记密码/重置密码
const SET_UP_PASSWORD_URL = '/iotservice/password/';

// 退出手机号登录
const SIGN_OUT_URI = '/iotservice/logout/';

// 绑定设备
const BIND_EQUIPMENTS_URI = '/iotservice/homes/equipments/';


// TAB 1 ========> 我的家
// 我的家-获取各个房间设备列表
const MY_HOME_DEVICES_URI = '/iotservice/homes/';

// 获取用户的家庭列表
const USER_FAMILY_LIST_URI = '/iotservice/users/';

// 我的家-获取家庭信息 &&  修改家庭信息(put)
const FAMILY_SETUP_URI = '/iotservice/homes/';

// 添加家庭
const ADD_FAMILY_URI = '/iotservice/users/';

// 删除家庭
const DELETE_FAMILY_URI = '/iotservice/homes/';

// 我的家-房间管理
const ROOM_MANAGE_LIST_URI = '/iotservice/homes/';

//我的家-成员管理
const FAMILY_MEMBER_URI = '/iotservice/homes/' 

// 家庭下添加房间
const ADD_ROOMS_URI = '/iotservice/homes/';

// 修改房间名称
const UPDATE_ROOM_NAME_URI = '/iotservice/homes/rooms/';

// 家庭下删除房间
const DELETE_ROOMS_URI = '/iotservice/homes/';

// 我的家-非首页其他房间获取设备（房间设置）
const ROOM_SETUP_URI = '/iotservice/rooms/';

// 删除家庭成员 
const DELETE_FAMILY_MEMBER_URI = '/iotservice/homes/';

// 添加家庭成员
const ADD_FAMILY_MEMBER_UTI = '/iotservice/homes/';

// 首页展示-控制设备
const HOME_CONTROL_DEV_URI = '/iotservice/rooms/1/equipments/';  //id 是roomID(post请求，路由中1是固定的)

// 房间内添加或者移除设备
const ROOMS_ADD_OR_DEL_DEV_URI = '/iotservice/rooms/';

// 删除设备
const DELETE_DEVICE_URI = '/iotservice/rooms/equipments/';

// 获取设备状态 && 操作设备
const GET_DEVICES_STATUS_URI = '/iotservice/equipments/';
// MySimulatorPythonDevice





// TAB 2 ========> 智能
// 智能-我的场景  && 删除场景  && 执行场景
const SMART_SCENE_URL = '/iotservice/homes/';  ///

// 获取场景内容
const SCENES_CONTENT_URI = '/iotservice/scenes/';

// 添加/创建场景
const ADD_SCENES_URI = '/iotservice/homes/';

// 修改场景名称 && 修改场景Icon && 修改场景内容
const UPDATE_SCENE_NAME_URI = '/iotservice/scenes/';

// 场景内选择设备
const CHOOSE_DEVICE_FOR_SCENE_URL = '/iotservice/scenes/equipments/';

// 查询自动化列表 && 创建自动化
const AUTOMATION_LIST_URI = '/iotservice/homes/';   ////

// 查看自动化内容  &&  删除自动化 &&  修改自动化名字，Icon
// 自动化内容页-编辑-自动化条件添加  &&  自动化条件删除  &&  自动化条件修改 （每个操作单独接口）
// 自动化内容页-编辑-自动化动作（场景和设备）添加  &&  自动化动作（场景和设备）删除  &&  自动化动作（场景和设备）修改 （每个操作单独接口）
// 执行自动化
const AUTOMATION_CONTNET_URI = '/iotservice/homes/automations/';



// TAB 3 ========> 我的
// 获取用户详情 && 修改用户详情（现在只有昵称）
const USER_INFO_URL = '/iotservice/users/';

// 修改用户头像
const UPDATE_USER_HEADER_IMG_URL = '/iotservice/uploads/';

// 意见反馈
const FEEDBACK_URL= '/iotservice/feedbacks/';

// 设备共享 (共享)
const DEVICE_SHARE_URL = '/iotservice/shareequipments/?share=to'; 

// 设备共享 (接受)
const DEVICE_ACCEPT_URL = '/iotservice/shareequipments/?share=from'; 

// 查看设备共享给哪些用户
const DEVICE_SHARE_USER_URL = '/iotservice/shareequipments/';

// 添加共享（共享设备给成员） && 删除共享的设备
const ADD_SHARE_DEVICE_URL = '/iotservice/shareequipments/';

// 检查新版本
const CHECK_VERSION_URL = '/iotservice/versions/' 

export {
  apiUrl,
  MEMBER,
  SIGNIN_URL,
  SIGN_OUT_URI,
  SMS_CODE_URL,
  REGISTER_URL,
  FEEDBACK_URL,
  USER_INFO_URL,
  ADD_ROOMS_URI,
  ADD_SCENES_URI,
  ROOM_SETUP_URI,
  ADD_FAMILY_URI,
  SMART_SCENE_URL,
  DEVICE_SHARE_URL,
  FAMILY_SETUP_URI,
  DELETE_ROOMS_URI,
  CHECK_VERSION_URL,
  DEVICE_ACCEPT_URL,
  DELETE_FAMILY_URI,
  DELETE_DEVICE_URI,
  FAMILY_MEMBER_URI,
  SCENES_CONTENT_URI,
  BIND_EQUIPMENTS_URI,
  SET_UP_PASSWORD_URL,
  AUTOMATION_LIST_URI,
  MY_HOME_DEVICES_URI,
  USER_FAMILY_LIST_URI,
  ADD_SHARE_DEVICE_URL,
  ROOM_MANAGE_LIST_URI,
  UPDATE_ROOM_NAME_URI,
  HOME_CONTROL_DEV_URI,
  UPDATE_SCENE_NAME_URI,
  DEVICE_SHARE_USER_URL,
  ADD_FAMILY_MEMBER_UTI,
  AUTOMATION_CONTNET_URI,
  GET_DEVICES_STATUS_URI,
  ROOMS_ADD_OR_DEL_DEV_URI,
  DELETE_FAMILY_MEMBER_URI,
  UPDATE_USER_HEADER_IMG_URL,
  CHOOSE_DEVICE_FOR_SCENE_URL,
};

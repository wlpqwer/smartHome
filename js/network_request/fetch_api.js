import {
    apiUrl,
    MEMBER,
    FEEDBACK_URL,
    REGISTER_URL,
    SMS_CODE_URL,
    USER_INFO_URL,
    ADD_ROOMS_URI,
    ADD_FAMILY_URI,
    ADD_SCENES_URI,
    SMART_SCENE_URL,
    FAMILY_SETUP_URI,
    DELETE_ROOMS_URI,
    CHECK_VERSION_URL,
    DELETE_FAMILY_URI,
    DELETE_DEVICE_URI,
    BIND_EQUIPMENTS_URI,
    AUTOMATION_LIST_URI,
    SET_UP_PASSWORD_URL,
    HOME_CONTROL_DEV_URI,
    ADD_SHARE_DEVICE_URL,
    UPDATE_ROOM_NAME_URI,
    UPDATE_SCENE_NAME_URI,
    ADD_FAMILY_MEMBER_UTI,
    AUTOMATION_CONTNET_URI,
    GET_DEVICES_STATUS_URI,
    ROOMS_ADD_OR_DEL_DEV_URI,
    DELETE_FAMILY_MEMBER_URI,
    UPDATE_USER_HEADER_IMG_URL,
  } from './api_collections';
//   import * as Actions from '../actions/actions';
  import { EventRegister } from 'react-native-event-listeners';
  import {Toast } from 'antd-mobile-rn';
//   import { Platform } from 'react-native';
//   import 'core-js/es6/symbol';
//   import 'core-js/fn/symbol/iterator';
// let controller = new AbortController();
// let signal = controller.signal;
// signal.addEventListener("abort", () => {
//   console.log("aborted!")
// });


const _fetch = (requestPromise, timeout) => {
  let timeoutAction = null;
  const timerPromise = new Promise((resolve, reject) => {
      timeoutAction = () => {
          // reject("请求超时");
          reject(new Error("Request timed out"))
      }; 
  })
  setTimeout(() => {
      timeoutAction();
  }, timeout)
  return Promise.race([requestPromise, timerPromise]);
}

// 注册
function postUserRegister(data) {
  return fetch(`${apiUrl}${REGISTER_URL}`, {
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json',
    },
    method: 'POST',
  })
  .then(response => {
    let data = {};
    data['status'] = response.status;
    data['statusText'] = response._bodyText;
    EventRegister.emit('registerScuu', data);
  })
  .catch(error => console.error('异常信息:', error));
}

// 获取验证码
function postUserSmsCode(data) {
  return fetch(`${apiUrl}${SMS_CODE_URL}`, {
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json',
    },
    method: 'POST',
  })
  .then(response => response.json())
    .then(response => {
      console.log('服务器返回信息:', response);
    })
  .catch(error => console.error('异常信息:', error));
}

// 忘记密码/重置密码
function postUserSetUpPwd(data) {
  return fetch(`${apiUrl}${SET_UP_PASSWORD_URL}`, {
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json',
    },
    method: 'POST',
  })
  .then(response => response.json())
    .then(response => {
      console.log('服务器返回信息:', response);
      EventRegister.emit('updatePwdSucc', response);
    })
  .catch(error => console.error('异常信息:', error));
}





// 我的家-操作设备
function postOperationDevies(data, token, devicesId) {
  return fetch(`${apiUrl}${GET_DEVICES_STATUS_URI}${devicesId}/`, {
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json',
      Authorization: `Token ${token}`,
    },
    method: 'POST',
  })
    .then(response => response.json())
    .then(response => {
      console.log('服务器返回信息:', response);
      // EventRegister.emit('myScoreRank', response.ranking);
    })
    .catch(error => console.error('异常信息:', error));
}

// 首页控制设备
function postHomeControlDev(data, token){
  return fetch(`${apiUrl}${HOME_CONTROL_DEV_URI}`, {
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json',
      Authorization: `Token ${token}`
    },
    method: 'POST',
  })
    .then(response => response.json())
    .then(response => {
      console.log('服务器返回信息:', response);
      EventRegister.emit('devicesStatus', response);
    })
    .catch(error => console.error('异常信息:', error));
}


// 删除设备
function deleteDevice( token, delDeviceId){
  return fetch(`${apiUrl}${DELETE_DEVICE_URI}${delDeviceId}/`, {
    // body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json',
      Authorization: `Token ${token}`
    },
    method: 'DELETE',
  })
    .then(response => response.json())
    .then(response => {
      console.log('服务器返回信息:', response);
      EventRegister.emit('deleteDeviceSucc', response.msg);
    })
    .catch(error => console.error('异常信息:', error));
}

//添加家庭
// function postAddFamily(data, memberId, token){
//   return fetch(`${apiUrl}${ADD_FAMILY_URI}${memberId}/homes/`, {
//     body: JSON.stringify(data),
//     headers: {
//       'content-type': 'application/json',
//       Authorization: `Token ${token}`
//     },
//     method: 'POST',
//   })
//     .then(response => response.json())
//     .then(response => {
//       console.log('服务器返回信息:', response);
//       EventRegister.emit('addFamilySucc', response);
//     })
//     .catch(error => console.error('异常信息:', error));
// }





function postAddFamily(data, memberId, token){
  return new Promise((resolve, reject) => {
    _fetch(fetch(`${apiUrl}${ADD_FAMILY_URI}${memberId}/homes/`, {
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json',
        Authorization: `Token ${token}`
      },
      method: 'POST',
      // signal: signal,
    }), 5000)
    .then(response => response.json())
    .then(response => {
      resolve(response);
      console.log('服务器返回信息:', response);
      EventRegister.emit('addFamilySucc', response);
    })
    .catch(error => {
      reject(error);
      console.log('异常信息:', error)
      // controller.abort()
      Toast.info("Request timed out",  2, undefined, false);
      // Toast.info('异常信息:', error)
      // return error;
    });
  })
}

// 删除家庭
function deleteFamily( token, delFamilyID){
  return fetch(`${apiUrl}${DELETE_FAMILY_URI}${delFamilyID}/`, {
    // body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json',
      Authorization: `Token ${token}`
    },
    method: 'DELETE',
  })
    .then(response => response.json())
    .then(response => {
      console.log('服务器返回信息:', response);
      EventRegister.emit('deleteFamilySucc', response);
    })
    .catch(error => console.error('异常信息:', error));
}

// 修改家庭信息
function updateFamilyInfo(data, token, delFamilyID){
  return fetch(`${apiUrl}${FAMILY_SETUP_URI}${delFamilyID}/`, {
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json',
      Authorization: `Token ${token}`
    },
    method: 'PUT',
  })
    .then(response => response.json())
    .then(response => {
      console.log('服务器返回信息:', response);
      EventRegister.emit('updateFamInfoSucc', response.msg);
    })
    .catch(error => console.error('异常信息:', error));
}


// 家庭下添加房间
function postAddRoom(data, token, homeId) {
  return fetch(`${apiUrl}${ADD_ROOMS_URI}${homeId}/rooms/`, {
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json',
      Authorization: `Token ${token}`
    },
    method: 'POST',
  })
    .then(response => response.json())
    .then(response => {
      console.log('服务器返回信息:', response);
      EventRegister.emit('addRommsSucc', response.msg);
    })
    .catch(error => console.error('异常信息:', error));
}

// 家庭下删除房间
function postDeleteRoom(data, token, homeId) {
  console.log(`${apiUrl}${DELETE_ROOMS_URI}${homeId}/rooms/`);
  return fetch(`${apiUrl}${DELETE_ROOMS_URI}${homeId}/rooms/`, {
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json',
      Authorization: `Token ${token}`
    },
    method: 'DELETE',
  })
    .then(response => response.json())
    .then(response => {
      console.log('服务器返回信息:', response);
      EventRegister.emit('delRoomSuccess', response.msg);
    })
    .catch(error => console.error('异常信息:', error));
}

// 修改房间名称
function putUpdateRoomName(data, token){
  return fetch(`${apiUrl}${UPDATE_ROOM_NAME_URI}`, {
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json',
      Authorization: `Token ${token}`
    },
    method: 'PUT',
  })
    .then(response => response.json())
    .then(response => {
      console.log('服务器返回信息:', response);
      EventRegister.emit('updateRoomNameSucc', response.msg);
    })
    .catch(error => console.error('异常信息:', error));
}

// 添加家庭成员
function postAddFamilyMember(data, token, familyId){
  return fetch(`${apiUrl}${ADD_FAMILY_MEMBER_UTI}${familyId}${MEMBER}`, {
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json',
      Authorization: `Token ${token}`
    },
    method: 'POST',
  })
    .then(response => response.json())
    .then(response => {
      console.log('服务器返回信息:', response);
      EventRegister.emit('addMemberSucc', response);
    })
    .catch(error => console.error('异常信息:', error));
}

// 删除家庭成员
function deleteFamyilyMember(data, token, familyId){
  return fetch(`${apiUrl}${DELETE_FAMILY_MEMBER_URI}${familyId}${MEMBER}`, {
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json',
      Authorization: `Token ${token}`
    },
    method: 'DELETE',
  })
    .then(response => response.json())
    .then(response => {
      console.log('服务器返回信息:', response);
      EventRegister.emit('delFamilyMemberSucc', response);
    })
    .catch(error => console.log('异常信息:', error));
}
 
// 房间内添加或者移除设备
function postRoomsAddOrDelDev(data, token, roomId){
  console.log(`${apiUrl}${ROOMS_ADD_OR_DEL_DEV_URI}${roomId}/allequipments/`);
  return fetch(`${apiUrl}${ROOMS_ADD_OR_DEL_DEV_URI}${roomId}/allequipments/`, {
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json',
      Authorization: `Token ${token}`
    },
    method: 'POST',
  })
    .then(response => response.json())
    .then(response => {
      console.log('服务器返回信息:', response);
      EventRegister.emit('addOrDelDevSucc', response.msg);
    })
    .catch(error => console.error('异常信息:', error));
}

// 创建/添加场景
// homeId
function postAddScene(data, token, currentHomeId) {
  console.log(`${apiUrl}${ADD_SCENES_URI}${currentHomeId}/scenes/`)
  return fetch(`${apiUrl}${ADD_SCENES_URI}${currentHomeId}/scenes/`, {
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json',
      Authorization: `Token ${token}`
    },
    method: 'POST',
  })
    .then(response => response.json())
    .then(response => {
      console.log('服务器返回信息:', response);
      EventRegister.emit('addSceneSucc', response);
    })
    .catch(error => console.error('异常信息:', error));
}


// 修改场景名称 && 场景图标
function putUpdateSceneName(data, token, sceneId) {
  return fetch(`${apiUrl}${UPDATE_SCENE_NAME_URI}${sceneId}/`, {
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json',
      Authorization: `Token ${token}`
    },
    method: 'PUT',
  })
    .then(response => response.json())
    .then(response => {
      console.log('服务器返回信息:', response);
      EventRegister.emit('updateSceneNameSucc');
    })
    .catch(error => console.error('异常信息:', error));
}

// 修改场景内容
function putUpdateSceneContent(data, token, sceneId) {
  return fetch(`${apiUrl}${UPDATE_SCENE_NAME_URI}${sceneId}/`, {
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json',
      Authorization: `Token ${token}`
    },
    method: 'POST',
  })
    .then(response => response.json())
    .then(response => {
      console.log('服务器返回信息:', response);
      // EventRegister.emit('addRommsSucc', response.msg);
    })
    .catch(error => console.error('异常信息:', error));
}


// 删除场景内容/动作
function deleteSceneContent(data, token, currentHomeId) {
  return fetch(`${apiUrl}${SMART_SCENE_URL}${currentHomeId}/scenes/`, {
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json',
      Authorization: `Token ${token}`
    },
    method: 'DELETE',
  })
  // .then(response => console.log(response))
    .then(response => response.json())
    .then(response => {
      console.log('服务器返回信息:', response);
      EventRegister.emit('delScene', response.msg);
    })
    .catch(error => console.error('异常信息:', error));
}


// 执行场景
function performSceneContent(data, token, currentHomeId){
  console.log(`Token ${token}`)
  return fetch(`${apiUrl}${SMART_SCENE_URL}${currentHomeId}/scenes/`, {
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json',
      Authorization: `Token ${token}`
    },
    method: 'PUT',
  })
    .then(response => response.json())
    .then(response => {
      console.log('服务器返回信息:', response);
      EventRegister.emit('performSceneSuccess', response.status);
    })
    .catch(error => console.error('异常信息:', error));
}

// 创建自动化
function postAddAutoMation(data, token, currentHomeId) {
  return fetch(`${apiUrl}${AUTOMATION_LIST_URI}${currentHomeId}/automations/`, {
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json',
      Authorization: `Token ${token}`
    },
    method: 'POST',
  })
    .then(response => response.json())
    .then(response => {
      console.log('服务器返回信息:', response);
      EventRegister.emit('addAutoMationSucc', response.msg);
    })
    .catch(error => console.error('异常信息:', error));
}

// 删除自动化
function postDeleteAutoMation( autoMationId, token) {
  return fetch(`${apiUrl}${AUTOMATION_CONTNET_URI}${autoMationId}`, {
    // body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json',
      Authorization: `Token ${token}`
    },
    method: 'DELETE',
  })
    .then(response => response.json())
    .then(response => {
      console.log('服务器返回信息:', response);
      EventRegister.emit('delAutoMationSucc', response);
    })
    .catch(error => console.error('异常信息:', error));
}


// 修改自动化名称 && 自动化图标
function putUpdateAutoMationItem(data, token, autoMationId) {
  console.log(`${apiUrl}${AUTOMATION_CONTNET_URI}${autoMationId}`)
  return fetch(`${apiUrl}${AUTOMATION_CONTNET_URI}${autoMationId}`, {
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json',
      Authorization: `Token ${token}`
    },
    method: 'PUT',
  })
    .then(response => response.json())
    .then(response => {
      console.log('服务器返回信息:', response);
      EventRegister.emit('updateAutoNameSucc');
    })
    .catch(error => console.error('异常信息:', error));
}

// 自动化编辑页 - 自动化条件添加  
function editorAutoMationConditionAdd(data, token, autoMationId) {
  return fetch(`${apiUrl}${AUTOMATION_CONTNET_URI}${autoMationId}/conditions/`, {
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json',
      Authorization: `Token ${token}`
    },
    method: 'POST',
  })
    .then(response => response.json())
    .then(response => {
      console.log('服务器返回信息:', response);
      EventRegister.emit('updateAutoAddConSucc', response.status);
    })
    .catch(error => console.error('异常信息:', error));
}

// 自动化编辑页 - 自动化条件删除  
function editorAutoMationConditionDel(data, token, autoMationId) {
  return fetch(`${apiUrl}${AUTOMATION_CONTNET_URI}${autoMationId}/conditions/`, {
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json',
      Authorization: `Token ${token}`
    },
    method: 'DELETE',
  })
    .then(response => response.json())
    .then(response => {
      console.log('服务器返回信息:', response);
      // EventRegister.emit('updateSceneNameSucc');
    })
    .catch(error => console.error('异常信息:', error));
}


// 自动化编辑页 - 自动化条件修改  
function editorAutoMationConditionUpdate(data, token, autoMationId) {
  return fetch(`${apiUrl}${AUTOMATION_CONTNET_URI}${autoMationId}/conditions/`, {
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json',
      Authorization: `Token ${token}`
    },
    method: 'PUT',
  })
    .then(response => response.json())
    .then(response => {
      console.log('服务器返回信息:', response);
      // EventRegister.emit('updateSceneNameSucc');
    })
    .catch(error => console.error('异常信息:', error));
}

// 自动化编辑页 - 自动化动作（场景和设备）添加  
function editorAutoMationActionAdd(data, token, autoMationId) {
  return fetch(`${apiUrl}${AUTOMATION_CONTNET_URI}${autoMationId}/contents/`, {
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json',
      Authorization: `Token ${token}`
    },
    method: 'POST',
  })
    .then(response => response.json())
    .then(response => {
      console.log('服务器返回信息:', response);
      EventRegister.emit('postEditUpdateAtuoMation', response.status);
    })
    .catch(error => console.error('异常信息:', error));
}


// 自动化编辑页 - 自动化动作（场景和设备）删除  
function editorAutoMationActionDel(data, token, autoMationId) {
  return fetch(`${apiUrl}${AUTOMATION_CONTNET_URI}${autoMationId}/contents/`, {
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json',
      Authorization: `Token ${token}`
    },
    method: 'DELETE',
  })
    .then(response => response.json())
    .then(response => {
      console.log('服务器返回信息:', response);
      EventRegister.emit('postEditDelAtuoMation', response.status);
    })
    .catch(error => console.error('异常信息:', error));
}


// 自动化编辑页 - 自动化动作（场景和设备）修改  
function editorAutoMationActionUpdate(data, token, autoMationId) {
  return fetch(`${apiUrl}${AUTOMATION_CONTNET_URI}${autoMationId}/contents/`, {
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json',
      Authorization: `Token ${token}`
    },
    method: 'PUT',
  })
    .then(response => response.json())
    .then(response => {
      console.log('服务器返回信息:', response);
      EventRegister.emit('serverBackAutoMationScene', response.status);
    })
    .catch(error => console.error('异常信息:', error));
}

// 执行自动化
// function performAutoMation(token, autoMationId){
//   console.log(`Token ${token}`)
//   return fetch(`${apiUrl}${AUTOMATION_CONTNET_URI}${autoMationId}`, {
//     // body: JSON.stringify(data),
//     headers: {
//       'content-type': 'application/json',
//       Authorization: `Token ${token}`
//     },
//     method: 'POST',
//   })
//     .then(response => response.json())
//     .then(response => {
//       console.log('服务器返回信息:', response);
//       EventRegister.emit('performAutoMationSuccess', response.status);
//     })
//     .catch(error => console.error('异常信息:', error));
// }

function performAutoMation(token, autoMationId){
    let time = new Date().getTimezoneOffset()/60;
    console.log(`${apiUrl}/iotservice/homes/automationactions/${autoMationId}/?tz-offset=${time}`)
    return fetch(`${apiUrl}/iotservice/homes/automationactions/${autoMationId}/?tz_offset=${time}`, {
    headers: {
      'content-type': 'application/json',
      Authorization: `Token ${token}`
    },
  })
    .then(response => response.json())
    .then(response => {
      console.log('服务器返回信息:', response);
      EventRegister.emit('performAutoMationSuccess', response.status);
    })
    .catch(error => console.error('异常信息:', error));
}





// 我的-------修改用户详情
function putUpdateUserInfo(data, token, userPhoneNum) {
  // console.log(`${apiUrl}${USER_INFO_URL}${userPhoneNum}/`)
  return fetch(`${apiUrl}${USER_INFO_URL}${userPhoneNum}/`, {
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json',
      Authorization: `Token ${token}`
    },
    method: 'PUT',
  })
    .then(response => response.json())
    .then(response => {
      console.log('服务器返回信息:', response);
      EventRegister.emit('UpdateUserInfoSucc');
    })
    .catch(error => console.error('异常信息:', error));
}

// 修改用户头像
function putUpdateUserHeaderImg(data, token) {
  let formData = new FormData();
  let file = {uri: data.avatar, type: 'multipart/form-data', name: 'image.jpg'};
  // formData.append('suffix', data.suffix);
  formData.append('avatar', file);
  console.log(formData)
  return fetch(`${apiUrl}${UPDATE_USER_HEADER_IMG_URL}`, {
    body: formData,
    headers: {
      'Content-Type': 'multipart/form-data; charset=utf-8',
      Authorization: `Token ${token}`
    },
    method: 'POST',
  })
    .then(response => response.json())
    .then(response => {
      console.log('服务器返回信息:', response);
      EventRegister.emit('UpdateUserHearImgSucc', response);
    })
    .catch(error => console.error('异常信息:', error));
}


// 意见反馈
function postFeedBack(data, token) {
  return fetch(`${apiUrl}${FEEDBACK_URL}`, {
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json',
      Authorization: `Token ${token}`
    },
    method: 'POST',
  })
    .then(response => response.json())
    .then(response => {
      console.log('服务器返回信息:', response);
    })
    .catch(error => console.error('异常信息:', error));
}

// 共享设备给某人
function postShareDevice(data, token) {
  return fetch(`${apiUrl}${ADD_SHARE_DEVICE_URL}`, {
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json',
      Authorization: `Token ${token}`
    },
    method: 'POST',
  })
    .then(response => response.json())
    .then(response => {
      console.log('服务器返回信息:', response);
      EventRegister.emit('AddShareDevice', response.msg);
    })
    .catch(error => console.error('异常信息:', error));
}


// 删除对某个成员的设备共享
function postDeleteShareDevice(data, token) {
  return fetch(`${apiUrl}${ADD_SHARE_DEVICE_URL}`, {
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json',
      Authorization: `Token ${token}`
    },
    method: 'DELETE',
  })
    .then(response => response.json())
    .then(response => {
      console.log('服务器返回信息:', response);
      EventRegister.emit('DelShareDevice', response.msg);
    })
    .catch(error => console.error('异常信息:', error));
}


// 用户绑定设备
function bindEquipmentGetResu(data, token) {
  return fetch(`${apiUrl}${BIND_EQUIPMENTS_URI}`, {
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json',
      Authorization: `Token ${token}`
    },
    method: 'POST',
  })
    .then(response => response.json())
    .then(response => {
      console.log('服务器返回信息:', response);
      EventRegister.emit('zhuCeDev', response);
    })
    .catch(error => console.error('异常信息:', error));
}

// 检查是否有新版本
function checkVersion(data, token) {
  return fetch(`${apiUrl}${CHECK_VERSION_URL}`, {
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json',
      Authorization: `Token ${token}`
    },
    method: 'POST',
  })
    .then(response => response.json())
    .then(response => {
      console.log('服务器返回信息:', response);
      EventRegister.emit('checkVersionMsg', response);
    })
    .catch(error => console.error('异常信息:', error));
}





  export {
    postOperationDevies,
    postAddRoom,
    checkVersion,
    postAddScene,
    postFeedBack,
    deleteFamily,
    deleteDevice,
    postAddFamily,
    postDeleteRoom,
    postUserSmsCode,
    postShareDevice,
    postUserSetUpPwd,
    postUserRegister,
    updateFamilyInfo,
    performAutoMation,
    postAddAutoMation,
    putUpdateRoomName,
    putUpdateUserInfo,
    postHomeControlDev,
    putUpdateSceneName,
    deleteSceneContent,
    postAddFamilyMember,
    performSceneContent,
    deleteFamyilyMember,
    postDeleteAutoMation,
    postRoomsAddOrDelDev,
    bindEquipmentGetResu,
    postDeleteShareDevice,
    putUpdateSceneContent,
    putUpdateUserHeaderImg,
    putUpdateAutoMationItem,
    editorAutoMationActionDel,
    editorAutoMationActionAdd,
    editorAutoMationActionUpdate,
    editorAutoMationConditionAdd,
    editorAutoMationConditionDel,
    editorAutoMationConditionUpdate,
  };
  
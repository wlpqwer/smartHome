export const USER_INFO_FETCH_DATA_SUCCESS = 'USER_INFO_FETCH_DATA_SUCCESS';
export const USER_INFO_HAS_ERRORED = 'USER_INFO_HAS_ERRORED';
export const CLEAR_USER_INFO_TOKEN_SUCCESS = 'CLEAR_USER_INFO_TOKEN_SUCCESS';
export const SWITCH_LOCAL_HOMEID_SUCCESS = 'SWITCH_LOCAL_HOMEID_SUCCESS';
export const SWITCH_LOCAL_HOMEADMIN_SUCCESS = 'SWITCH_LOCAL_HOMEADMIN_SUCCESS';
export const LOCAL_STORE_HEADERIMG_SUCCESS = 'LOCAL_STORE_HEADERIMG_SUCCESS';


import { apiUrl, SIGNIN_URL, SIGN_OUT_URI } from '../../network_request/api_collections';
import { AsyncStorage } from 'react-native';
import { EventRegister } from 'react-native-event-listeners';

function userInfoHasErrored(bool) {
  return {
    type: USER_INFO_HAS_ERRORED,
    hasErrored: bool,
  };
}

function userInfoFetchDataSuccess(data) {
  return {
    type: USER_INFO_FETCH_DATA_SUCCESS,
    token: data.token,
    phone_number: data.phone_number,
    globalHomeId: data.globalHomeId,
    localHeaderImg: data.localHeaderImg,
    currentFamilyAdmin: data.phone_number,
  };
}

function clearUSerInfoTokenSuccess() {
  return {
    type: CLEAR_USER_INFO_TOKEN_SUCCESS,
    is_weixinAuth: 0,
    // token: "",
  };
}


_signInAsync = async token => {
  await AsyncStorage.setItem('userToken', token);
};


// 手机号登录登录
export function getUserInfo(data) {
  return (dispatch, getState) => {
    fetch(`${apiUrl}${SIGNIN_URL}`, {
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json',
      },
      method: 'POST',
    })
    .then(response => {
      console.log(response)
      EventRegister.emit('loginMeg', response.status);
      if(response.status == '200'){
          let userInfoData = JSON.parse(response._bodyText);
          console.log(userInfoData);
          console.log(userInfoData['token']);
          console.log(userInfoData['phone_number']);
          console.log(userInfoData.token +"__"+ userInfoData.phone_number +"__"+ userInfoData.home_id)
          dispatch(
            userInfoFetchDataSuccess({
              token: userInfoData.token,
              phone_number: userInfoData.phone_number,
              globalHomeId: userInfoData.home_id,
              localHeaderImg: userInfoData.avatar,
              currentFamilyAdmin: userInfoData.phone_number
            }),
          );    
          _signInAsync(userInfoData['token']);
          console.log(getState().authUserInfoReducer.token);     
      }
      })
      .catch(error => console.error('异常信息:', error));
  };
}




// 退出手机号登录
export function postLogOut() {
  return (dispatch, getState) => {
    fetch(`${apiUrl}${SIGN_OUT_URI}`, {
      headers: {
        'content-type': 'application/json',
        // Authorization: `Token ${token}`,
      },
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then(response => response.json())
      .then(response => {
        console.log('服务器返回信息:', response);
        if (response.status == 200) {
          _signInAsync('');
          console.log(getState().authUserInfoReducer.token);
        }
      })
      .catch(error => console.error('异常信息:', error));
  };
}


// 切换家庭ID
export function switchLocalHomeIdSuccess(string) {
  return {
    type: SWITCH_LOCAL_HOMEID_SUCCESS,
    globalHomeId: string,
  };
}

// 保存当前切换的家庭的创建者
export function switchLocalHomeAdminSuccess(string) {
  return {
    type: SWITCH_LOCAL_HOMEADMIN_SUCCESS,
    currentFamilyAdmin: string,
  };
}



// 个人头像存储本地
export function localStoreHeaderImg(string) {
  return {
    type: LOCAL_STORE_HEADERIMG_SUCCESS,
    localHeaderImg: string,
  };
}
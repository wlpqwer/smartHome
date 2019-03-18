// 我的家-所有房间设备
export const ITEMS_IS_LOADING = 'ITEMS_IS_LOADING';
export const ITEMS_FETCH_DATA_SUCCESS = 'ITEMS_FETCH_DATA_SUCCESS';
export const ITEMS_IS_LOADING_MORE = 'ITEMS_IS_LOADING_MORE';
export const ITEMS_DATA_AFTER = 'ITEMS_DATA_AFTER';
export const ITEMS_HAS_ERRORED = 'ITEMS_HAS_ERRORED';
export const ITEMS_RESET_TO_INITIAL = 'ITEMS_RESET_TO_INITIAL';
import {fromJS, List} from 'immutable';
import {
  apiUrl,
  MY_HOME_DEVICES_URI,
  USER_FAMILY_LIST_URI,
} from '../../network_request/api_collections'
import { EventRegister } from 'react-native-event-listeners';
// import _fetch from '../../tools/timeoutFetch';

  const _fetch = (requestPromise, timeout) => {
    let timeoutAction = null;
    const timerPromise = new Promise((resolve, reject) => {
        timeoutAction = () => {
            reject("请求超时");
        }
    })
    setTimeout(() => {
        timeoutAction()
    }, timeout)
    return Promise.race([requestPromise, timerPromise])
}


function itemsHasErrored(bool) {
  return {
    type: ITEMS_HAS_ERRORED,
    hasErrored: bool,
  };
}

function itemsIsLoading(bool) {
  return {
    type: ITEMS_IS_LOADING,
    isLoading: bool,
  };
}

function itemsIsLoadingMore(bool) {
  return {
    type: ITEMS_IS_LOADING_MORE,
    isLoadingMore: bool,
  };
}

function itemsDataAfter(string) {
  return {
    type: ITEMS_DATA_AFTER,
    dataAfter: string,
  };
}

function itemsFetchDataSuccess(data) {
  return {
    type: ITEMS_FETCH_DATA_SUCCESS,
    data: data.children,
    isLoading: data.isLoading,
    isLoadingMore: data.isLoadingMore,
    dataAfter: data.dataAfter,
    hasErrored: false,
  };
}

export function itemsResetToInitial() {
  return {
    type: ITEMS_RESET_TO_INITIAL,
    data: [],
    isLoading: true,
    isLoadingMore: false,
    hasErrored: false,
    dataAfter: '',
  };
}

export function itemsFetchData(currentHomeId) {
  return (dispatch, getState) => {
    dispatch(itemsIsLoading(true));
    console.log(`${apiUrl}${MY_HOME_DEVICES_URI}${currentHomeId}/equipments/`)
    fetch(`${apiUrl}${MY_HOME_DEVICES_URI}${currentHomeId}/equipments/`, {
      headers: {
        'content-type': 'application/json',
        Authorization: `Token ${getState().authUserInfoReducer.token}`
      },
    })
      .then(response => {
        // if (!response.ok) {
        //   throw Error(response.statusText);
        // }
        if (response.status == '502' || response.status == '401') {
          throw Error(response.status);
        }
        dispatch(itemsIsLoading(false));
        return response;
      })
      .then(response => response.json())
      .then(responseJson => {
        // console.log(responseJson);
        dispatch(
          itemsFetchDataSuccess({
            children: responseJson.data,
            isLoading: false,
            hasErrored: false,
            isLoadingMore: responseJson.current_page < responseJson.last_page,
            dataAfter:
              responseJson.current_page < responseJson.last_page
                ? responseJson.next_page_url
                : '',
          }),
        );
      }
      )
      .catch(err => {
        console.log(err);
        let errStr = err.toString().split(":")[1];
        console.log(errStr)
        if(errStr == 401){
          EventRegister.emit('notToken');
        } else {
          dispatch(itemsHasErrored(true));
        }
      });
  };
}

export function itemsFetchMoreData() {
  return (dispatch, getState) => {
    if (getState().homeViewReducer.dataAfter == '') {
      return;
    } else {
      fetch(getState().homeViewReducer.dataAfter, {
        headers: {
          'content-type': 'application/json',
          Authorization: `Token ${getState().authUserInfoReducer.token}`,
        },
      })
        .then(response => {
          if (!response.ok) {
            throw Error(response.statusText);
          }

          dispatch(itemsIsLoadingMore(false));
          return response;
        })
        .then(response => response.json())
        .then(responseJson =>
          dispatch(
            itemsFetchDataSuccess({
              children: getState().homeViewReducer.data.concat(
                responseJson.data,
              ),
              isLoadingMore: responseJson.current_page < responseJson.last_page,
              isLoading: false,
              dataAfter:
                responseJson.current_page < responseJson.last_page
                  ? responseJson.next_page_url
                  : '',
            }),
          ),
        )
        .catch(() => {
          dispatch(itemsHasErrored(true));
        });
    }
  };
}





// 获取用户的家庭列表
export const FAMILY_LIST_IS_LOADING = 'FAMILY_LIST_IS_LOADING';
export const FAMILY_LIST_FETCH_DATA_SUCCESS = 'FAMILY_LIST_FETCH_DATA_SUCCESS';
export const FAMILY_LIST_HAS_ERRORED = 'FAMILY_LIST_HAS_ERRORED';
export const FAMILY_LIST_RESET_TO_INITIAL = 'FAMILY_LIST_RESET_TO_INITIAL';


function familyListHasErrored(bool) {
  return {
    type: FAMILY_LIST_HAS_ERRORED,
    hasErrored: bool,
  };
}

function familyListIsLoading(bool) {
  return {
    type: FAMILY_LIST_IS_LOADING,
    isLoading: bool,
  };
}


function familyListFetchDataSuccess(data) {
  return {
    type: FAMILY_LIST_FETCH_DATA_SUCCESS,
    data: data.children,
    isLoading: data.isLoading,
  };
}


export function familyListResetToInitial() {
  return {
    type: FAMILY_LIST_RESET_TO_INITIAL,
    data: [],
    isLoading: true,
    hasErrored: false,
  };
}

export function familyListFetchData() {
  return async (dispatch, getState) => {
    await dispatch(familyListResetToInitial());
    dispatch(familyListIsLoading(true));
    fetch(`${apiUrl}${USER_FAMILY_LIST_URI}${getState().authUserInfoReducer.phone_number}/homes/`, {
      headers: {
        'content-type': 'application/json',
        Authorization: `Token ${getState().authUserInfoReducer.token}`
      },
    })
      .then(response => {
        console.log(response)
        if (!response.ok) {
          throw Error(response.statusText);
        }
        dispatch(familyListIsLoading(false));
        return response;
      })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        dispatch(
          familyListFetchDataSuccess({
            children: responseJson,
            isLoading: false,
          }),
        );
      }
      )
      .catch(err => {
        console.log(err);
        dispatch(familyListHasErrored(true));
      });
  };
}
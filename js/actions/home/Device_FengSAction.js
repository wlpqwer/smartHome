// 获取设备状态
export const DEVICES_IS_LOADING = 'DEVICES_IS_LOADING';
export const DEVICES_FETCH_DATA_SUCCESS = 'DEVICES_FETCH_DATA_SUCCESS';
export const DEVICES_HAS_ERRORED = 'DEVICES_HAS_ERRORED';
export const DEVICES_RESET_TO_INITIAL = 'DEVICES_RESET_TO_INITIAL';
import { apiUrl, GET_DEVICES_STATUS_URI } from '../../network_request/api_collections'
import { EventRegister } from 'react-native-event-listeners';


function devicesHasErrored(bool) {
  return {
    type: DEVICES_HAS_ERRORED,
    hasErrored: bool,
  };
}

function devicesIsLoading(bool) {
  return {
    type: DEVICES_IS_LOADING,
    isLoading: bool,
  };
}



function devicesFetchDataSuccess(data) {
  return {
    type: DEVICES_FETCH_DATA_SUCCESS,
    data: data.children,
    isLoading: data.isLoading,
  };
}

export function devicesResetToInitial() {
  return {
    type: DEVICES_RESET_TO_INITIAL,
    data: [],
    isLoading: true,
    hasErrored: false,
  };
}

export function devicesFetchData(devicesId) {
  return (dispatch, getState) => {
    dispatch(devicesIsLoading(true));
    console.log(`${apiUrl}${GET_DEVICES_STATUS_URI}${devicesId}/`);
    fetch(`${apiUrl}${GET_DEVICES_STATUS_URI}${devicesId}/`, {
      headers: {
        'content-type': 'application/json',
        Authorization: `Token ${getState().authUserInfoReducer.token}`
      },
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        dispatch(devicesIsLoading(false));
        return response;
      })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        if(responseJson.status_code == '901'){
          EventRegister.emit('deviceConnectStatus', responseJson.msg);
        } else {
          dispatch(
            devicesFetchDataSuccess({
              children: responseJson,
              isLoading: false,
            }),
          );
          EventRegister.emit('deviceForRoom');
        }
      }
      )
      .catch(err => {
        console.log(err);
        dispatch(devicesHasErrored(true));
      });
  };
}





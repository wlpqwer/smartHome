// 共享的设备管理
export const DEVICE_SHARE_MANAGE_IS_LOADING = 'DEVICE_SHARE_MANAGE_IS_LOADING';
export const DEVICE_SHARE_MANAGE_FETCH_DATA_SUCCESS = 'DEVICE_SHARE_MANAGE_FETCH_DATA_SUCCESS';
export const DEVICE_SHARE_MANAGE_HAS_ERRORED = 'DEVICE_SHARE_MANAGE_HAS_ERRORED';
export const DEVICE_SHARE_MANAGE_RESET_TO_INITIAL = 'DEVICE_SHARE_MANAGE_RESET_TO_INITIAL';
import { apiUrl, DEVICE_SHARE_USER_URL } from '../../network_request/api_collections'



function deviceShareUserHasErrored(bool) {
  return {
    type: DEVICE_SHARE_MANAGE_HAS_ERRORED,
    hasErrored: bool,
  };
}

function deviceShareUserIsLoading(bool) {
  return {
    type: DEVICE_SHARE_MANAGE_IS_LOADING,
    isLoading: bool,
  };
}



function deviceShareUserFetchDataSuccess(data) {
  return {
    type: DEVICE_SHARE_MANAGE_FETCH_DATA_SUCCESS,
    data: data.children,
    isLoading: data.isLoading,
  };
}

export function deviceShareUserResetToInitial() {
  return {
    type: DEVICE_SHARE_MANAGE_RESET_TO_INITIAL,
    data: [],
    isLoading: true,
    hasErrored: false,
  };
}

export function deviceShareUserFetchData(equipmentId) {
  return (dispatch, getState) => {
    dispatch(deviceShareUserIsLoading(true));
    console.log(`${apiUrl}${DEVICE_SHARE_USER_URL}${equipmentId}`);
    fetch(`${apiUrl}${DEVICE_SHARE_USER_URL}${equipmentId}/`, {
      headers: {
        'content-type': 'application/json',
        Authorization: `Token ${getState().authUserInfoReducer.token}`
      },
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        dispatch(deviceShareUserIsLoading(false));
        return response;
      })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        dispatch(
          deviceShareUserFetchDataSuccess({
            children: responseJson,
            isLoading: false,
          }),
        );
      }
      )
      .catch(err => {
        console.log(err);
        dispatch(deviceShareUserHasErrored(true));
      });
  };
}





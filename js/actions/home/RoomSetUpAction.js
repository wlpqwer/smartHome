// 我的家-非首页的房间获取设备
export const ROOM_SETUP_IS_LOADING = 'ROOM_SETUP_IS_LOADING';
export const ROOM_SETUP_FETCH_DATA_SUCCESS = 'ROOM_SETUP_FETCH_DATA_SUCCESS';
export const ROOM_SETUP_HAS_ERRORED = 'ROOM_SETUP_HAS_ERRORED';
export const ROOM_SETUP_RESET_TO_INITIAL = 'ROOM_SETUP_RESET_TO_INITIAL';

import { apiUrl, ROOM_SETUP_URI } from '../../network_request/api_collections'



function roomSetUpHasErrored(bool) {
  return {
    type: ROOM_SETUP_HAS_ERRORED,
    hasErrored: bool,
  };
}

function roomSetUpIsLoading(bool) {
  return {
    type: ROOM_SETUP_IS_LOADING,
    isLoading: bool,
  };
}



function roomSetUpFetchDataSuccess(data) {
  return {
    type: ROOM_SETUP_FETCH_DATA_SUCCESS,
    data: data.children,
    isLoading: data.isLoading,
  };
}

export function roomSetUpResetToInitial() {
  return {
    type: ROOM_SETUP_RESET_TO_INITIAL,
    data: [],
    isLoading: true,
    hasErrored: false,
  };
}

export function roomSetUpFetchData(roomId) {
  return (dispatch, getState) => {
    dispatch(roomSetUpIsLoading(true));
    console.log(`${apiUrl}${ROOM_SETUP_URI}${roomId}/allequipments/`);
    fetch(`${apiUrl}${ROOM_SETUP_URI}${roomId}/allequipments/`, {
      headers: {
        'content-type': 'application/json',
        Authorization: `Token ${getState().authUserInfoReducer.token}`
      },
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        dispatch(roomSetUpIsLoading(false));
        return response;
      })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        dispatch(
          roomSetUpFetchDataSuccess({
            children: responseJson,
            isLoading: false,
          }),
        );
      }
      )
      .catch(err => {
        console.log(err);
        dispatch(roomSetUpHasErrored(true));
      });
  };
}



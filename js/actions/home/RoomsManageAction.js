// 我的家-房间管理
export const ROOMS_MANAGELIST_IS_LOADING = 'ROOMS_MANAGELIST_IS_LOADING';
export const ROOMS_MANAGELIST_FETCH_DATA_SUCCESS = 'ROOMS_MANAGELIST_FETCH_DATA_SUCCESS';
export const ROOMS_MANAGELIST_HAS_ERRORED = 'ROOMS_MANAGELIST_HAS_ERRORED';
export const ROOMS_MANAGELIST_RESET_TO_INITIAL = 'ROOMS_MANAGELIST_RESET_TO_INITIAL';
import { apiUrl, ROOM_MANAGE_LIST_URI } from '../../network_request/api_collections'



function roomsManageListHasErrored(bool) {
  return {
    type: ROOMS_MANAGELIST_HAS_ERRORED,
    hasErrored: bool,
  };
}

function roomsManageListIsLoading(bool) {
  return {
    type: ROOMS_MANAGELIST_IS_LOADING,
    isLoading: bool,
  };
}



function roomsManageListFetchDataSuccess(data) {
  return {
    type: ROOMS_MANAGELIST_FETCH_DATA_SUCCESS,
    data: data.children,
    isLoading: data.isLoading,
  };
}

export function roomsManageListResetToInitial() {
  return {
    type: ITEMS_RESET_TO_INITIAL,
    data: [],
    isLoading: true,
    hasErrored: false,
  };
}

export function roomsManageListFetchData(homeId, equipment_id) {
  return (dispatch, getState) => {
    let uri = '';
    dispatch(roomsManageListIsLoading(true));
    if(homeId ==0){
      uri = `${apiUrl}${ROOM_MANAGE_LIST_URI}${homeId}/rooms?equipment_id=${equipment_id}`;
    } else {
      uri = `${apiUrl}${ROOM_MANAGE_LIST_URI}${homeId}/rooms/`;
    }
    console.log(uri);
    console.log(`Token ${getState().authUserInfoReducer.token}`)
    fetch(uri, {
    // fetch(`${apiUrl}${ROOM_MANAGE_LIST_URI}${homeId}/rooms?equipment_id=${equipment_id}`, {
      headers: {
        'content-type': 'application/json',
        Authorization: `Token ${getState().authUserInfoReducer.token}`
      },
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        dispatch(roomsManageListIsLoading(false));
        return response;
      })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        dispatch(
          roomsManageListFetchDataSuccess({
            children: responseJson,
            isLoading: false,
          }),
        );
      }
      )
      .catch(err => {
        console.log(err);
        dispatch(roomsManageListHasErrored(true));
      });
  };
}





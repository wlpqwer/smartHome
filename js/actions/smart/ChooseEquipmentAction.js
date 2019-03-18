// 智能-场景内选择设备
export const SCENE_DEVICES_IS_LOADING = 'SCENE_DEVICES_IS_LOADING';
export const SCENE_DEVICES_FETCH_DATA_SUCCESS = 'SCENE_DEVICES_FETCH_DATA_SUCCESS';
// export const SCENE_DEVICES_IS_LOADING_MORE = 'SCENE_DEVICES_IS_LOADING_MORE';
// export const SCENE_DEVICES_DATA_AFTER = 'SCENE_DEVICES_DATA_AFTER';
export const SCENE_DEVICES_HAS_ERRORED = 'SCENE_DEVICES_HAS_ERRORED';
export const SCENE_DEVICES_RESET_TO_INITIAL = 'SCENE_DEVICES_RESET_TO_INITIAL';
import { apiUrl, CHOOSE_DEVICE_FOR_SCENE_URL } from '../../network_request/api_collections'



function sceneDeviceHasErrored(bool) {
  return {
    type: SCENE_DEVICES_HAS_ERRORED,
    hasErrored: bool,
  };
}

function sceneDeviceIsLoading(bool) {
  return {
    type: SCENE_DEVICES_IS_LOADING,
    isLoading: bool,
  };
}

// function sceneDeviceIsLoadingMore(bool) {
//   return {
//     type: SCENE_DEVICES_IS_LOADING_MORE,
//     isLoadingMore: bool,
//   };
// }

// function sceneDeviceDataAfter(string) {
//   return {
//     type: SCENE_DEVICES_DATA_AFTER,
//     dataAfter: string,
//   };
// }

function sceneDeviceFetchDataSuccess(data) {
  return {
    type: SCENE_DEVICES_FETCH_DATA_SUCCESS,
    data: data.children,
    isLoading: data.isLoading,
    isLoadingMore: data.isLoadingMore,
    dataAfter: data.dataAfter,
  };
}

export function sceneDeviceResetToInitial() {
  return {
    type: SCENE_DEVICES_RESET_TO_INITIAL,
    data: [],
    isLoading: true,
    isLoadingMore: false,
    hasErrored: false,
    dataAfter: '',
  };
}

export function sceneDeviceFetchData() {
  return (dispatch, getState) => {
    dispatch(sceneDeviceIsLoading(true));
    fetch(`${apiUrl}${CHOOSE_DEVICE_FOR_SCENE_URL}`, {
      headers: {
        'content-type': 'application/json',
        Authorization: `Token ${getState().authUserInfoReducer.token}`
      },
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        dispatch(sceneDeviceIsLoading(false));
        return response;
      })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        dispatch(
          sceneDeviceFetchDataSuccess({
            children: responseJson,
            isLoading: false,
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
        dispatch(sceneDeviceHasErrored(true));
      });
  };
}

// export function sceneDeviceFetchMoreData() {
//   return (dispatch, getState) => {
//     if (getState().chooseSceneDeviceReducer.dataAfter == '') {
//       return;
//     } else {
//       fetch(getState().chooseSceneDeviceReducer.dataAfter, {
//         headers: {
//           'content-type': 'application/json',
//           Authorization: `Token ${getState().authUserInfoReducer.token}`,
//         },
//       })
//         .then(response => {
//           if (!response.ok) {
//             throw Error(response.statusText);
//           }

//           dispatch(sceneDeviceIsLoadingMore(false));
//           return response;
//         })
//         .then(response => response.json())
//         .then(responseJson =>
//           dispatch(
//             sceneDeviceFetchDataSuccess({
//               children: getState().chooseSceneDeviceReducer.data.concat(
//                 responseJson.data,
//               ),
//               isLoadingMore: responseJson.current_page < responseJson.last_page,
//               isLoading: false,
//               dataAfter:
//                 responseJson.current_page < responseJson.last_page
//                   ? responseJson.next_page_url
//                   : '',
//             }),
//           ),
//         )
//         .catch(() => {
//           dispatch(sceneDeviceHasErrored(true));
//         });
//     }
//   };
// }

// 我的家-家庭信息，设置
export const FAMILY_SETUP_IS_LOADING = 'FAMILY_SETUP_IS_LOADING';
export const FAMILY_SETUP_FETCH_DATA_SUCCESS = 'FAMILY_SETUP_FETCH_DATA_SUCCESS';
export const FAMILY_SETUP_HAS_ERRORED = 'FAMILY_SETUP_HAS_ERRORED';
export const FAMILY_SETUP_RESET_TO_INITIAL = 'FAMILY_SETUP_RESET_TO_INITIAL';
import { apiUrl, FAMILY_SETUP_URI } from '../../network_request/api_collections'



function familySetUpHasErrored(bool) {
  return {
    type: FAMILY_SETUP_HAS_ERRORED,
    hasErrored: bool,
  };
}

function familySetUpIsLoading(bool) {
  return {
    type: FAMILY_SETUP_IS_LOADING,
    isLoading: bool,
  };
}



function familySetUpFetchDataSuccess(data) {
  return {
    type: FAMILY_SETUP_FETCH_DATA_SUCCESS,
    data: data.children,
    isLoading: data.isLoading,
  };
}

export function familySetUpResetToInitial() {
  return {
    type: ITEMS_RESET_TO_INITIAL,
    data: [],
    isLoading: true,
    hasErrored: false,
  };
}

export function familySetUpFetchData(familyId) {
  return (dispatch, getState) => {
    dispatch(familySetUpIsLoading(true));
    console.log(`${apiUrl}${FAMILY_SETUP_URI}${familyId}`);
    fetch(`${apiUrl}${FAMILY_SETUP_URI}${familyId}/`, {
      headers: {
        'content-type': 'application/json',
        Authorization: `Token ${getState().authUserInfoReducer.token}`
      },
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        dispatch(familySetUpIsLoading(false));
        return response;
      })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        dispatch(
          familySetUpFetchDataSuccess({
            children: responseJson,
            isLoading: false,
          }),
        );
      }
      )
      .catch(err => {
        console.log(err);
        dispatch(familySetUpHasErrored(true));
      });
  };
}





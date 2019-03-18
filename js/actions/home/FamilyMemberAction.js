// 我的家-家庭成员
export const FAMILY_MEMBER_IS_LOADING = 'FAMILY_MEMBER_IS_LOADING';
export const FAMILY_MEMBER_FETCH_DATA_SUCCESS = 'FAMILY_MEMBER_FETCH_DATA_SUCCESS';
export const FAMILY_MEMBER_HAS_ERRORED = 'FAMILY_MEMBER_HAS_ERRORED';
export const FAMILY_MEMBER_RESET_TO_INITIAL = 'FAMILY_MEMBER_RESET_TO_INITIAL';
import { apiUrl, MEMBER, FAMILY_MEMBER_URI } from '../../network_request/api_collections'



function familyMemberHasErrored(bool) {
  return {
    type: FAMILY_MEMBER_HAS_ERRORED,
    hasErrored: bool,
  };
}

function familyMemberIsLoading(bool) {
  return {
    type: FAMILY_MEMBER_IS_LOADING,
    isLoading: bool,
  };
}



function familyMemberFetchDataSuccess(data) {
  return {
    type: FAMILY_MEMBER_FETCH_DATA_SUCCESS,
    data: data.children,
    isLoading: data.isLoading,
  };
}

export function familyMemberResetToInitial() {
  return {
    type: ITEMS_RESET_TO_INITIAL,
    data: [],
    isLoading: true,
    hasErrored: false,
  };
}

export function familyMemberFetchData(familyID) {
  return (dispatch, getState) => {
    dispatch(familyMemberIsLoading(true));
    console.log(`${apiUrl}${FAMILY_MEMBER_URI}${familyID}${MEMBER}`);
    fetch(`${apiUrl}${FAMILY_MEMBER_URI}${familyID}${MEMBER}`, {
      headers: {
        'content-type': 'application/json',
        Authorization: `Token ${getState().authUserInfoReducer.token}`
      },
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        dispatch(familyMemberIsLoading(false));
        return response;
      })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson.data);
        dispatch(
          familyMemberFetchDataSuccess({
            children: responseJson.data,
            isLoading: false,
          }),
        );
      }
      )
      .catch(err => {
        console.log(err);
        dispatch(familyMemberHasErrored(true));
      });
  };
}





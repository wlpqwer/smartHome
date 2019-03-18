// 智能-自动化-自动化内容
export const AUTOMATION_CONTENT_IS_LOADING = 'AUTOMATION_CONTENT_IS_LOADING';
export const AUTOMATION_CONTENT_FETCH_DATA_SUCCESS = 'AUTOMATION_CONTENT_FETCH_DATA_SUCCESS';
export const AUTOMATION_CONTENT_HAS_ERRORED = 'AUTOMATION_CONTENT_HAS_ERRORED';
export const AUTOMATION_CONTENT_RESET_TO_INITIAL = 'AUTOMATION_CONTENT_RESET_TO_INITIAL';
import { apiUrl, AUTOMATION_CONTNET_URI } from '../../network_request/api_collections'

function autoMationContentHasErrored(bool) {
  return {
    type: AUTOMATION_CONTENT_HAS_ERRORED,
    hasErrored: bool,
  };
}

function autoMationContentIsLoading(bool) {
  return {
    type: AUTOMATION_CONTENT_IS_LOADING,
    isLoading: bool,
  };
}



function autoMationContentFetchDataSuccess(data) {
  return {
    type: AUTOMATION_CONTENT_FETCH_DATA_SUCCESS,
    data: data.children,
    isLoading: data.isLoading,
  };
}

export function autoMationContentResetToInitial() {
  return {
    type: AUTOMATION_CONTENT_RESET_TO_INITIAL,
    data: [],
    isLoading: true,
    hasErrored: false,
  };
}

export function autoMationContentFetchData(autoMationId) {
  return (dispatch, getState) => {
    dispatch(autoMationContentIsLoading(true));
    console.log(`${apiUrl}${AUTOMATION_CONTNET_URI}${autoMationId}`);
    fetch(`${apiUrl}${AUTOMATION_CONTNET_URI}${autoMationId}`, {
      headers: {
        'content-type': 'application/json',
        Authorization: `Token ${getState().authUserInfoReducer.token}`
      },
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        dispatch(autoMationContentIsLoading(false));
        return response;
      })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        dispatch(
          autoMationContentFetchDataSuccess({
            children: responseJson,
            isLoading: false,
          }),
        );
      }
      )
      .catch(err => {
        console.log(err);
        dispatch(autoMationContentHasErrored(true));
      });
  };
}
export const MY_BASEINFO_FETCH_DATA_SUCCESS = 'MY_BASEINFO_FETCH_DATA_SUCCESS';
export const MY_BASEINFO_HAS_ERRORED = 'MY_BASEINFO_HAS_ERRORED';
import { apiUrl, USER_INFO_URL} from '../../network_request/api_collections';


// 我的-主页面获取基本信息
function myBaseInfoHasErrored(bool) {
  return {
    type: MY_BASEINFO_HAS_ERRORED,
    hasErrored: bool,
  };
}

function myBaseInfoFetchDataSuccess(data) {
  return {
    type: MY_BASEINFO_FETCH_DATA_SUCCESS,
    data: data.children,
  };
}

export function myBaseInfoFetchData(userPhoneNum) {
  return (dispatch, getState) => {
    fetch(`${apiUrl}${USER_INFO_URL}${userPhoneNum}/`, {
      headers: {
        'content-type': 'application/json',
        Authorization: `Token ${getState().authUserInfoReducer.token}`,
      },
    })
      .then(response => {
          console.log(response)
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then(response => response.json())
      .then(responseJson =>{
        console.log(responseJson);
        dispatch(
            myBaseInfoFetchDataSuccess({
            children: responseJson,
          }),
        )}
      )
      .catch(error => {
        console.log(error);
        dispatch(myBaseInfoHasErrored(true));
      });
  };
}

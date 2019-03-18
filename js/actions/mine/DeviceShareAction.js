// 我的 - 设备共享 （共享）
export const DEVICE_SHARE_LIST_IS_LOADING = 'DEVICE_SHARE_LIST_IS_LOADING';
export const DEVICE_SHARE_LIST_FETCH_DATA_SUCCESS = 'DEVICE_SHARE_LIST_FETCH_DATA_SUCCESS';
export const DEVICE_SHARE_LIST_IS_LOADING_MORE = 'DEVICE_SHARE_LIST_IS_LOADING_MORE';
export const DEVICE_SHARE_LIST_DATA_AFTER = 'DEVICE_SHARE_LIST_DATA_AFTER';
export const DEVICE_SHARE_LIST_HAS_ERRORED = 'DEVICE_SHARE_LIST_HAS_ERRORED';
export const DEVICE_SHARE_LIST_RESET_TO_INITIAL = 'DEVICE_SHARE_LIST_RESET_TO_INITIAL';

import { apiUrl, DEVICE_SHARE_URL, DEVICE_ACCEPT_URL } from '../../network_request/api_collections'



function deviceShareListHasErrored(bool) {
  return {
    type: DEVICE_SHARE_LIST_HAS_ERRORED,
    hasErrored: bool,
  };
}

function deviceShareListIsLoading(bool) {
  return {
    type: DEVICE_SHARE_LIST_IS_LOADING,
    isLoading: bool,
  };
}

function deviceShareListIsLoadingMore(bool) {
  return {
    type: DEVICE_SHARE_LIST_IS_LOADING_MORE,
    isLoadingMore: bool,
  };
}

function deviceShareListDataAfter(string) {
  return {
    type: DEVICE_SHARE_LIST_DATA_AFTER,
    dataAfter: string,
  };
}

function deviceShareListFetchDataSuccess(data) {
  return {
    type: DEVICE_SHARE_LIST_FETCH_DATA_SUCCESS,
    data: data.children,
    isLoading: data.isLoading,
    isLoadingMore: data.isLoadingMore,
    dataAfter: data.dataAfter,
  };
}

export function deviceShareListResetToInitial() {
  return {
    type: DEVICE_SHARE_LIST_RESET_TO_INITIAL,
    data: [],
    isLoading: true,
    isLoadingMore: false,
    hasErrored: false,
    dataAfter: '',
  };
}

export function deviceShareListFetchData() {
  return (dispatch, getState) => {
    dispatch(deviceShareListIsLoading(true));
    console.log(`${apiUrl}${DEVICE_SHARE_URL}`)
    fetch(`${apiUrl}${DEVICE_SHARE_URL}`, {
      headers: {
        'content-type': 'application/json',
        Authorization: `Token ${getState().authUserInfoReducer.token}`
      },
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        dispatch(deviceShareListIsLoading(false));
        return response;
      })
      .then(response => response.json())
      .then(responseJson => {
        // console.log(responseJson);
        dispatch(
          deviceShareListFetchDataSuccess({
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
        dispatch(deviceShareListHasErrored(true));
      });
  };
}

export function deviceShareListFetchMoreData() {
  return (dispatch, getState) => {
    if (getState().deviceShareListReducer.dataAfter == '') {
      return;
    } else {
      fetch(getState().deviceShareListReducer.dataAfter, {
        headers: {
          'content-type': 'application/json',
          Authorization: `Token ${getState().authUserInfoReducer.token}`,
        },
      })
        .then(response => {
          if (!response.ok) {
            throw Error(response.statusText);
          }

          dispatch(deviceShareListIsLoadingMore(false));
          return response;
        })
        .then(response => response.json())
        .then(responseJson =>
          dispatch(
            deviceShareListFetchDataSuccess({
              children: getState().deviceShareListReducer.data.concat(
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
          dispatch(deviceShareListHasErrored(true));
        });
    }
  };
}




// 我的 - 设备共享 （接受）
export const DEVICE_ACCEPT_LIST_IS_LOADING = 'DEVICE_ACCEPT_LIST_IS_LOADING';
export const DEVICE_ACCEPT_LIST_FETCH_DATA_SUCCESS = 'DEVICE_ACCEPT_LIST_FETCH_DATA_SUCCESS';
export const DEVICE_ACCEPT_LIST_IS_LOADING_MORE = 'DEVICE_ACCEPT_LIST_IS_LOADING_MORE';
export const DEVICE_ACCEPT_LIST_DATA_AFTER = 'DEVICE_ACCEPT_LIST_DATA_AFTER';
export const DEVICE_ACCEPT_LIST_HAS_ERRORED = 'DEVICE_ACCEPT_LIST_HAS_ERRORED';
export const DEVICE_ACCEPT_LIST_RESET_TO_INITIAL = 'DEVICE_ACCEPT_LIST_RESET_TO_INITIAL';



function deviceAcceptListHasErrored(bool) {
  return {
    type: DEVICE_ACCEPT_LIST_HAS_ERRORED,
    hasErrored: bool,
  };
}

function deviceAcceptListIsLoading(bool) {
  return {
    type: DEVICE_ACCEPT_LIST_IS_LOADING,
    isLoading: bool,
  };
}

function deviceAcceptListIsLoadingMore(bool) {
  return {
    type: DEVICE_ACCEPT_LIST_IS_LOADING_MORE,
    isLoadingMore: bool,
  };
}

function deviceAcceptListDataAfter(string) {
  return {
    type: DEVICE_ACCEPT_LIST_DATA_AFTER,
    dataAfter: string,
  };
}

function deviceAcceptListFetchDataSuccess(data) {
  return {
    type: DEVICE_ACCEPT_LIST_FETCH_DATA_SUCCESS,
    data: data.children,
    isLoading: data.isLoading,
    isLoadingMore: data.isLoadingMore,
    dataAfter: data.dataAfter,
  };
}

export function deviceAcceptListResetToInitial() {
  return {
    type: DEVICE_ACCEPT_LIST_RESET_TO_INITIAL,
    data: [],
    isLoading: true,
    isLoadingMore: false,
    hasErrored: false,
    dataAfter: '',
  };
}

export function deviceAcceptListFetchData() {
  return (dispatch, getState) => {
    dispatch(deviceAcceptListIsLoading(true));
    console.log(`${apiUrl}${DEVICE_ACCEPT_URL}`)
    fetch(`${apiUrl}${DEVICE_ACCEPT_URL}`, {
      headers: {
        'content-type': 'application/json',
        Authorization: `Token ${getState().authUserInfoReducer.token}`
      },
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        dispatch(deviceAcceptListIsLoading(false));
        return response;
      })
      .then(response => response.json())
      .then(responseJson => {
        // console.log(responseJson);
        dispatch(
          deviceAcceptListFetchDataSuccess({
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
        dispatch(deviceAcceptListHasErrored(true));
      });
  };
}

export function deviceAcceptListFetchMoreData() {
  return (dispatch, getState) => {
    if (getState().deviceAcceptListReducer.dataAfter == '') {
      return;
    } else {
      fetch(getState().deviceAcceptListReducer.dataAfter, {
        headers: {
          'content-type': 'application/json',
          Authorization: `Token ${getState().authUserInfoReducer.token}`,
        },
      })
        .then(response => {
          if (!response.ok) {
            throw Error(response.statusText);
          }

          dispatch(deviceAcceptListIsLoadingMore(false));
          return response;
        })
        .then(response => response.json())
        .then(responseJson =>
          dispatch(
            deviceAcceptListFetchDataSuccess({
              children: getState().deviceAcceptListReducer.data.concat(
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
          dispatch(deviceAcceptListHasErrored(true));
        });
    }
  };
}
// 智能-我的场景
export const SMART_SCENE_IS_LOADING = 'SMART_SCENE_IS_LOADING';
export const SMART_SCENE_FETCH_DATA_SUCCESS = 'SMART_SCENE_FETCH_DATA_SUCCESS';
export const SMART_SCENE_IS_LOADING_MORE = 'SMART_SCENE_IS_LOADING_MORE';
export const SMART_SCENE_DATA_AFTER = 'SMART_SCENE_DATA_AFTER';
export const SMART_SCENE_HAS_ERRORED = 'SMART_SCENE_HAS_ERRORED';
export const SMART_SCENE_RESET_TO_INITIAL = 'SMART_SCENE_RESET_TO_INITIAL';
import { apiUrl, SMART_SCENE_URL, SCENES_CONTENT_URI, AUTOMATION_LIST_URI } from '../../network_request/api_collections'



function smartSceneHasErrored(bool) {
  return {
    type: SMART_SCENE_HAS_ERRORED,
    hasErrored: bool,
  };
}

function smartSceneIsLoading(bool) {
  return {
    type: SMART_SCENE_IS_LOADING,
    isLoading: bool,
  };
}

function smartSceneIsLoadingMore(bool) {
  return {
    type: SMART_SCENE_IS_LOADING_MORE,
    isLoadingMore: bool,
  };
}

function smartSceneDataAfter(string) {
  return {
    type: SMART_SCENE_DATA_AFTER,
    dataAfter: string,
  };
}

function smartSceneFetchDataSuccess(data) {
  return {
    type: SMART_SCENE_FETCH_DATA_SUCCESS,
    data: data.children,
    isLoading: data.isLoading,
    isLoadingMore: data.isLoadingMore,
    dataAfter: data.dataAfter,
  };
}

export function smartSceneResetToInitial() {
  return {
    type: SMART_SCENE_RESET_TO_INITIAL,
    data: [],
    isLoading: true,
    isLoadingMore: false,
    hasErrored: false,
    dataAfter: '',
  };
}

export function smartSceneFetchData(currentHomeId) {
  return (dispatch, getState) => {
    dispatch(smartSceneIsLoading(true));
    console.log(`${apiUrl}${SMART_SCENE_URL}${currentHomeId}/scenes/`);
    fetch(`${apiUrl}${SMART_SCENE_URL}${currentHomeId}/scenes/`, {
      headers: {
        'content-type': 'application/json',
        Authorization: `Token ${getState().authUserInfoReducer.token}`
      },
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        dispatch(smartSceneIsLoading(false));
        return response;
      })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        dispatch(
          smartSceneFetchDataSuccess({
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
        dispatch(smartSceneHasErrored(true));
      });
  };
}

export function smartSceneFetchMoreData() {
  return (dispatch, getState) => {
    if (getState().smartViewReducer.dataAfter == '') {
      return;
    } else {
      fetch(getState().smartViewReducer.dataAfter, {
        headers: {
          'content-type': 'application/json',
          Authorization: `Token ${getState().authUserInfoReducer.token}`,
        },
      })
        .then(response => {
          if (!response.ok) {
            throw Error(response.statusText);
          }

          dispatch(smartSceneIsLoadingMore(false));
          return response;
        })
        .then(response => response.json())
        .then(responseJson =>
          dispatch(
            smartSceneFetchDataSuccess({
              children: getState().smartViewReducer.data.concat(
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
          dispatch(smartSceneHasErrored(true));
        });
    }
  };
}











// 智能-场景-场景内容
export const SCENES_CONTENT_IS_LOADING = 'SCENES_CONTENT_IS_LOADING';
export const SCENES_CONTENT_FETCH_DATA_SUCCESS = 'SCENES_CONTENT_FETCH_DATA_SUCCESS';
export const SCENES_CONTENT_HAS_ERRORED = 'SCENES_CONTENT_HAS_ERRORED';
export const SCENES_CONTENT_RESET_TO_INITIAL = 'SCENES_CONTENT_RESET_TO_INITIAL';



function sceneContentHasErrored(bool) {
  return {
    type: SCENES_CONTENT_HAS_ERRORED,
    hasErrored: bool,
  };
}

function sceneContentIsLoading(bool) {
  return {
    type: SCENES_CONTENT_IS_LOADING,
    isLoading: bool,
  };
}



function sceneContentFetchDataSuccess(data) {
  return {
    type: SCENES_CONTENT_FETCH_DATA_SUCCESS,
    data: data.children,
    isLoading: data.isLoading,
  };
}

export function sceneContentResetToInitial() {
  return {
    type: SCENES_CONTENT_RESET_TO_INITIAL,
    data: [],
    isLoading: true,
    hasErrored: false,
  };
}

export function sceneContentFetchData(sceneId) {
  return (dispatch, getState) => {
    dispatch(sceneContentIsLoading(true));
    console.log(`${apiUrl}${SCENES_CONTENT_URI}${sceneId}`);
    fetch(`${apiUrl}${SCENES_CONTENT_URI}${sceneId}/`, {
      headers: {
        'content-type': 'application/json',
        Authorization: `Token ${getState().authUserInfoReducer.token}`
      },
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        dispatch(sceneContentIsLoading(false));
        return response;
      })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        dispatch(
          sceneContentFetchDataSuccess({
            children: responseJson,
            isLoading: false,
          }),
        );
      }
      )
      .catch(err => {
        console.log(err);
        dispatch(sceneContentHasErrored(true));
      });
  };
}









// 智能-查询自动化列表
export const AUTOMATION_LIST_IS_LOADING = 'AUTOMATION_LIST_IS_LOADING';
export const AUTOMATION_LIST_FETCH_DATA_SUCCESS = 'AUTOMATION_LIST_FETCH_DATA_SUCCESS';
export const AUTOMATION_LIST_HAS_ERRORED = 'AUTOMATION_LIST_HAS_ERRORED';
export const AUTOMATION_LIST_RESET_TO_INITIAL = 'AUTOMATION_LIST_RESET_TO_INITIAL';



function automationListHasErrored(bool) {
  return {
    type: AUTOMATION_LIST_HAS_ERRORED,
    hasErrored: bool,
  };
}

function automationListIsLoading(bool) {
  return {
    type: AUTOMATION_LIST_IS_LOADING,
    isLoading: bool,
  };
}



function automationListFetchDataSuccess(data) {
  return {
    type: AUTOMATION_LIST_FETCH_DATA_SUCCESS,
    data: data.children,
    isLoading: data.isLoading,
  };
}

export function automationListResetToInitial() {
  return {
    type: AUTOMATION_LIST_RESET_TO_INITIAL,
    data: [],
    isLoading: true,
    hasErrored: false,
  };
}   

export function automationListFetchData(currentHomeId) {
  return (dispatch, getState) => {
    dispatch(automationListIsLoading(true));
    console.log(`${apiUrl}${AUTOMATION_LIST_URI}${currentHomeId}/automations/`);
    fetch(`${apiUrl}${AUTOMATION_LIST_URI}${currentHomeId}/automations/`, {
      headers: {
        'content-type': 'application/json',
        Authorization: `Token ${getState().authUserInfoReducer.token}`
      },
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        dispatch(automationListIsLoading(false));
        return response;
      })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        dispatch(
          automationListFetchDataSuccess({
            children: responseJson,
            isLoading: false,
          }),
        );
      }
      )
      .catch(err => {
        console.log(err);
        dispatch(automationListHasErrored(true));
      });
  };
}

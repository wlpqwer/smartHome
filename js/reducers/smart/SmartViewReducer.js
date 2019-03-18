import {
    SMART_SCENE_IS_LOADING,
    SMART_SCENE_FETCH_DATA_SUCCESS,
    SMART_SCENE_HAS_ERRORED,
    SMART_SCENE_IS_LOADING_MORE,
    SMART_SCENE_DATA_AFTER,
    SMART_SCENE_RESET_TO_INITIAL,
    SCENES_CONTENT_IS_LOADING,
    SCENES_CONTENT_HAS_ERRORED,
    SCENES_CONTENT_RESET_TO_INITIAL,
    SCENES_CONTENT_FETCH_DATA_SUCCESS,
    AUTOMATION_LIST_IS_LOADING,
    AUTOMATION_LIST_HAS_ERRORED,
    AUTOMATION_LIST_FETCH_DATA_SUCCESS,
    AUTOMATION_LIST_RESET_TO_INITIAL,
  } from '../../actions/smart/SmartViewAction';
  // import {unique} from '../../tools/commonUtil'
  
  let dataState = {
    data: [],
    isLoading: true,
    isLoadingMore: false,
    hasErrored: false,
    dataAfter: '',
  };

  export const smartViewReducer = (state = dataState, action) => {
    switch (action.type) {
      case SMART_SCENE_IS_LOADING:
        state = Object.assign({}, state, { isLoading: action.isLoading });
        return state;
  
      case SMART_SCENE_HAS_ERRORED:
        state = Object.assign({}, state, { hasErrored: action.hasErrored });
        return state;
  
      case SMART_SCENE_IS_LOADING_MORE:
        state = Object.assign({}, state, { isLoadingMore: action.isLoadingMore }); 
        return state;
  
      case SMART_SCENE_DATA_AFTER:
        state = Object.assign({}, state, { dataAfter: action.dataAfter });
        return state;
  
      case SMART_SCENE_FETCH_DATA_SUCCESS:
        state = Object.assign({}, state, {
          data: action.data,
          isLoading: action.isLoading,
          isLoadingMore: action.isLoadingMore,
          dataAfter: action.dataAfter,
        });
        return state;
  
      case SMART_SCENE_RESET_TO_INITIAL:
        state = Object.assign({}, state, {
          data: action.data,
          isLoading: action.isLoading,
          isLoadingMore: action.isLoadingMore,
          dataAfter: action.dataAfter,
        });
        return state;
  
      default:
        return state;
    }
  };
  



  
  let sceneContentState = {
    data: [],
    isLoading: true,
    hasErrored: false,
  };

  export const sceneContentReducer = (state = sceneContentState, action) => {
    switch (action.type) {
      case SCENES_CONTENT_IS_LOADING:
        state = Object.assign({}, state, { isLoading: action.isLoading });
        return state;
  
      case SCENES_CONTENT_HAS_ERRORED:
        state = Object.assign({}, state, { hasErrored: action.hasErrored });
        return state;
  
      case SCENES_CONTENT_FETCH_DATA_SUCCESS:
        state = Object.assign({}, state, {
          data: action.data,
          isLoading: action.isLoading,
        });
        return state;
  
      case SCENES_CONTENT_RESET_TO_INITIAL:
        state = Object.assign({}, state, {
          data: action.data,
          isLoading: action.isLoading,
        });
        return state;
  
      default:
        return state;
    }
  };
  




  let automationListState = {
    data: [],
    isLoading: true,
    hasErrored: false,
  };

  export const automationListReducer = (state = automationListState, action) => {
    switch (action.type) {
      case AUTOMATION_LIST_IS_LOADING:
        state = Object.assign({}, state, { isLoading: action.isLoading });
        return state;
  
      case AUTOMATION_LIST_HAS_ERRORED:
        state = Object.assign({}, state, { hasErrored: action.hasErrored });
        return state;
  
      case AUTOMATION_LIST_FETCH_DATA_SUCCESS:
        state = Object.assign({}, state, {
          data: action.data,
          isLoading: action.isLoading,
        });
        return state;
  
      case AUTOMATION_LIST_RESET_TO_INITIAL:
        state = Object.assign({}, state, {
          data: action.data,
          isLoading: action.isLoading,
        });
        return state;
  
      default:
        return state;
    }
  };
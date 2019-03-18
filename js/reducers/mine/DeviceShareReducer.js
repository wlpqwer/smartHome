import {
  DEVICE_SHARE_LIST_IS_LOADING,
  DEVICE_SHARE_LIST_FETCH_DATA_SUCCESS,
  DEVICE_SHARE_LIST_HAS_ERRORED,
  DEVICE_SHARE_LIST_IS_LOADING_MORE,
  DEVICE_SHARE_LIST_DATA_AFTER,
  DEVICE_SHARE_LIST_RESET_TO_INITIAL,
  DEVICE_ACCEPT_LIST_IS_LOADING,
  DEVICE_ACCEPT_LIST_FETCH_DATA_SUCCESS,
  DEVICE_ACCEPT_LIST_IS_LOADING_MORE,
  DEVICE_ACCEPT_LIST_DATA_AFTER,
  DEVICE_ACCEPT_LIST_HAS_ERRORED,
  DEVICE_ACCEPT_LIST_RESET_TO_INITIAL
  } from '../../actions/mine/DeviceShareAction';
  
  let dataState = {
    data: [],
    isLoading: true,
    isLoadingMore: false,
    hasErrored: false,
    dataAfter: '',
  };

  let dataAcceptState = {
    data: [],
    isLoading: true,
    isLoadingMore: false,
    hasErrored: false,
    dataAfter: '',
  };

  export const deviceShareListReducer = (state = dataState, action) => {
    switch (action.type) {
      case DEVICE_SHARE_LIST_IS_LOADING:
        state = Object.assign({}, state, { isLoading: action.isLoading });
        return state;
  
      case DEVICE_SHARE_LIST_HAS_ERRORED:
        state = Object.assign({}, state, { hasErrored: action.hasErrored });
        return state;
  
      case DEVICE_SHARE_LIST_IS_LOADING_MORE:        
        state = Object.assign({}, state, { isLoadingMore: action.isLoadingMore });
        return state;
  
      case DEVICE_SHARE_LIST_DATA_AFTER:
        state = Object.assign({}, state, { dataAfter: action.dataAfter });
        return state;
  
      case DEVICE_SHARE_LIST_FETCH_DATA_SUCCESS:
        state = Object.assign({}, state, {
          data: action.data,
          isLoading: action.isLoading,
          isLoadingMore: action.isLoadingMore,
          dataAfter: action.dataAfter,
        });
        return state;
  
      case DEVICE_SHARE_LIST_RESET_TO_INITIAL:
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


  export const deviceAcceptListReducer = (state = dataAcceptState, action) => {
    switch (action.type) {
      case DEVICE_ACCEPT_LIST_IS_LOADING:
        state = Object.assign({}, state, { isLoading: action.isLoading });
        return state;
  
      case DEVICE_ACCEPT_LIST_HAS_ERRORED:
        state = Object.assign({}, state, { hasErrored: action.hasErrored });
        return state;
  
      case DEVICE_ACCEPT_LIST_IS_LOADING_MORE:        
        state = Object.assign({}, state, { isLoadingMore: action.isLoadingMore });
        return state;
  
      case DEVICE_ACCEPT_LIST_DATA_AFTER:
        state = Object.assign({}, state, { dataAfter: action.dataAfter });
        return state;
  
      case DEVICE_ACCEPT_LIST_FETCH_DATA_SUCCESS:
        state = Object.assign({}, state, {
          data: action.data,
          isLoading: action.isLoading,
          isLoadingMore: action.isLoadingMore,
          dataAfter: action.dataAfter,
        });
        return state;
  
      case DEVICE_ACCEPT_LIST_RESET_TO_INITIAL:
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
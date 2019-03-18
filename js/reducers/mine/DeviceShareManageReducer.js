import {
    DEVICE_SHARE_MANAGE_IS_LOADING,
    DEVICE_SHARE_MANAGE_FETCH_DATA_SUCCESS,
    DEVICE_SHARE_MANAGE_HAS_ERRORED,
    DEVICE_SHARE_MANAGE_RESET_TO_INITIAL,
  } from '../../actions/mine/DeviceShareManageAction';
  

  let deviceShareUserState = {
    data: [],
    isLoading: true,
    hasErrored: false,
  }


  export const deviceShareUserReducer = (state = deviceShareUserState, action) => {
    switch (action.type) {
      case DEVICE_SHARE_MANAGE_IS_LOADING:
        state = Object.assign({}, state, { isLoading: action.isLoading });
        return state;
  
      case DEVICE_SHARE_MANAGE_HAS_ERRORED:
        state = Object.assign({}, state, { hasErrored: action.hasErrored });
        return state;
  
      case DEVICE_SHARE_MANAGE_FETCH_DATA_SUCCESS:
        state = Object.assign({}, state, {
          data: action.data,
          isLoading: action.isLoading,
        });
        return state;
  
      case DEVICE_SHARE_MANAGE_RESET_TO_INITIAL:
        state = Object.assign({}, state, {
          data: action.data,
          isLoading: action.isLoading,
        });
        return state;
  
      default:
        return state;
    }
  };
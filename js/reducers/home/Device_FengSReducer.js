import {
  DEVICES_IS_LOADING,
  DEVICES_FETCH_DATA_SUCCESS,
  DEVICES_HAS_ERRORED,
  DEVICES_RESET_TO_INITIAL,
  } from '../../actions/home/Device_FengSAction';
  // import {unique} from '../../tools/commonUtil'
  

  let deviceStatusState = {
    data: [],
    isLoading: true,
    hasErrored: false,
  }


  export const deviceStatusReducer = (state = deviceStatusState, action) => {
    switch (action.type) {
      case DEVICES_IS_LOADING:
        state = Object.assign({}, state, { isLoading: action.isLoading });
        return state;
  
      case DEVICES_HAS_ERRORED:
        state = Object.assign({}, state, { hasErrored: action.hasErrored });
        return state;
  
      case DEVICES_FETCH_DATA_SUCCESS:
        state = Object.assign({}, state, {
          data: action.data,
          isLoading: action.isLoading,
        });
        return state;
  
      case DEVICES_RESET_TO_INITIAL:
        state = Object.assign({}, state, {
          data: action.data,
          isLoading: action.isLoading,
        });
        return state;
  
      default:
        return state;
    }
  };
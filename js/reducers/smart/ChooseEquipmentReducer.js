import {
  SCENE_DEVICES_IS_LOADING,
  SCENE_DEVICES_FETCH_DATA_SUCCESS,
  SCENE_DEVICES_HAS_ERRORED,
  // SMART_SCENE_IS_LOADING_MORE,
  // SMART_SCENE_DATA_AFTER,
  SCENE_DEVICES_RESET_TO_INITIAL,
  } from '../../actions/smart/ChooseEquipmentAction';
  // import {unique} from '../../tools/commonUtil'
  
  let dataState = {
    data: [],
    isLoading: true,
    hasErrored: false,
    // dataAfter: '',
    // isLoadingMore: false,
  };

  export const chooseSceneDeviceReducer = (state = dataState, action) => {
    switch (action.type) {
      case SCENE_DEVICES_IS_LOADING:
        state = Object.assign({}, state, { isLoading: action.isLoading });
        return state;
  
      case SCENE_DEVICES_HAS_ERRORED:
        state = Object.assign({}, state, { hasErrored: action.hasErrored });
        return state;
  
      // case SMART_SCENE_IS_LOADING_MORE:
      //   state = Object.assign({}, state, { isLoadingMore: action.isLoadingMore }); 
      //   return state;
  
      // case SMART_SCENE_DATA_AFTER:
      //   state = Object.assign({}, state, { dataAfter: action.dataAfter });
      //   return state;
  
      case SCENE_DEVICES_FETCH_DATA_SUCCESS:
        state = Object.assign({}, state, {
          data: action.data,
          isLoading: action.isLoading,
          // isLoadingMore: action.isLoadingMore,
          // dataAfter: action.dataAfter,
        });
        return state;
  
      case SCENE_DEVICES_RESET_TO_INITIAL:
        state = Object.assign({}, state, {
          data: action.data,
          isLoading: action.isLoading,
          // isLoadingMore: action.isLoadingMore,
          // dataAfter: action.dataAfter,
        });
        return state;
  
      default:
        return state;
    }
  };
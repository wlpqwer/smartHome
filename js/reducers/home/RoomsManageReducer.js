import {
    ROOMS_MANAGELIST_IS_LOADING,
    ROOMS_MANAGELIST_FETCH_DATA_SUCCESS,
    ROOMS_MANAGELIST_HAS_ERRORED,
    ROOMS_MANAGELIST_RESET_TO_INITIAL,
} from '../../actions/home/RoomsManageAction';
  // import {unique} from '../../tools/commonUtil'
  

  let roomsManageListState = {
    data: [],
    isLoading: true,
    hasErrored: false,
  }


  export const roomsManageListReducer = (state = roomsManageListState, action) => {
    switch (action.type) {
      case ROOMS_MANAGELIST_IS_LOADING:
        state = Object.assign({}, state, { isLoading: action.isLoading });
        return state;
  
      case ROOMS_MANAGELIST_HAS_ERRORED:
        state = Object.assign({}, state, { hasErrored: action.hasErrored });
        return state;
  
      case ROOMS_MANAGELIST_FETCH_DATA_SUCCESS:
        state = Object.assign({}, state, {
          data: action.data,
          isLoading: action.isLoading,
        });
        return state;
  
      case ROOMS_MANAGELIST_RESET_TO_INITIAL:
        state = Object.assign({}, state, {
          data: action.data,
          isLoading: action.isLoading,
        });
        return state;
  
      default:
        return state;
    }
  };
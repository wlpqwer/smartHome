import {
    ROOM_SETUP_IS_LOADING,
    ROOM_SETUP_FETCH_DATA_SUCCESS,
    ROOM_SETUP_HAS_ERRORED,
    ROOM_SETUP_RESET_TO_INITIAL,
  } from '../../actions/home/RoomSetUpAction';
  // import {unique} from '../../tools/commonUtil'
  

  let roomSetUpState = {
    data: [],
    isLoading: true,
    hasErrored: false,
  }


  export const roomSetUpReducer = (state = roomSetUpState, action) => {
    switch (action.type) {
      case ROOM_SETUP_IS_LOADING:
        state = Object.assign({}, state, { isLoading: action.isLoading });
        return state;
  
      case ROOM_SETUP_HAS_ERRORED:
        state = Object.assign({}, state, { hasErrored: action.hasErrored });
        return state;
  
      case ROOM_SETUP_FETCH_DATA_SUCCESS:
        state = Object.assign({}, state, {
          data: action.data,
          isLoading: action.isLoading,
        });
        return state;
  
      case ROOM_SETUP_RESET_TO_INITIAL:
        state = Object.assign({}, state, {
          data: action.data,
          isLoading: action.isLoading,
        });
        return state;
  
      default:
        return state;
    }
  };
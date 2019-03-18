import {
    AUTOMATION_CONTENT_IS_LOADING,
    AUTOMATION_CONTENT_HAS_ERRORED,
    AUTOMATION_CONTENT_RESET_TO_INITIAL,
    AUTOMATION_CONTENT_FETCH_DATA_SUCCESS,
  } from '../../actions/smart/AutoMationSetUpAction';
  
  let autoMationContentState = {
    data: [],
    isLoading: true,
    hasErrored: false,
  };

  export const autoMationContentReducer = (state = autoMationContentState, action) => {
    switch (action.type) {
      case AUTOMATION_CONTENT_IS_LOADING:
        state = Object.assign({}, state, { isLoading: action.isLoading });
        return state;
  
      case AUTOMATION_CONTENT_HAS_ERRORED:
        state = Object.assign({}, state, { hasErrored: action.hasErrored });
        return state;
  
      case AUTOMATION_CONTENT_FETCH_DATA_SUCCESS:
        state = Object.assign({}, state, {
          data: action.data,
          isLoading: action.isLoading,
        });
        return state;
  
      case AUTOMATION_CONTENT_RESET_TO_INITIAL:
        state = Object.assign({}, state, {
          data: action.data,
          isLoading: action.isLoading,
        });
        return state;
  
      default:
        return state;
    }
  };
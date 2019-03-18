import {
    FAMILY_SETUP_IS_LOADING,
    FAMILY_SETUP_FETCH_DATA_SUCCESS,
    FAMILY_SETUP_HAS_ERRORED,
    FAMILY_SETUP_RESET_TO_INITIAL,
  } from '../../actions/home/FamilySetUpAction';
  // import {unique} from '../../tools/commonUtil'
  

  let familySetUpState = {
    data: [],
    isLoading: true,
    hasErrored: false,
  }


  export const familySetUpReducer = (state = familySetUpState, action) => {
    switch (action.type) {
      case FAMILY_SETUP_IS_LOADING:
        state = Object.assign({}, state, { isLoading: action.isLoading });
        return state;
  
      case FAMILY_SETUP_HAS_ERRORED:
        state = Object.assign({}, state, { hasErrored: action.hasErrored });
        return state;
  
      case FAMILY_SETUP_FETCH_DATA_SUCCESS:
        state = Object.assign({}, state, {
          data: action.data,
          isLoading: action.isLoading,
        });
        return state;
  
      case FAMILY_SETUP_RESET_TO_INITIAL:
        state = Object.assign({}, state, {
          data: action.data,
          isLoading: action.isLoading,
        });
        return state;
  
      default:
        return state;
    }
  };
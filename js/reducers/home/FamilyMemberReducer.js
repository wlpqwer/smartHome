import {
    FAMILY_MEMBER_IS_LOADING,
    FAMILY_MEMBER_FETCH_DATA_SUCCESS,
    FAMILY_MEMBER_HAS_ERRORED,
    FAMILY_MEMBER_RESET_TO_INITIAL,
  } from '../../actions/home/FamilyMemberAction';
  // import {unique} from '../../tools/commonUtil'
  

  let familyMemberState = {
    data: [],
    isLoading: true,
    hasErrored: false,
  }


  export const familyMemberReducer = (state = familyMemberState, action) => {
    switch (action.type) {
      case FAMILY_MEMBER_IS_LOADING:
        state = Object.assign({}, state, { isLoading: action.isLoading });
        return state;
  
      case FAMILY_MEMBER_HAS_ERRORED:
        state = Object.assign({}, state, { hasErrored: action.hasErrored });
        return state;
  
      case FAMILY_MEMBER_FETCH_DATA_SUCCESS:
        state = Object.assign({}, state, {
          data: action.data,
          isLoading: action.isLoading,
        });
        return state;
  
      case FAMILY_MEMBER_RESET_TO_INITIAL:
        state = Object.assign({}, state, {
          data: action.data,
          isLoading: action.isLoading,
        });
        return state;
  
      default:
        return state;
    }
  };
import {
    USER_INFO_FETCH_DATA_SUCCESS,
    USER_INFO_HAS_ERRORED,
    SWITCH_LOCAL_HOMEID_SUCCESS,
    LOCAL_STORE_HEADERIMG_SUCCESS,
    SWITCH_LOCAL_HOMEADMIN_SUCCESS
  } from '../../actions/mine/AuthUserInfoAction';

  
  let authUserInfoState = {
    token: '',
    hasErrored: false,
    phone_number: '',
    globalHomeId: 0,
    localHeaderImg:'',
    currentFamilyAdmin: ''
  };
  
  export const authUserInfoReducer = (state = authUserInfoState, action) => {
    switch (action.type) {
      case USER_INFO_HAS_ERRORED:
        state = Object.assign({}, state, { hasErrored: action.hasErrored });
        return state;
  
      case USER_INFO_FETCH_DATA_SUCCESS:
        state = Object.assign({}, state, {
          token: action.token,
          phone_number: action.phone_number,
          globalHomeId: action.globalHomeId,
          localHeaderImg: action.localHeaderImg,
          currentFamilyAdmin: action.currentFamilyAdmin
        });
        return state;

        case SWITCH_LOCAL_HOMEID_SUCCESS:
          state = Object.assign({}, state, {
            globalHomeId: action.globalHomeId
          });
          return state;

        case SWITCH_LOCAL_HOMEADMIN_SUCCESS:
          state = Object.assign({}, state, {
            currentFamilyAdmin: action.currentFamilyAdmin
          });
          return state;

        case LOCAL_STORE_HEADERIMG_SUCCESS:
          state = Object.assign({}, state, {
            localHeaderImg: action.localHeaderImg
          });
          return state;

      default:
        return state;
    }
  };
  
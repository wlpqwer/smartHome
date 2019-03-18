import { MY_BASEINFO_FETCH_DATA_SUCCESS,  MY_BASEINFO_HAS_ERRORED} from '../../actions/mine/MineViewAction';
  // 任务页获取必读信息
  let myBaseInfoState = {
    data: {},
    hasErrored: false,
  };
  
  export const myBaseInfoReducer = (state = myBaseInfoState, action) => {
    switch (action.type) {
      case MY_BASEINFO_HAS_ERRORED:
        state = Object.assign({}, state, { hasErrored: action.hasErrored });
        return state;
  
      case MY_BASEINFO_FETCH_DATA_SUCCESS:
        state = Object.assign({}, state, {
          data: action.data,
        });
        return state;
  
      default:
        return state;
    }
  };
  
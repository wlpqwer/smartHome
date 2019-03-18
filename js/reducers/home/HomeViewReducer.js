import {fromJS, List, Map} from 'immutable';
import {
    ITEMS_IS_LOADING,
    ITEMS_FETCH_DATA_SUCCESS,
    ITEMS_HAS_ERRORED,
    ITEMS_IS_LOADING_MORE,
    ITEMS_DATA_AFTER,
    ITEMS_RESET_TO_INITIAL,
    FAMILY_LIST_IS_LOADING,
    FAMILY_LIST_FETCH_DATA_SUCCESS,
    FAMILY_LIST_HAS_ERRORED,
    FAMILY_LIST_RESET_TO_INITIAL,
  } from '../../actions/home/HomeViewAction'
  // import {unique} from '../../tools/commonUtil'
  
  let dataState = {
    data: [],
    isLoading: true,
    isLoadingMore: false,
    hasErrored: false,
    dataAfter: '',
  };

  let familyListState = {
    data: [],
    isLoading: true,
    hasErrored: false,
  }

  export const homeViewReducer = (state = dataState, action) => {
    switch (action.type) {
      case ITEMS_IS_LOADING:
        // state.update('isLoading', (isLoading) => action.isLoading);
        state = Object.assign({}, state, { isLoading: action.isLoading });
        // return state.toJs();
        return state;
  
      case ITEMS_HAS_ERRORED:
        // state.update('hasErrored', (hasErrored) => action.hasErrored);
        state = Object.assign({}, state, { hasErrored: action.hasErrored });
        // return state.toJs();
        return state;
  
      case ITEMS_IS_LOADING_MORE:        
        // state.update('isLoadingMore', (isLoadingMore) => action.isLoadingMore);
        state = Object.assign({}, state, { isLoadingMore: action.isLoadingMore });
        // return state.toJs();   
        return state;
  
      case ITEMS_DATA_AFTER:
        // state.update('dataAfter', (dataAfter) => action.dataAfter);
        state = Object.assign({}, state, { dataAfter: action.dataAfter });
        // return state.toJs(); 
        return state;
  
      case ITEMS_FETCH_DATA_SUCCESS:
      // state.update('data', {
        state = Object.assign({}, state, {
          // data: unique(action.data), 
          data: action.data,
          isLoading: action.isLoading,
          isLoadingMore: action.isLoadingMore,
          dataAfter: action.dataAfter,
          hasErrored: action.hasErrored,
        });
        // return state.toJs(); 
        return state;
  
      case ITEMS_RESET_TO_INITIAL:
          // state.update({
        state = Object.assign({}, state, {
          data: action.data,
          isLoading: action.isLoading,
          isLoadingMore: action.isLoadingMore,
          dataAfter: action.dataAfter,
        });
        // return state.toJs();
        return state;
  
      default:
        return state;
    }
  };
  


  export const userFamilyListReducer = (state = familyListState, action) => {
    switch (action.type) {
      case FAMILY_LIST_IS_LOADING:
        state = Object.assign({}, state, { isLoading: action.isLoading });
        return state;
  
      case FAMILY_LIST_HAS_ERRORED:
        state = Object.assign({}, state, { hasErrored: action.hasErrored });
        return state;
  
      case FAMILY_LIST_FETCH_DATA_SUCCESS:
        state = Object.assign({}, state, {
          // data: unique(action.data), 
          data: action.data,
          isLoading: action.isLoading,
        });
        return state;
  
      case FAMILY_LIST_RESET_TO_INITIAL:
        state = Object.assign({}, state, {
          data: action.data,
          isLoading: action.isLoading,
        });
        // return state.toJs();
        return state;
  
      default:
        return state;
    }
  };
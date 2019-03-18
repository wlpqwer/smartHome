import { createSelector } from 'reselect';

// selector
const getData = state => state.homeViewReducer.data;

export const getVisibleData = createSelector([getData], data => data);

export const getIsLoading = createSelector(
  state => state.homeViewReducer.isLoading,
  isLoading => isLoading,
);

export const getIsLoadingMore = createSelector(
  [state => state.homeViewReducer.isLoadingMore],
  isLoadingMore => isLoadingMore,
);

export const getIsHasError = createSelector(
  [state => state.homeViewReducer.hasErrored],
  hasErrored => hasErrored,
);



// 用户家庭列表
const familyListData = state => state.userFamilyListReducer.data;

export const getFamilyListData = createSelector([familyListData], data => data);

export const getFamilyListIsLoading = createSelector(
  state => state.userFamilyListReducer.isLoading,
  isLoading => isLoading,
);


import { createSelector } from 'reselect';

const getData = state => state.deviceShareListReducer.data;

export const getDeviceShareListData = createSelector([getData], data => data);

export const getDeviceShareListIsLoading = createSelector(
  state => state.deviceShareListReducer.isLoading,
  isLoading => isLoading,
);

export const getDeviceShareListIsLoadingMore = createSelector(
  [state => state.deviceShareListReducer.isLoadingMore],
  isLoadingMore => isLoadingMore,
);



const getAcceptData = state => state.deviceAcceptListReducer.data;

export const getDeviceAcceptListData = createSelector([getAcceptData], data => data);

export const getDeviceAcceptListIsLoading = createSelector(
  state => state.deviceAcceptListReducer.isLoading,
  isLoading => isLoading,
);

export const getDeviceAcceptListIsLoadingMore = createSelector(
  [state => state.deviceAcceptListReducer.isLoadingMore],
  isLoadingMore => isLoadingMore,
);
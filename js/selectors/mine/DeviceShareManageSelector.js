import { createSelector } from 'reselect';

const deviceShareUserData = state => state.deviceShareUserReducer.data;

export const getDeviceShareManageData = createSelector([deviceShareUserData], data => data);

export const getDeviceShareManageIsLoading = createSelector(
  state => state.deviceShareUserReducer.isLoading,
  isLoading => isLoading,
);


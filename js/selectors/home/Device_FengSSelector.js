import { createSelector } from 'reselect';

const deviceStatusData = state => state.deviceStatusReducer.data;

export const getDeviceStatusData = createSelector([deviceStatusData], data => data);

export const getDeviceStatusDataIsLoading = createSelector(
  state => state.deviceStatusReducer.isLoading,
  isLoading => isLoading,
);


import { createSelector } from 'reselect';

const roomsManageData = state => state.roomsManageListReducer.data;

export const getRoomsManageData = createSelector([roomsManageData], data => data);

export const getRoomsManageIsLoading = createSelector(
  state => state.roomsManageListReducer.isLoading,
  isLoading => isLoading,
);


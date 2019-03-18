import { createSelector } from 'reselect';

const roomSetUpData = state => state.roomSetUpReducer.data;

export const getRoomSetUpData = createSelector([roomSetUpData], data => data);

export const getRoomSetUpIsLoading = createSelector(
  state => state.roomSetUpReducer.isLoading,
  isLoading => isLoading,
);


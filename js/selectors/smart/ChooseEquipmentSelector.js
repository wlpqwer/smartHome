import { createSelector } from 'reselect';

const getData = state => state.chooseSceneDeviceReducer.data;

export const getSceneChooseDevData = createSelector([getData], data => data);

export const getSceneChooseDevIsLoading = createSelector(
  state => state.chooseSceneDeviceReducer.isLoading,
  isLoading => isLoading,
);

// export const geSmartScenetIsLoadingMore = createSelector(
//   [state => state.chooseSceneDeviceReducer.isLoadingMore],
//   isLoadingMore => isLoadingMore,
// );

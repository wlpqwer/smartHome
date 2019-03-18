import { createSelector } from 'reselect';

const getData = state => state.smartViewReducer.data;

export const getSmartSceneData = createSelector([getData], data => data);

export const getSmartSceneIsLoading = createSelector(
  state => state.smartViewReducer.isLoading,
  isLoading => isLoading,
);

export const geSmartScenetIsLoadingMore = createSelector(
  [state => state.smartViewReducer.isLoadingMore],
  isLoadingMore => isLoadingMore,
);



// 场景内容
const getSceneContData = state => state.sceneContentReducer.data;

export const getSceneContentData = createSelector([getSceneContData], data => data);

export const getSceneContentIsLoading = createSelector(
  state => state.sceneContentReducer.isLoading,
  isLoading => isLoading,
);




// 获取自动化列表
const getAutoMationData = state => state.automationListReducer.data;

export const getAutoMationListData = createSelector([getAutoMationData], data => data);

export const getAutoMationListIsLoading = createSelector(
  state => state.automationListReducer.isLoading,
  isLoading => isLoading,
);


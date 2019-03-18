import { createSelector } from 'reselect';

// 获取自动化内容
const getAutoMationContData = state => state.autoMationContentReducer.data;

export const getAutoMationContentData = createSelector([getAutoMationContData], data => data);

export const getAutoMationContentIsLoading = createSelector(
  state => state.autoMationContentReducer.isLoading,
  isLoading => isLoading,
);

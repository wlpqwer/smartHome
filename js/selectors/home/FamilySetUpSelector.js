import { createSelector } from 'reselect';

// 家庭设置
const familySetUpData = state => state.familySetUpReducer.data;

export const getFamilySetUpData = createSelector([familySetUpData], data => data);

export const getFamilySetUpIsLoading = createSelector(
  state => state.familySetUpReducer.isLoading,
  isLoading => isLoading,
);


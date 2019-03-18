import { createSelector } from 'reselect';

const familyMemberData = state => state.familyMemberReducer.data;

export const getFamilyMemberData = createSelector([familyMemberData], data => data);

export const getFamilyMemberIsLoading = createSelector(
  state => state.familyMemberReducer.isLoading,
  isLoading => isLoading,
);


import { createSelector } from 'reselect';

const getMyBaseInfoData = state => state.myBaseInfoReducer.data;

export const getMyBaseInfoItem = createSelector(
  [getMyBaseInfoData],
  data => data,
);

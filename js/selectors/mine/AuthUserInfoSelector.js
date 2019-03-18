import { createSelector } from "reselect";
const getUserInfoData = state => state.authUserInfoReducer;

export const getUserInfo = createSelector([getUserInfoData], data => data);

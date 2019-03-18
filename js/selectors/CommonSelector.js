import { createSelector } from "reselect";

// selector
const getNetInfoStatus = state => state.netInfoReducer.status;

// reselect function
export const getNetInfo = createSelector([getNetInfoStatus], status => status);


const getLanguageStatus = state => state.languageTypeReducer.localLanguage;
export const getLanguageType = createSelector([getLanguageStatus], localLanguage => localLanguage);

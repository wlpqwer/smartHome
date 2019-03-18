import { NET_INFO_STATUS, LANGUAGE_TYPE } from "../actions/CommonAction";
import { AsyncStorage } from 'react-native';
let netInfoState = {
  status: true
};

export const netInfoReducer = (state = netInfoState, action) => {
  switch (action.type) {
    case NET_INFO_STATUS:
      state = Object.assign({}, state, { status: action.status });
      return state;

    default:
      return state;
  }
};

// _storageLanguageAsync = async language => {
//   await AsyncStorage.setItem('storageLanguage', language);
// };

let languageTypeState = {
  // localLanguage: AsyncStorage.getItem('storageLanguage')
  localLanguage: 'en'
};

export const languageTypeReducer = (state = languageTypeState, action) => {
  switch (action.type) {
    case LANGUAGE_TYPE:
      state = Object.assign({}, state, { localLanguage: action.localLanguage });
      return state;

    default:
      return state;
  }
};

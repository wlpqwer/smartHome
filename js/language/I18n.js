import I18n,{ getLanguages } from 'react-native-i18n'
import DeviceInfo from 'react-native-device-info'
import DataRepository from './DataRepository'
import en from './en'
import zh from './zh'
import configureStore from '../stores/configureStore';
import { AsyncStorage } from 'react-native';
let { store } = configureStore();
// console.log(store.getState().languageTypeReducer.localLanguage +"------------")
I18n.defaultLocale = store.getState().languageTypeReducer.localLanguage;

I18n.fallbacks = true;

I18n.translations = {
    en,
    zh,
};

// I18n.locale = store.getState().languageTypeReducer.localLanguage;
// console.log(store.getState().languageTypeReducer.localLanguage +"------------")
// I18n.localeLanguage = () => {


//     // new DataRepository().fetchLocalRepository('localLanguage')
//     //     .then((res)=>{

//     //         I18n.locale = res;
//     //         alert(1)

//     //     })
//     //     .catch((error)=>{

//     //         I18n.locale = DeviceInfo.getDeviceLocale();
//     //         alert(2)
//     // });

//     return I18n.locale;

// };


export { I18n, getLanguages };

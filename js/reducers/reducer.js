import { combineReducers } from 'redux';
// import {combineReducers} from 'redux-immutable';
import { homeViewReducer, userFamilyListReducer } from '../reducers/home/HomeViewReducer';
import { familySetUpReducer } from '../reducers/home/FamilySetUpReducer';
import { familyMemberReducer } from '../reducers/home/FamilyMemberReducer';
import { roomsManageListReducer } from './home/RoomsManageReducer';
import { roomSetUpReducer } from './home/RoomSetUpReducer';
import { deviceStatusReducer } from '../reducers/home/Device_FengSReducer';

import { smartViewReducer, sceneContentReducer, automationListReducer } from '../reducers/smart/SmartViewReducer';
import {autoMationContentReducer} from './smart/AutoMationSetUpReducer';
import {chooseSceneDeviceReducer} from './smart/ChooseEquipmentReducer';
import { netInfoReducer, languageTypeReducer} from "./CommonReducer";
import { authUserInfoReducer } from './mine/AuthUserInfoReducer';
import {myBaseInfoReducer} from './mine/MineViewReducer';
import {deviceShareListReducer, deviceAcceptListReducer} from './mine/DeviceShareReducer';
import { deviceShareUserReducer } from './mine/DeviceShareManageReducer';
import { fromJS } from 'immutable';

const rootReducer = combineReducers({
    homeViewReducer,
    authUserInfoReducer,
    userFamilyListReducer,
    familySetUpReducer,
    familyMemberReducer,
    roomSetUpReducer,
    myBaseInfoReducer,
    roomsManageListReducer,
    smartViewReducer,
    netInfoReducer,
    languageTypeReducer,
    deviceStatusReducer,
    sceneContentReducer,
    automationListReducer,
    deviceShareUserReducer,
    deviceShareListReducer,
    deviceAcceptListReducer,
    autoMationContentReducer,
    chooseSceneDeviceReducer,
});

export default rootReducer;


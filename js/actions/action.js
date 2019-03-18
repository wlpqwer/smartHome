import { fromJS } from 'immutable';

export { netInfoStatus, languageType } from './CommonAction';


// 我的家
export {
    itemsFetchData,
    itemsFetchMoreData,
    itemsResetToInitial,
    familyListFetchData,
    familyListResetToInitial
  } from './home/HomeViewAction';

export {
  familySetUpFetchData,
  familySetUpResetToInitial,
} from './home/FamilySetUpAction';

export {
  familyMemberFetchData,
  familyMemberResetToInitial,
} from './home/FamilyMemberAction';

export {
  roomsManageListFetchData,
  roomsManageListResetToInitial,
} from './home/RoomsManageAction';
  
export {
  roomSetUpFetchData,
  roomSetUpResetToInitial,
  roomSetUpAddTemporary,
} from './home/RoomSetUpAction';


export {
  devicesFetchData,
  devicesResetToInitial,
} from './home/Device_FengSAction';


// 智能
export {
  smartSceneFetchData,
  smartSceneFetchMoreData,
  smartSceneResetToInitial,
  sceneContentFetchData,
  sceneContentResetToInitial,
  automationListFetchData,
  automationListResetToInitial
} from './smart/SmartViewAction';

export {
  sceneDeviceFetchData,
  sceneDeviceResetToInitial,
} from './smart/ChooseEquipmentAction';

export {
  autoMationContentFetchData,
  autoMationContentResetToInitial  
} from './smart/AutoMationSetUpAction';

export { myBaseInfoFetchData } from './mine/MineViewAction';

export { 
  deviceShareListFetchData, 
  deviceShareListFetchMoreData, 
  deviceShareListResetToInitial,
  deviceAcceptListFetchData,
  deviceAcceptListFetchMoreData,
  deviceAcceptListResetToInitial 
} from './mine/DeviceShareAction';

export {deviceShareUserFetchData, deviceShareUserResetToInitial} from './mine/DeviceShareManageAction';

export { switchLocalHomeIdSuccess, localStoreHeaderImg, switchLocalHomeAdminSuccess, postLogOut } from './mine/AuthUserInfoAction'
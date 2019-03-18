import { fromJS } from 'immutable';

export {
    getVisibleData,
    getIsLoading,
    getIsLoadingMore,
    getFamilyListData,
    getFamilyListIsLoading,
    getIsHasError
  } from './home/HomeViewSelector';

export {
  getFamilySetUpData,
  getFamilySetUpIsLoading,
} from './home/FamilySetUpSelector';

export {
  getFamilyMemberData,
  getFamilyMemberIsLoading,
} from './home/FamilyMemberSelector';


export {
  getRoomsManageData,
  getRoomsManageIsLoading,
} from './home/RoomsManageSelector';

export {
  getRoomSetUpData,
  getRoomSetUpIsLoading,
} from './home/RoomSetUpSelector';

export {
  getDeviceStatusData,
  getDeviceStatusDataIsLoading
} from './home/Device_FengSSelector';

export {
  getSmartSceneData,
  getSmartSceneIsLoading,
  geSmartScenetIsLoadingMore,
  getSceneContentData,
  getSceneContentIsLoading,
  getAutoMationListData,
  getAutoMationListIsLoading
} from './smart/SmartViewSelector';

export {getAutoMationContentData, getAutoMationContentIsLoading} from './smart/AutoMationSetUpSelector';

export {
  getSceneChooseDevData,
  getSceneChooseDevIsLoading
} from './smart/ChooseEquipmentSelector';
export { getNetInfo, getLanguageType } from "./CommonSelector";

export {getUserInfo} from './mine/AuthUserInfoSelector';

export { getMyBaseInfoItem } from './mine/MineViewSelector';

export {
  getDeviceShareListData, 
  getDeviceShareListIsLoading, 
  getDeviceShareListIsLoadingMore,
  getDeviceAcceptListData,
  getDeviceAcceptListIsLoading,
  getDeviceAcceptListIsLoadingMore
} from './mine/DeviceShareSelector';

export {getDeviceShareManageData, getDeviceShareManageIsLoading} from './mine/DeviceShareManageSelector';
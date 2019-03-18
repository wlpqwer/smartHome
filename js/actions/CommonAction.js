export const NET_INFO_STATUS = 'NET_INFO_STATUS';
// 判断当前设备网络是否可用
export function netInfoStatus(bool) {
  return {
    type: NET_INFO_STATUS,
    status: bool,
  };
}


// 判断当前的语言环境
export const LANGUAGE_TYPE = 'LANGUAGE_TYPE';
export function languageType(string) {
  return {
    type: LANGUAGE_TYPE,
    localLanguage: string,
  };
}

export default function getObjKey(dataArray, value) {
    for (const key in dataArray) {
        if (dataArray.hasOwnProperty(key)) {
            if (dataArray[key] == value) {
                return key;
            }
        }
    }
};
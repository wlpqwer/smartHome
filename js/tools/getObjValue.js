export default function getObjValue(dataArray, value) {
    for (const key in dataArray) {
        if (dataArray.hasOwnProperty(key)) {
            if (key == value) {
                return dataArray[key];
            }
        }
    }
};


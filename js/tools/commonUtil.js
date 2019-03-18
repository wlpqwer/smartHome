// Flat List 数据去重
export function unique(arr) {
  let unique = {};
  arr.forEach(function(item) {
    unique[JSON.stringify(item)] = item;
  });
  arr = Object.keys(unique).map(function(u) {
    return JSON.parse(u);
  });
  return arr;
}

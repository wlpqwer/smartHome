// 秒数转时间
// export default function getDateTimeDiff(startTime) {
//   let dateBegin = new Date(startTime.replace(/-/g, '/'));
//   let dateEnd = new Date();

//   let dateDiff = dateEnd.getTime() - dateBegin.getTime();

//   let dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000));

//   let years = Math.floor(dayDiff / 365);

//   let months = Math.floor(dayDiff / 30);

//   let leave1 = dateDiff % (24 * 3600 * 1000);
//   let hours = Math.floor(leave1 / (3600 * 1000));

//   let leave2 = leave1 % (3600 * 1000);
//   let minutes = Math.floor(leave2 / (60 * 1000));

//   let leave3 = leave2 % (60 * 1000);
//   let seconds = Math.round(leave3 / 1000);
//   let resultTime = '';
//   if (years >= 1) {
//     resultTime = years + '年前';
//   } else if (months >= 1) {
//     resultTime = months + '个月前';
//   } else if (dayDiff >= 1) {
//     resultTime = dayDiff + '天前';
//   } else if (hours >= 1) {
//     resultTime = hours + '小时前';
//   } else if (minutes >= 1) {
//     resultTime = minutes + '分钟前';
//   } else if (seconds < 60) {
//     resultTime = '刚刚';
//   }
//   return resultTime;
// }


export default function formatSeconds(value) {
  var secondTime = parseInt(value);// 秒
  var minuteTime = 0;
  var hourTime = 0;
  if(secondTime > 60) {
     
      minuteTime = parseInt(secondTime / 60);
     
      secondTime = parseInt(secondTime % 60);
      
      if(minuteTime > 60) {
          
          hourTime = parseInt(minuteTime / 60);
          
          minuteTime = parseInt(minuteTime % 60);
      }
  }
//   var result = "" + parseInt(secondTime) + "s ";
var result = "";

  if(minuteTime > 0) {
      result = "" + parseInt(minuteTime) + "m " + result;
  }
  if(hourTime > 0) {
      result = "" + parseInt(hourTime) + "h " + result;
  }
  return result;
}




// var sec_to_time = function(s) {
//     var t;
//     if(s > -1){
//         var hour = Math.floor(s/3600);
//         var min = Math.floor(s/60) % 60;
//         var sec = s % 60;
//         if(hour < 10) {
//             t = '0'+ hour + ":";
//         } else {
//             t = hour + ":";
//         }

//         if(min < 10){t += "0";}
//         t += min + ":";
//         if(sec < 10){t += "0";}
//         t += sec.toFixed(2);
//     }
//     return t;
// }
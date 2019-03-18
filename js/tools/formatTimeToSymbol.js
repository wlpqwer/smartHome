export default function sec_to_time_symbol(s) {
    var t;
    if(s > -1){
        var hour = Math.floor(s/3600);
        var min = Math.floor(s/60) % 60;
        var sec = s % 60;
        if(hour < 10) {
            t = '0'+ hour + " : ";
        } else {
            t = hour + " : ";
        }

        if(min < 10){t += "0";}
        t += min;
        // if(sec < 10){t += "0";}
        // t += sec.toFixed(2);  toFixed() 方法可把 Number 四舍五入为指定小数位数的数字。
    }
    return t;
  }
  
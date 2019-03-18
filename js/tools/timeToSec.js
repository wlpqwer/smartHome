export default function time_to_sec (time) {
    var s = '';
    var hour = time.split(':')[0];
    var min = time.split(':')[1];
    var sec = time.split(':')[2];
    s = Number(hour*3600) + Number(min*60) + Number(sec);
    return s;
};
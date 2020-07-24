var utils = {
  unixToHuman(timestamp){
    let t = new Date(timestamp*1000);
    return t;
  },
  kTCelsius(tmp){
    let tInC = tmp - 273;
    return tInC;
  },
  unixToDate(timestamp){
    var xx = new Date();
    xx.setTime(timestamp*1000);
    var days = ['星期天','星期一','星期二','星期三','星期四','星期五','星期六'];
    var dayOfWeek = days[xx.getDay()]
    return dayOfWeek;
  }
}
export default utils;

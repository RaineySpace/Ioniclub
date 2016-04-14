import {Pipe} from 'angular2/core';
/*
* 输入：
*   value(string):会在"new Date(value)"中使用value
* 输出：
*   返回一个距离当前时间多久的提示语(String)，例如：1小时前、2个月前、1年前
* 使用：
*   value | exponentialStrength:exponent
* 例子：
*   {{ 2 | exponentialStrength:10}}
* 显示:
*   1024
*/
@Pipe({name: 'ryTimeout'})
export class RyTimeoutPipe {


  transform(value:string, args:string[]) : any {
    //获取当前时间并转换成秒数
    let currentTime = new Date().getTime()/1000;
    let oldTime = new Date(value).getTime()/1000;

    //距最后回复时间的秒数
    let timeout = currentTime - oldTime;

    //将timeout转换成提示语
    this.toString(timeout);

    return this.toString(timeout)+'前';
  }



  toString(timeout:number):string{
    let value;
    if(timeout/3600<1){
      //距最后回复时间小于一小时
      value = (timeout/60).toFixed()+'分钟';
    }else{
      //距最后回复时间小于一天
      if(timeout/(3600*24)<1){
        value = (timeout/3600).toFixed()+'小时';
      }else{
        //大约距最后回复时间小于一个月
        if(timeout/(3600*24*30)<1){
          value = (timeout/(3600*24)).toFixed()+'天';
        }else{
          //大约距最后回复时间小于一年
          if(timeout/(3600*24*30*12)<1){
            value = (timeout/(3600*24*30)).toFixed()+'个月';
          }else{
            value = (timeout/(3600*24*30*12)).toFixed()+'年';
          }
        }
      }
    }

    return value;
  }


}

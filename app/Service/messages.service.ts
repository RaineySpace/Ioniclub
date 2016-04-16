import {Injectable} from 'angular2/core';
import {Request,RequestMethod} from 'angular2/http';
import {Events} from 'ionic-angular';

// import {Subject, ReplaySubject} from 'rxjs';

import {ResourceService} from './resource.service';

import 'rxjs/add/operator/map';
import {Subject, ReplaySubject} from 'rxjs'


@Injectable()
export class messagesService {

  constructor(private _ResourceService:ResourceService,private _events:Events) {
    // this._events.publish('message:count',user);

  }

  private topics: any;

  //获取未读消息数量
  getMessageCount(){
    if(window.localStorage.getItem('accesstoken')){
      this._ResourceService.getMessageCount()
            .map(res => res.json().data)
            .subscribe(messageCount=>{
              this._events.publish('message:count',messageCount);
            })
      return true;
    }else{
      return false;
    }

  }

  //获取未读消息列表
  getMessage(){
    return this._ResourceService.getMessage()
            .map(res=>res.json().data);
  }

  markAllMessage(){
    this._ResourceService.markAllMessage()
            .map(res=>res.json())
            .subscribe(res=>{
              this._events.publish('message:count',0);

              console.log(res);
            },error=>{

            });
  }

}

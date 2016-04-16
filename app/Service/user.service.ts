import { Injectable } from 'angular2/core';
import { Response } from 'angular2/http';
import {Storage, LocalStorage,Events} from 'ionic-angular';
import {config} from '../app.config';
import {Subject, ReplaySubject} from 'rxjs';
import {Toast} from 'ionic-native';

import {ResourceService} from './resource.service';
import 'rxjs/add/operator/map';


import {userModel} from '../models/user.model';

@Injectable()
export class userService {
  storage:any;
  userInitial:userModel = new userModel();

  constructor(private _rs: ResourceService,private _events: Events) {
    this.storage = new Storage(LocalStorage);
  }

  saveUserInfo(accesstoken:string,user:any): void {
    this.storage.set('accesstoken', accesstoken);
    this.storage.set('user', JSON.stringify(user));
  }

  login(data: any) {
    this._rs.login(data)
    .map((res: Response)=>res.json())
    .subscribe((user:any) => {
      this.saveUserInfo(data.accesstoken,user);
      this._events.publish('user:login',user);
      Toast.show("登陆成功", "2000" , "bottom").subscribe(
        toast => {
          console.log(toast);
        }
      );
    }, (err: any) => {
      Toast.show("登陆失败，请重试", "2000" , "bottom").subscribe(
        toast => {
          console.log(toast);
        }
      );
    });
  }

}

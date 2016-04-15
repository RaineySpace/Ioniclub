import { Injectable } from 'angular2/core';
import { Response } from 'angular2/http';
import {Page, Storage, LocalStorage,Events} from 'ionic-angular';
import {config} from '../app.config';
import {Subject, ReplaySubject} from 'rxjs'


import {ResourceService} from './resource.service';
import 'rxjs/add/operator/map';


import {userModel} from '../models/user.model';

@Injectable()
export class userService {
  storage:any;
  userInitial:userModel = new userModel();
  static userSubject: Subject<Object> = new ReplaySubject<Object>(1);

  constructor(private _rs: ResourceService,private _events: Events) {
    this.storage = new Storage(LocalStorage);
    if (this.userInitial.accesstoken !== ''){
      userService.userSubject.next(this.userInitial.user);
    }

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
      userService.userSubject.next(user);
      this._events.publish('user:login',data);
    }, (err: any) => {
      console.log(err);
    });
  }

}

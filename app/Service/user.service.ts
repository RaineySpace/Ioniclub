import { Injectable } from 'angular2/core'
import { Response } from 'angular2/http'
import {Page, LocalStorage} from 'ionic-angular'
import {config} from '../app.config';


import {ResourceService} from './resource.service';
import 'rxjs/add/operator/map';


@Injectable()
export class userService {
  constructor(private _rs: ResourceService) {
    console.log('userService');

  }
  login(data: Object) {
    // console.log(data);
    this._rs.login(data).subscribe((res: Response) => {
      console.log(res);
    }, (err: any) => {
      console.log(err);
    });
  }

}

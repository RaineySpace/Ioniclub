import {Injectable} from 'angular2/core';
import {Request,RequestMethod} from 'angular2/http';
// import {Subject, ReplaySubject} from 'rxjs';

import {ResourceService} from './resource.service';

import 'rxjs/add/operator/map';

@Injectable()
export class messageService {

  constructor(private _ResourceService:ResourceService) {

  }
  private topics: any;

  getMessageCount(){
    return this._ResourceService.getMessageCount()
          .map(res => res.json().data);
  }

}

import {Injectable} from 'angular2/core';
import {Http, Response} from 'angular2/http';

@Injectable()
export class topicsService {
   constructor (private http: Http) {}

   private _topicsApiUrl = "http://ionichina.com/api/v1/topics";
  // private _topicsApiUrl = "http://app.sanjiang.info/home/index"

  private topics:any;

   getTopics () {
      return this.http.get(this._topicsApiUrl);
    }

}

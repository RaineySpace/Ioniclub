import {Injectable} from 'angular2/core';
import {Http, Request, RequestMethod} from 'angular2/http';

@Injectable()
export class topicService {
  constructor(private http: Http) { }

  private _topicsApiUrl = "http://ionichina.com/api/v1/topic/";

  /*
  mdrender String 当为 false 时，不渲染。默认为 true
  */
  getTopic(id:String,mdrender = true) {
    return this.http.request(new Request({
      method: RequestMethod.Get,
      url: this._topicsApiUrl+id,
      search: 'mdrender=' + mdrender
    }));
  }

}

import {Injectable} from 'angular2/core';
import {Http, Request,RequestMethod} from 'angular2/http';

import 'rxjs/add/operator/map';

@Injectable()
export class topicsService {
  constructor(private http: Http) { }

  private _topicsApiUrl = "http://ionichina.com/api/v1/topics";
  private _topicApiUrl = "http://ionichina.com/api/v1/topic";

  private topics: any;

  /*
  page Number 页数
  tab String 主题分类
  limit Number 每一页的主题数量
  mdrender String 当为 false 时，不渲染。默认为 true
  */
  getTopics(page=1,tab='all',limit=20,mdrender = true) {
    return this.http.get(this._topicsApiUrl+'?page='+page+'&&tab='+tab+'&&limit='+limit+'&&mdrender='+mdrender)
                    .map(res => res.json());
  }

  /*
    mdrender String 当为 false 时，不渲染。默认为 true
  */
  getTopicById(id:String,mdrender = true) {
    return this.http.get(this._topicApiUrl+'/'+id+'?mdrender=' + mdrender)
                    .map(res => res.json());
  }

}

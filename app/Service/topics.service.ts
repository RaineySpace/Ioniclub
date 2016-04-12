import {Injectable} from 'angular2/core';
import {Http, Request,RequestMethod} from 'angular2/http';

@Injectable()
export class topicsService {
  constructor(private http: Http) { }

  private _topicsApiUrl = "http://ionichina.com/api/v1/topics";
  // private _topicsApiUrl = "http://app.sanjiang.info/home/index"

  private topics: any;

  /*
  page Number 页数
  tab String 主题分类
  limit Number 每一页的主题数量
  mdrender String 当为 false 时，不渲染。默认为 true
  */
  getTopics(page=1,tab='all',limit=20,mdrender = true) {
    return this.http.request(new Request({
                                method: RequestMethod.Get,
                                url: this._topicsApiUrl,
                                search:'page='+page+'&&tab='+tab+'&&limit='+limit+'&&mdrender='+mdrender
                              }));
  }

}

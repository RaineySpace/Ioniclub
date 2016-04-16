import {Injectable} from 'angular2/core';
import {Http, Request,RequestMethod} from 'angular2/http';
// import {Subject, ReplaySubject} from 'rxjs';

import {ResourceService} from './resource.service';
import {Events} from 'ionic-angular';
import 'rxjs/add/operator/map';

@Injectable()
export class topicsService {

  // topicsSubject: Subject<any[]> = new ReplaySubject<any[]>(1)

  constructor(private http: Http,private _events: Events,private _ResourceService:ResourceService) { }


  private topics: any;

  /*
  page Number 页数
  tab String 主题分类
  limit Number 每一页的主题数量
  mdrender String 当为 false 时，不渲染。默认为 true
  */
  getTopics(infiniteScroll=null,page=1,tab='all',limit=20,mdrender = true) {

    return this._ResourceService.getTopics({page:page,tab:tab,limit:limit,mdrender:mdrender})
          .map(res => res.json().data)
          .subscribe(data=>{
            this._events.publish('topics:load',data);
            if(infiniteScroll){
              infiniteScroll.complete();
            }
          });
  }

  /*
    mdrender String 当为 false 时，不渲染。默认为 true
  */
  getTopicById(id:String,mdrender = true) {
    return this._ResourceService.getTopicById({mdrender:mdrender},id)
                    .map(res => res.json());
  }

}

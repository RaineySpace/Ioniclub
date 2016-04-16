import {Injectable} from 'angular2/core';
import {Http, Request,RequestMethod} from 'angular2/http';
// import {Subject, ReplaySubject} from 'rxjs';

import {ResourceService} from './resource.service';
import {Events} from 'ionic-angular';
import 'rxjs/add/operator/map';
import {Toast} from 'ionic-native';

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
  getTopics(event=null,page=1,tab='all',limit=20,mdrender = true) {

    return this._ResourceService.getTopics({page:page,tab:tab,limit:limit,mdrender:mdrender})
          .map(res => res.json().data)
          .subscribe(data=>{
            this._events.publish('topics:load',data);
            if(event){
              event.complete();
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


  // 回复
  replies(topicId:string,content:string,reply_id:string = null){
    return this._ResourceService.replies({content:content,reply_id:reply_id},topicId)
                    .map(res=>res.json().reply_id);

  }
  replyUps(reply_id:string,index:number){
    this._ResourceService.replyUps(reply_id)
                    .map(res=>res.json().action)
                    .subscribe(data=>{
                      this._events.publish('topic:ups',{action:data,index:index});
                    },err=>{
                      Toast.show(err.error_msg, "2000" , "bottom").subscribe(
                        toast => {
                          console.log(toast);
                        }
                      );
                    });
  }

  //新建主题
  newTopic(options:any){
    this._ResourceService.newTopic(options)
                    .map(res=>res.json())
                    .subscribe(data=>{
                      this._events.publish('topics:changeTab',"all");
                    });
  }

}

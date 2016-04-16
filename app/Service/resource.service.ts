import {Injectable, Inject} from 'angular2/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from 'angular2/http';
import {Page, Storage, LocalStorage} from 'ionic-angular';
import {Subject, BehaviorSubject, Observable} from 'rxjs';
import { config } from '../app.config';
import 'rxjs/add/operator/map';
import * as querystring from 'querystring';



@Injectable()
export class ResourceService {
  headers:Headers = new Headers()
  accesstoken:string;
  constructor(public http: Http) {
    this.headers.append('Content-Type', 'application/json');
    this.accesstoken = window.localStorage.getItem('accesstoken');
  }
  interceptor():RequestOptions{
    const opts:RequestOptions = new RequestOptions();
    opts.headers = this.headers;

    return opts;
  }

  //登录请求.
  login(data: Object): Observable<any>{
    return this.http.post(config.apiUrlRoot + '/accesstoken', JSON.stringify(data), this.interceptor());
  }

  //获取话题列表
  getTopics(options: Object): Observable<any>{
    let params: RequestOptions = this.interceptor()
    params.search = new URLSearchParams(querystring.stringify(options))
    return this.http.get(config.apiUrlRoot + '/topics', params)
  }

  //通过Id获取话题详情
  getTopicById(options: Object,id:String): Observable<any>{
    let params: RequestOptions = this.interceptor()
    params.search = new URLSearchParams(querystring.stringify(options))
    return this.http.get(config.apiUrlRoot + '/topic/'+id, params)
  }

  //提交话题

  newTopic(options: any){
    return this.http.post(config.apiUrlRoot + '/topics', JSON.stringify({content:options.content,title:options.title,tab:options.tab,accesstoken:this.accesstoken}), this.interceptor());
  }

  //提交评论
  replies(options: any,topicId:string){
    return this.http.post(config.apiUrlRoot + '/topic/'+topicId+'/replies', JSON.stringify({content:options.content,reply_id:options.reply_id,accesstoken:this.accesstoken}), this.interceptor());
  }

  //获取未读消息数量
  getMessageCount(){
    let params: RequestOptions = this.interceptor()
    params.search = new URLSearchParams(querystring.stringify({accesstoken:this.accesstoken}))
    return this.http.get(config.apiUrlRoot + '/message/count', params)
  }


  // 获取消息列表
  getMessage(){
    let params: RequestOptions = this.interceptor()
    params.search = new URLSearchParams(querystring.stringify({accesstoken:this.accesstoken}))
    return this.http.get(config.apiUrlRoot + '/messages', params)
  }

  // 标记所有消息为已读

  markAllMessage(){
    return this.http.post(config.apiUrlRoot + '/message/mark_all', JSON.stringify({accesstoken:this.accesstoken}), this.interceptor());
  }



}

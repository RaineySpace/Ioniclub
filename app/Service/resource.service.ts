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

  constructor(public http: Http) {
    this.headers.append('Content-Type', 'application/json')
    // this.headers.append('jackblog', 'ionic2')
  }
  interceptor():RequestOptions{
    const opts:RequestOptions = new RequestOptions()
    opts.headers = this.headers

    return opts
  }

  //登录请求.
  login(data: Object): Observable<any>{
    return this.http.post(config.apiUrlRoot + '/accesstoken', JSON.stringify(data), this.interceptor());
  }

  getTopics(options: Object): Observable<any>{
    let params: RequestOptions = this.interceptor()
    params.search = new URLSearchParams(querystring.stringify(options))
    return this.http.get(config.apiUrlRoot + '/topics', params)
  }

  getTopicById(options: Object,id:String): Observable<any>{
    let params: RequestOptions = this.interceptor()
    params.search = new URLSearchParams(querystring.stringify(options))
    return this.http.get(config.apiUrlRoot + '/topic/'+id, params)
  }


}

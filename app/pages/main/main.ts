import {Page, NavController, Modal, Events} from 'ionic-angular';
import {topicsService} from '../../service/topics.service';

import {topicInfo} from '../topicInfo/topicInfo';

// import {Editor} from '../../pages/editor/editor';

import {RyTimeoutPipe} from '../../pipe/timeout.pipe';
import {ResourceService} from '../../service/resource.service';
import {messagesService} from '../../service/messages.service';
import {messages} from '../messages/messages';


@Page({
  templateUrl: './build/pages/main/main.html',
  providers: [topicsService, ResourceService, messagesService],
  pipes: [RyTimeoutPipe]
})
export class main {
  constructor(private _topicsService: topicsService, private _events: Events, private _nav: NavController, private _messagesService: messagesService) {
    this.listenToMessageEvents();
    this._messagesService.getMessageCount();
    this._topicsService.getTopics(null, this.page,this.tab);
  }
  topics: Array<Object> = [];
  //页码
  page: number = 1;
  //主题类别
  tab: string = 'all';
  //未读消息数量
  messageCount: number;

  //上拉加载
  doInfinite(infiniteScroll) {
    this._topicsService.getTopics(infiniteScroll, this.page,this.tab);
  }

  //跳转话题详情页
  goTopicInfo(id) {
    this._nav.push(topicInfo, { id: id });
  }

  //获取未读消息数量
  listenToMessageEvents() {
    //消息更新事件
    this._events.subscribe('message:count', (messageCount) => {
      this.messageCount = messageCount[0];
    });
    //主题加载事件
    this._events.subscribe('topics:load', (data) => {
      this.topics = this.topics.concat(data[0]);
      console.log(this.topics);
      this.page++;
    });
    //主题类别改变事件
    this._events.subscribe('topics:changeTab', (tab) => {
      this.tab = tab[0];
      this.topics = [];
      this.page = 1;
      this._topicsService.getTopics(null, this.page,this.tab);
    });
  }

  // 跳转消息列表页面
  goMessages() {
    if(window.localStorage.getItem('accesstoken')){
      this._nav.push(messages);
    }
  }


  // comment(id) {
  //   //阻止事件继续向上传播
  //   event.stopPropagation();
  //   this._nav.push(Editor,{topicId:id});
  // }

}

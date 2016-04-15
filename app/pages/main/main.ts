import {Page, NavController, Modal,Events} from 'ionic-angular';
import {topicsService} from '../../service/topics.service';

import {topicInfo} from '../topicInfo/topicInfo';

import {RyCommentComponent} from '../../component/comment/comment.component';

import {RyTimeoutPipe} from '../../pipe/timeout.pipe';
import {ResourceService} from '../../service/resource.service';
import {messagesService} from '../../service/messages.service';
import {messages} from '../messages/messages';


@Page({
  templateUrl: './build/pages/main/main.html',
  directives: [RyCommentComponent],
  providers: [topicsService, ResourceService, messagesService],
  pipes: [RyTimeoutPipe]
})
export class main {
  constructor(private _topicsService: topicsService, private _events:Events, private _nav: NavController, private _messagesService: messagesService) {
    // this.getMessageCount();
    this.listenToMessageEvents();
    this._messagesService.getMessageCount();
  }
  topics: Array<any>;
  //页码
  page: number = 1;
  //未读消息数量
  messageCount: number;
  //首次加载
  getTopics() {
    this._topicsService.getTopics(this.page)
      .subscribe(res => {
      this.topics = res.data;
      console.log(res.data);
      this.page++;
    });
  }

  //上拉加载
  doInfinite(infiniteScroll) {
    this._topicsService.getTopics(this.page)
      .subscribe(res => {
      console.log(this.topics);
      this.topics = this.topics.concat(res.data)
      this.page++;
      infiniteScroll.complete();
    });
  }

  //跳转话题详情页
  goTopicInfo(id) {
    this._nav.push(topicInfo, { id: id });
  }

  //获取未读消息数量
  listenToMessageEvents() {
      this._events.subscribe('message:count', (messageCount) => {
        this.messageCount = messageCount[0];
        // console.log(this.messageCount);
      });
  }

  // 跳转消息列表页面
  goMessages(){
    this._nav.push(messages);
  }

  ngOnInit() { this.getTopics(); }

  comment() {
    //阻止事件继续向上传播
    event.stopPropagation();
    let contactModal = Modal.create(RyCommentComponent);
    this._nav.present(contactModal);
    contactModal.onDismiss(data=> {
      console.log(data);
    });
  }

}

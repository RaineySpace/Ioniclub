import {Page, NavController, Modal} from 'ionic-angular';
import {topicsService} from '../../service/topics.service';

import {topicInfo} from '../topicInfo/topicInfo';

import {RyCommentComponent} from '../../component/comment/comment.component';

import {RyTimeoutPipe} from '../../pipe/timeout.pipe';
import {ResourceService} from '../../service/resource.service';
import {messageService} from '../../service/message.service';



@Page({
  templateUrl: './build/pages/main/main.html',
  directives: [RyCommentComponent],
  providers: [topicsService, ResourceService, messageService],
  pipes: [RyTimeoutPipe]
})
export class main {
  constructor(private _topicsService: topicsService, private _nav: NavController, private _messageService: messageService) {
    this.getMessageCount();
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

  getMessageCount() {
    // this.messageCount = 2;
    this._messageService.getMessageCount()
      .subscribe((messageCount:number) => {
        this.messageCount = messageCount;
        // console.log(messageCount);
      });
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

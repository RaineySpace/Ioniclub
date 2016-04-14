import {Page, NavController, Modal} from 'ionic-angular';
import {topicsService} from '../../service/topics.service';

import {topicInfo} from '../topicInfo/topicInfo';

import {RyCommentComponent} from '../../component/comment/comment.component';

import {RyTimeoutPipe} from '../../pipe/timeout.pipe';

@Page({
  templateUrl: './build/pages/main/main.html',
  directives:[RyCommentComponent],
  providers: [topicsService],
  pipes:[RyTimeoutPipe]
})
export class main {
  constructor(private _topicsService: topicsService,private _nav:NavController) {
  }
  topics: Array<any>;
  //页码
  page: number = 1;
  //首次加载
  getTopics() {
    this._topicsService.getTopics(this.page)
      .subscribe(res => {
      this.topics = res.data;
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

  goTopicInfo(id) {
    // this._Location.go('/topicInfo');
    // this._router.navigate(['TopicInfo',{id:id}]);
    this._nav.push(topicInfo,{id:id});
    console.log('执行完毕');
  }

  ngOnInit() { this.getTopics(); }

  comment(){
    //阻止事件继续向上传播
    event.stopPropagation();
    let contactModal = Modal.create(RyCommentComponent);
    this._nav.present(contactModal);
    contactModal.onDismiss(data=>{
      console.log(data);
    });
  }

}

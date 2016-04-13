import {Page, NavController} from 'ionic-angular';
import {topicsService} from '../../Service/topics.service';

import {topicInfo} from '../topicInfo/topicInfo';

@Page({
  templateUrl: './build/pages/main/main.html',
  providers: [topicsService]
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
      this.topics = res.json().data;
      this.page++;
    });
  }
  //上拉加载
  doInfinite(infiniteScroll) {
    this._topicsService.getTopics(this.page)
      .subscribe(res => {
      console.log(this.topics);
      this.topics = this.topics.concat(res.json().data)
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

}

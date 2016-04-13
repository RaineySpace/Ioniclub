import {Page, NavParams} from 'ionic-angular';
import {topicService} from '../../Service/topic.service';

@Page({
  templateUrl: './build/pages/topicInfo/topicInfo.html',
  providers: [topicService]
})
export class topicInfo {
  public id: String;
  public data: any;
  constructor(private _NavParams: NavParams,private _topicService: topicService) {
    this.id = this._NavParams.get('id');
    this.getTopicInfo();
  }

  getTopicInfo() {
    this._topicService.getTopic(this.id)
      .subscribe(res => {
      this.data = res.json().data;
      console.log(this.data);
    });
  }
  ngOnInit() { }

}

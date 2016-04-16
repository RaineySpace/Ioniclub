import {Page, NavParams,Modal,NavController} from 'ionic-angular';

import {topicsService} from '../../service/topics.service';

import {ResourceService} from '../../service/resource.service';
import {Editor} from '../../pages/editor/editor';

@Page({
  templateUrl: './build/pages/topicInfo/topicInfo.html',
  providers: [topicsService,ResourceService]
})
export class topicInfo {
  public id: String;
  public data: any;
  constructor(private _NavParams: NavParams,private _topicsService: topicsService,private _nav:NavController) {
    this.id = this._NavParams.get('id');
    this.getTopicInfo();
  }

  getTopicInfo() {
    this._topicsService.getTopicById(this.id).subscribe(res=>{
        this.data = res.data;
        console.log(this.data);
    })
  }
  comment(replyId){
    //阻止事件继续向上传播
    event.stopPropagation();
    this._nav.push(Editor,{topicId:this.id,replyId:replyId});
  }

  ngOnInit() { }

}

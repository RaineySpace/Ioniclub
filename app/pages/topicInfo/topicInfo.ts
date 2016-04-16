import {Page, NavParams, Modal, NavController} from 'ionic-angular';
// import {ViewChild} from 'angular2/core';
import {topicsService} from '../../service/topics.service';

import {ResourceService} from '../../service/resource.service';
import {Editor} from '../../pages/editor/editor';

@Page({
  templateUrl: './build/pages/topicInfo/topicInfo.html',
  providers: [topicsService, ResourceService]
})
export class topicInfo {
  public id: string;
  public data: any;
  // @ViewChild(Content) content: Content;
  constructor(private _NavParams: NavParams, private _topicsService: topicsService, private _nav: NavController) {
    this.id = this._NavParams.get('id');
    this.getTopicInfo();
  }

  getTopicInfo() {
    this._topicsService.getTopicById(this.id).subscribe(res=> {
      this.data = res.data;
      console.log(this.data);
    })
  }
  comment(reply_id,loginname) {
    //阻止事件继续向上传播
    event.stopPropagation();
    let modal;

    // this._nav.push(Editor,{topicId:this.id,reply_id:reply_id});
    if(loginname){
      modal = Modal.create(Editor, { data: "@"+ loginname+" "});
    }else{
      modal = Modal.create(Editor);
    }
    this._nav.present(modal);
    modal.onDismiss(content=> {
      // console.log(data)
        this._topicsService.replies(this.id, content, reply_id)
          .subscribe(res=> {
          console.log("评论成功！！");
          console.log(res);
          this.getTopicInfo();
        });

    });
  }

  ngOnInit() { }

}

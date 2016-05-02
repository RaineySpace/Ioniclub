import {Page, NavParams, Modal, NavController,Events} from 'ionic-angular';

//Page
import {editor} from '../../pages/editor/editor';

//Service
import {topicsService} from '../../service/topics.service';
import {ResourceService} from '../../service/resource.service';

//Pipe
import {RyTimeoutPipe} from '../../pipe/timeout.pipe';

@Page({
  templateUrl: './build/pages/topicInfo/topicInfo.html',
  providers: [topicsService, ResourceService],
  pipes: [RyTimeoutPipe]
})
export class topicInfo {
  public id: string;
  public data: any;
  isLogin:boolean = false;

  constructor(private _NavParams: NavParams,private _events: Events, private _topicsService: topicsService, private _nav: NavController) {
    this.id = this._NavParams.get('id');
    this.getTopicInfo();
    this.listenToTopicEvents();
    if(window.localStorage.getItem('accesstoken')){
      this.isLogin = true;
    }
  }

  getTopicInfo() {
    this._topicsService.getTopicById(this.id).subscribe(res=> {
      this.data = res.data;
      this.imgSrcReplace();
      console.log(this.data);
    })
  }

  imgSrcReplace(){
    this.data.content = this.data.content.replace(/<img src="\/\//gi, '<img src="http://');
    this.data.replies.map((reply)=>{
      reply.content = reply.content.replace(/<img src="\/\//gi, '<img src="http://');
    });
  }

  comment(reply_id,loginname) {
    //阻止事件继续向上传播
    event.stopPropagation();
    let modal;
    if(loginname){
      modal = Modal.create(editor, { data: "@"+ loginname+" "});
    }else{
      modal = Modal.create(editor);
    }
    this._nav.present(modal);
    modal.onDismiss(content=> {
        this._topicsService.replies(this.id, content, reply_id)
          .subscribe(res=> {
          console.log("评论成功！！");
          console.log(res);
          this.getTopicInfo();
        });

    });
  }

  listenToTopicEvents(){
    this._events.subscribe('topic:ups', (data) => {
      if(data[0].action=="up"){
        this.data.replies[data[0].index].ups.push('null');
      }else if(data[0].action=="down"){
        this.data.replies[data[0].index].ups.pop();
      }
    });
  }


  ups(reply_id:string,index:number){
    console.log(reply_id);
    this._topicsService.replyUps(reply_id,index);
  }
  //收藏
  collection(){
    console.log("收藏");
  }

  ngOnInit() { }

}

import {Page,NavController,Events} from 'ionic-angular';

import {messagesService} from '../../service/messages.service';
import {ResourceService} from '../../service/resource.service';
import {topicInfo} from '../topicInfo/topicInfo';



@Page({
  templateUrl:'./build/pages/messages/messages.html',
  providers:[messagesService,ResourceService]

})
export class messages{
  messages:any = {
    has_read_messages:[],
    hasnot_read_messages:[]
  };
  tag:string="hasnot_read_messages";
  constructor(private _nav:NavController,private _events: Events,private _messagesService:messagesService){
    this._messagesService.getMessage().subscribe(messages=>{
      this.messages = messages;
      this._messagesService.markAllMessage();
    });
  }

  //跳转话题详情页
  goTopicInfo(id) {
    this._nav.push(topicInfo, { id: id });
  }





}

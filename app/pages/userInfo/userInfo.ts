import {Page,NavController,Events} from 'ionic-angular';

import {ResourceService} from '../../service/resource.service';
import {topicInfo} from '../topicInfo/topicInfo';



@Page({
  templateUrl:'./build/pages/userInfo/userInfo.html',
  providers:[ResourceService]

})
export class userInfo{
  constructor(private _nav:NavController){

  }
}

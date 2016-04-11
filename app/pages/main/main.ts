import {Page} from 'ionic-angular';
import {topicsService} from '../../Service/topics.service';

@Page({
  templateUrl: './build/pages/main/main.html',
  providers:[topicsService]
})
export class main {
  constructor(private _topicsService:topicsService) {
  }
  topics:any;
  getTopics () {
    this._topicsService.getTopics()
                      .subscribe(res => this.topics = res.json().data);
  }

  ngOnInit() { this.getTopics(); }

}

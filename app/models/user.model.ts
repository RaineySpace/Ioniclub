// import {Storage, LocalStorage} from 'ionic-angular';

export class userModel {
  accesstoken: string;
  user: any;
  constructor() {
    this.accesstoken = window.localStorage.getItem('accesstoken') || '';
    this.user = JSON.parse(window.localStorage.getItem('user'));
  }
}

import 'es6-shim';
import {App, Platform, IonicApp,Events} from 'ionic-angular';
// import {RouteConfig,ROUTER_DIRECTIVES} from 'angular2/router';
import {StatusBar} from 'ionic-native';

import {main} from './pages/main/main';
import {login} from './pages/login/login';
import {messages} from './pages/messages/messages';

import {userService} from './service/user.service';
import {ResourceService} from './service/resource.service';


@App({
  templateUrl:"./build/app.html",
  config: {

  },
  // directives:[ROUTER_DIRECTIVES]
  providers:[userService,ResourceService]
})
// @RouteConfig(ROUTES)
export class MyApp {
  rootPage: any = main;
  messagesPage: any = messages;
  user:any;
  constructor(platform: Platform,private _events: Events,private app:IonicApp,private _userService:userService) {
    platform.ready().then(() => {
      StatusBar.styleDefault();
    });
    this.user = this._userService.userInitial.user;
    this.listenToLoginEvents();
  }

  login(){
      this.app.getComponent('leftMenu').close();
      let nav = this.app.getComponent('nav');
      nav.push(login);
  }

  listenToLoginEvents() {
    this._events.subscribe('user:login', (user) => {
      this.user = user[0];
      this.setRootPage(main);
    });

    this._events.subscribe('user:logout', () => {
      this.setRootPage(main);
    });
  }

  pushChangeTabEvent(tab){
    this._events.publish('topics:changeTab',tab);
    this.app.getComponent('leftMenu').close();
  }

  setRootPage(page){
    let nav = this.app.getComponent('nav');
    nav.setRoot(page);
  }

  pushNavPage(page){
    this.app.getComponent('leftMenu').close();
    let nav = this.app.getComponent('nav');
    nav.push(messages);
  }




}

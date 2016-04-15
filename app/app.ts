import 'es6-shim';
import {App, Platform, IonicApp,Events} from 'ionic-angular';
// import {RouteConfig,ROUTER_DIRECTIVES} from 'angular2/router';
import {StatusBar} from 'ionic-native';

import {main} from './pages/main/main';
import {login} from './pages/login/login';


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
  user:any;
  constructor(platform: Platform,private _events: Events,private app:IonicApp,private _userService:userService) {
    platform.ready().then(() => {
      StatusBar.styleDefault();
    });
    userService.userSubject.subscribe((user:any)=>{this.user=user;console.log("执行");});

    this.listenToLoginEvents();
  }

  login(){
      this.app.getComponent('leftMenu').close();
      let nav = this.app.getComponent('nav');
      nav.push(login);
  }

  listenToLoginEvents() {
    this._events.subscribe('user:login', () => {
      this.openPage(main);
    });

    this._events.subscribe('user:logout', () => {
      this.openPage(main)
    });
  }


  openPage(page:any) {
    // this.app.getComponent('leftMenu').close();
    let nav = this.app.getComponent('nav');
    nav.setRoot(page);
  }

}

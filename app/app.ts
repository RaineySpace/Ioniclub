import 'es6-shim';
import {App, Platform, IonicApp} from 'ionic-angular';
// import {RouteConfig,ROUTER_DIRECTIVES} from 'angular2/router';
import {StatusBar} from 'ionic-native';

import {main} from './pages/main/main';
import {login} from './pages/login/login';




@App({
  templateUrl:"./build/app.html",
  config: {

  }
  // directives:[ROUTER_DIRECTIVES]
  // providers:[ROUTER_PROVIDERS]
})
// @RouteConfig(ROUTES)
export class MyApp {
  rootPage: any = main;
  constructor(platform: Platform,private app:IonicApp) {
    platform.ready().then(() => {
      StatusBar.styleDefault();
    });
  }

  login(){
      this.app.getComponent('leftMenu').close();
      let nav = this.app.getComponent('nav');
      nav.push(login);
  }

  //
  // openPage(page) {
  //   this.app.getComponent('leftMenu').close();
  //   let nav = this.app.getComponent('nav');
  //   nav.push(page.component);
  // }

}

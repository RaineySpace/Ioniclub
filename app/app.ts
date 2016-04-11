import 'es6-shim';
import {App, Platform, IonicApp} from 'ionic-angular';
import {RouteConfig, Location} from 'angular2/router';
import {StatusBar} from 'ionic-native';

import {main} from './pages/main/main';

const ROUTES = [
  { path: '/main', component: main, useAsDefault: true }
]


@App({
  templateUrl:"./build/app.html",
  config: {

  }
})
@RouteConfig(ROUTES)
export class MyApp {
  rootPage: any;
  routes = ROUTES;
  constructor(platform: Platform,private app:IonicApp) {
    platform.ready().then(() => {
      StatusBar.styleDefault();
    });
  }

  openPage(page) {
    this.app.getComponent('leftMenu').close();
    let nav = this.app.getComponent('nav');
    nav.push(page.component);
  }

}

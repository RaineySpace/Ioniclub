import 'es6-shim';
import {App, Platform, IonicApp, Events} from 'ionic-angular';
import {StatusBar} from 'ionic-native';

//Page
import {main} from './pages/main/main';
import {login} from './pages/login/login';
import {messages} from './pages/messages/messages';
import {about} from './pages/about/about';

//Service
import {userService} from './service/user.service';
import {ResourceService} from './service/resource.service';


@App({
  templateUrl: "./build/app.html",
  config: {

  },
  providers: [userService, ResourceService]
})

export class MyApp {
  rootPage: any = main;
  messagesPage: any = messages;
  aboutPage: any = about;
  user: any;
  constructor(platform: Platform , private _events: Events, private app: IonicApp, private _userService: userService) {
    platform.ready().then(() => {
      StatusBar.styleDefault();
    });
    this.user = this._userService.userInitial.user;
    this.listenToLoginEvents();
  }

  login() {
    this.app.getComponent('leftMenu').close();
    let nav = this.app.getComponent('nav');
    nav.push(login);
  }

  logout() {
    this._userService.logout();
  }

  //监听用户登录与注销事件
  listenToLoginEvents() {
    this._events.subscribe('user:login', (user) => {
      this.user = user[0];
      this.setRootPage(main);
    });

    this._events.subscribe('user:logout', () => {
      this.app.getComponent('leftMenu').close();
      this.user = null;
      this.setRootPage(main);
    });
  }

  //监听主题类别切换事件
  pushChangeTabEvent(tab) {
    this._events.publish('topics:changeTab', tab);
    this.app.getComponent('leftMenu').close();
  }


  setRootPage(page) {
    let nav = this.app.getComponent('nav');
    nav.setRoot(page);
  }

  pushNavPage(page) {
    this.app.getComponent('leftMenu').close();
    let nav = this.app.getComponent('nav');
    nav.push(page);
  }
}

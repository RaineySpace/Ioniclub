import {Page, NavController} from 'ionic-angular';
import {BarcodeScanner} from 'ionic-native';

//Service
import {userService} from '../../service/user.service';
import {ResourceService} from '../../service/resource.service';

@Page({
  templateUrl: './build/pages/login/login.html',
  providers: [userService,ResourceService]
})
export class login {

  accesstoken:string;

  constructor(private _userService:userService,private _nav:NavController) {
  }

  //通过手动填写accesstoken登陆
  login(){
    this._userService.login({accesstoken:this.accesstoken});
  }

  //通过扫描二维码登陆
  loginForQR(){
    BarcodeScanner.scan().then((barcodeData) => {
      this.accesstoken=barcodeData.text;
      this.login();
      }, (err) => {
        alert("调用本地相机失败！");
      });
  }

  ngOnInit() {}


}

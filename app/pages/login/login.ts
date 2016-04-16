import {Page, NavController, Modal} from 'ionic-angular';
import {userService} from '../../service/user.service';
import {AbstractControl,ControlGroup,Validators,FormBuilder} from 'angular2/common';
import {ResourceService} from '../../service/resource.service';
import {BarcodeScanner} from 'ionic-native';
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
// 问题是，扫描后，accesstoken如何写入input
    BarcodeScanner.scan().then((barcodeData) => {
      this.accesstoken=barcodeData.text
      alert("We got a barcode\n" +
                 "Result: " + barcodeData.text + "\n" +
                 "Format: " + barcodeData.format + "\n" +
                 "Cancelled: " + barcodeData.cancelled);
      }, (err) => {
          // An error occurred
      });
  }

  ngOnInit() {}


}

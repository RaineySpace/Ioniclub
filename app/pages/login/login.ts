import {Page, NavController, Modal} from 'ionic-angular';
import {userService} from '../../service/user.service';
import {AbstractControl,ControlGroup,Validators,FormBuilder} from 'angular2/common';
import {ResourceService} from '../../service/resource.service';

@Page({
  templateUrl: './build/pages/login/login.html',
  providers: [userService,ResourceService]
})
export class login {

  signinForm: ControlGroup;
  accesstoken: AbstractControl;

  constructor(fb: FormBuilder,private _userService:userService,private _nav:NavController) {
    this.signinForm = fb.group({
      'accesstoken': ['',Validators.required]
    });
    this.accesstoken = this.signinForm.controls['accesstoken']
  }


  //通过手动填写accesstoken登陆
  onSubmit(accesstoken:any){

    this._userService.login(accesstoken);
  }


  //通过扫描二维码登陆
  loginForQR(){

    console.log("loginForQR");
  }

  ngOnInit() {}


}

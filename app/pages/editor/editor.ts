
import {Page,Alert,NavController,ViewController,NavParams} from 'ionic-angular';

@Page({
  selector: 'ry-comment',
  templateUrl: './build/pages/editor/editor.html'
})
export class Editor {
  private comment:string = "";

  constructor(params: NavParams,private _viewCtrl:ViewController,private _nav: NavController) {
    this.comment = params.get('data');
  }

  ngOnInit() {

  }

  addBlock(){
    this.comment += "\n**string**";
  }

  addQuote(){
    this.comment += "\n> ";
  }

  addList(){
    this.comment +="\n- "
  }

  addCode(){
    this.comment +="\n```\ncode\n```"
  }

  //外部连接
  addAttach(){
    let alert = Alert.create({
      title: 'Login',
      inputs: [
        {
          name: 'title',
          placeholder: '标题'
        },
        {
          name: 'url',
          // placeholder: '连接',
          value:'http://',
          type: 'url'
        }
      ],
      buttons: [
        {
          text: '取消',
          role: 'cancel'
        },
        {
          text: '输入',
          handler: data => {
            this.comment+="\n ["+data.title+"]"+"("+data.url+")"
            return true;
          }
        }
      ]
    });
    this._nav.present(alert);
  }

  //添加图片
  addImage(){
    this.comment+="\n![image](http://resource)"
  }

  //预览
  // preview(){
  //
  // }

  submit(){
    // console.log(this.comment);
    // this.comment = '23\nasdf';
    // this.dismiss();
    if(this.comment){
      this._viewCtrl.dismiss(this.comment);
    }else{
      console.log("评论不能为空!!");
    }

  }

}

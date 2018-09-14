import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { HomePage } from '../home/home';
import { CadastroProvider } from '../../providers/cadastro/cadastro';
import { Camera, CameraOptions } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-cadastro-post',
  templateUrl: 'cadastro-post.html',
})
export class CadastroPostPage {
  todo : FormGroup;
  dadosPost: any;
  title:string;
  imagemPost:string = '';

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private formBuilder: FormBuilder,
              private provider: CadastroProvider,
              private toast: ToastController,
              private camera: Camera,
              public alertCtrl: AlertController,) {
                this.dadosPost = this.navParams.data.dadosPost || {};
                this.createFormPost();
                this.setupPageTitlePost();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroPostPage');
  }
  logFormPost(){
    console.log(this.todo.value)
  }

  private setupPageTitlePost(){
    this.title = this.navParams.data.dadosPost ? 'Alterando dados': 'Novos dados';
  }

 
  createFormPost(){
    this.todo = this.formBuilder.group({
      Key: [this.dadosPost.Key],
      tituloPost: [this.dadosPost.tituloPost, Validators.required],
      autorPost: [this.dadosPost.autorPost, Validators.required],
      descricaoPost: [this.dadosPost.descricaoPost, Validators.required],
      imagemPost: [this.dadosPost.imagemPost, Validators],
    }); 
  }

  
  onSubmitPost(){
    if(this.todo.valid){
      this.provider.salvarDadosPost(this.todo.value) 
        .then(() =>{
          this.toast.create({message: 'Dados cadastrais salvos com sucesso', duration: 3000}).present();
          this.navCtrl.setRoot(HomePage, {
            imagemPost: this.imagemPost
          });
        })
        .catch((e)=>{
          this.toast.create({message: 'Erro ao salvar os dados cadastrais', duration: 3000}).present();
          console.error(e);
        });
    }
  }

  gocamera(type){
    this.imagemPost = '';

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      saveToPhotoAlbum: true,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: type == "picture" ?
      this.camera.PictureSourceType.CAMERA : this.camera.PictureSourceType.SAVEDPHOTOALBUM,
      correctOrientation: true,
      allowEdit: true,
      targetHeight: 100,
      targetWidth: 100,

    }
    
    this.camera.getPicture(options).then((imageData) => {
       let base64Image = 'data:image/jpeg;base64,' + imageData;
       this.imagemPost = base64Image;
    }, (err) => {
     this.displayErrorAlert(err);
    })
    .catch((err) => {
      console.error(err);
    });
  }
  displayErrorAlert(err){
    console.log(err);
    let alert = this.alertCtrl.create({
       title: 'Error',
       subTitle: 'Error while trying to capture picture',
       buttons: ['OK']
     });
     alert.present();
  }


}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { HomePage } from '../home/home';
import { CadastroProvider } from '../../providers/cadastro/cadastro';
import { AutoresPage } from '../autores/autores';

/**
 * Generated class for the CadastroPostPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cadastro-post',
  templateUrl: 'cadastro-post.html',
})
export class CadastroPostPage {
  todo : FormGroup;
  dadosPost: any;
  title:string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private formBuilder: FormBuilder,
              private provider: CadastroProvider,
              private toast: ToastController,) {
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
    }); 
  }

  
  onSubmitPost(){
    if(this.todo.valid){
      this.provider.salvarDadosPost(this.todo.value) 
        .then(() =>{
          this.toast.create({message: 'Dados cadastrais salvos com sucesso', duration: 3000}).present();
          this.navCtrl.setRoot(HomePage);
        })
        .catch((e)=>{
          this.toast.create({message: 'Erro ao salvar os dados cadastrais', duration: 3000}).present();
          console.error(e);
        });
    }
  }
  itemTapped(event, dadosPost) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(AutoresPage, {
      item: dadosPost
    });
  }


}

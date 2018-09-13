import { Component } from '@angular/core';
import {  NavController, NavParams, ToastController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { CadastroPostPage } from '../cadastro-post/cadastro-post';
import { CadastroProvider } from '../../providers/cadastro/cadastro';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  cadastroPost: Observable<any>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private provider: CadastroProvider,
              public toast: ToastController) {
    this.cadastroPost = this.provider.getTodosDadosPost();

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }


  novoPost(){
    this.navCtrl.push(CadastroPostPage);
  }

  editarPost(dadosPost: any){
    this.navCtrl.push(CadastroPostPage, {dadosPost: dadosPost})
  }

  remover(dadosPost){
    if(dadosPost.caminho2){
      this.provider.removerPost(dadosPost.caminho2)
        .then(() =>{
          this.toast.create({message: 'Post removido com sucesso', duration: 3000}).present();
        })
        .catch(()=>{
          this.toast.create({message: 'Erro ao remover o Post', duration: 3000}).present();
        });
    }
  }
  }



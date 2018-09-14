import { Component } from '@angular/core';
import {  NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { CadastroPostPage } from '../cadastro-post/cadastro-post';
import { CadastroProvider } from '../../providers/cadastro/cadastro';
import { AutoresPage } from '../autores/autores';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  cadastroPost: Observable<any>;
  imagemPost ='';

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private provider: CadastroProvider,
              public toast: ToastController,
              public loadingCtrl: LoadingController) {
    this.cadastroPost = this.provider.getTodosDadosPost();
    this.imagemPost = this.navParams.get('imagemPost');
    this.presentLoading()
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }



  novoPost(){ 
    this.navCtrl.push(CadastroPostPage);
  }
  goautores(){
    this.navCtrl.push(AutoresPage);
  }

  editarPost(dadosPost: any){
    this.navCtrl.push(CadastroPostPage, {dadosPost: dadosPost})
  }

  presentLoading() {
    const loader = this.loadingCtrl.create({
      content: "Por favor, aguarde",
      duration: 3000
    });
    loader.present();
  }


  
  }



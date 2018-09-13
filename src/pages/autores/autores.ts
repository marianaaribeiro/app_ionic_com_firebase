import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { CadastroProvider } from '../../providers/cadastro/cadastro';
import { CadastroPostPage } from '../cadastro-post/cadastro-post';


@IonicPage()
@Component({
  selector: 'page-autores', 
  templateUrl: 'autores.html',
})
export class AutoresPage {
  dadosPost: Observable<any>;
  

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private provider: CadastroProvider,
              public alertCtrl: AlertController,) {
                this.dadosPost = this.provider.getTodosDadosPost();
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AutoresPage');
  }
  editarUsuario(dadosPost: any){
    this.navCtrl.push(CadastroPostPage,{dadosPost: dadosPost});
  }


  
  
  }
  

  


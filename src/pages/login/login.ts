import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { CadastroPage } from '../cadastro/cadastro';
import { HomePage } from '../home/home';
import { CadastroProvider } from '../../providers/cadastro/cadastro';
import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  cadastrousuario: Observable<any>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private provider: CadastroProvider,
              public toast: ToastController ){
    
     this.cadastrousuario = this.provider.getTodosDados();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  
  goPage1(){
    this.navCtrl.setRoot(CadastroPage);
  }

  efetuarLogin(cadastrousuario){
    if(cadastrousuario){
      this.navCtrl.setRoot(HomePage) 
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

  

}

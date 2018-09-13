import { Component } from '@angular/core';
import {  NavController, NavParams, ToastController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { CadastroProvider} from '../../providers/cadastro/cadastro';
import { CadastroPage } from '../cadastro/cadastro';



@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {
  cadastrousuario: Observable<any>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private provider: CadastroProvider,
              public toast: ToastController) {
                this.cadastrousuario = this.provider.getTodosDados();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilPage');
  }

  novoUsuario(){
    this.navCtrl.push(CadastroPage);
  }

  editarUsuario(dadosUsuario: any){
    this.navCtrl.push(CadastroPage, {dadosUsuario: dadosUsuario})
  }

  remover(dadosUsuario){
    if(dadosUsuario.key){
      this.provider.remover(dadosUsuario.key)
        .then(() =>{
          this.toast.create({message: 'Dados cadastrais removidos com sucesso', duration: 3000}).present();
        })
        .catch(()=>{
          this.toast.create({message: 'Erro ao remover os dados cadastrais', duration: 3000}).present();
        });
    }
  }

}

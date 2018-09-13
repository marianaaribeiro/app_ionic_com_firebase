import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { LoginPage } from '../login/login';
import { CadastroProvider} from '../../providers/cadastro/cadastro';


@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {
  todo : FormGroup;
  dadosUsuario: any;
  title:string;
  
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private formBuilder: FormBuilder,            
              private provider: CadastroProvider,
              private toast: ToastController,) {

    this.dadosUsuario = this.navParams.data.dadosUsuario || {};
    this.createForm();
    this.setupPageTitle();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroPage');
  }
  
 
  logForm(){
    console.log(this.todo.value)
  }

  private setupPageTitle(){
    this.title = this.navParams.data.dadosUsuario ? 'Alterando dados': 'Novos dados';
  }

 
  createForm(){
    this.todo = this.formBuilder.group({
      Key: [this.dadosUsuario.Key],
      nomeUsuario: [this.dadosUsuario.nomeUsuario, Validators.required],
      enderecoUsuarioAtual: [this.dadosUsuario.enderecoUsuarioAtual, Validators.required],
      ContatoEmergencia: [this.dadosUsuario.ContatoEmergencia, Validators.required],
      emailUsuario: [this.dadosUsuario.emailUsuario, Validators.required],
      celularUsuario: [this.dadosUsuario.celularUsuario, Validators.required],
    }); 
  }

  
  onSubmit(){
    if(this.todo.valid){
      this.provider.salvarDados(this.todo.value) 
        .then(() =>{
          this.toast.create({message: 'Dados cadastrais salvos com sucesso', duration: 3000}).present();
          this.navCtrl.setRoot(LoginPage);
        })
        .catch((e)=>{
          this.toast.create({message: 'Erro ao salvar os dados cadastrais', duration: 3000}).present();
          console.error(e);
        });
    }
  }

}
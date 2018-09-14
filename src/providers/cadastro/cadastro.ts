import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

/*
  Generated class for the CadastroProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CadastroProvider {

  private caminho = 'cadastrousuario/';
  private caminho2 = 'cadastropost/';

  constructor(public http: HttpClient,
              private db: AngularFireDatabase) {
    console.log('Hello CadastroProvider Provider');
  }

  getTodosDados(){
    return this.db.list(this.caminho, ref => ref.orderByChild('nomeUsuario'))
      .snapshotChanges()
      .map(modifica => {
        return modifica.map(m => ({
          Key: m.payload.key, ...m.payload.val()
        }));
      })
  }

  pegar(Key:string){
    return this.db.object(this.caminho + Key).snapshotChanges()
    .map(m => {
      return {Key: m.key, ...m.payload.val()};
    });
  }

  salvarDados(dadosUsuario: any){
    return new Promise((resolve, reject) => {
      if(dadosUsuario.key){
        this.db.list(this.caminho)
          .update(dadosUsuario.key, {nomeUsuario: dadosUsuario.nomeUsuario, enderecoUsuarioAtual: dadosUsuario.enderecoUsuarioAtual, ContatoEmergencia: dadosUsuario.ContatoEmergencia, emailUsuario: dadosUsuario.emailUsuario, celularUsuario: dadosUsuario.celularUsuario, base64Image: dadosUsuario.base64Image})
          .then(() => resolve())
          .catch(() => reject());
      }else{
        this.db.list(this.caminho)
        .push({nomeUsuario: dadosUsuario.nomeUsuario, enderecoUsuarioAtual: dadosUsuario.enderecoUsuarioAtual, ContatoEmergencia: dadosUsuario.ContatoEmergencia, emailUsuario: dadosUsuario.emailUsuario, celularUsuario: dadosUsuario.celularUsuario, base64Image: dadosUsuario.base64Image})
        .then(() => resolve());
      }
    })
  }

  remover(Key:string){
    return this.db.list(this.caminho).remove(Key);
  }

  getTodosDadosPost(){
    return this.db.list(this.caminho2, ref => ref.orderByChild('tituloPost'))
      .snapshotChanges()
      .map(modifica => {
        return modifica.map(m => ({
          Key: m.payload.key, ...m.payload.val()
        }));
      })
  }

  pegarPost(Key:string){
    return this.db.object(this.caminho2 + Key).snapshotChanges()
    .map(m => {
      return {Key: m.key, ...m.payload.val()};
    });
  }

  salvarDadosPost(dadosPost: any){
    return new Promise((resolve, reject) => {
      if(dadosPost.key){
        this.db.list(this.caminho2)
          .update(dadosPost.key, {tituloPost: dadosPost.tituloPost, autorPost: dadosPost.autorPost, descricaoPost: dadosPost.descricaoPost,})
          .then(() => resolve())
          .catch(() => reject());
      }else{
        this.db.list(this.caminho2)
        .push({tituloPost: dadosPost.tituloPost, autorPost: dadosPost.autorPost, descricaoPost: dadosPost.descricaoPost,})
        .then(() => resolve());
      }
    })
  }

  removerPost(Key:string){
    return this.db.list(this.caminho).remove(Key);
  }

}

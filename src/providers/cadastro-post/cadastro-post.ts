import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

/*
  Generated class for the CadastroPostProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CadastroPostProvider {
  private caminho = 'cadastropost/';

  constructor(public http: HttpClient,
              private db: AngularFireDatabase) {
    console.log('Hello CadastroPostProvider Provider');
  }

  getTodosDadosDoPost(){
    return this.db.list(this.caminho, ref => ref.orderByChild('autorPost'))
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

  salvarDados(dadosPost: any){
    return new Promise((resolve, reject) => {
      if(dadosPost.key){
        this.db.list(this.caminho)
          .update(dadosPost.key, {tituloPost: dadosPost.tituloPost, autorPost: dadosPost.autorPost, descricaoPost: dadosPost.descricaoPost})
          .then(() => resolve())
          .catch(() => reject());
      }else{
        this.db.list(this.caminho)
        .push({tituloPost: dadosPost.tituloPost, autorPost: dadosPost.autorPost, descricaoPost: dadosPost.descricaoPost})
        .then(() => resolve());
      }
    })
  }

  remover(Key:string){
    return this.db.list(this.caminho).remove(Key);
  }

}

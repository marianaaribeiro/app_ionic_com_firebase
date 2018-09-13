import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadastroPostPage } from './cadastro-post';

@NgModule({
  declarations: [
    CadastroPostPage,
  ],
  imports: [
    IonicPageModule.forChild(CadastroPostPage),
  ],
})
export class CadastroPostPageModule {}

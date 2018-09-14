import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { HttpClientModule } from '@angular/common/http'; 
import { Camera } from '@ionic-native/camera';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen'; 

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { CadastroPage } from '../pages/cadastro/cadastro';
import { CadastroProvider } from '../providers/cadastro/cadastro';
import { PerfilPage } from '../pages/perfil/perfil';
import { CadastroPostPage } from '../pages/cadastro-post/cadastro-post';
import { AutoresPage } from '../pages/autores/autores';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    CadastroPage,
    PerfilPage,
    CadastroPostPage,
    AutoresPage,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    // Initialize Firebase
    AngularFireModule.initializeApp({
    apiKey: "AIzaSyBYxu2McBwDJ8Sk0IMtW3DPty1kb5V_f6I",
    authDomain: "falaae-63f07.firebaseapp.com",
    databaseURL: "https://falaae-63f07.firebaseio.com",
    projectId: "falaae-63f07",
    storageBucket: "falaae-63f07.appspot.com",
    messagingSenderId: "1078929333920"
    }), 
    AngularFireDatabaseModule
  
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    CadastroPage,
    PerfilPage,
    CadastroPostPage,
    AutoresPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CadastroProvider,
    HttpClientModule,
    Camera,
    
  ]
})
export class AppModule {}

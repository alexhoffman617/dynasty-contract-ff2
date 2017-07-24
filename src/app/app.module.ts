import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { CommonModule } from '@angular/common';
//import { AppRoutingModule } from '../routing/app-routing.module'
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TeamComponent } from './components/team/team.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MaterialModule } from '@angular/material';
import { CdkTableModule } from '@angular/cdk';



const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'team/:userId', component: TeamComponent}
];

export const firebaseConfig = {
    apiKey: "AIzaSyB5n_yyX5h7bLXW0mKs0GzdvUiItWPrmTo",
    authDomain: "dynasty-contract-ff2.firebaseapp.com",
    databaseURL: "https://dynasty-contract-ff2.firebaseio.com",
    projectId: "dynasty-contract-ff2",
    storageBucket: "dynasty-contract-ff2.appspot.com",
    messagingSenderId: "250107258935"
};

@NgModule({
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    //AppRoutingModule
    MaterialModule,
    CdkTableModule,
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [ AppComponent,
  HomeComponent,
  TeamComponent,
  ToolbarComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}




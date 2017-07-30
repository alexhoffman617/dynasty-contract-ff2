import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { FormsModule } from '@angular/forms';
import { environment } from '../environments/environment';
import { CommonModule, } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TeamComponent } from './components/team/team.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MaterialModule } from '@angular/material';
import { CdkTableModule } from '@angular/cdk';
import { PlayerComponent } from './components/player/player.component';
import { PlayerListComponent } from './components/player-list/player-list.component';

import { TimeService } from './services/time.service';
import { LoginService } from './services/login.service';
import { SalaryService } from './services/salary.service';





const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'team/:userId', component: TeamComponent},
  {path: 'player/:playerId', component: PlayerComponent},
  {path: 'playerList', component: PlayerListComponent}

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
    FormsModule,
    CdkTableModule,
    CommonModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [ AppComponent,
  HomeComponent,
  TeamComponent,
  ToolbarComponent,
  PlayerComponent,
  PlayerListComponent ],
  bootstrap: [ AppComponent ],
  providers:[ TimeService,
  LoginService,
  SalaryService]
})
export class AppModule {}




import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  user: object;
  constructor(private afAuth: AngularFireAuth){
    this.afAuth.authState.subscribe(res =>{
    if(res && res.uid){
      this.user =  res;
    } else {
      this.user =  null;
    }})
  }
  ngOnInit() {
  }
  click(){
    var x = 1;
  }
}
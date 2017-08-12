import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  users;

  constructor(private afDb: AngularFireDatabase){
  }

  ngOnInit() {
    var that = this;
    this.afDb.list('/users').subscribe(snapshot => {
      that.users = snapshot;
    });
  }

  calculateFranchiseStanding(user){
    var total = 0;
    for(var propt in user){
      if(propt.indexOf("Finish") > -1 && propt != 'fourteenFinish'){
        if(user[propt] == 1){
          total += 0;
        }
        else{
          total += user[propt];
        }
      }
    }
    return total;
  }
}
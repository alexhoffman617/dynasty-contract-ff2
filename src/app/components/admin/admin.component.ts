import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Bid } from '../../models/bid';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  bidYears: number;
  bidSalary: number;
  bidUser;
  bidPlayer
  users;
  players;
  bidsList;
  playersList;
  pastTimeInt = 1501463912535;

  constructor(private afDb: AngularFireDatabase) { }

  ngOnInit() {
    var that = this;
    this.afDb.list('/users').subscribe(snapshot => {
      that.users = snapshot;
    });
    this.afDb.list('/players').subscribe(snapshot => {
      that.players = snapshot;
    });
    this.playersList = this.afDb.list('/players');
    this.bidsList = this.afDb.list('/bids');
  }

  getBidTotalValue(){
    return this.bidYears * this.bidSalary + (4 - this.bidYears) * (this.bidSalary / 2);
  }

  submitBid(){
    var that = this;
    var bid = new Bid(true, this.bidPlayer.$key, this.bidSalary, this.bidYears, 
      this.getBidTotalValue(), this.bidUser.$key, this.pastTimeInt);
    if(this.bidPlayer.winningBidId){
      this.bidsList.update(this.bidPlayer.winningBidId, { isWinningBid: false })
    }
    this.bidsList.push(bid).then((snap) => {
      that.playersList.update(this.bidPlayer.$key, { winningBidId: snap.key})
    });
  }
}

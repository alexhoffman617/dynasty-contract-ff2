import { Component, OnInit,  } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable  } from 'angularfire2/database';
import { Bid } from '../../models/bid'
import { TimeService } from '../../services/time.service';



@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit {
  players;
  bids;
  users;
  constructor(private afDb: AngularFireDatabase,
  private afAuth: AngularFireAuth, public timeService: TimeService) {
   }

  ngOnInit() {
    var that = this;
    this.players = this.afDb.list('/players').map(players => {
      return players.map(player => {
        player.winningBid = that.afDb.object('/bids/' + player.winningBidId)
        return player;
      })
    });
    this.afDb.list('/users').subscribe(snapshot => {
        that.users = snapshot;
    });
  }

  getWinningBid(winningBidId){
    if(!winningBidId){
      return null
    }
    return this.afDb.object('/bids/' + winningBidId);
  }

  getWinningBidUser(userId){
    if(!userId){
      return null;
    }
    var user;
    this.users.forEach(element => {
      if(element.$key == userId){
        user = element;
      }
    });
    return user
  }

}

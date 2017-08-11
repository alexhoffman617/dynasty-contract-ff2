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
  players: FirebaseListObservable<object>;
  bids;
  constructor(private afDb: AngularFireDatabase,
  private afAuth: AngularFireAuth, public timeService: TimeService) {
   }

  ngOnInit() {
    var that = this;
    this.players = this.afDb.list('/players')
    this.afDb.list('bids', {
      query: {
        orderByChild: 'isWinningBid',
        equalTo: 1
      }
    }).subscribe(snapshots => {
      that.bids = snapshots;
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
    return this.afDb.object('/users/' + userId);
  }

}

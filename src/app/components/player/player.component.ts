import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable  } from 'angularfire2/database';
import { ActivatedRoute } from '@angular/router';
import { Bid } from '../../models/bid';
import { TimeService } from '../../services/time.service';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  displayBids: object;
  bids;
  playerId: string;
  player: FirebaseObjectObservable<object>;
  currentMaxBid: Bid;
  timeService;
  constructor(private afDb: AngularFireDatabase,
  private afAuth: AngularFireAuth,
  private route: ActivatedRoute) {
    this.timeService = new TimeService();
  }

  ngOnInit() {
    var that = this;
    this.route.params.subscribe(params => this.playerId = params['playerId']);
    this.player = this.afDb.object('/players/'+ this.playerId);
    this.bids = this.afDb.list('bids', {
        query: {
            orderByChild: 'playerId',
            equalTo: this.playerId
        }
    }).map(bids => {
        bids.reverse();
        return bids.map(bid => {
            bid.user = that.afDb.object('/users/' + bid.userId);
            return bid;
        })
    })
    this.bids.subscribe(snapshots => {
      this.currentMaxBid = snapshots.filter(function (snapshot) {
          return snapshot.isWinningBid == true;
      })[0];
    })
  }

  submitBid(salary: number, years: number){
    var bid = new Bid(true, this.playerId, salary, years, this.getBidTotalValue(salary, years),
     "O5HzEpN5RrM3rUjLIp3eJUFdlxF3", firebase.database.ServerValue.TIMESTAMP);
    if(this.currentMaxBid){
      if(this.currentMaxBid.totalValue >= bid.totalValue){
        return;
      }
      this.bids.update(this.currentMaxBid.$key, { isWinningBid: false })
    }
    this.bids.push(bid).then((snap) => {
    this.player.update({ winningBidId: snap.key})
    });
  }

  getBidTotalValue(salary: number, years: number){
    return years * salary + (4 - years) * (salary / 2);
  }
}

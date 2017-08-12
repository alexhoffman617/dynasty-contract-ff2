import { Component, OnInit,  } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable  } from 'angularfire2/database';
import { Bid } from '../../models/bid'
import { TimeService } from '../../services/time.service';
import { MobileDetectorService } from '../../services/mobile-detector.service';



@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit {
  players;
  bids;
  users;

  positions = ["QB", "RB", "WR", "TE", "DST"];
  selectedPosition: string;
  bidStatuses = ["Bid Won", "In Progress", "No Bid"];
  bidStatus: string;
  nameSearch: string;

  constructor(private afDb: AngularFireDatabase,
  private afAuth: AngularFireAuth,
  public timeService: TimeService,
  public mobileDetector: MobileDetectorService) {
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

  isFilteredOut(player, winningBid){
    if(player.position != this.selectedPosition && this.selectedPosition){
      return true;
    }
    var timeLeft = this.timeService.getTimeLeft(winningBid.time, this.timeService.currentTimeInt)
    if(this.bidStatus
        && timeLeft != this.bidStatus 
        && !(this.bidStatus == this.bidStatuses[2] && timeLeft == "--")
        && !(this.bidStatus == this.bidStatuses[1] && timeLeft.includes(":"))){
      return true;
    }
    var playerName = player.firstName + ' ' + player.lastName;
    if(this.nameSearch && !playerName.includes(this.nameSearch)){
      return true;
    }
    return false;
  }

}

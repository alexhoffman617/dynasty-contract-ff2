import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable  } from 'angularfire2/database';
import { ActivatedRoute } from '@angular/router';
import { Bid } from '../../models/bid';
import { TimeService } from '../../services/time.service';
import { SalaryService } from '../../services/salary.service';
import { LoginService } from '../../services/login.service';
import { MdSnackBar } from '@angular/material';
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
  newBidYears: number;
  newBidSalary: number;
  constructor(private afDb: AngularFireDatabase,
  private afAuth: AngularFireAuth,
  private route: ActivatedRoute,
  public timeService: TimeService,
  public salarySerivce: SalaryService,
  public loginService: LoginService,
  public snackBar: MdSnackBar
  ) {
  }

  ngOnInit() {
    var that = this;
    this.salarySerivce.setServiceForUser(this.loginService.userInDb.$key)
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
    });

    this.bids.subscribe(snapshots => {
      this.currentMaxBid = snapshots.filter(function (snapshot) {
          return snapshot.isWinningBid == true;
      })[0];
    });
  }


  submitBid(salary: number, years: number){
    var bid = new Bid(true, this.playerId, salary, years, this.getBidTotalValue(salary, years),
     this.loginService.userInDb.$key, firebase.database.ServerValue.TIMESTAMP);
    this.validateAndUpdateBid(bid);
  }

  validateAndUpdateBid(bid){
    if(!bid.salary || !bid.years){
       this.snackBar.open("Bid Error: Sigh, dont't be like Old Man Bretton. Include a salary and number of years.", "Stupid Bretton");
       return;
    }
    if(this.salarySerivce.winningPlayers >= 16){
       this.snackBar.open("Bid Error: You already have a full team worth of current bids/ won players.", "Got it");
       return;
    }
    var maxBid = this.salarySerivce.getMaxBid(this.loginService.userInDb.deadSalary);
    if(bid.salary > maxBid){
       this.snackBar.open("Bid Error: Your bid salary of $" + bid.salary + " is greater than your max allowed bid of $" + maxBid + "." , "Got it");
       return;
    }
    if(bid.years > 4 || bid.years < 1){
       this.snackBar.open("Bid Error: All bids must be between 1 to 4 years." , "Got it");
       return;
    }
    if(bid.salary < 1){
       this.snackBar.open("Bid Error: All bids must be at least $1." , "Got it");
       return;
    }
    if(bid.salary < 10 && bid.years > 3){
      this.snackBar.open("Bid Error: Bids with salaries of less than $10 can be for a max of 3 years.", "Got it");
      return;
    }
    if(this.currentMaxBid){
      if(this.timeService.getTimeLeft(this.currentMaxBid.time, this.timeService.currentTimeInt) == this.timeService.bidWonString){
        this.snackBar.open("Bid Error: This player has already been won.", "Got it")
        return;
      }
      if(this.currentMaxBid.totalValue >= bid.totalValue){
        this.snackBar.open("Bid Error: There is already a bid with the same or higher total value.", "Got it");
        return;
      }
      if(this.currentMaxBid.userId == bid.userId){
        this.snackBar.open("Bid Error: You are already the top bidder on this player.", "Got it");
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

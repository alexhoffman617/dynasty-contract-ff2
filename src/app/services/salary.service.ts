import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable  } from 'angularfire2/database';
import { LoginService } from '../services/login.service';
import 'rxjs/add/operator/filter'; 

@Injectable()
export class SalaryService {
    bids;
    totalSalary = 0;
    winningPlayers = 0;
    currentUserId;
    user;
    constructor(private afDb: AngularFireDatabase, private loginService: LoginService) { 
        this.bids = this.afDb.list('bids', {
            query: {
            orderByChild: 'isWinningBid',
            equalTo: true
            }
        });
    }

    setServiceForUser(userId){
        var that = this;
        this.bids.subscribe(snapshots => {
            that.totalSalary = 0;
            that.winningPlayers = 0;
            snapshots.filter(function (snapshot) {
                if(snapshot.userId == userId){
                 that.totalSalary += parseInt(snapshot.salary);
                 that.winningPlayers ++;
                };
            });
        });
    }

    getMaxBid(deadSalary){
        var otherPlayersLeft = 16-1-this.winningPlayers;
        var salaryAfterDead = 240-deadSalary;
        return salaryAfterDead - otherPlayersLeft - this.totalSalary;
    }
}
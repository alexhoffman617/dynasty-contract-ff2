import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { ActivatedRoute } from '@angular/router';
import { SalaryService } from '../../services/salary.service';
import { LoginService } from '../../services/login.service';
import 'rxjs/add/operator/map'; 


@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  userId: string;
  userBids: object;
  player: object;
  constructor(private afDb: AngularFireDatabase,
      private route: ActivatedRoute,
      public salaryService: SalaryService,
      public loginService: LoginService) {
   }

  ngOnInit() {
    var that = this;
    this.route.params.subscribe(params => this.userId = params['userId']);
    this.userBids = this.afDb.list('bids', {
        query: {
            orderByChild: 'userId',
            equalTo: this.userId
        }
    }).map(bids => {
        return bids.map(bid => {
            bid.playerInfo = that.afDb.object('/players/' + bid.playerId);
            return bid;
        })
    })
    this.salaryService.setServiceForUser(this.userId);
  }

}

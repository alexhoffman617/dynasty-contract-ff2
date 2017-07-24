import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map'; 


@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  userId: string;
  user: object;
  userBids: object;
  player: object;
  constructor(private afDb: AngularFireDatabase,
      private route: ActivatedRoute) {
    
   }

  ngOnInit() {
    var that = this;
    this.route.params.subscribe(params => this.userId = params['userId']);
    this.user = this.afDb.object('/users/'+ this.userId);
    this.player = that.afDb.object('/players/AntonioBrown');
    this.userBids = this.afDb.list('bids', {
                query: {
                    orderByChild: 'user',
                    equalTo: this.userId
                }
            }).map(bids => {
                return bids.map(bid => {
                    bid.playerInfo = that.afDb.object('/players/' + bid.player);
                    return bid;
                })
            })
  }

  testButton(){
    var x = this.userBids
  }

}

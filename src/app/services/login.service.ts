import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';

@Injectable()
export class LoginService {
    user;
    userInDb;
    deadSalary: number;
    constructor(private afAuth: AngularFireAuth,
    private afDb: AngularFireDatabase,
    private router: Router) { 
        this.afAuth.authState.subscribe(user => {
        if (user) {
            this.user = user;
            this.afDb.object('/users/'+ this.user.uid).subscribe(snapshot => {
                this.userInDb = snapshot;
            });
        } else {
            this.user = null;
            this.userInDb = null;
        }
        });
    }
    
  login() {
      this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }

  logout() {
    this.afAuth.auth.signOut();
    this.router.navigateByUrl('');
  }
}
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { MobileDetectorService } from '../../services/mobile-detector.service'; 
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  isDarkMode: boolean;
  user;
  body = document.getElementsByTagName('body')[0];
  darkModeClass = 'app-dark-theme';

  constructor(private afAuth: AngularFireAuth,
    private router: Router,
    public mobileDetector: MobileDetectorService,
    public loginService: LoginService) { }

  ngOnInit() {
    this.checkDarkMode();
  }

  checkDarkMode() {
    this.isDarkMode = JSON.parse(localStorage.getItem('isDarkMode'));
    this.isDarkMode === true ? this.addDarkModeClass() : this.removeDarkModeClass();
  }

  toggleDarkMode() {
    this.isDarkMode = JSON.parse(localStorage.getItem('isDarkMode'));
    if (this.isDarkMode === true) {
      localStorage.setItem('isDarkMode', 'false');
      this.removeDarkModeClass();
    } else {
      localStorage.setItem('isDarkMode', 'true');
      this.addDarkModeClass();
    }
  }

  addDarkModeClass() {
    this.body.classList.add(this.darkModeClass);
  }

  removeDarkModeClass() {
    this.body.classList.remove(this.darkModeClass);
  }
}
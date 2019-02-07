import { Component, OnInit } from '@angular/core';
import { auth } from 'firebase';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent implements OnInit {

  constructor(private afAuth: AngularFireAuth, private router: Router, private db: AngularFirestore) { }

  ngOnInit() {
  }

  googleLogin() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then(() =>
      this.afAuth.user.subscribe((user) => {
        this.db.collection('users').doc(user.uid).set(JSON.parse(JSON.stringify(user))).then(() => this.router.navigateByUrl('/note'));
      }));
  }
}

import { Component, OnInit } from '@angular/core';
import { auth } from 'firebase';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore';
import {environment} from '../../environments/environment';
import {Note} from '../note';
import * as firebase from 'firebase';
import Timestamp = firebase.firestore.Timestamp;

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent implements OnInit {
  private welcome_note: Note = {
    name: 'What the heck are Cornell Notes?',
    createdOn: Timestamp.now(),
    pinned: false,
    recallNotePairs: [
      {index: 1, recall: 'Why Cornell Notes?', notes: 'I\'d tell you, but I think ' +
          '<span contenteditable="false"><a href="https://www.toolshero.com/effectiveness/cornell-note-taking-system/">' +
          'these guys</a></span> do a better job.'}
    ]
  };

  constructor(private afAuth: AngularFireAuth, private router: Router, private db: AngularFirestore) { }

  ngOnInit() {
  }

  googleLogin() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then(() =>
      this.afAuth.user.subscribe((user) => {
        this.db.collection(environment.firebaseCollections.users).doc(user.uid)
          .set(JSON.parse(JSON.stringify(user))).then(() => {
          this.db.collection(environment.firebaseCollections.users).doc(user.uid).collection('notes').get()
            .subscribe((notesQuery) => {
              if (notesQuery.docs.length === 0) {
                this.db.collection(environment.firebaseCollections.users).doc(user.uid)
                  .collection('notes').doc('0').set(this.welcome_note)
                  .then(() => this.router.navigateByUrl('/notes'));
              } else {
                this.router.navigateByUrl('/notes');
              }
            });
        });
      }));
  }
}

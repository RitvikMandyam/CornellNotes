import { Component, OnInit } from '@angular/core';
import {Note} from '../note';
import {AppStrings} from '../app-strings';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import {User} from 'firebase';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.css']
})
export class NotesListComponent implements OnInit {
  notes: Note[] = [];
  user: User;

  constructor(private router: Router, private snackBar: MatSnackBar, private afAuth: AngularFireAuth, private db: AngularFirestore) {
  }

  ngOnInit() {
    this.afAuth.user
      .subscribe((user) => {
        this.user = user;
        this.db.collection(environment.firebaseCollections.users).doc(user.uid).collection('notes').get()
          .subscribe((documentsList) => {
            this.notes = documentsList.docs.map(e => e.data()) as unknown as Note[];
          });
      });
  }

  loadNote(index: number) {
    this.router.navigate(['/note', {id: index}]);
  }

  deleteNote(index: number) {
    const deleted_note = this.notes[index];
    this.db.collection(environment.firebaseCollections.users).doc(this.user.uid).collection('notes').doc(index.toString()).delete()
      .then(() => {
        this.notes.splice(index, 1);
        const snackbarRef = this.snackBar.open('Deleted ' + deleted_note.name, 'Undo', {duration: 10000});
        snackbarRef.onAction().subscribe(() => {
          this.notes.splice(index, 0, deleted_note);
          this.db.collection(environment.firebaseCollections.users).doc(this.user.uid)
            .collection('notes').doc(index.toString()).set(deleted_note);
        });
      });
  }
}

import {AfterViewInit, Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {Note} from '../note';
import {RecallNotePairComponent} from '../recall-note-pair/recall-note-pair.component';
import {ActivatedRoute, Router} from '@angular/router';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {RecallNotePair} from '../recall-note-pair';
import {AngularFireAuth} from '@angular/fire/auth';
import {User} from 'firebase';
import {AngularFirestore} from '@angular/fire/firestore';
import * as firebase from 'firebase';
import Timestamp = firebase.firestore.Timestamp;
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-note-view',
  templateUrl: './note-view.component.html',
  styleUrls: ['./note-view.component.css']
})
export class NoteViewComponent implements OnInit, AfterViewInit {
  note: Note;
  largestIndex: number;
  @ViewChildren(RecallNotePairComponent) recallNotePairComponents: QueryList<RecallNotePairComponent>;
  recallNotePairComponentsArray = [];  // Annoying but necessary, because QueryLists, the default type of ViewChildren,
                                       // lacks many of the functions of regular arrays.
  mementosUndoStack: string[] = [];  // Stack to hold previous swaps. Allows for undoing swaps.
  mementosRedoStack: string[] = [];  // Stack to hold previously undone swaps. Allows for redoing swaps.
  user: User;

  constructor(private route: ActivatedRoute, private afAuth: AngularFireAuth, private router: Router, private db: AngularFirestore) {
    this.largestIndex = 1;
    this.note = {
      name: 'Unnamed Note',
      createdOn: new Date(),
      pinned: false,
      recallNotePairs: [{
        index: this.largestIndex,
        recall: '',
        notes: '',
      }]
    };
  }

  ngOnInit() {
    this.afAuth.user
      .subscribe((user) => {
      if (!user) {
        this.router.navigateByUrl('/welcome');
      } else {
        this.user = user;
        // If a note with the ID specified in the route exists, load it.
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
          this.db.collection(environment.firebaseCollections.users).doc(this.user.uid).collection('notes').doc(id).get()
            .subscribe((documentSnapshot) => {
              this.note = documentSnapshot.data() as unknown as Note;
              this.largestIndex = this.note.recallNotePairs[this.note.recallNotePairs.length - 1].index;
            });
        }
      }
    });
  }

  ngAfterViewInit() {
    // Assigning the QueryList to the array has to be done after the view is rendered.
    this.recallNotePairComponentsArray = this.recallNotePairComponents.toArray();
  }

  addEmptyRecallNotePair(index) {
    // Adds an empty recall-note pair.
    this.recallNotePairComponentsArray = this.recallNotePairComponents.toArray();
    this.saveRecallNotePairs();
    if (index + 1 >= this.largestIndex) {
      if (this.recallNotePairComponentsArray[index].recallNotePair.recall !== '') {
        this.largestIndex += 1;
        this.note.recallNotePairs.push({
          index: this.largestIndex,
          recall: '',
          notes: '',
        });
      }
    } else {
      this.recallNotePairComponentsArray[index + 1].shiftFocusToRecall();
    }
  }

  focusPreviousPairNotes(index: number) {
    // Focuses the notes section of the previous recall-note pair to the one currently selected.
    this.recallNotePairComponentsArray = this.recallNotePairComponents.toArray();
    if (index > 0) {
      this.recallNotePairComponentsArray[index - 1].shiftFocusToNotes();
      if (this.recallNotePairComponentsArray[index].recallNotePair.recall === '' &&
          this.recallNotePairComponentsArray[index].recallNotePair.notes === '') {
        this.note.recallNotePairs.splice(index, 1);
        this.largestIndex -= 1;
      }
    }
  }

  saveRecallNotePairs(): void {
    // Updates this particular note in localStorage. This is the function to change to switch to Firebase.
    this.db.collection(environment.firebaseCollections.users).doc(this.user.uid).collection('notes').get()
      .subscribe((notesQuery) => {
        const notes: Note[] = notesQuery.docs.length > 0 ? notesQuery.docs.map(e => e.data()) as unknown as Note[] : [];
        let noteIndex = notes.findIndex(e => (e.createdOn as unknown as Timestamp).toDate().toString() === this.note.createdOn.toString());

        for (let i = 0; i < this.mementosUndoStack.length; i++) {
          // If we create a recall-note pair after undoing a swap, the existing swap entries don't contain it.
          const mementoObject = JSON.parse(this.mementosUndoStack[i]);
          if (mementoObject.length < this.note.recallNotePairs.length) {
            for (const pair of this.note.recallNotePairs) {
              let isContained = false;
              for (const mementoPair of mementoObject) {
                if (mementoPair.notes === pair.notes && mementoPair.recall === pair.recall) {
                  isContained = true;
                }
              }
              if (!isContained) {
                mementoObject.push(pair);
              }
            }
            this.mementosUndoStack[i] = JSON.stringify(mementoObject);
          }
        }

        for (let i = 0; i < this.mementosRedoStack.length; i++) {
          const mementoObject = JSON.parse(this.mementosRedoStack[i]);
          if (mementoObject.length < this.note.recallNotePairs.length) {
            for (const pair of this.note.recallNotePairs) {
              let isContained = false;
              for (const mementoPair of mementoObject) {
                if (mementoPair.notes === pair.notes && mementoPair.recall === pair.recall) {
                  isContained = true;
                }
              }
              if (!isContained) {
                mementoObject.push(pair);
              }
            }
            this.mementosRedoStack[i] = JSON.stringify(mementoObject);
          }
        }
        if (noteIndex < 0) {
          noteIndex = notes.length;
        }
        this.db.collection(environment.firebaseCollections.users)
          .doc(this.user.uid).collection('notes').doc(noteIndex.toString()).set(this.note);
      });
  }

  undoSwap() {
    if (this.mementosUndoStack.length > 0) {
      const mostRecentMemento = this.mementosUndoStack.pop();
      if (this.mementosRedoStack.length === 0) {
        this.mementosRedoStack.push(JSON.stringify(this.note.recallNotePairs));
      } else {
        this.mementosRedoStack.push(mostRecentMemento);
      }
      this.note.recallNotePairs = JSON.parse(mostRecentMemento);
      this.saveRecallNotePairs();
    }
  }

  redoSwap() {
    if (this.mementosRedoStack.length > 0) {
      const mostRecentMemento = this.mementosRedoStack.pop();
      this.mementosUndoStack.push(mostRecentMemento);
      this.note.recallNotePairs = JSON.parse(mostRecentMemento);
      this.saveRecallNotePairs();
    }
  }
  fixIndices(oldIndex, newIndex) {
    this.note.recallNotePairs.forEach((e, i) => {
      if (oldIndex > newIndex) {
        if (i >= newIndex && i <= oldIndex) {
          e.index += 1;
        }
      } else if (oldIndex < newIndex) {
        if (i <= newIndex && i >= oldIndex) {
          e.index -= 1;
        }
      }
    });
  }

  drop(event: CdkDragDrop<RecallNotePair[]>): void {
    this.mementosUndoStack.push(JSON.stringify(this.note.recallNotePairs));
    if (event.currentIndex !== event.previousIndex) {
      this.note.recallNotePairs[event.previousIndex].index = event.previousIndex > event.currentIndex ? event.currentIndex :
        event.currentIndex + 2;
    }

    this.fixIndices(event.previousIndex, event.currentIndex);
    moveItemInArray(this.note.recallNotePairs, event.previousIndex, event.currentIndex);
    this.saveRecallNotePairs();
  }

  shouldDisableUndo() {
    return !(this.mementosUndoStack.length > 0);
  }

  shouldDisableRedo() {
    return !(this.mementosRedoStack.length > 0);
  }
}

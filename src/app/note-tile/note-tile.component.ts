import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Note} from '../note';
import * as firebase from 'firebase';
import Timestamp = firebase.firestore.Timestamp;

@Component({
  selector: 'app-note-tile',
  templateUrl: './note-tile.component.html',
  styleUrls: ['./note-tile.component.css']
})
export class NoteTileComponent implements OnInit {
  // Component on the notes-list page that represents a single note.
  @Input() note: Note;
  isNoteHovered = false;  // Used to detect whether or not the mouse is over the note, and display the delete button based on that.
  @Output() delete = new EventEmitter();  // I made this an EventEmitter because it is, frankly,
                                          // easier to delete the note from the notes-list component than it is from here.
  constructor() { }

  ngOnInit() {
  }
  deleteAction(event) {
    event.stopPropagation();
    this.delete.emit();
  }
}

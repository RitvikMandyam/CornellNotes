import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Note} from '../note';
import {User} from 'firebase';

@Component({
  selector: 'app-note-taking-toolbar',
  templateUrl: './note-taking-toolbar.component.html',
  styleUrls: ['./note-taking-toolbar.component.css']
})
export class NoteTakingToolbarComponent implements OnInit {
  // The big blue toolbar across the top of the note-view page.
  @Input() note: Note;  // The note represented in the component that this toolbar is a child of.
  @Input() isUndoSwapDisabled = false;  // If the "Undo swap" button be enabled.
  @Input() isRedoSwapDisabled = false;  // If the "Undo swap" button be enabled.
  @Output() bulletedList = new EventEmitter();  // Emitted when a bulleted list is to be added.
  @Output() numberedList = new EventEmitter();  // Emitted when a numbered list is to be added.
  @Output() undoSwap = new EventEmitter();  // Emitted to undo the last swap.
  @Output() redoSwap = new EventEmitter();  // Emitted to redo the last swap.
  @Output() change = new EventEmitter();  // Emitted to notify parent component that value has changed.
  @Input() user: User;

  // Emitted to redo the last swap.

  constructor() { }

  ngOnInit() {
  }
  /* Functions which just fire their respective EventEmitters */
  undoSwapAction() {
    this.undoSwap.emit();
  }
  redoSwapAction() {
    this.redoSwap.emit();
  }

  changeAction() {
    this.change.emit();
  }
}

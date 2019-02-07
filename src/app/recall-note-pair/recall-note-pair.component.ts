import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {RecallNotePair} from '../recall-note-pair';

@Component({
  selector: 'app-recall-note-pair',
  templateUrl: './recall-note-pair.component.html',
  styleUrls: ['./recall-note-pair.component.css']
})
export class RecallNotePairComponent implements OnInit {
  @Input() recallNotePair: RecallNotePair;  // The RecallNotePair represented by this component.
  @ViewChild('recall') recallField: ElementRef;  // A reference to the div containing the recall.
  @ViewChild('notes') notesField: ElementRef;  // A reference to the div containing the notes.
  @Output() insertNextRecallNotePair = new EventEmitter();  // Emitted when a new RecallNotePairComponent is to be added beneath this one.
  @Output() focusPreviousRecallNotePair = new EventEmitter();
  @Output() dataChanged = new EventEmitter();
  isFocused = false;
  // Emitted when focus needs to be moved
                                                               // to the previous RecallNotePairComponent.

  private static moveCaretToEnd(element: ElementRef): void {
    //  Sets the caret to the end of the text in a div.
    if (element && element.nativeElement && element.nativeElement.lastChild) {
      const range = document.createRange(),
        pos = element.nativeElement.lastChild ? element.nativeElement.lastChild.textContent.length : 0,
        sel = window.getSelection();

      range.setStart(element.nativeElement.lastChild.lastChild ? element.nativeElement.lastChild.lastChild :
        element.nativeElement.lastChild, pos);
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);
    }
  }

  constructor() { }

  ngOnInit() {
    this.shiftFocusToRecall();
  }
  /* These functions should be pretty self-explanatory, they do exactly what their names say */
  shiftFocusToRecall() {
    Promise.resolve(null).then(() => this.recallField.nativeElement.focus());
    RecallNotePairComponent.moveCaretToEnd(this.recallField);
  }

  shiftFocusToNotes() {
    this.notesField.nativeElement.focus();
    RecallNotePairComponent.moveCaretToEnd(this.notesField);
  }

  insertNextPair() {
    this.insertNextRecallNotePair.emit();
  }
  shiftFocusToPreviousPair() {
    this.focusPreviousRecallNotePair.emit();
    return false;
  }

  dataChangedAction() {
    this.dataChanged.emit();
  }
}

import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {HotkeyModule} from 'angular2-hotkeys';
import {ContenteditableModule} from 'ng-contenteditable';
import {MatButtonModule, MatCardModule, MatTooltipModule, MatSnackBarModule} from '@angular/material';
import {DragDropModule} from '@angular/cdk/drag-drop';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RecallNotePairComponent} from './recall-note-pair/recall-note-pair.component';
import {NoteTakingToolbarComponent} from './note-taking-toolbar/note-taking-toolbar.component';
import { NoteViewComponent } from './note-view/note-view.component';
import { NotesListComponent } from './notes-list/notes-list.component';
import { NoteTileComponent } from './note-tile/note-tile.component';

@NgModule({
  declarations: [
    AppComponent,
    RecallNotePairComponent,
    NoteTakingToolbarComponent,
    NoteViewComponent,
    NotesListComponent,
    NoteTileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    HotkeyModule.forRoot(),
    ContenteditableModule,
    MatButtonModule,
    MatCardModule,
    MatTooltipModule,
    MatSnackBarModule,
    DragDropModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

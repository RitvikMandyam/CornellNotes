import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {HotkeyModule} from 'angular2-hotkeys';
import {ContenteditableModule} from 'ng-contenteditable';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RecallNotePairComponent} from './recall-note-pair/recall-note-pair.component';
import {NoteTakingToolbarComponent} from './note-taking-toolbar/note-taking-toolbar.component';
import {MatButtonModule, MatCardModule, MatTooltipModule} from '@angular/material';
import { NoteViewComponent } from './note-view/note-view.component';
import { NotesListComponent } from './notes-list/notes-list.component';
import { NoteTileComponent } from './note-tile/note-tile.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { TextListComponent } from './text-list/text-list.component';

@NgModule({
  declarations: [
    AppComponent,
    RecallNotePairComponent,
    NoteTakingToolbarComponent,
    NoteViewComponent,
    NotesListComponent,
    NoteTileComponent,
    TextListComponent,
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
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

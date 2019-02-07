import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {HotkeyModule} from 'angular2-hotkeys';
import {ContenteditableModule} from 'ng-contenteditable';
import {MatButtonModule, MatCardModule, MatSnackBarModule, MatToolbarModule, MatTooltipModule} from '@angular/material';
import {DragDropModule} from '@angular/cdk/drag-drop';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RecallNotePairComponent} from './recall-note-pair/recall-note-pair.component';
import {NoteTakingToolbarComponent} from './note-taking-toolbar/note-taking-toolbar.component';
import {NoteViewComponent} from './note-view/note-view.component';
import {NotesListComponent} from './notes-list/notes-list.component';
import {NoteTileComponent} from './note-tile/note-tile.component';
import {environment} from '../environments/environment';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireAuthModule} from '@angular/fire/auth';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { UserManagementComponent } from './user-management/user-management.component';

@NgModule({
  declarations: [
    AppComponent,
    RecallNotePairComponent,
    NoteTakingToolbarComponent,
    NoteViewComponent,
    NotesListComponent,
    NoteTileComponent,
    WelcomePageComponent,
    UserManagementComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    MatIconModule,
    HotkeyModule.forRoot(),
    ContenteditableModule,
    MatButtonModule,
    MatCardModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatToolbarModule,
    DragDropModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

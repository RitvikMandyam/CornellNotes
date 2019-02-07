import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NoteViewComponent} from './note-view/note-view.component';
import {NotesListComponent} from './notes-list/notes-list.component';
import {WelcomePageComponent} from './welcome-page/welcome-page.component';

const routes: Routes = [
  {path: 'welcome', component: WelcomePageComponent},
  {path: 'note', component: NoteViewComponent},
  {path: 'note/:id', component: NoteViewComponent},
  {path: 'notes', component: NotesListComponent},
  { path: '', redirectTo: '/note', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

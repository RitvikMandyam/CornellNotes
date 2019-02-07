import {Component, Input, OnInit} from '@angular/core';
import {User} from 'firebase';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
  animations: [
    trigger('slideDown', [
      state('false', style({
        opacity: 0,
        display: 'none',
      })),
      state('true', style({
        opacity: 1,
        display: 'flex',
      })),
      transition('false <=> true', animate('250ms ease-out'))
    ])
  ]
})
export class UserManagementComponent implements OnInit {
  shouldShowManagementDropdown = false;

  @Input() user: User;

  constructor(private afAuth: AngularFireAuth, private router: Router) { }

  ngOnInit() {
  }

  logout() {
    this.afAuth.auth.signOut().then(() => this.router.navigateByUrl('/welcome'));
  }
}

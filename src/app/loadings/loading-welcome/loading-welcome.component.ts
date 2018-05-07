import { Component, OnInit, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
  keyframes
} from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
@Component({
  selector: 'app-loading-welcome',
  templateUrl: './loading-welcome.component.html',
  styleUrls: ['./loading-welcome.component.css']
})
export class LoadingWelcomeComponent implements OnInit {
  user: any = {
    name: '',
    photo: ''
  };
  @Output() loaded = new EventEmitter();
  constructor(private ref: ChangeDetectorRef, private _firebaseAuth: AngularFireAuth) {
    this.getUser();
    setTimeout(() => {
      this.loaded.emit('');
    }, 2000);
  }

  getUser() {
    this._firebaseAuth.authState.subscribe(x => {
      this.user.name = x.displayName;
      this.user.photo = x.photoURL;
    });
  }

  ngOnInit() {
  }
}

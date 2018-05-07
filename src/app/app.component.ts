import { Component, ChangeDetectorRef } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  logged = false;
  loaded = false;
  searching = false;

  constructor(private ref: ChangeDetectorRef, private _firebaseAuth: AngularFireAuth) {
    this._firebaseAuth.authState.subscribe(x => {
      if (x) {
        this.logged = true;
        this.ref.detectChanges();
      }
    });

  }

  login(ceva) {
    this.logged = true;
    this.ref.detectChanges();
  }
  load(ceva) {
    this.loaded = true;
    this.ref.detectChanges();
  }
  logout(ceva) {
    this.logged = false;
    this.ref.detectChanges();
  }

}

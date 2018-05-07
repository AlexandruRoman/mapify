import { AngularFireAuth } from 'angularfire2/auth';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() loggedIn = new EventEmitter();
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  signInWithFacebook() {
    this.authService.signInWithFacebook()
      .then((res) => {
        console.log(res);
        this.loggedIn.emit(res);
      })
      .catch((err) => console.log(err));
  }
}

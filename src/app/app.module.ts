import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NguiMapModule } from '@ngui/map';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { RouterModule } from '@angular/router';


import { AppComponent } from './app.component';
import { MapaComponent } from './mapa/mapa.component';
// import { AppRoutes } from './app.routes';

import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthService } from './services/auth.service';
import { LoginComponent } from './login/login.component';
import { LoadingWelcomeComponent } from './loadings/loading-welcome/loading-welcome.component';
import { LocationFormComponent } from './location-form/location-form.component';
import { HttpModule } from '@angular/http';
import { SuiModule } from 'ng2-semantic-ui';
import { LoadingSearchComponent } from './loadings/loading-search/loading-search.component';

@NgModule({
  declarations: [
    AppComponent,
    MapaComponent,
    LoginComponent,
    LoadingWelcomeComponent,
    LocationFormComponent,
    LoadingSearchComponent
  ],
  imports: [
    HttpModule,
    SuiModule,
    BrowserModule,
    BrowserAnimationsModule,
    // RouterModule.forRoot([
    //   { path: '', component: LoginComponent },
    //   { path: 'map', component: MapaComponent },
    //   { path: 'login', component: LoginComponent },
    //   { path: '**', component: LoginComponent }
    // ]),
    AngularFireModule.initializeApp(environment.firebase, 'angular-auth-firebase'),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NguiMapModule.forRoot({ apiUrl: 'https://maps.google.com/maps/api/js?libraries=visualization,places,drawing?key=AIzaSyDePhxjCqRuIPdQQryG1UCCdOFcoMuFXys' })
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }

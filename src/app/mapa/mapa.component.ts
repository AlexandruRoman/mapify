import { Http } from '@angular/http';
import { Component, ChangeDetectorRef, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { DirectionsRenderer } from '@ngui/map';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {
  @ViewChild(DirectionsRenderer) directionsRendererDirective: DirectionsRenderer;
  @Output() out = new EventEmitter();
  autocomplete: any;
  center: any;
  waypts: any;

  route: any = {
    origin: 'Berlin',
    destination: 'Rome, Metropolitan City of Rome, Italy',
    travel: '0',
    heuristic: '1'
  };

  waypoints = [];

  directionsRenderer: google.maps.DirectionsRenderer;
  directionsResult: google.maps.DirectionsResult;
  direction: any = {};

  directions = [];
  infos = [];
  winfos = [];

  user: any = {
    name: '',
    photo: ''
  };

  marker = {
    name: '',
    lat: null,
    lng: null,
  };

  wicons = [
    'https://image.flaticon.com/icons/svg/550/550219.svg',
    'https://image.flaticon.com/icons/svg/222/222506.svg',
    'https://image.flaticon.com/icons/svg/222/222506.svg',
    'https://image.flaticon.com/icons/svg/363/363523.svg',
    'https://image.flaticon.com/icons/svg/414/414974.svg',
    'https://image.flaticon.com/icons/svg/414/414974.svg',
    'https://image.flaticon.com/icons/svg/414/414974.svg',
    'https://image.flaticon.com/icons/svg/3/3491.svg',
    'https://image.flaticon.com/icons/svg/252/252035.svg',
    'https://image.flaticon.com/icons/svg/252/252035.svg',
    'https://image.flaticon.com/icons/svg/169/169367.svg'
  ];

  wi = [];
  pois = [];
  clickedNow = 0;

  searching = false;
  geolocationPosition: any;
  _selectedRoute = 0;
  get selectedRoute() {
    return this._selectedRoute;
  }
  set selectedRoute(value) {
    this._selectedRoute = value;
    this.direction = this.directions[value];
  }

  url = 'https://mapify-dev2.azurewebsites.net/api/ruta';

  constructor(private ref: ChangeDetectorRef, private _firebaseAuth: AngularFireAuth, private _http: Http) {
    this.getUser();
  }

  initialized(autocomplete: any) {
    this.autocomplete = autocomplete;

  }

  ngOnInit() {
    this.directionsRendererDirective['initialized$'].subscribe(directionsRenderer => {
      this.directionsRenderer = directionsRenderer;
    });

    // if (window.navigator && window.navigator.geolocation) {
    //   window.navigator.geolocation.getCurrentPosition(
    //     position => {
    //       this.geolocationPosition = position,
    //         console.log(position);
    //     },
    //     error => {
    //       switch (error.code) {
    //         case 1:
    //           console.log('Permission Denied');
    //           break;
    //         case 2:xo
    //           console.log('Position Unavailable');
    //           break;
    //         case 3:
    //           console.log('Timeout');
    //           break;
    //       }
    //     }
    //   );
    // }
  }

  getIcon(i) {
    // console.log(this.wi[this.selectedRoute]);
    const aux = {
      url: this.wicons[i],
      // tslint:disable-next-line:whitespace
      anchor: new google.maps.Point(24, 24),
      // tslint:disable-next-line:whitespace
      size: new google.maps.Size(48, 48)
      // tslint:disable-next-line:whitespace
    };
    return aux;
  }

  startChanged(place) {
    this.route.origin = place.formatted_address;
    this.ref.detectChanges();
  }
  endChanged(place) {
    this.route.destination = place.formatted_address;
    this.ref.detectChanges();
  }

  sendRoute() {
    // this.direction.origin = this.route.origin;
    // this.direction.destination = this.route.destination;
    console.log(this.route);

    this.searching = true;
    this._http.post(this.url, this.route).subscribe(x => {
      this.createRoute(x.json());
      this.searching = false;
    }, (error) => {
      this.searching = false;
      alert("Nu exista ruta intre punctele alese!");
    }
    );
    this.showDirection();
    this.ref.detectChanges();
  }

  createRoute(x) {
    console.log(x);
    //find pois
    let aux1 = x[0].pois.split(';');
    for (let i = 0; i < aux1.length - 1; i++) {
      let aux2 = aux1[i].split(',');
      let p = { lat: parseFloat(aux2[0]), lng: parseFloat(aux2[1]), name: aux2[2] };
      this.pois.push(p);
    }

    this.directions = [];
    this.wi = [];
    for (let i = 0; i < x.length; i++) {
      this.direction = {};
      this.direction.origin = this.route.origin;
      this.direction.destination = this.route.destination;
      this.waypoints = [];
      this.winfos = [];
      const aux = x[i];
      aux.duration = Math.round(aux.duration);
      aux.distance = Math.round(aux.distance);
      this.infos.push(aux);
      const coords = aux.waypointsString.split(' ');
      for (let j = 4; j < coords.length - 4; j += 4) {
        const c = { location: { lat: parseFloat(coords[j]), lng: parseFloat(coords[j + 1]) } };
        this.waypoints.push(c);
        const inf = { info: { a: parseFloat(coords[j + 2]), w: Math.round(parseFloat(coords[j + 3])) } };
        this.winfos.push(inf);
      }
      this.direction.waypoints = this.waypoints;
      if (this.route.travel === '0') {
        this.direction.travelMode = 'DRIVING';
      }
      if (this.route.travel === '1') {
        this.direction.travelMode = 'WALKING';
      }
      if (this.route.travel === '2') {
        this.direction.travelMode = 'BICYCLING';
      }
      if (this.route.travel === '3') {
        this.direction.travelMode = 'TRANSIT';
      }
      this.directions.push(this.direction);
      this.wi.push(this.winfos);
      // console.log(this.direction.waypoints);
    }
    // console.log(this.directions[0]);
    this.direction = this.directions[0];
    // console.log(this.wi[this.selectedRoute]);
    // console.log(this.direction.waypoints);
    this.showDirection();
    this.ref.detectChanges();
  }

  directionsChanged() {
    this.directionsResult = this.directionsRenderer.getDirections();
    this.ref.detectChanges();
  }
  showDirection() {
    this.directionsRendererDirective['showDirections'](this.direction);
  }

  getUser() {
    this._firebaseAuth.authState.subscribe(x => {
      this.user.name = x.displayName;
      this.user.photo = x.photoURL;
    });
  }

  logout() {
    this._firebaseAuth.auth.signOut().then(() => {
      this.out.emit('');
    });
  }

  clicked({ target: marker }) {
    this.marker.lat = marker.getPosition().lat();
    this.marker.lng = marker.getPosition().lng();
    this.marker.name = this.pois[this.clickedNow].name;

    marker.nguiMapComponent.openInfoWindow('iw', marker);
  }

  createLink(ceva) {
    return "http://www.letmegooglethat.com/?q=" + ceva;
  }

}

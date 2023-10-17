// src/app/app.component.ts

import {Component} from '@angular/core';

import {AuthService} from '@auth0/auth0-angular';
import {firstValueFrom} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(public auth: AuthService) {
    setInterval(async () => {
      const idToken = await firstValueFrom(auth.idTokenClaims$);
      if (!idToken) {
        console.log('No ID token', idToken);
      } else {
        console.log('ID token: ', idToken, 'time until expire (seconds): ', idToken?.exp - Math.floor(Date.now() / 1000));
      }
    }, 5000);
  }
}


function parseJwt(token: string): string {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}

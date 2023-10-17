// src/app/app.component.ts

import {ChangeDetectorRef, Component} from '@angular/core';

import {AuthService} from '@auth0/auth0-angular';
import {firstValueFrom} from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent {
    idToken: any = undefined;

    constructor(public auth: AuthService, cdr: ChangeDetectorRef) {
        setInterval(async () => {
            this.idToken = await firstValueFrom(auth.idTokenClaims$);
            if (!this.idToken) {
                console.log('No ID token', this.idToken);
            } else {
                console.log('ID token: ', this.idToken, 'time until expire (seconds): ', this.expiresInSeconds);
            }
            cdr.markForCheck();
        }, 1000);
        this.auth.idTokenClaims$.subscribe(claims => {
            console.log('Got new idTokenClaims$', claims);
            cdr.markForCheck();
        });
    }

    get idTokenAsString(): string {
        return JSON.stringify(this.idToken, undefined, 4);
    }

    get expiresInSeconds(): number {
        if (!this.idToken) {
            return NaN;
        }
        return this.idToken?.exp - Math.floor(Date.now() / 1000);
    }

    async callGetAccessTokenSilently(): Promise<void> {
        const accessToken = await firstValueFrom(this.auth.getAccessTokenSilently());
        console.log('getAccessTokenSilently result token: ', accessToken);
    }

    async callGetAccessTokenWithPopup(): Promise<void> {
        const accessToken = await firstValueFrom(this.auth.getAccessTokenWithPopup());
        console.log('getAccessTokenWithPopup result token: ', accessToken);
    }
}


// function parseJwt(token: string): string {
//   var base64Url = token.split('.')[1];
//   var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//   var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
//     return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
//   }).join(''));
//
//   return JSON.parse(jsonPayload);
// }

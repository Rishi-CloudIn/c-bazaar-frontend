// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import * as CryptoJS from 'crypto-js';

export const environment = {
  production: false,
  secret: 'testkey',
  enKey: CryptoJS.enc.Utf8.parse('6mV7HV2^aXn7Vt#^#7i&rq5P*To3Uqrb'),
  enIv: CryptoJS.enc.Utf8.parse('n9009XH$fUn0!1Rd'),
  firebase: {
    apiKey: 'AIzaSyBv7JT-oHYBn1vVxVphQuZHDkUVtzopTXk',
    authDomain: 'c-bazaar-22284.firebaseapp.com',
    projectId: 'c-bazaar-22284',
    storageBucket: 'c-bazaar-22284.appspot.com',
    messagingSenderId: '701512398022',
    appId: '1:701512398022:web:ae2fbc00d7dd46a27293c7',
    measurementId: 'G-YYRG0JXKC3',
    vapidKey:
      'BAkUFFILYH5ec-xuW4T0nMKyiffnDC1seb_KBdkIprQbwWFL1_4IQq3GTSvKMG6a_Me2MgNhpwc_siu6mZ_Az08',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

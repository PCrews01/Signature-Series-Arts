// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  fb : {
    apiKey: 'AIzaSyBxsrFKatsASWr5qFqf96i2xrLqtQxbzpY',
    authDomain: 'event-subs.firebaseapp.com',
    databaseURL: 'https://event-subs.firebaseio.com',
    projectId: 'event-subs',
    storageBucket: 'event-subs.appspot.com',
    messagingSenderId: '581714982877'
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

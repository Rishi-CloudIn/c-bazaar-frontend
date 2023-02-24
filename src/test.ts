// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js/testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

declare const require: {
  context(path: string, deep?: boolean, filter?: RegExp): {
    <T>(id: string): T;
    keys(): string[];
  };
};

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting(),
);

// Then we find all the tests.
const context = require.context('./', true, /\.spec\.ts$/);
// And load the modules.
context.keys().map(context);



// $(document).ready(function () {
//   $('div.top').click(function() {
//   $('html, body').animate({
//     scrollTop: $("div.middle").offset().top
//   }, 1000)
// }),
//   $('div.middle').click(function (){
//     $('html, body').animate({
//       scrollTop: $("div.bottom").offset().top
//     }, 1000)
//   }),
//   $('div.bottom').click(function (){
//     $('html, body').animate({
//       scrollTop: $("div.top").offset().top
//     }, 1000)
//   })
// });

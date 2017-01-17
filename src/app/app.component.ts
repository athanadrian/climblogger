import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';

import * as firebase from 'firebase';

@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {


  public rootPage: any;

  constructor(private platform: Platform) {

    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyB7GsipBPgFIOYNtX3_VLPaNENpd9krfAw",
      authDomain: "climblogger-18d1a.firebaseapp.com",
      databaseURL: "https://climblogger-18d1a.firebaseio.com",
      storageBucket: "climblogger-18d1a.appspot.com",
      messagingSenderId: "291261771196"
    };
    firebase.initializeApp(config);

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.rootPage = TabsPage;
      } else {
        this.rootPage = LoginPage;
      }
    });
    console.log('halo1');

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}

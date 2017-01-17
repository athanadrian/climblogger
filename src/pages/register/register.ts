import { Component } from '@angular/core';
import { NavController, ViewController, NavParams } from 'ionic-angular';

import { ResetPasswordPage } from '../reset-password/reset-password'

/*
  Generated class for the Register page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  constructor(private navCtrl: NavController, private viewController:ViewController, private navParams:NavParams) {}

  ionViewDidLoad() {
    console.log('Hello RegisterPage Page');
  }

  close(event){
    this.viewController.dismiss();
  }

  resetPassword(event){

     var person={
       name:"atana",
       username:"aatana"
     };


    this.navCtrl.push(ResetPasswordPage, {
      person:person
    });
  }

}

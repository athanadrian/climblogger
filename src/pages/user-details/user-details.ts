import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { UsersService } from '../../providers/users-service';

import * as firebase from 'firebase';

/*
  Generated class for the UserDetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-user-details',
  templateUrl: 'user-details.html'
})
export class UserDetailsPage {

  userPicUrl:any;
  userName:any;
  userEmail:any;

  constructor(public navCtrl: NavController, private usersService:UsersService) {}

  ionViewDidLoad() {
    console.log('Hello UserDetailsPage Page');

    var currentUserId=firebase.auth().currentUser.uid;
    this.loadUser(currentUserId);
  }

//Load user info
  loadUser(userId){
    var that=this;
    this.usersService.getUser(userId)
      .then(user=>{
        that.userPicUrl=user.val().photo || "images/profile_pic.png";
        that.userName=user.val().username || "NA";
        that.userEmail=user.val().email;
      })
  }

//Logout button
  logUserOut(){
    console.log('log user out');
    this.usersService.logoutUser().then(()=>{
      this.navCtrl.setRoot(LoginPage);
    })
  }
}

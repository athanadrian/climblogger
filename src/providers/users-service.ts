import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase';
/*
  Generated class for the UsersService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UsersService {

  //private data: any;
  public fireAuth: any;
  public usersNode: any;

  constructor(public http: Http) {
    console.log('Hello UsersService Provider');

    this.fireAuth = firebase.auth();
    //create node(table) users in firebase
    this.usersNode = firebase.database().ref('users');
  }

  //SIGN UP NEW USER
  signUpUser(email: string, password: string) {
    //create new user
    return this.fireAuth.createUserWithEmailAndPassword(email, password)
      .then((newUser) => {
        //sign in newUser=> authendicatedUser
        this.fireAuth.signInWithEmailAndPassword(email, password)
          .then((authenticatedUser) => {
            //succcessfull login => create userProfile
            this.usersNode.child(authenticatedUser.uid).set({
              email: email
            });
          });
      });
  }

  //SIGN IN EXISTING USER
  loginUser(email: string, password: string): any {
    //sign in existing user
    return this.fireAuth.signInWithEmailAndPassword(email, password);
  }

  //LOGOUT USER
  logoutUser() {
    return this.fireAuth.signOut();
  }

  //RESET FORGOTTEN PASSWORD
  resetForgottenPassword(email: any) {
    return this.fireAuth.sendPasswordResetEmail(email);
  }

  //GOOGLE SIGN IN
  signInUserWithGoogle() {
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/plus.login');

    var that = this;

    return firebase.auth().signInWithPopup(provider).then(function (result) {

      if (result.user) {

        // The signed-in user info.
        var user = result.user;

        var res = result.user.displayName.split(" ");


        that.usersNode.child(user.uid).set({
          email: user.email,
          photo: user.photoURL,
          username: user.displayName,
          name: {
            first: res[0],
            middle: res[1],
            last: res[2],
          },
        });

      }

    }).catch(function (error) {
      console.log(error);
      //alert("error "+error.message);
    });
  }

  //GET USER INFO FROM DB(Firebase)
  getUser(userId:any) {
    var userRef=this.usersNode.child(userId);
      return userRef.once('value');
  }
}

import { Component } from '@angular/core';
import { NavController, ModalController, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';

import { UsersService } from '../../providers/users-service';
/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  email: any;
  password: any;

  constructor(private navCtrl: NavController,
    private modalController: ModalController,
    private usersService: UsersService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private toastController:ToastController) {

  }

  ionViewDidLoad() {
    console.log('Hello LoginPage Page');
  }

//Loggin Button
  loginUser() {
    console.log('loginUser');
    this.usersService.loginUser(this.email, this.password)
      .then(authUser => {
        //successfull login set rootPage the Home page
        loader.present();
        this.navCtrl.setRoot(HomePage);
      }, error => {
        //error logggin in
        //alert("error loggin in: " + error.message);
        let alert = this.alertController.create({
          title: 'Error loggin in',
          subTitle: error.message,
          buttons: ['OK']
        });
        alert.present();
      });
    let loader = this.loadingController.create({
      dismissOnPageChange: true,
    });
  }

  submitRegister() {
    console.log('SubmitRegister')
    //create modal
    let registerModal = this.modalController.create(RegisterPage);
    registerModal.present();
  }

//Sign up Button
  signUpUser() {
    console.log('signUpUser')
    this.usersService.signUpUser(this.email, this.password)
      .then(authUser => {
        //successfull signin
        loader.present();
        this.navCtrl.setRoot(HomePage);
      }, error => {
        //error signing in
        //alert("error signing up: " + error.message);
        let alert = this.alertController.create({
          title: 'Error signin up',
          subTitle: error.message,
          buttons: ['OK']
        });
        alert.present();
      });

    let loader = this.loadingController.create({
      dismissOnPageChange: true,
    });
  }

//forgot password button
  resetPassword() {
    console.log('reset password');

    let prompt = this.alertController.create({
      title: 'Enter your email.',
      message: "A new password will be send to your email.",
      inputs: [
        {
          name: 'recoveredEmail',
          placeholder: 'email'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Submit',
          handler: data => {
            console.log('email: ' + data.recoveredEmail);
            //add preloader
            let loader = this.loadingController.create({
              dismissOnPageChange: true,
              content: 'Reseting your password....'
            });
            loader.present();
            //call database
            this.usersService.resetForgottenPassword(data.recoveredEmail)
              .then(() => {
                loader.dismiss().then(() => {
                  //password reset successfull
                  let alert = this.alertController.create({
                    title: 'Check your email.',
                    subTitle: 'Password reset successful',
                    buttons: ['OK']
                  });
                  alert.present();
                });
              }, error => {
                //error reseting password
                //alert("error reseting password: " + error.message);
                loader.dismiss().then(() => {
                  let alert = this.alertController.create({
                    title: 'Error reseting password',
                    subTitle: error.message,
                    buttons: ['OK']
                  });
                  alert.present();
                });
              });
          }
        }
      ]
    });
    prompt.present();
  }

//google sign in button
  googleSignIn(){
    console.log('google sign in');
    this.usersService.signInUserWithGoogle()
      .then(()=>{

        let toast=this.toastController.create({
          message:'User account signed successfully...',
          duration:3000
        });
        toast.present();
      });
  }
}


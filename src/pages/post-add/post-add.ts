import { Component } from '@angular/core';
import { NavController, ViewController, LoadingController, AlertController } from 'ionic-angular';

import { UsersService } from '../../providers/users-service';
import { PostsService} from '../../providers/posts-service';
import * as firebase from 'firebase';

/*
  Generated class for the PostAdd page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-post-add',
  templateUrl: 'post-add.html'
})
export class PostAddPage {

  postContent:any;
  userId:any;
  userPosts=[];
  users:any;
  userPicUrl:any;
  userName:any;
  userEmail:any;
  
  constructor(public navCtrl: NavController,
              private viewController: ViewController,
              private loadingController: LoadingController,
              private alertController: AlertController,
              private postService:PostsService,
              private usersService:UsersService) {
      //loggedin user        
    this.userId=firebase.auth().currentUser.uid;
  }

  ionViewDidLoad() {
    console.log('Hello PostAddPage Page');
  }
  //Add post button
  addNewPost(){
    let loader=this.loadingController.create({
      dismissOnPageChange:true,
      content:'Adding post....'
    });
    loader.present();

    //call service
    this.postService.createPost(this.userId,this.postContent)
      .then(()=>{
        //clear textarea
        this.postContent="";

        //add toast
        loader.dismiss()
          .then(()=>{
            //show success pop-up
            let alert=this.alertController.create({
              title:'Done!',
              subTitle:'Post Added!',
              buttons:['OK']
            });
            alert.present();
          });
          //close pop-up
          this.loadPosts();
          this.viewController.dismiss();
      },error=>{
        //show error pop-up
         loader.dismiss()
          .then(()=>{
            //show success pop-up
            let alert=this.alertController.create({
              title:'Error adding post!',
              subTitle:error.message,
              buttons:['OK']
            });
            alert.present();
          });
      });
  }

  //get posts
  loadPosts(){
    var that=this;

    this.postService.getPosts()
      .then(snapshot =>{
        that.userPosts.length=0;

        //get post details
        snapshot.forEach(function(childSnapshot){
          var data=childSnapshot.val();
          data['key']=childSnapshot.key;
          that.userPosts.push(data);
          //console.log('posts: '+that.userPosts);
        //get user details
        //console.log('That uid: '+that.userId);
        //console.log('This uid: '+this.userId);
        that.usersService.getUser(that.userId)
          .then(user=>{
            that.userName=user.val().username;
            that.userEmail=user.val().email;
            that.userPicUrl=user.val().photo || "images/profile_pic.png";
          });
        });
      });
  }
}

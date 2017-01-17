import { Component, OnInit } from '@angular/core';

import { NavController } from 'ionic-angular';

import { UserDetailsPage } from '../user-details/user-details';
import { PostAddPage } from '../post-add/post-add';
import { UsersService } from '../../providers/users-service';
import { PostsService } from '../../providers/posts-service';
import * as firebase from 'firebase';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{
  userPosts=[];
  users:any;
  userPicUrl:any;
  userName:any;
  userEmail:any;
  userId:any;


  constructor(public navCtrl: NavController, private postService:PostsService, private usersService:UsersService) {
    this.users=firebase.database().ref('users');
    this.userId=firebase.auth().currentUser.uid;
    this.loadPosts();
  }

  ngOnInit(){
    this.loadPosts();
  }
  //Profile button
  redirectToUserDetailsPage(){
    this.navCtrl.push(UserDetailsPage);
  }
  //Add button
  redirectToPostAddPage(){
    this.navCtrl.push(PostAddPage);
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

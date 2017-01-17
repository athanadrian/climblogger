import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase';

/*
  Generated class for the PostsService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class PostsService {

  usersNode: any;
  postsNode: any;
  usersPostsNode: any;
  firedb: any;

  constructor(public http: Http) {
    console.log('Hello PostsService Provider');
    this.usersNode = firebase.database().ref('users');
    this.postsNode = firebase.database().ref('posts');
    this.usersPostsNode = firebase.database().ref('users-posts');
    this.firedb = firebase.database().ref();
  }

//GET LIST OF POSTS
  getPosts(){
    return this.postsNode.once('value');
  }


//CREATE A NEW POST
  createPost(userId: any, postContent: any) {
    //post entry
    var postData = {
      uid: userId,
      content: postContent
    };

    //Get the key of the created post
    var newPostKey = this.postsNode.push().key;

    //insert post to (posts - userPosts) node simultaneously
    var insertPost = {};
    insertPost['/posts/' + newPostKey] = postData;
    insertPost['/users-posts/' + userId + '/' + newPostKey] = postData;

    //update both nodes
    return this.firedb.update(insertPost);
  }
}


// System imports
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';

import { Post } from '../classes/post/post';
import { ThreadPosts } from '../classes/thread-posts/thread-posts';
import { ForumPostsService } from '../forum-posts.service/forum-posts.service';

@Component({
  moduleId: module.id,
  selector: 'forum-page',
  templateUrl: 'forum-page.component.html'
})

export class ForumPageComponent {

    title: string = "Thread Name"; // thread name
    //thread: Thread;
    threadPosts: ThreadPosts = new ThreadPosts(); // initialise object

    // text for post
    postText: string = "";

    startIndex: number = 0; // starting index of displayed posts
    postsPerPage: number = 8;

    constructor(
      private forumPostsService: ForumPostsService,
      private route: ActivatedRoute,
      private location: Location
    ) {}

    ngOnInit(): void {

      // for each parameter in the route url
      this.route.params.forEach((params: Params) => {

        // get the param id
        let id = +params['id'];

        // get the posts from the thread with the id from the url
         this.forumPostsService.getPostsByThreadId(id)
           .then(threadPosts => this.threadPosts = threadPosts);         // save the posts object

      });
    } // ngOnInit()

    nextPage(): void {

      if(this.startIndex < this.threadPosts.posts.length - this.postsPerPage){

        this.startIndex++;

      } // if;

    } // nextPage()

    previousPage(): void {
      
      if(this.startIndex > 0){

        this.startIndex--;

      } // if

    } // previousPage()

    savePost(postBody: string): void {

      var post: Post = new Post();

      post.authorId = "ross";
      post.authorName = "Ross";
      post.body = postBody;
      post.threadId = this.threadPosts.threadId;
      post.id = this.threadPosts.posts.length + 1;

      this.forumPostsService.addPostByThreadId(this.threadPosts.threadId, post) // add the post to DB
      .then(threadPosts => this.threadPosts = threadPosts) // update posts on screen
      .then(() => {window.setTimeout( function () { document.getElementById('bottomOfPage').scrollIntoView(); }, 10 );}) // scroll to bottom of page
      .then(() => {this.nextPage();}) // try go to next page just incase your post ends up on there

      // clear the post textarea
      this.postText = "";
      
    } // savePost

    goBack(): void {
      this.location.back();
    }
}
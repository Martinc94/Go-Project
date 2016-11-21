"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require('rxjs/add/operator/toPromise');
var posts_test_1 = require('../test-data/posts-test');
var ForumPostsService = (function () {
    function ForumPostsService(http) {
        this.http = http;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.savePostURL = 'http://localhost:8080/api/savePost'; // URL to web api
    }
    ForumPostsService.prototype.handleError = function (error) {
        // In a real world app, we might use a remote logging infrastructure
        var errMsg;
        if (error instanceof http_1.Response) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Promise.reject(errMsg);
    };
    ForumPostsService.prototype.extractData = function (res) {
        var body = res.json();
        return body.data || {};
    };
    // uses a Promise to return posts asynchronously onces they are ready
    ForumPostsService.prototype.getPostsByThreadId = function (id) {
        return Promise.resolve(posts_test_1.POSTS).then(function (posts) { return posts.find(function (posts) { return posts.threadId === id; }); });
    }; // getPostsByThreadId()
    // addPostByThreadId(id: number, post: Post): Promise<ThreadPosts>{
    //     Promise.resolve(POSTS).then(posts => posts.find(posts => posts.threadId === id).posts.push(post));
    //     return this.getPostsByThreadId(id);
    // } // addPostByThreadId()
    ForumPostsService.prototype.createPost = function (post) {
        // sourced from angulars docs: https://angular.io/docs/ts/latest/guide/server-communication.html#!#update
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.savePostURL, JSON.stringify(post), options)
            .toPromise()
            .then()
            .catch(this.handleError);
    }; // createPost()
    ForumPostsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ForumPostsService);
    return ForumPostsService;
}());
exports.ForumPostsService = ForumPostsService; // class
//# sourceMappingURL=forum-posts.service.js.map
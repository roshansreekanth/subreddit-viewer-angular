import { Component, OnInit } from '@angular/core';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'reddit-app';
  posts: any = [];
  split = false;
  listings:any = [];
  constructor(private postsService: PostsService) { }

  addPosts(data: any) {
    var entries = data.data.children;
    for (let i = 0; i < entries.length; i++) {
      var entry = entries[i].data;
      var details = { "title": entry.title, "author": entry.author, "text": entry.selftext, "subreddit": entry.subreddit_name_prefixed, "creation": new Date(entry.created_utc * 1000), "image": entry.thumbnail }
      this.posts.push(details);

    }
  }

  changeSplit()
  {
    if(this.split)
    {
      this.split = false;
    }
    else{
      this.split = true
    }
  }

  onNotify()
  {
    this.ngOnInit()
  }

  ngOnInit() {
    this.postsService.sendGetRequest("angular").subscribe((data: any) => {
      this.posts = [];
      this.listings = [];
      this.addPosts(data)
      this.postsService.sendGetRequest("sql").subscribe((data: any) => {
        this.addPosts(data);
        this.postsService.sendGetRequest("dotnet").subscribe((data: any) => {
          this.addPosts(data);
          this.posts.sort(function (a: any, b: any) {
            return b.creation - a.creation;
          });

          if(this.split)
          {
            var sql = [];
            var angular = [];
            var dotnet = [];

            for(let i = 0; i < this.posts.length; i++)
            {
              var post = this.posts[i];

              if(post.subreddit == "r/SQL")
              {
                sql.push(post);
              }
              else if(post.subreddit == "r/angular")
              {
                angular.push(post);
              }
              else if(post.subreddit == "r/dotnet")
              {
                dotnet.push(post);
              }
            }

            this.listings.push(sql, angular, dotnet);
          }

        })
      })
    })

  }
}

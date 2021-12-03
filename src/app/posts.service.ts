import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class PostsService {

  private REST_API_SERVER = "https://www.reddit.com/r/"
  
  constructor(private httpClient: HttpClient) { }

  public sendGetRequest(subreddit:string)
  {
    return this.httpClient.get(this.REST_API_SERVER + subreddit + ".json");
  }
}

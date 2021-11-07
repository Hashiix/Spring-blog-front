import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PostPayload} from './add-post/post-payload';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddPostService {

  constructor(private httpClient: HttpClient) {
  }

  addPost(postPayload: PostPayload){
    return this.httpClient.post('https://blogspring.herokuapp.com/api/posts/', postPayload);
  }

  getAllPosts(): Observable<Array<PostPayload>>{
    return this.httpClient.get<Array<PostPayload>>("https://blogspring.herokuapp.com/api/posts/all");
  }

  getPost(permaLink: Number):Observable<PostPayload>{
    return this.httpClient.get<PostPayload>('https://blogspring.herokuapp.com/api/posts/get/' + permaLink);
  }
}

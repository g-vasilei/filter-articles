import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { PostsService } from './services/posts.service';
import { Post } from './models/post.mode';
import {
  filter,
  debounceTime,
  distinctUntilChanged,
  tap,
} from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  @ViewChild('input', { static: true }) input: ElementRef;

  postData$ = this.postService.getPosts();

  public data$: any;

  constructor(private postService: PostsService) {}

  ngAfterViewInit() {
    //server-side search
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        filter(Boolean),
        debounceTime(750),
        distinctUntilChanged(),
        tap(() => {
          console.log(this.input.nativeElement.value);
        })
      )
      .subscribe();
  }
}

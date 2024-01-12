import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  name = 'Angular';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http
      .get('https://api.github.com/orgs/angular/repos')
      .pipe(
        mergeMap((result) => {
          console.log('first', result);
          return this.http.get(result[0].events_url);
        })
      )
      .subscribe((result) => {
        console.log(result);
      });
  }
}

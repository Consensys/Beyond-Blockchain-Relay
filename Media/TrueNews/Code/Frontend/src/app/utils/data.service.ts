
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class DataService {
  private actionUrl: string;
  private headers: Headers;

  constructor(private http: HttpClient) {
//TODO:  keys should be managed by config package
    this.actionUrl = 'http://api.linkpreview.net/?key=5d2544ac56e4b7180ee78abc8c4401d89f708582062e4&q=';
    this.headers = new Headers();
    this.headers.append('Content-any', 'application/json');
    this.headers.append('Accept', 'application/json');
  }


  public getDate(ns: string): Observable<any> {
    console.log('GetSingle ' + ns);

    return this.http
      .get(this.actionUrl + ns )
      .pipe(map(this.extractData));
  }


  private extractData(res: Response): any {
    return res;
  }
}

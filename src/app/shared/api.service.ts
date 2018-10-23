import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Concert } from '../interfaces/event.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EventsService } from './events.service';
import { HttpClient } from '@angular/common/http';
// import { AngularFirestore } from 'angularfire2/firestore';
// import { AngularFireAction, AngularFireDatabase } from 'angularfire2/database';
import { OldSubs } from '../interfaces/old-subs';
import { Submissions } from '../interfaces/submissions';
import { BeyondArtist } from '../interfaces/beyond.interface';
import { conditionallyCreateMapObjectLiteral } from '@angular/compiler/src/render3/view/util';

const apiUrl  = '../assets/data/events.json';
const osSubs = '../../assets/data/oldsubs.json';
const beyondUrl = '../../assets/data/beyond.json';
@Injectable()
export class ApiService {
  events = false;
  constructor(private _http: HttpClient,
    // public _db: AngularFirestore
    ) { }
getBeyond() {
  return this._http.get<BeyondArtist[]>(beyondUrl);
}
getAllSubs() {
  return this._http.get<Submissions[]>(apiUrl);
 // return this._db.collection('SUBMISSIONS').valueChanges();
}
getOldSubs(): Observable<OldSubs[]> {
  return this._http.get<OldSubs[]>(osSubs);
}
getAllEvents(): Observable<Concert[]> {
    return this._http.get<Concert[]>(apiUrl);
    }
  private extractData(response: Response) {
    const body = response.json();
    return body.data || {};
  }
  private handleError(error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }
}

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Concert } from '../interfaces/event.interface';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';

@Injectable()
export class EventsService {
private baseUrl = '/events';
events: Concert[] = [];
  constructor(private _http: Http, private _data: ApiService) { }

getAllEvents(): Observable<Concert[]> {
  return this._data.getAllEvents();
}
getEventById(id: number): Observable<Concert> {
  return this.getEventById(id);
}

initializeEvent(): Concert {
  return{
    id: 0,
        name: null,
        category: null,
        performers: null,
        location: null,
        capacity: null,
        attendance: null,
        theme: null,
        production: null,
        postProduction: null,
        sponsors: null,
  };
}
private extractData(response: Response) {
  let body = response.json();
  return body.data || {};
}
private handleError(error: Response): Observable<any> {
  return
}
}

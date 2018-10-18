import { Component, OnInit, NgZone } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { Router } from '@angular/router';
import { Showcase } from '../interfaces/event.interface';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  title = 'Events';
  events: Showcase[] = [];
  cols: number;
  smCols: number;
  rowHeight: number;
  columnSize: string;
  seeMore = true;
  screenSize = [ 'sz', 'xs', 'sm', 'md', 'lg', 'xl'];
  mMatch: MediaQueryList = matchMedia(`(max-width: ${ screen }px)`);
  constructor(private _zone: NgZone,
              private _oMedia: ObservableMedia,
              private _api: ApiService,
              private _route: Router) {
    this.mMatch.addListener(m => _zone.run(() => this.mMatch = m));
    _oMedia.asObservable().subscribe((mChange: MediaChange) => {
          this.cols = this.screenSize.indexOf(mChange.mqAlias) ;
          this.rowHeight = (this.screenSize.indexOf(mChange.mqAlias) + 1 ) * 150;
          this.columnSize = mChange.mqAlias + '-cols';
    });
   }
  ngOnInit() {
    this._api.getAllEvents().subscribe(x => {
      this.events = x;
      if (this._route.url === '/events') {
        this.seeMore = false;
      }
    });
  }
  columns(columns): number {
    let columnCount = (this.events.length + columns) / this.events.length;
    if (columnCount === 1.5 || columnCount > columns) {
      columnCount = columns;
    }
    return columnCount;
  }
}

import { Component, OnInit, NgZone } from '@angular/core';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import { ApiService } from '../shared/api.service';
import { Router } from '@angular/router';
import { BeyondArtist } from '../interfaces/beyond.interface';

@Component({
  selector: 'app-beyond',
  templateUrl: './beyond.component.html',
  styleUrls: ['./beyond.component.scss']
})
export class BeyondComponent implements OnInit {
  title = 'Beyond The Stage';
  cols: number;
  smCols: number;
  rowHeight: number;
  columnSize: string;
  seeMore = true;
  screenSize = [ 'sz', 'xs', 'sm', 'md', 'lg', 'xl'];
  beyond: BeyondArtist[] = [];
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
    this._api.getBeyond().subscribe(artists => {
      this.beyond = artists;
      if (this._route.url === '/beyond') {
        this.seeMore = false;
      }
    });
  }
  columns(): number {
    if (this.cols < 2) {
      this.cols = 1;
    } else {
      this.cols = 2;
    }
    return this.cols;
  }

}

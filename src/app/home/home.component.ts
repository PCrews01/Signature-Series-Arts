import { Component, OnInit, NgZone } from '@angular/core';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import { animation, query, trigger, state, style, animate, transition } from '@angular/animations';

const screen = 700;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  cols: number;
  rowHeight: number;
  columnSize: string;
  screenSize = [ 'xs', 'sm', 'md', 'lg', 'xl'];
  isShowing = true;
  mMatch: MediaQueryList = matchMedia(`(max-width: ${ screen }px)`);
  constructor(private _zone: NgZone, private _oMedia: ObservableMedia) {
    this.mMatch.addListener(m => _zone.run(() => this.mMatch = m));
    _oMedia.asObservable().subscribe((mChange: MediaChange) => {
          this.cols = this.screenSize.indexOf(mChange.mqAlias) ;
          this.rowHeight = this.screenSize.indexOf(mChange.mqAlias) * 150;
          this.columnSize = mChange.mqAlias + '-cols';
    });
   }

  ngOnInit() {
  }
}

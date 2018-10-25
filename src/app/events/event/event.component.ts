import { Component, OnInit, NgZone } from '@angular/core';
import { Concert } from 'src/app/interfaces/event.interface';
import { ApiService } from 'src/app/shared/api.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AcronymPipe } from '../../shared/pipes/acronym.pipe';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import {Directive, Input, HostBinding} from '@angular/core';

const screen = 700;
@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  concert: Concert;
  invalidPic = false;
  flyersrc: any;
  cardImage: any;
  performers: any[] = [];
  path: any;
  cardWidth: string;
  showName: any;
  flexStyle: any;
  screenSize = [ 'sz', 'xs', 'sm', 'md', 'lg', 'xl'];
  mMatch: MediaQueryList = matchMedia(`(max-width: ${ screen }px)`);
  constructor(private _api: ApiService,
              private _http: HttpClient,
              private _aRoute: ActivatedRoute,
              private _sanitizer: DomSanitizer,
              private _zone: NgZone,
              private _oMedia: ObservableMedia,
              private _route: Router) {
              this.mMatch.addListener(m => _zone.run(() => this.mMatch = m));
              _oMedia.asObservable().subscribe((mChange: MediaChange) => {
                if (this.screenSize.indexOf(mChange.mqAlias) >= 3) {
                  this.flexStyle = 'auto';
                  this.cardWidth = '50%';
                } else {
                  this.flexStyle = 'auto';
                  this.cardWidth = '100%';
                }
                });
              }
  ngOnInit() {
    const id = +this._aRoute.snapshot.params['id'];
    this._api.getAllEvents().subscribe(e => {
      e.forEach(x => {
        if (x.id === id) {
          this.concert = x;
        }
      });
      this.showName = this.concert.name.toString().replace(RegExp(' ', 'g'), '_').toLocaleLowerCase();
      this.concert.performers.forEach(artist => {
        artist = this.noSpace(artist);
        this.path = `../../../assets/shows/${this.showName}/images/${this.imageSource(this.concert.name)}-${artist}.jpg`;

        this.performers.push(this._sanitizer.bypassSecurityTrustUrl(this.path));
      });
      this.flyersrc = this._sanitizer
                        .bypassSecurityTrustStyle(`url('../../../assets/shows/${this.showName}/images/flyer.jpg')`);
      this.cardImage = this._sanitizer
                        .bypassSecurityTrustUrl(`../../../assets/shows/${this.showName}/images/flyer.jpg`);
    });
  }
  imageSource(acronym): string {
    acronym = acronym.split(/\s/).reduce((response, word) => response += word.slice(0, 1), '');
    return acronym.toLocaleUpperCase();
  }
  noSpace(phrase: any): any {
    phrase = phrase.toString().replace(RegExp(' ', 'g'), '_').toLocaleLowerCase();
    phrase = phrase.toString().replace(RegExp('-', 'g'), '_').toLocaleLowerCase();
    return phrase;
  }
}

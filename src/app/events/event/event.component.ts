import { Component, OnInit } from '@angular/core';
import { Concert } from 'src/app/interfaces/event.interface';
import { ApiService } from 'src/app/shared/api.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { AcronymPipe } from '../../shared/pipes/acronym.pipe';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  concert: Concert;
  src: string;
  constructor(private _api: ApiService,
              private _http: HttpClient,
              private _aRoute: ActivatedRoute) { }

  ngOnInit() {
    const id = +this._aRoute.snapshot.params['id'];
    this._api.getAllEvents().subscribe(e => {
      e.forEach(x => {
        if (x.id === id) {
          this.concert = x;
        }
      });
    });
  }
  performerSource(show, performer): string {
    this.src = `'../../../assets/shows/${show}/images/${performer}.jpg'`;
    return this.src;
  }

}

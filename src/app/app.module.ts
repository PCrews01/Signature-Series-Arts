import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormGroup, NgControl, NgModel } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { EventsComponent } from './events/events.component';

import { MaterialModule } from './shared/modules/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AlmanacComponent } from './almanac/almanac.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ShowNamePipe } from './shared/pipes/show-name.pipe';
import { ApiService } from './shared/api.service';
import { BeyondComponent } from './beyond/beyond.component';
import { EventComponent } from './events/event/event.component';
import { AcronymPipe } from './shared/pipes/acronym.pipe';

import 'hammerjs';
import * as $ from 'jquery';
import 'popper.js';
import 'bootstrap';
import { SafePipe } from './shared/pipes/safe.pipe';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'events', component: EventsComponent },
  { path: 'event/:id', component: EventComponent },
  { path: 'beyond', component: BeyondComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    EventsComponent,
    AlmanacComponent,
    ContactsComponent,
    ShowNamePipe,
    AcronymPipe,
    BeyondComponent,
    EventComponent,
    SafePipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    HttpModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.fb),
    RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload'})
  ],
  exports: [
    RouterModule
  ],
  providers: [ApiService, HttpModule, AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }

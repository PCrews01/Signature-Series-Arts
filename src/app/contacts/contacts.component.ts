import { Component, OnInit, NgZone, Input, Sanitizer } from '@angular/core';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  title = 'Contact';
  loading = false;
  success = false;

  artistForm: AbstractControl;
  aForm: any;
  artistSubmission = true;

  sponsorForm: AbstractControl;
  sForm: any;
  sponsorSubmission = true;
  addCompanySocialMedia = false;

  generalForm: AbstractControl;
  gForm: any;
  generalSubmission = true;
  addMySocialMedia = false;

  cols: number;
  gridHeight: number;
  columnSize: string;
  formHeight: any;
  smCols: number;

  screenSize = [ 'sz', 'xs', 'sm', 'md', 'lg', 'xl'];

  mMatch: MediaQueryList = matchMedia(`(max-width: ${ screen }px)`);

  constructor(private _zone: NgZone,
              private _oMedia: ObservableMedia,
              private _af: FormBuilder,
              private _sf: FormBuilder,
              private _gf: FormBuilder,
              private _store: AngularFirestore,
              private _sanitation: DomSanitizer,
              private _router: Router) {
    this.mMatch.addListener(m => _zone.run(() => m));
    _oMedia.asObservable().subscribe((mChange: MediaChange) => {
          this.cols = this.screenSize.indexOf(mChange.mqAlias) ;
          if (this.cols > 3) { this.cols = 3; }
          this.gridHeight = (this.screenSize.indexOf(mChange.mqAlias) + 1 ) * 150;
          this.columnSize = mChange.mqAlias + '-cols';
          this.formHeight = `${this.gridHeight / (this.cols / 2) }`;
          console.log(`Row Height: ${this.gridHeight} and this is cols: ${this.cols}`);
    });
   }
   getForm(form) {
     return this._sanitation.bypassSecurityTrustStyle(form + 'px');
   }
  ngOnInit() {

    this.artistForm =  this._af.group({
      artist_name: ['', Validators.required],
      stage_name: ['', Validators.required],
      artist_email: ['', Validators.required],
      person_of_contact: ['', Validators.required],
      contact_email: ['', Validators.required],
      contact_phone: ['', Validators.required],
      contact_title: ['', Validators.required],
      youtube_channel: ['', Validators.required],
      soundcloud_link: '',
      twitter_handle: '',
      facebook_page: '',
      instagram_handle: '',
      hideRequired: false,
      floatLabel: 'auto'
        });

    this.sponsorForm =  this._sf.group({
      company_name: ['', Validators.required],
      business_type: ['', Validators.required],
      contact_name: ['', Validators.required],
      contact_email: ['', Validators.required],
      contact_phone: ['', Validators.required],
      contact_title: ['', Validators.required],
      company_twitter_handle: '',
      company_facebook_page: '',
      company_instagram_handle: '',
      hideRequired: false,
      floatLabel: 'auto'
    });

    this.generalForm =  this._gf.group({
      sender_name: ['', Validators.required],
      sender_email: ['', Validators.required],
      sender_phone: ['', Validators.required],
      message_subject: ['', Validators.required],
      message_body: ['', Validators.required],
      sender_facebook_page: '',
      sender_twitter_handle: '',
      sender_instagram_handle: '',
      hideRequired: false,
      floatLabel: 'auto'
    });
  }
  onSubmit(formName: string) {
    if (this.artistForm.valid || this.generalForm.valid || this.sponsorForm.valid) {
      this.loading = true;
      if (formName === 'artist') {
        const formData = this.artistForm.value;
        try {
          this._store.collection('Artist_Submissions').doc(this.artistForm.value.stage_name).set(formData);
          this.success = true;
          if (this.success = true) {
            this._router.navigate([this._router.url]);
            this.onReset();
          }
        } catch (err) {
          console.log(`'There has been an error: ${err}`);
        }
      } else if (formName === 'sponsor') {
        const formData = this.sponsorForm.value;
        try {
          this._store.collection('Sponsor_Submissions').doc(this.sponsorForm.value.company_name).set(formData);
          this.success = true;
          if (this.success = true) {
            this._router.navigate([this._router.url]);
            this.onReset();
          }
        } catch (err) {
          console.log(`'There has been an error: ${err}`);
        }
      } else if (formName === 'general') {
        const formData = this.generalForm.value;
        try {
          this._store.collection('General_Messages').doc(this.generalForm.value.sender_name).set(formData);
          this.success = true;
          if (this.success = true) {
            this._router.navigate([this._router.url]);
            this.onReset();
          }
        } catch (err) {
          console.log(`'There has been an error: ${err}`);
        }
      }
    this.loading = false;
    }
  }
  onReset() {
    this.artistForm.markAsPristine();
    this.artistForm.reset();
    console.log(this.artistForm.untouched);
  }
  showMedia(media: string) {
    console.log(`media: ${media}, company: ${this.addCompanySocialMedia}, mine: ${this.addMySocialMedia}`);
    if (media === 'company') {
      this.addCompanySocialMedia = !this.addCompanySocialMedia;
    } else if (media === 'general') {
      this.addMySocialMedia = !this.addMySocialMedia;
  }
}
}

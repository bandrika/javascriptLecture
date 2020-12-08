import { UrbanService } from './../../services/urban.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as urbanStore from 'src/app/store';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-upload-sites',
  templateUrl: './upload-sites.component.html',
  styleUrls: ['./upload-sites.component.css']
})
export class UploadSitesComponent implements OnInit {
  sitesZIP: File = null;
  loading: boolean;

  @Input() displayMarkerCreator: boolean;
  @Output() hideMarkerCreator = new EventEmitter<boolean>();

  constructor(
    private store: Store<urbanStore.AppModuleState>) { }

  ngOnInit(): void {
    this.store.select<any>('urban').subscribe(state => {
      this.loading = state.loading;
    });
  }


  onFileSelected(event): void {
    this.sitesZIP = event.target.files[0];
  }

  hide() {
    this.hideMarkerCreator.emit(false);
  }

  addNewSites() {
    if (this.sitesZIP) {
      this.store.dispatch(new urbanStore.UploadSites(this.sitesZIP));
    }
    this.sitesZIP = null;
  }

}

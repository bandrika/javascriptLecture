import { MessageService } from 'primeng/api';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { WINDOW_PROVIDERS } from '../window-token';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducer } from 'src/app/store/reducers/urban.reducer';
import { UrbanEffects } from './store/effects';
import { UploadSitesComponent } from './components/upload-sites/upload-sites.component';
import { PackageDownloaderComponent } from './components/package-downloader/package-downloader.component';
import { TableModule } from 'primeng/table';


@NgModule({
  declarations: [
    AppComponent,
    UploadSitesComponent,
    PackageDownloaderComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,

    StoreModule.forRoot({ urban: reducer }),
    EffectsModule.forRoot([UrbanEffects]),

    // PRIMENG
    ToastModule,
    DialogModule,
    ButtonModule,
    ProgressSpinnerModule,
    TableModule



  ],
  providers: [WINDOW_PROVIDERS, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }

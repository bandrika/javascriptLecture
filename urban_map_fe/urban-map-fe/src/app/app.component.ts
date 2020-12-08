import { Observable } from 'rxjs';
import { UrbanService } from './services/urban.service';
import { Component, AfterViewInit, ViewChild, ElementRef, OnInit } from '@angular/core';
import { UrbanData } from './models/urban-data.model';
import { ImageOverlay } from './models/overlay';
import { WINDOW } from 'src/window-token';
import { Inject } from '@angular/core';
import * as urbanStore from 'src/app/store';
import { Store } from '@ngrx/store';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
})
export class AppComponent implements AfterViewInit, OnInit  {
  title = 'Urban Map Project';
  origin = this.window.location.origin;
  urbanData: UrbanData[];
  selectedMarker: google.maps.Marker = null;
  displayMarkerCreator = false;

  @ViewChild('mapContainer', { static: false }) gmap: ElementRef;

  map: google.maps.Map;
  markers: any = [];
  overlay: ImageOverlay;

  sites: UrbanData[];

  mapOptions: google.maps.MapOptions = {
   panControl: true,
   zoomControl: true,
   mapTypeControl: true,
   scaleControl: true,
   streetViewControl: true,
   rotateControl: true,
   zoom: 8
  };

  constructor(
    private store: Store<urbanStore.AppModuleState>,
    private urbanService: UrbanService,
    @Inject(WINDOW) private window: Window) {}



  ngOnInit() {
    this.store.dispatch(new urbanStore.LoadSites());
  }

  ngAfterViewInit() {
    this.mapInitializer();
    this.store.select<any>('urban').subscribe(state => {
      this.sites = state.sites;
      this.setMarkers(state.sites);
    });
  }

  mapInitializer() {
    this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions);
  }

  setMarkers(data: UrbanData[]) {
    if (data) {
      if (data && data[0]) {
        const center = new google.maps.LatLng(+data[0].lat, +data[0].lng);
        this.map.setCenter(center);
      }

      data.forEach((urbanData: UrbanData) => {
        const newCoordinate = new google.maps.LatLng(+urbanData.lat, +urbanData.lng);
        const marker = new google.maps.Marker({
          position: newCoordinate,
          map: this.map,
          title: urbanData.package_id
        });

        this.markers.push(marker);

        marker.addListener('click', () => {
          if (!this.selectedMarker) {
            this.map.setCenter(marker.getPosition());
            this.map.setZoom(17);
            this.overlay = new ImageOverlay(this.map.getBounds(), this.getOverlayImageSrc(marker.getTitle()));
            this.overlay.setMap(this.map);
            marker.setAnimation(google.maps.Animation.BOUNCE);
          } else {
            if (this.selectedMarker && this.selectedMarker !== marker) {
              this.selectedMarker.setAnimation(null);
              marker.setAnimation(null);
              this.overlay.setMap(null);
              this.map.setCenter(marker.getPosition());
              this.map.setZoom(17);
              this.overlay = new ImageOverlay(this.map.getBounds(), this.getOverlayImageSrc(marker.getTitle()));
              this.overlay.setMap(this.map);
            }
          }
          this.selectedMarker = marker;
          this.selectedMarker.setAnimation(google.maps.Animation.BOUNCE);
        });
        marker.setMap(this.map);
      });
    }
  }

  getOverlayImageSrc(packageId: string): string {
    return this.origin + '/api/urban-data/img/' + packageId;
  }

  showMarkerCreator(): void {
    console.log(this.sites);
    this.displayMarkerCreator = true;
  }

  onHide() {
    this.displayMarkerCreator = false;
  }



}

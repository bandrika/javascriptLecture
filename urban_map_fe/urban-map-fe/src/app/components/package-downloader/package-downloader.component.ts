import { UrbanData } from './../../models/urban-data.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-package-downloader',
  templateUrl: './package-downloader.component.html',
  styleUrls: ['./package-downloader.component.css']
})
export class PackageDownloaderComponent implements OnInit {
  columns = [
    { field: 'lat', header: 'Latitude' },
    { field: 'lng', header: 'Longitude' },
    { field: 'location_name', header: 'Location' },
    { field: 'extra_1', header: 'INFO' },
    { field: 'extra_2', header: 'INFO' },
  ];

  selectedSites: UrbanData[];

  constructor() { }

  ngOnInit(): void {
  }

}

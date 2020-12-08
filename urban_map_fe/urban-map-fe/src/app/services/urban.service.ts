import { UrbanData } from './../models/urban-data.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class UrbanService {

  constructor(private http: HttpClient) { }

  getUrbanData(): Observable<UrbanData[]> {
    return this.http.get<any>('/api/urban-data');
  }

  uploadSites(sites: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', sites, sites.name);

    return this.http.post<any>('/api/urban-data/upload', formData);
  }
}

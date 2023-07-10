import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/api/test/';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }

  getProducteurBoard(): Observable<any> {
    return this.http.get(API_URL + 'prod', { responseType: 'text' });
  }

  getPiloteBoard(): Observable<any> {
    return this.http.get(API_URL + 'pilo', { responseType: 'text' });
  }

  getDirectionBoard(): Observable<any> {
    return this.http.get(API_URL + 'dir', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }
}

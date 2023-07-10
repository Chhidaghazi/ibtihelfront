import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Motif } from '../models/Motif';




let url = 'http://localhost:8080/api/motif/';
@Injectable({
  providedIn: 'root'
})
export class MotifService {

  constructor(private http: HttpClient) { }


  getMotifs(typePrestation: String): Observable<Motif[]> {

    const urli = url + "getMotifs/" + typePrestation;

    console.log("urli : " + urli);

    return this.http.get<Motif[]>(urli);

  }



}

import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TypeElement } from '../models/TypeElement';




let url = 'http://localhost:8080/api/typeElement/';
@Injectable({
  providedIn: 'root'
})
export class TypeElementService {

  constructor(private http: HttpClient) { }


  getTypesElements(typePrestation: String): Observable<TypeElement[]> {

    const urli = url + "getTypesElements/" + typePrestation;

    console.log("urli : " + urli);

    return this.http.get<TypeElement[]>(urli);

  }


}

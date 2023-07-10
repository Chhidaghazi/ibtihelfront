import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Equipe } from '../models/Equipe';



let url = 'http://localhost:8080/api/equipe/';
@Injectable({
  providedIn: 'root'
})

export class EquipeService {

  constructor(private http: HttpClient) { }


  getAllEquipe(): Observable<Equipe[]> {

    const urli = url + "equipes";

    console.log("urli : " + urli);

    return this.http.get<Equipe[]>(urli);

  }




}
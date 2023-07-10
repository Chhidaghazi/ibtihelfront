import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Nropm } from '../models/Nropm';
import { Pm } from '../models/Pm';

let url= 'http://localhost:8080/api/nropm/';

@Injectable({

  providedIn: 'root'

})

export class PmService {

  constructor(private http: HttpClient) { }


  getPms(cog: String): Observable<Pm[]> {
    const urli= url+"affichePms/"+cog;
    console.log("urli : "+urli);
    return this.http.get<Pm[]>(urli)
  }

}

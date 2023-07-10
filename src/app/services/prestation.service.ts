import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Prestation } from 'src/app/models/Prestation';
import { Observable } from 'rxjs';


let url = 'http://localhost:8080/api/prestations/';

@Injectable({
  providedIn: 'root'
})
export class PrestationService {

  private baseUrl = 'chemin/vers/votre/api/prestations';

  constructor(private http: HttpClient) { }

  getPrestationByNom(typePrestation: String): Observable<Prestation> {
    const urli = url + "getPrestations/" + typePrestation;
    console.log("urli : " + urli); 
    return this.http.get<Prestation>(urli);
  }
}
